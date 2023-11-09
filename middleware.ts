// middleware.ts

import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { validateSession } from './lib/session'

export async function middleware(request: NextRequest) {
    const session = await validateSession()
    if (session) {
        return NextResponse.next()
    }

    const params = request.nextUrl.searchParams
    if (!params) {
        return NextResponse.redirect(new URL("/login",request.url))
    }

    const isSecret = params.get("secret") === (process.env.SECRET ?? "");
    if (isSecret) {
        return NextResponse.redirect(new URL(new URL("/register",request.url), new URLSearchParams({ secret: params.get("secret") ?? "" }).toString()))
    }
    else{
        return NextResponse.redirect(new URL("/login",request.url))
    }
}
export const config = {
    //loginとregisterとアセット/api以外
    matcher: "/((?!login|register|api|_next/static|_next/image|favicon.ico).*)",
}