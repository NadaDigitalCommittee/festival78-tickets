import { Time } from "@/lib/time";
import { FC } from "react";
import styles from "@/styles/layout.module.scss"
import Image from "next/image";
type Props = {
    raffleId?: string;
    eventName?: string;
    eventTime?: string;
}
export const Certification: FC<Props> = ({ raffleId, eventName, eventTime }) => {
    return (
        <div className={`w-[260px] h-[160px] shadow-lg mx-auto ${styles.bg} rounded-lg relative overflow-hidden`}>
            <div className="z-10 absolute w-full">
                <p className="text-center text-2xl">{eventName}</p>
                <p className="text-center">{eventTime}</p>
                <p className="font-avianosans text-5xl text-[rgb(255,210,155)]">ODYSSEY</p>
                <p className="text-4xl text-center">{raffleId}</p>
            </div>
            <Image className="absolute rotate-[10deg] -translate-y-[50px] translate-x-[100px] scale-[120%]" src="/img/LOGO.svg" height={300} width={300} alt="aa" />
        </div>
    )
}