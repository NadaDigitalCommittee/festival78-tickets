import { prisma } from "@/lib/server/db";
import { generateSession } from "@/lib/server/session";
import { Api, ApiLoginResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import z from "zod";
import { validateApiHandler } from "../../handler";
import { sendMail } from "@/lib/email/email";
import { VerficationTokenEmail } from "@/lib/email/template/Verification";

export const POST = validateApiHandler<Api<ApiLoginResponse>>(
  async (request) => {
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

    const token = await generateSession(user.uuid, user.email);

    await sendMail(
      VerficationTokenEmail({
        url: `${process.env.HOST}/verify?token=${token}`,
      }),
      "本人確認のお知らせ",
      user.email
    );

    return NextResponse.json(
      {
        ok: true,
      },
      { status: 200 }
    );
  }
);
