"use client";
import { useEvents, useRaffles } from "@/lib/client/hooks";
import { Time } from "@/lib/time";
import { Event } from "@/lib/types";
import { Raffle, Result } from "@prisma/client";
import Link from "next/link";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const ResultContext = createContext<Raffle[] | undefined>(undefined);
const EventContext = createContext<Event[] | undefined>(undefined);

export const Timetable: FC = () => {
  const { events } = useEvents();
  const { raffles } = useRaffles();

  return (
    <>
      <div>
        <p>
          ・企画の<b>開始30分前</b>に登録を済ませてください。ただし、「トイブロックで灘校机椅子を制作体験」の企画に関しては<b>開始45分前</b>に登録を済ませてください。
        </p>
        <p className="font-bold">
          ・同じ時間帯の企画を登録することはできません。
        </p>
        <p>
          ・開始時刻が9:25以前の場合、<b>抽選券は不要です。</b>
          そのまま会場にお向かいください。
        </p>
      </div>
      <div className="sticky top-0 z-50">
        <div className="grid grid-cols-4 gap-2 bg-white pt-2">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-gray-200"></div>
            <p className="ml-2">終了</p>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-amber-300"></div>
            <p className="ml-2">被り</p>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-green-300"></div>
            <p className="ml-2">当選</p>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-red-300"></div>
            <p className="ml-2">落選</p>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-purple-300"></div>
            <div>
              <p className="ml-2">抽選</p>
              <p className="ml-2">中</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-cyan-200"></div>
            <div>
              <p className="ml-2">抽選</p>
              <p className="ml-2">可</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-orange-200"></div>
            <div>
              <p className="ml-2">抽選</p>
              <p className="ml-2">不要</p>
            </div>
          </div>
        </div>
        <div className="h-6 w-20 bg-white"></div>
      </div>

      <div className="relative flex h-[930px] ">
        <EventColumn events={events} />
        <BaseTimetable>
          <ResultContext.Provider value={raffles}>
            <EventContext.Provider value={events}>
              {events?.map((event) => {
                return event.time.map((_, i) => {
                  return (
                    <Cell
                      event={event}
                      eventId={event.id}
                      timeId={i}
                      key={i + event.id}
                      ratio={event.ratio[i]}
                    />
                  );
                });
              })}
            </EventContext.Provider>
          </ResultContext.Provider>
        </BaseTimetable>
      </div>
    </>
  );
};

const BaseTimetable: FC<{ children?: ReactNode }> = ({ children }) => {
  const now = Time.nowJST();
  const dayStart = new Time(9, 0, 9, 0);
  const period = (now.getTime() - dayStart.start.getTime()) / (60 * 1000);
  const end = period < 0 || period > 360;
  const ref = useRef<HTMLDivElement>(null);
  const [yoffset, setYoffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      const e = ref.current?.parentElement;
      const top = e?.getBoundingClientRect().top || 0;
      const a = top + window.scrollY - 83.8;
      const offset = window.scrollY - a;
      window.scrollY > a ? setYoffset(offset) : setYoffset(0);
    };
  }, []);
  return (
    <div
      className="relative z-0 h-full w-[1200px] overflow-y-clip overflow-x-scroll"
      ref={ref}
    >
      <div
        className={`left-0 z-10 flex w-full bg-white`}
        style={{
          transform: `translateY(${yoffset}px)`,
        }}
      >
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="relative min-w-[120px] bg-white">
              <p className="text-center text-xl font-bold">{i + 9}</p>
              <div className="absolute h-[164px] min-w-[120px] -translate-y-[192px] bg-white"></div>
            </div>
          ))}
      </div>
      <div className="relative -z-20 flex">
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-[870px] min-w-[120px]">
              <div className="flex h-full w-full">
                <div className="h-full w-1/2 border-r"></div>
                <div className="h-full w-1/2 border-r"></div>
              </div>
              <p className="text-center text-xl font-bold">{i + 9}</p>
            </div>
          ))}
        {!end && (
          <div
            className="absolute -top-8"
            style={{
              left: 60 + period * 2,
            }}
          >
            <div className="h-[900px] w-1 border-l-2 border-dotted border-theme">
              <p className="mt-8 min-w-20 -translate-x-[50%] text-center text-theme">
                現在時刻
              </p>
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

const EventColumn: FC<{ events?: Event[] }> = ({ events }) => {
  return (
    <div className="relative -z-10 mt-[60px] flex flex-col gap-2 bg-white">
      {events?.map((event, i) => (
        <div key={i} className="flex gap-2">
          <div className="flex h-28 w-20 justify-center rounded bg-theme">
            <p className="my-auto text-center text-sm font-bold text-white">
              {event.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

type CellProps = {
  event: Event;
  eventId: number;
  timeId: number;
  ratio:number;
};

const Cell: FC<CellProps> = ({ event, eventId, timeId,ratio }) => {
  const time = event.time[timeId];
  const raffles = useContext(ResultContext);
  const events = useContext(EventContext);
  function calcStyle() {
    const bairituX = 2;
    const bairituY = 120;
    const baseX = 60;
    const baseY = 60;
    const dayStart = new Time(9, 0, 9, 0);
    const sa = (time.start.getTime() - dayStart.start.getTime()) / (1000 * 60);
    const period = (time.end.getTime() - time.start.getTime()) / (1000 * 60);
    const top = baseY + eventId * bairituY;
    const left = baseX + sa * bairituX;
    const width = period * bairituX;
    const height = 112;
    return { top, left, width, height };
  }

  function getState() {
    const raffleStart = new Time(9, 30, 0, 0).start;
    if (time.start.getTime() - raffleStart.getTime() < 0) {
      return "noraffle";
    }

    const raffle = raffles?.find(
      (r) => r.eventId === eventId && r.timeId === timeId
    );
    if (raffle) {
      if (raffle.result === Result.WIN) {
        return "win";
      }
      if (raffle.result === Result.LOSE) {
        return "lose";
      }
      if (raffle.result === Result.PROCESSING) {
        return "processing";
      }
    }

    const timeArray = raffles?.map((raffle) =>
      events?.at(raffle.eventId)?.time.at(raffle.timeId)
    );
    if (timeArray && Time.isConflict(...timeArray, time)) {
      return "conflict";
    }

    const now = Time.nowJST();
    if (time.start.getTime() - now.getTime() <= 31 * 60 * 1000) {
      return "end";
    }
    return "ok";
  }

  const { top, left, width, height } = calcStyle();
  const state = getState();

  return (
    <div
      className={`absolute -z-10 rounded-2xl text-center ${
        state === "win"
          ? "bg-green-300"
          : state === "lose"
            ? "bg-red-300"
            : state === "processing"
              ? "bg-purple-300"
              : state === "conflict"
                ? "bg-amber-300"
                : state === "end"
                  ? "bg-gray-200"
                  : state === "noraffle"
                    ? "bg-orange-200"
                    : "bg-cyan-200"
      }`}
      style={{
        top: top,
        left: left,
        width: width,
        height: height,
      }}
    >
      <p className="mt-1">{time.toStartString()}</p>
      <p>～</p>
      <p>{time.toEndString()}</p>
      <p>{ratio}</p>
      <Link
        className="text-xs text-blue-500 underline"
        href={`/raffle?eventId=${eventId}&timeId=${timeId}`}
      >
        {state === "ok" && "登録する"}
      </Link>
    </div>
  );
};
