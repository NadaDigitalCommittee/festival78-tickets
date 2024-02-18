import styles from "@/styles/layout.module.scss";
import Image from "next/image";
import { FC } from "react";
type Props = {
  raffleId?: string;
  eventName?: string;
  eventTime?: string;
};
export const Certification: FC<Props> = ({
  raffleId,
  eventName,
  eventTime,
}) => {
  return (
    <div
      className={`mx-auto h-[160px] w-[260px] shadow-lg ${styles.bg} relative overflow-hidden rounded-lg`}
    >
      <div className="absolute z-10 w-full">
        <p className="text-center text-2xl">{eventName}</p>
        <p className="text-center">{eventTime}</p>
        <p className="text-center font-avianosans text-5xl text-[rgb(255,210,155)]">
          ODYSSEY
        </p>
        <p className="text-center text-4xl">{raffleId}</p>
      </div>
      <Image
        className="absolute -translate-y-[50px] translate-x-[100px] rotate-[10deg] scale-[120%]"
        src="/img/svg/logo.svg"
        height={300}
        width={300}
        alt="aa"
      />
    </div>
  );
};
