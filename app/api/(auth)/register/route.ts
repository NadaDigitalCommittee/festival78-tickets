import { prisma } from "@/lib/server/db";
import { generateSession } from "@/lib/server/session";
import { Api, ApiRegisterResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateApiHandler } from "../../handler";
import { sendVerficationTokenEmail } from "@/lib/email/template/Verification";

const scheme = z.object({
  email: z.string().email(),
  secret: z.string().optional(),
});

export const POST = validateApiHandler<Api<ApiRegisterResponse>>(
  async (request) => {
    const res = scheme.safeParse(await request.json());

    if (!res.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const data = res.data;

    //secretが一致しなかったら401を返す
    if (data.secret !== process.env.SECRET) {
      return NextResponse.json(
        { ok: false },
        { status: 401, statusText: "Unauthorized" }
      );
    }

    //emailが衝突していたら409を返す
    if (
      await prisma.user.findUnique({
        where: {
          email: data.email,
        },
      })
    ) {
      return NextResponse.json(
        { ok: false },
        { status: 409, statusText: "Conflict" }
      );
    }

    //user作成
    const user = await prisma.user.create({
      data: {
        email: data.email,
      },
    });

    const token = await generateSession(user.uuid, user.email);

    await sendVerficationTokenEmail(user.email, token);

    return NextResponse.json({ ok: true }, { status: 201 });
  }
);
