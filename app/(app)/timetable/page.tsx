import { unstable_cache } from "next/cache";
import { Timetable } from "./_components/Timetable";
import { prisma } from "@/lib/server/db";
import { getEvents } from "@/lib/server/cms";
import { extendCapacity } from "@/extension/raffleException";

const getRatio=(eventId:number,timeId:number)=>unstable_cache(async()=>{
  return prisma.raffle.count({
    where: {
      eventId: eventId,
      timeId: timeId,
    },
  });
},[`ratio_${eventId}_${timeId}`],{revalidate:60*1000})

export default async function Page() {
  const events=await getEvents()
  const ratio: { eventId: number; timeId: number; ratio: number }[] = [];
  for await (const event of events) {
    for (let i = 0; i < event.time.length; i++) {
      const data=await getRatio(event.id,i)()
      console.log(event.id,i,data)
      ratio.push({
        eventId: event.id,
        timeId: i,
        ratio: (data/(extendCapacity(event.id,i)??event.capacity)),
      });
    }
  }
  return (
    <main>
      <Timetable ratio={ratio} />
    </main>
  );
}
