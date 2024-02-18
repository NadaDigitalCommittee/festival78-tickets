import { FC } from "react";
import { Html, Head, Body, Container, Text, Img } from "@react-email/components";

type Props = {
    token: string
}

export const VerficationTokenEmail: FC<Props> = ({ token }) => {
    return (
        <Html lang="ja">
            <Head>
                <title>登録コードのお知らせ</title>
            </Head>
            <Body>
                <Container width={"80%"}>
                    <Img src="https://festival78-ticket.vercel.app/img/LOGO.svg" width={100} height={100} style={{fill:"#FF9209"}}/>
                    <Text>{token}</Text>
                </Container>
            </Body>
        </Html>
    )
}