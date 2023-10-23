import { prisma } from "@/lib/db";
import { Api, ApiLoginResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { validateHandler } from "../handler";
import { generateUUID } from "@/lib/session";

export const POST = validateHandler<Api<ApiLoginResponse>>(async (request) => {
  const res = await request.json();
  const email = res.email as string;

  if (email === "") {
    return NextResponse.json(
      {
        ok: false,
      },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (user) {
    generateUUID(user.uuid);
    return NextResponse.json(
      {
        ok: true,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
    },
    { status: 200 }
  );
});
