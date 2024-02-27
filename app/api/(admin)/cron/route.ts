import { job } from "@/lib/server/cron";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const secret=request.headers.get("x-secret")
    if(secret!==process.env.ADMIN_SECRET){
        return NextResponse.json({ok:false},{status:401})
    }
    job()   
    return NextResponse.json({ok:true})
}