// middleware.ts

import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { validateSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const dev = params.get("dev");

  const Redirect = (url: string) => {
    const response = NextResponse.redirect(new URL(url, request.url));
    dev &&
      response.cookies.set("dev", dev, {
        maxAge: 2 * 24 * 60 * 60,
      });
    return response;
  };

  const session = await validateSession();
  if (session) {
    const res = NextResponse.next();
    dev &&
      res.cookies.set("dev", dev, {
        maxAge: 2 * 24 * 60 * 60,
      });
    return res;
  }

  if (!params) {
    return Redirect("/login");
  }

  const isSecret = params.get("secret") === (process.env.SECRET ?? "");
  if (isSecret) {
    return Redirect("/register");
  } else {
    return Redirect("/login");
  }
}
export const config = {
  //loginとregisterとアセット/api以外
  matcher:
    "/((?!login|register|terms|api|_next/static|_next/image|favicon.ico).*)",
};
