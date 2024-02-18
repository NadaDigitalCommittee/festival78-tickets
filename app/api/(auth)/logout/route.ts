import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  cookies().delete("admin");
  cookies().delete("token");
  return NextResponse.json({
    ok: true,
  });
}
