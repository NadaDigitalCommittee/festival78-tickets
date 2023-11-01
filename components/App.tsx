"use client";
import { ApiResultResponse, Session } from "@/lib/types";
import { Raffle } from "@prisma/client";
import { FC, createContext, useState } from "react";
import useSWR from "swr";
//import { EventTable } from "./ui/EventTable";
import { Menu } from "./app/Menu";
import { MdHome, MdOutlineArticle } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

type Props = {
  session: Session
};

export const RaffleResultContext = createContext<Raffle[] | undefined>(
  undefined
);

export type State = "Home" | "Settings" | "Ticket";

type A = ReturnType<typeof setTimeout>

export const App: FC<Props> = ({ session }) => {
  const { data: result } = useSWR<ApiResultResponse>(`/result`, {
    refreshInterval: 1 * 60 * 1000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const [state, setState] = useState<State>("Home");

  return (
    <div className={"w-full h-screen px-3"}>
      <h1>{session.email}さんようこそ</h1>

      {/* <RaffleResultContext.Provider value={result?.raffle}>
        <div className={result ? "" : " pointer-events-none"}>
          <EventTable />
        </div>
      </RaffleResultContext.Provider> */}
      <div className="flex gap-3"><Menu state={"Ticket"} setState={setState} icon={MdOutlineArticle} />
        <Menu state={"Settings"} setState={setState} icon={IoSettingsOutline} />
        <Menu state={"Home"} setState={setState} icon={MdHome} />[
      </div>


    </div>
  );
};

