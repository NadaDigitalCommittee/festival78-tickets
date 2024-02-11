"use client";
import { useEvents } from "@/lib/client/hooks";
import { useToast } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

export const Form: FC = () => {
  const { events } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<number>(0);
  const [selectedTimeId, setSelectedTimeId] = useState<number>(0);
  const [participants, setParticipants] = useState<number>(1);
  const [raffleMessage, setRaffleMessage] = useState("");
  const toast = useToast();

  const requestRaffle = async () => {
    const res = await fetch("/api/raffle", {
      method: "POST",
      body: JSON.stringify({
        eventId: events?.at(selectedEvent)?.id,
        timeId: selectedTimeId,
        participants: participants,
      }),
    });
    const data = await res.json();
    setRaffleMessage(data.message);
    if (!data.ok) {
      toast({
        title: "エラー",
        description: res.status === 409 ? "すでに抽選済みです" : data.message,
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="mt-2 w-full">
      <div className="flex flex-col gap-4">
        <p>企画名</p>
        <select
          className="w-full rounded-lg border"
          onChange={(e) => {
            setSelectedEvent(e.target.selectedIndex);
            setSelectedTimeId(0);
          }}
        >
          {events?.map((e, i) => (
            <option key={i} value={e.name}>
              {e.name}
            </option>
          ))}
        </select>
        <p>時間帯</p>
        <select
          className="w-full rounded-lg border"
          onChange={(e) => {
            setSelectedTimeId(e.target.selectedIndex);
          }}
        >
          {events?.[selectedEvent]?.time
            .map((t) => t.toPeriodString())
            .map((s, i) => (
              <option value={s} key={i}>
                {s}
              </option>
            ))}
        </select>
        <p>参加人数</p>
        <select
          className="w-full rounded-lg border"
          onChange={(e) => {
            setParticipants(e.target.selectedIndex + 1);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
        <button
          onClick={() => {
            requestRaffle();
          }}
          className=" w-full rounded-lg bg-theme p-2 text-white"
        >
          抽選する
        </button>
        <p>{raffleMessage}</p>
      </div>
    </div>
  );
};
