import { render } from "@react-email/render";
import { Tailwind } from "@react-email/tailwind";
import { createTransport } from "nodemailer";
import { ReactElement } from "react";
import { VerficationTokenEmail } from "./pages/Verification";
const transporter = createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

export async function sendMail(
  body: ReactElement,
  subject: string,
  to: string
) {
  const data = render(<Tailwind>{body}</Tailwind>);
  return transporter.sendMail({
    from: {
      address: process.env.GOOGLE_USER,
      name: "灘校文化祭 抽選券システム",
    },
    to: to,
    subject: subject,
    html: data,
  });
}

sendMail((<VerficationTokenEmail token="123456"/>),"登録コードのお知らせ","hiromu.at@icloud.com")