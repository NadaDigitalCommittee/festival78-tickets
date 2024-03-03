import { createClient } from "microcms-js-sdk";
import type { Event } from "../types";
import { convertEvent } from "../utils";

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
      customRequestInit: {
        next: {
          revalidate: 60,
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
