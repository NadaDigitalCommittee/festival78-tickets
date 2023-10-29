import { prisma } from "@/lib/db";
import { Api, ApiRegisterResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { z } from "zod";
import { validateHandler } from "../handler";
import { generateUUID } from "@/lib/session";

export const POST = validateHandler<Api<ApiRegisterResponse>>(
  async (request) => {
    const res = await request.json();
    const email = res.email as string;
    const uuid = res.uuid as string;

    if (uuid) {
      const user = await prisma.user.findUnique({
        where: {
          uuid: uuid,
        },
      });
      if(user){
        prisma.user.update({
          "where":{
            "uuid":uuid
          },
          data:{
            email:email,
            uuid:uuid
          }
        })
        return NextResponse.json({ ok: true }, { status: 200 });
      }
    }

    //secretが一致しなかったら401を返す
    if (res.secret !== process.env.SECRET) {
      return NextResponse.json(
        { ok: false },
        { status: 401, statusText: "Unauthorized" }
      );
    }

    //emailの形式が正しくなかったら400を返す
    const scheme = z.string().email();
    if (!scheme.safeParse(email).success) {
      return NextResponse.json(
        { ok: false },
        { status: 400, statusText: "Bad Request" }
      );
    }

    //emailが衝突していたら409を返す
    if (
      await prisma.user.findUnique({
        where: {
          email: email,
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
        email: email,
      },
    });

    //cookieにtokenをセット
    generateUUID(user.uuid);

    return NextResponse.json({ ok: true }, { status: 200 });
  }
);