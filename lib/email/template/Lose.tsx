import { FC } from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Img,
} from "@react-email/components";
import { Footer } from "../components/Footer";
import { sendMail } from "../email";

type Props = {
  eventName: string;
  period: string;
};

const Lose: FC<Props> = ({ eventName, period }) => {
  return (
    <Html lang="ja">
      <Head>
        <title>落選通知</title>
      </Head>
      <Body>
        <Container className="max-w-[360px]">
          <Img
            src={`${process.env.HOST}/img/logo3_sm.png`}
            width={400}
            height={400}
          />
          <Text>
            この度は、抽選システムをご利用いただき誠に有難うございます。厳正なる抽選の結果、誠に残念ながら今回はご希望に添えず、落選となりましたことをご報告いたします。
          </Text>
          <Text className="text-xl font-bold">企画概要</Text>
          <Text>企画名: {eventName}</Text>
          <Text>時間帯: {period}</Text>
        </Container>
        <Footer />
      </Body>
    </Html>
  );
};

export const sendLoseEmail = async (
  to: string,
  eventName: string,
  period: string
) => {
  await sendMail(
    <Lose eventName={eventName} period={period} />,
    "抽選結果のお知らせ",
    to
  );
};
