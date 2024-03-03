import { Api } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateApiHandler } from "../../handler";
import { prisma } from "@/lib/server/db";

export const POST = validateApiHandler<Api<undefined>>(
  async (request, session) => {
    if (!session) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    const res = await request.json();
    const safeRes = scheme.safeParse(res);

    if (!safeRes.success) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    if (
      await prisma.pushNotification.findFirst({
        where: {
          userId: session.uuid,
        },
      })
    ) {
      await prisma.pushNotification.updateMany({
        where: {
          userId: session.uuid,
        },
        data: {
          auth: safeRes.data.keys.auth,
          endpoint: safeRes.data.endpoint,
          p256dh: safeRes.data.keys.p256dh,
        },
      });
    } else {
      await prisma.pushNotification.create({
        data: {
          auth: safeRes.data.keys.auth,
          endpoint: safeRes.data.endpoint,
          p256dh: safeRes.data.keys.p256dh,
          userId: session.uuid,
        },
      });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  }
);

const scheme = z.object({
  endpoint: z.string(),
  expirationTime: z.string().nullable(),
  keys: z.object({
    p256dh: z.string(),
    auth: z.string(),
  }),
});
