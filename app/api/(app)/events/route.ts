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

    // const ratioRes = await fetch(`${process.env.HOST}/api/ratio`, {
    //   next: {
    //     revalidate: 60 * 1000,
    //   },
    //   headers:{
    //     "x-secret": process.env.ADMIN_SECRET,
    //   },
    //   method: "POST",
    // }).then((res) => res.json());
    // const ratioArray = ratioRes.data as {
    //   eventId: number;
    //   timeId: number;
    //   ratio: number;
    // }[];
    // const data = events.map((event) => {
    //   const ratio = event.start.map((_, index) => {
    //     return (
    //       ratioArray.find(
    //         (r) => r.eventId === event.number && r.timeId === index
    //       )?.ratio ?? 0
    //     );
    //   });
    //   return { ...event, ratio };
    // });
    return NextResponse.json({ ok: true, data: { events:events } });
  }
);
