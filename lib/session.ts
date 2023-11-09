import { cookies } from "next/headers";
import { z } from "zod";
import { Session } from "./types";
import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();
const privateKey =
  process.env.JWTSECRET ??(()=>{console.error("JWTSECRET not set");return ""})()
const secret = encoder.encode(privateKey);

export async function validateSession(): Promise<Session | undefined> {
  const token = cookies().get("token")?.value;
  if (!token) {
    return undefined;
  }
  const scheme = z.object({
    uuid: z.string(),
    email: z.string(),
  });
  try {
    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });
    const parse = scheme.safeParse(payload);
    if (!parse.success) {
      return undefined;
    } else {
      return parse.data;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function generateSession(
  uuid: string,
  email: string,
): Promise<string> {
  const jwt = await new SignJWT({
    uuid,
    email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("2d")
    .sign(secret);
  return jwt;
}
