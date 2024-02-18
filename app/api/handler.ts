/* eslint-disable no-unused-vars */
import { validateSession } from "@/lib/server/session";
import { Session } from "@/lib/types";
import { NextRequest, NextResponse } from "next/server";

export function validateApiHandler<T>(
  handler: (
    request: NextRequest,
    session: Session | undefined
  ) => Promise<NextResponse<T>>
): (request: NextRequest) => Promise<NextResponse<T>> {
  return async (request: NextRequest) => {
    //認証
    return await handler(request, await validateSession());
  };
}
