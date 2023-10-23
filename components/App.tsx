"use client";
import { ApiResultResponse, ApiUserResponse } from "@/lib/types";
import { Raffle } from "@prisma/client";
import { FC, createContext, useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
//import { EventTable } from "./ui/EventTable";
import { Menu } from "./app/Menu";
import { Button } from "./ui/Button";

type Props = {};

export const RaffleResultContext = createContext<Raffle[] | undefined>(
  undefined
);

export type State = "Home" | "Settings" | "Ticket";

export const App: FC<Props> = () => {
  const { data: user } = useSWRImmutable<ApiUserResponse>(`/user`);
  const { data: result } = useSWR<ApiResultResponse>(`/result`, {
    refreshInterval: 1 * 60 * 1000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [state, setState] = useState<State>("Home");

  return (
    <div className={"mt-3"}>
      <h1>{user ? user.email : ""}さんようこそ</h1>
      <Menu state={state} setState={setState} />
      {/* <RaffleResultContext.Provider value={result?.raffle}>
        <div className={result ? "" : " pointer-events-none"}>
          <EventTable />
        </div>
      </RaffleResultContext.Provider> */}
      <Button
          onClick={() => {
            setState("Ticket");
          }}
        >
          <p>チケット</p>
        </Button>
    </div>
  );
};
