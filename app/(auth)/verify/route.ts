import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token")
    console.log(token)
    const res = NextResponse.redirect("/");
    
    if (token) {
        res.cookies.set("token", token, {
            sameSite: "strict",
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });
    }
    return res;
}