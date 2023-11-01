import { prisma } from "@/lib/db";
import { generateSession } from "@/lib/session";
import { Api, ApiLoginResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import z from "zod";
import { validateHandler } from "../handler";

export const POST = validateHandler<Api<ApiLoginResponse>>(async (request) => {
  const res = await request.json();
  const email = z.string().min(1).safeParse(res.email);

  if (!email.success) {
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email.data,
    },
  });

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 400 }
    );
  }

  generateSession(user.uuid, user.email);
  return NextResponse.json(
    {
      ok: true,
    },
    { status: 200 }
  );
});
