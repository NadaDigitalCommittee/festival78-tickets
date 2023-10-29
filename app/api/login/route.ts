import { prisma } from "@/lib/db";
import { Api, ApiLoginResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { validateHandler } from "../handler";
import { generateUUID } from "@/lib/session";
import z from "zod";

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

  generateUUID(user.uuid);
  return NextResponse.json(
    {
      ok: true,
    },
    { status: 200 }
  );
});
