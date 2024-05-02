import { Transporter, createTransport } from "nodemailer";

export const users = process.env.GOOGLE_USERS?.split(",");
const refreshTokens = process.env.GOOGLE_REFRESH_TOKENS?.split(",");

export const transports:Transporter[] = [];

for (let i = 0; i < users.length; i++) {
  transports.push(create(users[i], refreshTokens?.at(i))??"");
}


function create(user: string, refreshToken: string) {
  return createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: user,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: refreshToken,
    },
  });
}
