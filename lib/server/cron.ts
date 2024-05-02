import { raffle } from "@/lib/server/raffle";
import { Time } from "../time";
import { getEvents } from "./cms";
import { prisma } from "./db";
import { log } from "./log";

export async function job() {
  const events = await getEvents();
  const now = Time.nowJST();
  const message: string[] = []
  const promises: Promise<any>[] = []

  for await (const event of events) {
    for (let index=0;index<event.time.length;index++) {
      const time=event.time[index]
      const value = time.start.getTime() - now.getTime();
      const minutes = value / (1000 * 60);
      console.log(event.id, time.toPeriodString())
      console.log(`${minutes}分`)
      if (minutes > 30 || minutes < 0) {
        return console.log(`${event.name} ${time.toPeriodString()} 抽選しません`)
      }
      console.log(`${event.name} ${time.toPeriodString()} 抽選します`)
      //30分前に抽選
      const alreadyRaffled = !!(await prisma.raffle.findFirst({
        where: {
          result: {
            notIn: ["PROCESSING"],
          },
        },
      }));
      if (alreadyRaffled) {
        return console.log(`${event.name} ${time.toPeriodString()} 既に抽選済み`)
      }
      promises.push(raffle(event.id, index, event.capacity));
      console.log(`${event.name} ${time.toPeriodString()} 抽選完了`)
    }
  }
  console.log("A")
  for await (const promise of promises) {
    console.log("実行")
    await promise()
  }
  await log(message.join("\n"))
}


job()
