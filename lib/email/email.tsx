import { render } from "@react-email/render";
import { Tailwind } from "@react-email/tailwind";
import { ReactNode } from "react";
import { transports, users } from "./transports";

export async function sendMail(transportId:number,body: ReactNode, subject: string, to: string) {
  const data = render(<Tailwind>{body}</Tailwind>);
  return transports.at(transportId)?.sendMail({
    from: {
      address: users.at(transportId)??"",
      name: "灘校文化祭 抽選システム",
    },
    to: to,
    subject: subject,
    html: data,
  });
}