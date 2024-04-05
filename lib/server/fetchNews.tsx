import { getEvents, getNews } from "@/lib/server/cms";
import { prisma } from "@/lib/server/db";
import { Event, News } from "@/lib/types";
import { Raffle, Result } from "@prisma/client";
import { validateSession } from "./session";
import { RaffleNews } from "@/components/RaffleNews";
import { render } from "@react-email/render";
import { format } from "../format";

export async function fetchNews(select?: ["cms" | "raffle"]): Promise<News[]> {
  let news: News[] = [];

  if (!select || select?.includes("cms")) {
    news = (await getNews()).map((news) => {
      return { ...news, type: news.isEmergency ? "emergency" : "information" };
    });
  }
  if (!select || select?.includes("raffle")) {
    const events = await getEvents();
    const session = await validateSession();
    const uuid = session?.uuid;
    const result = await prisma.raffle.findMany({
      where: {
        userId: uuid,
        result: {
          not: Result.PROCESSING,
        },
      },
    });
    const raffles = result.map((raffle) =>
      newsRaffle(
        raffle,
        events.find((event) => event.id === raffle.eventId)
      )
    );
    news.push(...raffles);
  }
  return news;
}

function newsRaffle(raffle: Raffle, event?: Event): News {
  if (raffle.result === Result.WIN) {
    return {
      id: raffle.uuid,
      title: format("「{0}」への当選のお知らせ", event?.name),
      body: render(<RaffleNews raffle={raffle} event={event} />),
      compactBody: format(
        "「{0}」(時間帯:{1})の企画に当選しましたので、お知らせします。",
        event?.name,
        event?.time.at(raffle.timeId)?.toPeriodString()
      ),
      type: "win",
    };
  } else {
    return {
      id: raffle.uuid,
      title: format("「{0}」への落選のお知らせ", event?.name),
      body: render(<RaffleNews raffle={raffle} event={event} />),
      compactBody: format(
        "厳正なる抽選の結果、誠に残念ながら「{0}」(時間帯:{1})の企画に落選となりました。",
        event?.name,
        event?.time.at(raffle.timeId)?.toPeriodString()
      ),
      type: "lose",
    };
  }
}
