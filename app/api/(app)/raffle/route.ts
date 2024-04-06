import { prisma } from "@/lib/server/db";
import { Api, ApiRaffleResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateApiHandler } from "../../handler";
import { Time } from "@/lib/time";
import { getEvents } from "@/lib/server/cms";
import { isRaffleTimeOver } from "@/extension/raffleException";

export const POST = validateApiHandler<Api<ApiRaffleResponse>>(
  async (request, session) => {
    if (!session) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const res = await request.json();
    const parsed = scheme.safeParse(res);
    const events = await getEvents();

    if (!parsed.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const data = parsed.data;

    const raffleStart = new Time(9, 25, 0, 0).start.getTime();
    const eventTime = events.at(data.eventId)?.time.at(data.timeId);

    if (!eventTime || raffleStart - eventTime.start.getTime() > 0) {
      return NextResponse.json(
        { ok: false },
        { status: 409, statusText: "No need for raffle" }
      );
    }

    if (!eventTime || isRaffleTimeOver(data.eventId, eventTime)) {
      return NextResponse.json(
        { ok: false },
        { status: 409, statusText: "Event has already started" }
      );
    }

    if (
      await prisma.raffle.findUnique({
        where: {
          unique_raffle: {
            eventId: data.eventId,
            timeId: data.timeId,
            userId: session.uuid,
          },
        },
      })
    ) {
      return NextResponse.json(
        { ok: false },
        { status: 409, statusText: "Already raffled" }
      );
    }

    const raffles = await prisma.raffle.findMany({
      where: {
        userId: session.uuid,
      },
    });
    const time = events.at(data.eventId)?.time.at(data.timeId);
    if (
      Time.isConflict(
        time,
        ...raffles.map((r) => events.at(r.eventId)?.time.at(r.timeId))
      )
    ) {
      return NextResponse.json(
        { ok: false },
        { status: 409, statusText: "Time conflict" }
      );
    }

    const raffle = await prisma.raffle.create({
      data: {
        eventId: data.eventId,
        participants: data.participants,
        timeId: data.timeId,
        userId: session.uuid,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: raffle,
      },
      { status: 201 }
    );
  }
);

const scheme = z.object({
  eventId: z.number(),
  participants: z.number(),
  timeId: z.number(),
});
