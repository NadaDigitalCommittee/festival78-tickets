import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Text,
} from "@react-email/components";
import { FC } from "react";
import { Footer } from "../components/Footer";
import { sendMail } from "../email";

type Props = {
  url: string;
};

const VerficationTokenEmail: FC<Props> = ({ url }) => {
  return (
    <Html lang="ja">
      <Head>
        <title>本人確認のお知らせ</title>
      </Head>
      <Body>
        <Container className="max-w-[360px]">
          <Img
            src={`${process.env.HOST}/img/logo3_sm.png`}
            width={400}
            height={400}
          />
          <Text>
            この度は、灘校文化祭 抽選券システムをご利用頂き有難うございます。
            当システムは本人確認のためにメールアドレスでの認証を行っております。
            以下の認証URLにて、本人確認を完了させてください。
            また不明な点がございましたら、近くの文化委員までお問い合わせください。
          </Text>
          <Container
            className="border-b-[1px] border-[#FF9209] text-center"
            width={400}
          >
            <Text>認証URL</Text>
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
    "【第78回灘校文化祭】本人確認メール",
    to
  );
};
