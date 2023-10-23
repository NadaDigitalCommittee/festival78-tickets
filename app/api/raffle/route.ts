import { prisma } from "@/lib/db";
import { Api, ApiRaffleResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateHandler } from "../handler";

export const POST = validateHandler<Api<ApiRaffleResponse>>(
  async (request, uuid) => {
    if (!uuid) {
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
            userId: uuid,
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
        userId: uuid,
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
