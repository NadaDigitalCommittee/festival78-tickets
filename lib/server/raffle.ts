import { extendCapacity } from "@/exception/raffleException";
import { prisma } from "@/lib/server/db";
import { sendLoseEmail } from "../email/template/Lose";
import { sendWinEmail } from "../email/template/Win";
import { getEvents } from "./cms";
import { sendPushNotification } from "./pushNotification";
import { solveDistribution } from "./raffleAlgo";

/**
 * eventId,timeIdにそってcapacity人の当選者を決めた後、DBを更新する
 * @param eventId
 * @param timeId
 * @param capacity
 * @returns [メッセージ、UUID]
 */
export async function raffle(
  eventId: number,
  timeId: number,
  capacity: number
): Promise<[string, string[]]> {
  const [status, winnersRaffleUUID, losersRaffleUUID] = await raffleUUID(
    eventId,
    timeId,
    extendCapacity(eventId, timeId) ?? capacity
  );
  if (status !== "ok") return [status, []];
  await updateResult(eventId, timeId, winnersRaffleUUID);
  await sendEmail(winnersRaffleUUID, "win", eventId, timeId);
  await sendEmail(losersRaffleUUID, "lose", eventId, timeId);
  await pushNotification(winnersRaffleUUID);
  await pushNotification(losersRaffleUUID);
  return ["ok", winnersRaffleUUID];
}

async function raffleUUID(
  eventId: number,
  timeId: number,
  capacity: number
): Promise<[string, string[], string[]]> {
  console.log("抽選中...", capacity);
  if (capacity === 0) {
    return ["当選者なし", [], []];
  }
  const all = await prisma.raffle.findMany({
    select: {
      uuid: true,
      participants: true,
    },
    where: {
      eventId: eventId,
      timeId: timeId,
    },
  });
  const participants = all.map((a) => a.participants);
  if (participants.length === 0) return ["参加者が0人", [], []];

  const distribution: number[] = []; // i+1人の参加者が何組いるか
  for (let i = 0; i < Math.max(...participants); i++) {
    distribution.push(participants.filter((a) => a === i + 1).length);
  }

  const result = solveDistribution(distribution, capacity); // 総和がcapacityとなるような参加者の分布

  // 総和がcapacityとなるような参加者の分布が存在しない場合やり直し
  if (!result) {
    return raffleUUID(eventId, timeId, capacity - 1);
  }

  const winnersRaffleUUID = result?.map((count, i) => {
    const a = all.filter((a) => a.participants === i + 1);
    const b = a.map((a) => a.uuid);
    //ランダムにcount組選ぶ
    const shuffled = b.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  });

  const losersRaffleUUID = all
    .map((a) => a.uuid)
    .filter((a) => !winnersRaffleUUID.flat().includes(a));

  if (winnersRaffleUUID.flat().length === 0) return ["当選者が0人", [], []];

  return ["ok", winnersRaffleUUID.flat(), losersRaffleUUID];
}

async function updateResult(
  eventId: number,
  timeId: number,
  winnersRaffleUUID: string[]
) {
  await prisma.raffle.updateMany({
    where: {
      eventId: eventId,
      timeId: timeId,
      uuid: {
        in: winnersRaffleUUID.flat(),
      },
    },
    data: {
      result: "WIN",
    },
  });
  await prisma.raffle.updateMany({
    where: {
      eventId: eventId,
      timeId: timeId,
      uuid: {
        notIn: winnersRaffleUUID.flat(),
      },
    },
    data: {
      result: "LOSE",
    },
  });
}

async function sendEmail(
  raffleUUID: string[],
  type: "win" | "lose",
  eventId: number,
  timeId: number
) {
  const event = await getEvents();
  const name = event.find((e) => e.id === eventId)?.name ?? "";
  const time =
    event
      .find((e) => e.id === eventId)
      ?.time.at(timeId)
      ?.toPeriodString() ?? "";
  const users = await prisma.user.findMany({
    where: {
      raffle: {
        some: {
          uuid: {
            in: raffleUUID,
          },
        },
      },
    },
  });
  for await (const user of users) {
    if (!user.notification) {
      return;
    }
    if (type === "win") {
      await sendWinEmail(user.email, name, time, eventId, timeId);
    } else {
      await sendLoseEmail(user.email, name, time);
    }
  }
}

async function pushNotification(raffleUUID: string[]) {
  const users = await prisma.user.findMany({
    where: {
      raffle: {
        some: {
          uuid: {
            in: raffleUUID,
          },
        },
      },
    },
  });
  for await (const user of users) {
    if (
      !(await prisma.pushNotification.findFirst({
        where: {
          userId: user.uuid,
        },
      }))
    ) {
      return;
    }
    (
      await prisma.pushNotification.findMany({
        where: {
          userId: user.uuid,
        },
      })
    ).map(async (notification) => {
      sendPushNotification(notification, {
        title: "抽選結果のお知らせ",
        body: "抽選結果が発表されました！サイトまでお越しください！",
      });
    });
  }
}
