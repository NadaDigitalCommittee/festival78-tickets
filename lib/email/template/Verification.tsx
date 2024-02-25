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
import { ja } from "@/lib/lang/ja";

type Props = {
  url: string;
};

const VerficationTokenEmail: FC<Props> = ({ url }) => {
  return (
    <Html lang="ja">
      <Head>
        <title>{ja.email.verfication.title_head}</title>
      </Head>
      <Body>
        <Container className="max-w-[360px]">
          <Img
            src={`${process.env.HOST}/img/logo3_sm.png`}
            width={400}
            height={400}
          />
          <Text>{ja.email.verfication.body}</Text>
          <Container
            className="border-b-[1px] border-[#FF9209] text-center"
            width={400}
          >
            <Text>{ja.word.verification_url}</Text>
            <Text>
              <Link href={url}>
                {url.length > 50 ? `${url.slice(0, 50)}...` : url}
              </Link>
            </Text>
          </Container>
        </Container>
        <Footer />
      </Body>
    </Html>
  );
};

export const sendVerficationTokenEmail = async (to: string, token: string) => {
  await sendMail(
    VerficationTokenEmail({
      url: `${process.env.HOST}/verify?token=${token}`,
    }),
    ja.email.verfication.title,
    to
  );
};
