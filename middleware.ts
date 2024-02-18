// middleware.ts

import { NextRequest, NextResponse } from "next/server";
import { validateSession } from "./lib/server/session";

export async function middleware(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const Redirect = (url: string) => {
    const response = NextResponse.redirect(new URL(url, request.url));
    return response;
  };
  
  const token=params.get("token")
  if(token!==null){
    const res=NextResponse.redirect(new URL("/",request.nextUrl.origin))
    res.cookies.set("token", token, {
      sameSite: "strict",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  }

  if (params.get("secret") === process.env.ADMIN_SECRET) {
    const res = NextResponse.next();
    res.cookies.set("admin", process.env.ADMIN_SECRET, {
      sameSite: "strict",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  }

  const session = await validateSession();
  if (session) {
    const res = NextResponse.next();
    return res;
  }

  if (!params) {
    return Redirect("/login");
  }

  const isSecret = params.get("secret") === process.env.SECRET;
  if (isSecret) {
    return Redirect("/register");
  } else {
    return Redirect("/login");
  }
}
export const config = {
  //loginとregisterとアセット/api以外
  matcher:
    "/((?!login|register|terms|club|api|_next/static|_next/image|img|favicon.ico).*)",
};
