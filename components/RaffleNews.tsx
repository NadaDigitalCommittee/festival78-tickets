import { Event } from "@/lib/types";
import { Raffle, Result } from "@prisma/client";
import { FC } from "react";

type Props = {
  raffle: Raffle;
  event?: Event;
};

export const RaffleNews: FC<Props> = ({ raffle, event }) => {
  const eventName = event?.name;
  const period = event?.time.at(raffle.timeId)?.toPeriodString();
  if (raffle.result === Result.WIN) {
    return (
      <>
        <p>
          この度は、抽選システムをご利用いただき誠に有難うございます。見事当選されましたことをご報告致します。
        </p>
        <h2>企画概要</h2>
        <p>企画名: {eventName}</p>
        <p>時間帯: {period}</p>
        <h2>注意事項</h2>
        <p>
          当選番号は
          <a
            href={`/certifications?eventId=${raffle.eventId}&timeId=${raffle.timeId}`}
          >
            こちらのページ
          </a>
          から確認することができます。
        </p>
        <p>
          企画に参加される場合は当選番号が必要です。入場前にスタッフから確認がありますので、上記のページをスマホで開いた上でご提示ください。
        </p>
      </>
    );
  } else {
    return (
      <>
        <p>この度は、抽選システムをご利用いただき有難うございます。</p>
        <p>
          厳正なる抽選の結果、誠に残念ながら今回はご希望に添えず、落選となりましたことをご報告いたします。
        </p>
        <h2>企画概要</h2>
        <p>企画名: {eventName}</p>
        <p>時間帯: {period}</p>
      </>
    );
  }
};
