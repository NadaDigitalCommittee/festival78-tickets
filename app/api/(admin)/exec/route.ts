import { Api } from "@/lib/types";
import { NextResponse } from "next/server";
import z from "zod";
import { validateApiHandler } from "../../handler";
import { raffle } from "@/lib/server/raffle";

export const POST = validateApiHandler<Api>(async (request, session) => {
  if (!session) {
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 401 }
    );
  }
  if (!session.admin) {
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 403 }
    );
  }
  const res = await request.json();
  const scheme = z.object({
    eventId: z.number(),
    timeId: z.number(),
    capacity: z.number(),
  });
  const parsed = scheme.safeParse(res);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 400 }
    );
  }
  const { eventId, timeId, capacity } = parsed.data;

  raffle(eventId, timeId, capacity);
  return NextResponse.json(
    {
      ok: true,
    },
    { status: 200 }
  );
});
