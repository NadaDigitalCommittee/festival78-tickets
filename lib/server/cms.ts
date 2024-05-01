import { createClient } from "microcms-js-sdk";
import { convertEvent } from "../converEvent";
import type { Event } from "../types";

const client = createClient({
  apiKey: process.env.MICROCMS_API_KEY,
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
});

type TimeSchema = {
  hour: number;
  minute: number;
};

export type EventSchema = {
  number: number;
  name: string;
  capacity: number;
  description: string;
  place: string;
  start: TimeSchema[];
  end: TimeSchema[];
  image: {
    url: string;
    width: number;
    height: number;
  };
  onlyParticipants?: boolean;
};

type NewsSchema = {
  title: string;
  body: string;
  isEmergency: boolean;
  compactBody: string;
};

export async function getEvents(): Promise<Event[]> {
  const data = await getEventsFromCMS();
  return data.map(convertEvent);
}

export async function getEventsFromCMS() {
  const res = (
    await client.getList<EventSchema>({
      endpoint: "events",
      queries:{
        limit: 20,
      },
      customRequestInit: {
        next: {
          revalidate: 60 * 5,
        },
      },
    })
  ).contents;
  return res.sort((a, b) => a.number - b.number);
}

export async function getNews() {
  const res = await client.getList<NewsSchema>({
    endpoint: "news",
    customRequestInit: {
      next: {
        revalidate: 60,
      },
    },
  });
  return res.contents;
}
