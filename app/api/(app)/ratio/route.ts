import { getEvents } from "@/lib/server/cms";
import { prisma } from "@/lib/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
  console.log("start...")
  const now=new Date().getTime();
 if(request.headers.get("x-secret")!==process.env.ADMIN_SECRET){
  return NextResponse.json({ ok: false }, { status: 401 });
 }
  const events = await getEvents();
  console.log("get events",(new Date().getTime()-now)/1000);
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
  for (let i = 0; i < promise.length; i += 3) {
    console.log(`ratio ${i}`,(new Date().getTime()-now)/1000);
    await Promise.all(promise.splice(0, 3));
  }

  return NextResponse.json({ ok: true, data: result });
}

async function get(eventId: number, timeId: number) {
  return prisma.raffle.count({
    where: {
      eventId: eventId,
      timeId: timeId,
    },
  });
}
