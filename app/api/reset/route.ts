import { Api } from "@/lib/types";
import { NextResponse } from "next/server";
import { validateApiHandler } from "../handler";
import { prisma } from "@/lib/db";

export const POST = validateApiHandler<Api<{}>>(async (request, session) => {
  if (session?.uuid !== "admin") {
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 403 }
    );
  }

  await prisma.raffle.deleteMany({});

  return NextResponse.json(
    {
      ok: true,
      data: {},
    },
    { status: 200 }
  );
});
