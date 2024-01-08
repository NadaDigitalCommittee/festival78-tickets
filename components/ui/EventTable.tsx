//書き直す(デザイン待ち)
//・スケルトンローディング

// "use client";

// import { isDev } from "@/lib/constants";
// import { useEvents, useRaffles } from "@/lib/hooks";
// import { Time } from "@/lib/time";
// import { ApiRaffleResponse, Event } from "@/lib/types";
// import { Result } from "@prisma/client";
// import { FC, useEffect, useRef, useState } from "react";
// import { mutate } from "swr";

// type EventBoxProps = {
//   time: Time;
//   eventId: number;
//   timeId: number;
// };

// const unit = 70;

// export const EventBox: FC<EventBoxProps> = ({ time, eventId, timeId }) => {
//   const { events } = useEvents();
//   const startHours =
//     (time.start.getHours() * 60 + time.start.getMinutes()) / 60 - 10;
//   const periodHours = time.periodMinutes / 60;
//   const [showDialog, setShowDialog] = useState(false);
//   const ref = useRef<HTMLDivElement>(null);
//   const { raffles } = useRaffles();
//   const [result, setResult] = useState<Result | undefined>(undefined);
//   useEffect(() => {
//     setResult(
//       raffles?.find((e) => e.eventId === eventId && e.timeId === timeId)
//         ?.result,
//     );
//   }, [raffles]); // eslint-disable-line react-hooks/exhaustive-deps
//   useEffect(() => {
//     window.addEventListener("click", (e) => {
//       if (e.target === ref.current) setShowDialog(false);
//     });
//   }, []);
//   const isTimeOut = isDev
//     ? false
//     : time.end.getTime() < Time.nowJST().getTime();

//   const times= raffles
//     ?.filter((e) => {
//       return e.result !== Result.LOSE;
//     })
//     .map((e2) => {
//       return events[e2.eventId].time[e2.timeId];
//     });
//   const isConflict = times ? Time.isConflict(time, ...times) : false;
//   return (
//     <>
//       <div
//         className={
//           "absolute line-clamp-1  rounded-md w-[120px]" +
//           (result === Result.LOSE
//             ? " bg-red-200"
//             : result === Result.WIN
//               ? " bg-green-200"
//               : result === Result.PROCESSING
//                 ? " bg-yellow-200"
//                 : isTimeOut || isConflict
//                   ? " bg-gray-200"
//                   : " bg-blue-200")
//         }
//         style={{
//           top: 30 + Math.floor(startHours * unit),
//           height: Math.floor(periodHours * unit),
//         }}
//         onClick={() => {
//           if (isTimeOut) return;
//           if (isConflict) return;
//           setShowDialog(true);
//         }}
//       >
//         <p>{time.toPeriodString()}</p>
//         <p>
//           {result === Result.LOSE
//             ? "落選"
//             : result === Result.WIN
//               ? "当選"
//               : result === Result.PROCESSING
//                 ? "抽選中"
//                 : isTimeOut
//                   ? "募集終了"
//                   : isConflict
//                     ? "重複"
//                     : "受付中"}
//         </p>
//       </div>
//       {showDialog && !result && (
//         <div
//           className="inset-0 bg-slate-500 top-0 left-0 fixed z-50 bg-opacity-50"
//           ref={ref}
//         >
//           <RaffleDialog
//             eventId={eventId}
//             timeId={timeId}
//             onSubmitted={(res) => {
//               raffles?.push({
//                 eventId: eventId,
//                 timeId: timeId,
//                 result: Result.PROCESSING,
//                 uuid: res.uuid,
//                 participants: res.participants,
//                 userId: res.userId,
//               });
//               mutate("/api/result");
//               setShowDialog(false);
//             }}
//           />
//         </div>
//       )}
//     </>
//   );
// };

// type EventTableProps = {};

// export const EventTable: FC<EventTableProps> = () => {
//   return (
//     <div className="flex flex-row min-w-min">
//       {EVENTS.map((e, i) => (
//         <EventColumn data={e} key={i} />
//       ))}
//     </div>
//   );
// };

// type EventColumnProps = {
//   data: Event;
// };

// export const EventColumn: FC<EventColumnProps> = ({ data }) => {
//   return (
//     <div className="flex flex-col w-[120px] relative text-center">
//       <p>{data.name}</p>
//       {data.time.map((e, i) => (
//         <EventBox time={e} eventId={data.id} timeId={i} key={i} />
//       ))}
//     </div>
//   );
// };

// type RaffleDialogProps = {
//   eventId: number;
//   timeId: number;
//   onSubmitted?: (res: ApiRaffleResponse) => void;
// };

// export const RaffleDialog: FC<RaffleDialogProps> = ({
//   eventId,
//   timeId,
//   onSubmitted,
// }) => {
//   const event = EVENTS[eventId];
//   const [participants, setParticipants] = useState(1);
//   const [isConflict, setIsConflict] = useState(false);
//   const { raffles } = useRaffles();
//   const times = raffles
//     ?.map((e) => {
//       return EVENTS[e.eventId].time[e.timeId];
//     })
//     .filter(() => {
//       const r = raffles.find(
//         (e) => e.eventId === eventId && e.timeId === timeId,
//       )?.result;
//       if (!r) return true;
//       return r !== Result.WIN;
//     });
//   const time = EVENTS[eventId].time[timeId];

//   return (
//     <div className="w-[500px] h-[500px] mx-auto my-auto bg-white rounded-md ">
//       <p>参加しますか？</p>
//       <p>イベント:{event.name}</p>
//       <p>時間:{event.time[timeId].toPeriodString()}</p>
//       <div>
//         <p className="text-red-500">この操作は取り消せません。</p>
//         <p>人数を選択してください。</p>
//         <select
//           name="人数"
//           id="participants"
//           onChange={(e) => {
//             setParticipants(e.target.value as unknown as number);
//           }}
//         >
//           <option value="1">1人</option>
//           <option value="2">2人</option>
//           <option value="3">3人</option>
//           <option value="4">4人</option>
//         </select>
//         <button
//           onClick={async () => {
//             const res = await fetch(`/api/raffle`, {
//               method: "POST",
//               body: JSON.stringify({
//                 eventId: eventId,
//                 timeId: timeId,
//                 participants: participants,
//               }),
//             });
//             if (res.status === 409) {
//               setIsConflict(true);
//               return;
//             }
//             onSubmitted?.(await res.json());
//           }}
//         >
//           確定
//         </button>
//       </div>
//       {isConflict && (
//         <p className="text-red-500">登録できるのは一回だけです。</p>
//       )}
//     </div>
//   );
// };
