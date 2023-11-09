"use client"
import { ApiResultResponse, ApiUserResponse } from "@/lib/types";
import { Raffle } from "@prisma/client";
import { createContext } from "react";
import useSWR from "swr";
//import { EventTable } from "./ui/EventTable";

export const RaffleResultContext = createContext<Raffle[] | undefined>(
  undefined
);

export default function App() {
  const { data: result } = useSWR<ApiResultResponse>(`/result`, {
    refreshInterval: 1 * 60 * 1000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: user } = useSWR<ApiUserResponse>(`/user`, {
    refreshInterval: 1 * 60 * 1000,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return (
    <div className={"w-full h-screen px-3"}>
      <h1>{user && user.email}さんようこそ</h1>

      {/* <RaffleResultContext.Provider value={result?.raffle}>
        <div className={result ? "" : " pointer-events-none"}>
          <EventTable />
        </div>
      </RaffleResultContext.Provider> */}
      
    </div>
  );
};


