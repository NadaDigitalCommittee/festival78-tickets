import { Raffle } from "@prisma/client";
import { Time } from "./time";
import { EventSchema } from "./cms";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";

export type Event = {
  id: number;
  name: string;
  description?: string;
  time: Time[];
  location?: string;
  image?: string;
  capacity: number;
};

export type Api<T = undefined> =
  | ({
      ok: true;
    } & (T extends undefined ? {} : { data: T }))
  | {
      ok: false;
    };

export type ApiLoginResponse = undefined;

export type ApiRaffleResponse = Raffle;

export type ApiRegisterResponse = undefined;

export type ApiResultResponse = {
  raffle?: Raffle[];
};

export type ApiUserResponse = {
  email: string;
  uuid: string;
};

export type ApiUserPutResponse = {};

export type ApiNewsResponse = {
  news: News[];
};

export type News = {
  id: string;
  title: string;
  body: string;
  compactBody: string;
  type: NewsType;
};
export type NewsType = "information" | "emergency" | "win" | "lose";

export type ApiEventsResponse = {
  events: Array<EventSchema & MicroCMSContentId & MicroCMSDate>;
};

export type Session = {
  uuid: string;
  email: string;
};
