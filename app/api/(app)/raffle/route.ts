import { prisma } from "@/lib/server/db";
import { Api, ApiRaffleResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateApiHandler } from "../../handler";

export const POST = validateApiHandler<Api<ApiRaffleResponse>>(
  async (request, session) => {
    if (!session) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const res = await request.json();
    const safeRes = scheme.safeParse(res);

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
