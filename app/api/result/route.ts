import { prisma } from "@/lib/db";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { validateHandler } from "../handler";
import { Api, ApiResultResponse } from "@/lib/types";

export const GET = validateHandler<Api<ApiResultResponse>>(
  async (request, uuid) => {
    return prisma.user
      .findUnique({
        where: {
          uuid: uuid,
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
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          console.log(e);
        }
        return NextResponse.json({ ok: false }, { status: 400 });
      });
  }
);
