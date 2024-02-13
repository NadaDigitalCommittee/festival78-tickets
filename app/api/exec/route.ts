import { Api } from "@/lib/types";
import { NextResponse } from "next/server";
import z from "zod";
import { validateApiHandler } from "../handler";
import { raffle } from "@/lib/raffle";

export const POST = validateApiHandler<Api<{ message: string }>>(
  async (request, session) => {
    if (session?.uuid !== "admin") {
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

    const [message] = await raffle(eventId, timeId, capacity);
    return NextResponse.json(
      {
        ok: true,
        data: { message },
      },
      { status: 200 }
    );
  }
);
