import { render } from "@react-email/render";
import { Tailwind } from "@react-email/tailwind";
import { ReactNode } from "react";
import { transports, users } from "./transports";
import { getTransportId } from "./getTransportId";

export async function sendMail(uuid:string,body: ReactNode, subject: string, to: string) {
  const data = render(<Tailwind>{body}</Tailwind>);
  const transportId=getTransportId(uuid);
  return transports.at(transportId)?.sendMail({
    from: {
      address: users?.at(transportId)??"",
      name: "灘校文化祭 抽選システム",
    },
    to: to,
    subject: subject,
    html: data,
  });
}