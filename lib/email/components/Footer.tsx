import { ja } from "@/lib/lang/ja";
import { Container, Link, Text } from "@react-email/components";
import { FC } from "react";

export const Footer: FC = () => {
  return (
    <Container className="bg-gray-100 py-3 text-gray-500">
      <Text className="text-center">{ja.email.footer.text1}</Text>
      <Text className="text-center">{ja.email.footer.text2}</Text>
      <Text className="text-center">
        <Link
          className="text-center"
          href={`${process.env.HOST}/settings`}
        >{`${process.env.HOST}/settings`}</Link>{" "}
      </Text>
    </Container>
  );
};
