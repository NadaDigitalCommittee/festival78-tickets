import { validateUUID } from "@/lib/session";
import { NextResponse } from "next/server";

export function validateHandler<T>(
  handler: (
    request: Request,
    uuid: string | undefined,
  ) => Promise<NextResponse<T>>,
): (request: Request) => Promise<NextResponse<T>> {
  return async (request: Request) => {
    //認証
    console.log("validateHandler")
    console.log(request)
    return await handler(request, await validateUUID());
    
  };
}
