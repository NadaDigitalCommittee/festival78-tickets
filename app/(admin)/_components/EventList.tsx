import { extendCapacity } from "@/extension/raffleException";
import { Time } from "@/lib/time";
import type { Event } from "@/lib/types";
import { FC } from "react";

export const EventList: FC<{
  events?: Event[];
  raffleIds?: Map<string, string>;
  alreadyRaffled?: { eventId: number; timeId: number }[];
  remove:boolean;
}> = ({ events, raffleIds, alreadyRaffled ,remove}) => {
  return (
    <div className="mx-2">
      <p>企画一覧</p>
      <table className="my-3 w-max table-auto border border-gray-300 text-center">
        <thead>
          <tr className="divide-x divide-gray-300 ">
            <th>ID</th>
            <th>企画名</th>
            <th>時間帯</th>
            <th>定員</th>
            <th>抽選ID</th>
            <th>抽選</th>
          </tr>
        </thead>

        <tbody>
          {events?.map((e) => {
            return (
              <>
                {e.time.map((t, i) => {
                  const interval=(t.start.getTime()-Time.nowJST().getTime());
                  if ((!!alreadyRaffled?.find(
                    (b) => b.eventId === e.id && b.timeId === i
                  ))&&remove) {
                    return <></>
                  } else {
                    return <tr key={i} className="divide-x border-t border-gray-300">
                      <td className=" w-4">{e.id}</td>
                      <td className={`sm: w-32 md:w-48 ${(interval<30*60*1000&&interval>0)&&"bg-red-500"}`}>{e.name}</td>
                      <td className=" w-32"> {t.toPeriodString()} </td>
                      <td className="w-4">
                        {extendCapacity(e.id, i) ?? e.capacity}
                      </td>
                      <td className="w-12">
                        {raffleIds?.get(
                          JSON.stringify({
                            eventId: e.id,
                            timeId: i,
                          })
                        )}
                      </td>
                      <td>
                        {alreadyRaffled?.find(
                          (b) => b.eventId === e.id && b.timeId === i
                        )
                          ? "〇"
                          : "×"}
                      </td>
                    </tr>
                  }
                }
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
