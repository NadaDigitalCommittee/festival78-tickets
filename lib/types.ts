import { Raffle } from "@prisma/client";
import { Time } from "./time";

export type Event = {
  id: number;
  name: string;
  description?: string;
  time: Time[];
  location?: string;
  image?: string;
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
};
