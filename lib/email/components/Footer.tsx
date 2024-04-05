import { Container, Link, Text } from "@react-email/components";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <Container className="bg-gray-100 py-3 text-gray-500">
      <Text className="text-center">
        このメールは灘校生徒会によって作成されたものであり、送信者の同意を得た上で送信しています。
      </Text>
      <Text className="text-center">
        メールの配信停止をする場合は下記のURLに従ってください。
      </Text>
      <Text className="text-center">
        <Link
          className="text-center"
          href={`${process.env.HOST}/settings`}
        >{`${process.env.HOST}/settings`}</Link>{" "}
      </Text>
    </Container>
  );
};
