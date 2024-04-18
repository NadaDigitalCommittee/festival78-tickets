import { prisma } from "@/lib/server/db";
import { Api } from "@/lib/types";
import { NextResponse } from "next/server";
import { validateApiHandler } from "../../handler";

export const POST = validateApiHandler<Api>(async (request, session) => {
  console.log(session)
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

  await prisma.raffle.deleteMany({});

  return NextResponse.json(
    {
      ok: true,
    },
    { status: 200 }
  );
});
