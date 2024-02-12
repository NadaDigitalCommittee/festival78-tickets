import { getEvents, getNews } from "@/lib/cms";
import { prisma } from "@/lib/db";
import { Event, News } from "@/lib/types";
import { Raffle, Result } from "@prisma/client";
import { validateSession } from "./session";

export async function fetchNews(): Promise<News[]> {
  const session = await validateSession();
  const events = await getEvents();
  const uuid = session?.uuid;
  if (!uuid) {
    return [];
  }
  const news: News[] = (await getNews()).map((news) => {
    return { ...news, type: news.isEmergency ? "emergency" : "information" };
  });
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
  return [...raffles, ...news];
}

function newsRaffle(raffle: Raffle, event?: Event): News {
  if (raffle.result === Result.WIN) {
    return {
      id: raffle.uuid,
      title: "当選のお知らせ",
      body: `<h1>当選のお知らせです。</h1><p>当選しましたので、番号をお知らせします。</p><p><a href='/certifications?eventId=${raffle.eventId}&timeId=${raffle.timeId}'>詳しくはこちら</p>`,
      compactBody: `企画に当選しましたので、お知らせします。`,
      type: "win",
    };
  } else {
    return {
      id: raffle.uuid,
      title: "落選のお知らせ",
      body: `<h1>残念ながら落選しました。</h1><p>申し訳ございません。企画に落選してしまいました。企画名...${event?.name}時間帯...${event?.time.at(raffle.timeId)?.toPeriodString()}</p>`,
      compactBody: `企画に落選しました。`,
      type: "lose",
    };
  }
}
