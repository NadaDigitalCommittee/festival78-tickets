import { FC } from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Img,
  Link,
} from "@react-email/components";
import { Footer } from "../components/Footer";
import { sendMail } from "../email";

type Props = {
  eventName: string;
  period: string;
  eventId: number;
  timeId: number;
};

const Win: FC<Props> = ({eventName,period,eventId,timeId}) => {
  const url=`${process.env.HOST}/certifications?eventId=${eventId}&timeId=${timeId}`
  return (
    <Html lang="ja">
      <Head>
        <title>当選通知</title>
      </Head>
      <Body>
        <Container className="max-w-[360px]">
          <Img
            src={`${process.env.HOST}/img/logo3_sm.png`}
            width={400}
            height={400}
          />
          <Text>
          この度は、抽選券システムをご利用いただき誠に有難うございます。見事当選されましたことをご報告致します。
          </Text>
          <Text className="font-bold text-xl">企画概要</Text>
          <Text>企画名: {eventName}</Text>
          <Text>時間帯: {period}</Text>
          <Text className="font-bold text-xl">注意事項</Text>
          <Text>企画に参加される場合は当選番号が必要です。入場前にスタッフから確認がありますので、以下のURLのページをスマホで開いた上でご提示ください。</Text>
          <Text><Link href={url}>{url}</Link></Text>
        </Container>
        <Footer />
      </Body>
    </Html>
  );
};

export const sendWinEmail=async(to:string,eventName:string,period:string,eventId:number,timeId:number)=>{
  await sendMail(
    <Win eventName={eventName} period={period} eventId={eventId} timeId={timeId}/>,
    "当選のお知らせ",
    to
  );
}