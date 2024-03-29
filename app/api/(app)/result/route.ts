import { prisma } from "@/lib/server/db";
import { Api, ApiResultResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { PrismaClientKnownRequestError } from "prisma/prisma-client/runtime/library";
import { validateApiHandler } from "../../handler";
import { log } from "@/lib/server/log";

export const GET = validateApiHandler<Api<ApiResultResponse>>(
  async (request, session) => {
    return prisma.user
      .findUnique({
        where: {
          uuid: session?.uuid,
        },
      })
      .raffle()
      .then((raffles) => {
        return NextResponse.json(
          {
            ok: true,
            data: {
              raffle: raffles ?? undefined,
            },
          },
          { status: 200 }
        );
      })
      .catch((e) => {
        if (e instanceof PrismaClientKnownRequestError) {
          log(e.message);
        }
        return NextResponse.json({ ok: false }, { status: 400 });
      });
  }
);
