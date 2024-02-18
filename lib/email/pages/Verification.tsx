import { FC } from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Text,
  Img,
} from "@react-email/components";

type Props = {
  token: string;
};

export const VerficationTokenEmail: FC<Props> = ({ token }) => {
  return (
    <Html lang="ja">
      <Head>
        <title>登録コードのお知らせ</title>
      </Head>
      <Body>
        <Container width={"80%"}>
          <Img
            src="https://festival78-ticket.vercel.app/img/logo3_sm.png"
            width={800}
            height={800}
            style={{ fill: "#FF9209" }}
          />
          <Text>{token}</Text>
        </Container>
      </Body>
    </Html>
  );
};
