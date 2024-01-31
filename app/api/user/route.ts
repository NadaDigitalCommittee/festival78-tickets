import { Api, ApiUserResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { validateApiHandler } from "../handler";

export const GET = validateApiHandler<Api<ApiUserResponse>>(
  async (_request, session) => {
    if (!session) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    return NextResponse.json(
      {
        ok: true,
        data: {
          email: session.email,
        },
      },
      { status: 201 }
    );
  }
);
