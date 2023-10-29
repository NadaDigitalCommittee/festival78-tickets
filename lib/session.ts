import { sign, verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { z } from "zod";

export async function validateUUID(): Promise<string | undefined> {
  const token = cookies().get("token")?.value;
  if (!token) {
    return undefined;
  }

  let result: { ok: boolean; uuid: string } = { ok: false, uuid: "" };
  verify(token, process.env.JWTSECRET ?? "", (e, decoded: any) => {
    if (!e) {
      const scheme = z.string();
      const parse = scheme.safeParse(decoded.uuid);
      if (parse.success) {
        result = {
          ok: true,
          uuid: parse.data,
        };
      }
    }
  });

  if (!result.ok) {
    return undefined;
  }

  const uuid = z.string().uuid().safeParse(result.uuid);
  if (!uuid.success) {
    return undefined;
  }

  return uuid.data;
}

export async function generateUUID(uuid: string) {
  cookies().set(
    "token",
    sign({ uuid: uuid }, process.env.JWTSECRET ?? "", {
      expiresIn: "2 days",
    }),
    {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    },
  );
}
