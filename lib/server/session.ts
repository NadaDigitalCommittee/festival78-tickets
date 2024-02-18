import { cookies } from "next/headers";
import { z } from "zod";
import { Session } from "../types";
import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();
const privateKey = process.env.JWTSECRET;
const secret = encoder.encode(privateKey);

export async function validateSession(_token?:string): Promise<Session | undefined> {
  const token = _token|| cookies().get("token")?.value;
  if (cookies().get("admin")?.value === process.env.ADMIN_SECRET) {
    return {
      uuid: "",
      email: "",
      admin: true,
    };
  }
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
      return {
        ...parse.data,
        admin: false,
      };
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

export async function generateSession(
  uuid: string,
  email: string
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
