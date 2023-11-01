import { validateUUID } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

export function validateHandler<T>(
  handler: (
    request: NextRequest,
    uuid: string | undefined,
  ) => Promise<NextResponse<T>>,
): (request: NextRequest) => Promise<NextResponse<T>> {
  return async (request: NextRequest) => {
    //認証
    return await handler(request, await validateUUID());    
  };
}
