import { Raffle } from "@prisma/client";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { EventSchema } from "./server/cms";
import { Time } from "./time";

export type Event = {
  id: number;
  name: string;
  description?: string;
  time: Time[];
  location?: string;
  image: {
    url: string;
    width: number;
    height: number;
  };
  capacity: number;
  onlyParticipants?: boolean;
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
  notification: boolean;
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
  events: Array<
    EventSchema & MicroCMSContentId & MicroCMSDate 
    // & { ratio: number[] }
  >;
};

export type Session = {
  uuid: string;
  email: string;
  admin: boolean;
};
