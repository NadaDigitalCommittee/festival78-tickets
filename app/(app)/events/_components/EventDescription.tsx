import { Event } from "@/lib/types";
import { FC } from "react";
import Image from "next/image";

type Props = {
  event: Event;
};

export const EventDescription: FC<Props> = ({ event }) => {
  return (
    <div className="my-6 w-full rounded-md border border-theme p-2">
      <h1 className="mb-2 text-center text-xl font-bold">{event.name}</h1>
      <div className="mx-2 flex justify-center">
        {event.image && (
          <Image
            src={event.image.url}
            width={event.image.width}
            height={event.image.height}
            alt={event.name}
          />
        )}
      </div>
      <div className="mx-2 my-4 flex flex-col gap-1">
        <p className="font-bold">企画内容</p>
        <p className="mx-2">{event.description}</p>
        <div className="flex">
          <div className="mr-3">
            <h2 className="font-bold">会場</h2>
            <p className="mx-2">{event.location}</p>
            <h2 className="font-bold">時間帯</h2>
            <p className="mx-2">
              {event.time.map((time, i) => (
                <span key={i}>
                  {time.toPeriodString()}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div>
            <h2 className="font-bold">定員</h2>
            <p className="mx-2">{event.capacity}人</p>
            <h2 className="font-bold">定員方式</h2>
            <p className="mx-2">
              {event.onlyParticipants
                ? "実際に企画に参加する方のみ定員の人数に含めてください。つまり、保護者の数を参加者数に含めない上で保護者が立ち見をすることは可能です。"
                : "実際に企画に参加するかどうかにかかわらず、会場に入る人の数を定員とします。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
