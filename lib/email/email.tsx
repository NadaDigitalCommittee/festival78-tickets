import { render } from "@react-email/render";
import { Tailwind } from "@react-email/tailwind";
import { createTransport } from "nodemailer";
import { ReactNode } from "react";
import { ja } from "@/lib/lang/ja";

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

export async function sendMail(body: ReactNode, subject: string, to: string) {
  const data = render(<Tailwind>{body}</Tailwind>);
  return transporter.sendMail({
    from: {
      address: process.env.GOOGLE_USER,
      name: ja.email.name,
    },
    to: to,
    subject: subject,
    html: data,
  });
}
