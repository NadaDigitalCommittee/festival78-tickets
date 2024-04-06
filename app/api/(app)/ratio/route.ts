import { getEvents } from "@/lib/server/cms";
import { prisma } from "@/lib/server/db";
import { NextResponse } from "next/server";

export async function GET() {
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
  for (let i = 0; i < promise.length; i += 3) {
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
