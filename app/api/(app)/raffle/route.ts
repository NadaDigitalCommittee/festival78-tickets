import { prisma } from "@/lib/server/db";
import { Api, ApiRaffleResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateApiHandler } from "../../handler";
import { Time } from "@/lib/time";
import { getEvents } from "@/lib/server/cms";

export const POST = validateApiHandler<Api<ApiRaffleResponse>>(
  async (request, session) => {
    if (!session) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const res = await request.json();
    const safeRes = scheme.safeParse(res);
    const events = await getEvents();

    if (!safeRes.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    if (
      await prisma.raffle.findUnique({
        where: {
          unique_raffle: {
            eventId: safeRes.data.eventId,
            timeId: safeRes.data.timeId,
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
    const time = events.at(safeRes.data.eventId)?.time.at(safeRes.data.timeId);
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
        eventId: safeRes.data.eventId,
        participants: safeRes.data.participants,
        timeId: safeRes.data.timeId,
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
