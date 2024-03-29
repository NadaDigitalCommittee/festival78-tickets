import { getEventsFromCMS } from "@/lib/server/cms";
import { Api, ApiEventsResponse } from "@/lib/types";
import { NextResponse } from "next/server";
import { validateApiHandler } from "../../handler";

export const GET = validateApiHandler<Api<ApiEventsResponse>>(
  async (_request, session) => {
    if (!session) {
      return NextResponse.json(
        {
          ok: false,
        },
        { status: 401 }
      );
    }
    const events = await getEventsFromCMS();
    return NextResponse.json({ ok: true, data: { events } });
  }
);
