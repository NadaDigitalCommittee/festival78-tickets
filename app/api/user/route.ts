import { Api, ApiUserResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { validateHandler } from "../handler";
import { prisma } from "@/lib/db";

export const GET = validateHandler<Api<ApiUserResponse>>(
  async (request, uuid) => {
    if (!uuid) {
      return NextResponse.json(
        {
          ok: false,
        },
        { status: 401 }
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        uuid: uuid,
      },
    });
    if (!user) {
      return NextResponse.json(
        {
          ok: false,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        ok: true,
        data: { email: user.email },
      },
      { status: 200 }
    );
  }
);
