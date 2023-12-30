import { createClient } from "microcms-js-sdk";
import { Time } from "./time";
import type { Event } from "./types";

const client = createClient({
  apiKey: process.env.MICROCMS_API_KEY,
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
});

type TimeSchema = {
  hour: number;
  minute: number;
};

type EventSchema = {
  number: number;
  name: string;
  capacity: number;
  description: string;
  place: string;
  start: TimeSchema[];
  end: TimeSchema[];
};

export async function getEvents(): Promise<Event[]> {
  const res = await client.getList<EventSchema>({
    endpoint: "events",
    customRequestInit: {
      next: {
        revalidate: 60,
      },
    },
  });
  return res.contents
    .map((content) => {
      const time: Time[] = [];
      for (let i = 0; i < content.start.length; i++) {
        time.push(
          new Time(
            content.start[i].hour,
            content.start[i].minute,
            content.end[i].hour,
            content.end[i].minute,
          ),
        );
      }
      return {
        id: content.number,
        name: content.name,
        capacity: content.capacity,
        description: content.description,
        place: content.place,
        time: time,
      };
    })
    .sort((a, b) => a.id - b.id);
}
