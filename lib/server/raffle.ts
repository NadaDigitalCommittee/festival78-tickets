import { prisma } from "@/lib/server/db";

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
  const [status, winnersUUID] = await raffleUUID(eventId, timeId, capacity);
  if (status !== "ok") return [status, []];
  await updateResult(eventId, timeId, winnersUUID);
  return ["ok", winnersUUID];
}

async function raffleUUID(
  eventId: number,
  timeId: number,
  capacity: number
): Promise<[string, string[]]> {
  console.log("抽選中...", capacity);
  if (capacity === 0) {
    return ["当選者なし", []];
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
  if (participants.length === 0) return ["参加者が0人", []];

  const distribution: number[] = []; // i+1人の参加者が何組いるか
  for (let i = 0; i < Math.max(...participants); i++) {
    distribution.push(participants.filter((a) => a === i + 1).length);
  }

  const result = random(distribution, capacity); // 総和がcapacityとなるような参加者の分布

  // 総和がcapacityとなるような参加者の分布が存在しない場合やり直し
  if (!result) {
    return raffleUUID(eventId, timeId, capacity - 1);
  }

  const winnersUUID = result?.map((count, i) => {
    const a = all.filter((a) => a.participants === i + 1);
    const b = a.map((a) => a.uuid);
    //ランダムにcount組選ぶ
    const shuffled = b.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  });

  if (winnersUUID.flat().length === 0) return ["当選者が0人", []];

  return ["ok", winnersUUID.flat()];
}

async function updateResult(
  eventId: number,
  timeId: number,
  winnersUUID: string[]
) {
  await prisma.raffle.updateMany({
    where: {
      eventId: eventId,
      timeId: timeId,
      uuid: {
        in: winnersUUID.flat(),
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
        notIn: winnersUUID.flat(),
      },
    },
    data: {
      result: "LOSE",
    },
  });
}

/**
 * 配列 `distribution` に従って、`capacity` と等しい容量を満たす数値の組み合わせを再帰的に生成し、その組み合わせをすべて配列として返します。
 *
 * @param {number[]} distribution - 各インデックスにおける取り得る数値の最大値を格納した配列。
 * @param {number} capacity - 生成される組み合わせの合計が満たすべき容量。
 * @returns {number[][]} - 容量 `capacity` を満たす数値の組み合わせをすべて含む二次元配列。
 * @example
 * const combinations = solveDistribution([2, 1, 3], 5);
 * console.log(combinations); // [[1, 1, 3], [2, 3]]
 */
function solveDistribution(distribution: number[], capacity: number) {
  let C: number[][] = [];

  function generateRecursive(index: number, currentArray: number[]) {
    if (index === distribution.length) {
      let sum = 0;
      for (let i = 0; i < currentArray.length; i++) {
        sum += currentArray[i] * (i + 1);
      }
      if (sum == capacity) {
        C.push(currentArray.slice());
      }
      return;
    }

    for (let i = 0; i <= distribution[index]; i++) {
      currentArray.push(i);
      generateRecursive(index + 1, currentArray);
      currentArray.pop();
    }
  }

  generateRecursive(0, []);

  return C;
}

function random(distribution: number[], capacity: number) {
  const C = solveDistribution(distribution, capacity);
  const r = Math.floor(Math.random() * C.length);
  if (C.length === 0) return undefined;
  return C[r];
}