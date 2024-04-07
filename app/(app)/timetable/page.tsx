import { unstable_cache } from "next/cache";
import { Timetable } from "./_components/Timetable";
import { prisma } from "@/lib/server/db";
import { getEvents } from "@/lib/server/cms";

async function get(eventId: number, timeId: number) {
  return prisma.raffle.count({
    where: {
      eventId: eventId,
      timeId: timeId,
    },
  });
}

const getRatio=unstable_cache(async()=>{
  const events = await getEvents();
  const result: { eventId: number; timeId: number; ratio: number }[] = [];
  const promise: Promise<void>[] = [];
  for (const event of events) {
    for (let i = 0; i < event.time.length; i++) {
      promise.push(
        (async () => {
          result.push({
            eventId: event.id,
            timeId: i,
            ratio: (await get(event.id, i)) / event.capacity,
          });
        })()
      );
    }
  }
  await Promise.all(promise);
  return result;
},["ratio"],{revalidate:60*1000})

export default async function Page() {
  const ratio=await getRatio()
  return (
    <main>
      <Timetable ratio={ratio} />
    </main>
  );
}
