"use client";
import { ApiResultResponse, ApiUserResponse } from "@/lib/types";
import { Raffle } from "@prisma/client";
import { FC, createContext, useState } from "react";
import useSWR from "swr";
import useSWRImmutable from "swr/immutable";
//import { EventTable } from "./ui/EventTable";
import { Menu } from "./app/Menu";

type Props = {};

export const RaffleResultContext = createContext<Raffle[] | undefined>(
  undefined
);

export type State = "Home" | "Settings" | "Ticket";

type A=ReturnType<typeof setTimeout>

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
    <div className={"w-full h-screen"}>
      <><h1>{user ? user.email : ""}さんようこそ</h1>

        {/* <RaffleResultContext.Provider value={result?.raffle}>
        <div className={result ? "" : " pointer-events-none"}>
          <EventTable />
        </div>
      </RaffleResultContext.Provider> */}
        <div className=" h-[1800px]">a</div>
      </>
      <Menu state={state} setState={setState} className="fixed inset-x-0 bottom-0" />
    </div>
  );
};
