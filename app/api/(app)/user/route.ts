import { prisma } from "@/lib/server/db";
import { Api, ApiUserResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateApiHandler } from "../../handler";

export const GET = validateApiHandler<Api<ApiUserResponse>>(
  async (_request, session) => {
    if (!session) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: {
        uuid: session.uuid,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        data: {
          email: session.email,
          uuid: session.uuid,
          notification: user?.notification,
        },
      },
      { status: 200 }
    );
  }
);

const putSchema = z.object({
  email: z.string().optional(),
  notification: z.boolean().optional(),
});

export const PUT = validateApiHandler<Api>(async (request, session) => {
  if (!session) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const parse = putSchema.safeParse(await request.json());
  if (!parse.success) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const parseEmail = z.string().email().safeParse(parse.data.email);

  if (parseEmail.success) {
    return prisma.user
      .update({
        where: {
          uuid: session.uuid,
        },
        data: {
          email: parseEmail.data,
          notification: parse.data.notification,
        },
      })
      .then(() => {
        return NextResponse.json({ ok: true }, { status: 200 });
      })
      .catch((e) => {
        if (e.code === "P2002") {
          return NextResponse.json({ ok: false }, { status: 409 });
        }
        return NextResponse.json({ ok: false }, { status: 500 });
      });
  } else {
    return prisma.user
      .update({
        where: {
          uuid: session.uuid,
        },
        data: {
          notification: parse.data.notification,
        },
      })
      .then(() => {
        return NextResponse.json({ ok: true }, { status: 200 });
      })
      .catch(() => {
        return NextResponse.json({ ok: false }, { status: 500 });
      });
  }
});
