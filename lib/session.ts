import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";
import { Session } from "./types";

export async function validateSession(): Promise<Session | undefined> {
  const token = cookies().get("token")?.value;
  if (!token) {
    return undefined;
  }

  let result: { ok: boolean } & Session = { ok: false, uuid: "", email: "" };
  verify(token, process.env.JWTSECRET ?? "", (e, decoded: any) => {
    if (!e) {
      const scheme = z.object({
        uuid: z.string(),
        email: z.string(),
      });
      const parse = scheme.safeParse(decoded);
      if (parse.success) {
        result = {
          ok: true,
          ...parse.data,
        };
      }
    }
  });

  if (!result.ok) {
    return undefined;
  }

  return result;
}

export async function generateSession(uuid: string, email: string) {
  cookies().set(
    "token",
    sign({ uuid, email }, process.env.JWTSECRET ?? "", {
      expiresIn: "2 days",
    }),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    },
  );
}
