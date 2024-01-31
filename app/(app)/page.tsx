"use client";
// import { TicketCardGallery } from "@/components/TicketCard";
import { SessionContext } from "@/lib/context";
import { useContext } from "react";
//import { EventTable } from "./ui/EventTable";

export default function App() {
  const user = useContext(SessionContext);
  return (
    <div className={"h-screen w-full px-3"}>
      <h1>{user?.email}さんようこそ</h1>
      {/* <TicketCardGallery /> */}
      {/* <RaffleResultContext.Provider value={result?.raffle}>
        <div className={result ? "" : " pointer-events-none"}>
          <EventTable />
        </div>
      </RaffleResultContext.Provider> */}
    </div>
  );
}
