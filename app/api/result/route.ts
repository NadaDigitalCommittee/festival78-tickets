import { prisma } from "@/lib/db";
import { Api, ApiResultResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { validateApiHandler } from "../handler";
import { PrismaClientKnownRequestError } from "prisma/prisma-client/runtime/library";

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
          console.log(e);
        }
        return NextResponse.json({ ok: false }, { status: 400 });
      });
  }
);
