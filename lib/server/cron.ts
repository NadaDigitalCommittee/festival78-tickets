import { raffle } from '@/lib/server/raffle';
import { Time } from "../time";
import { getEvents } from "./cms";
import { prisma } from "./db";
import { log } from './log';

export async function job(){
    const events=await getEvents()   
    const now=Time.nowJST()
    events.map(event=>{
        event.time.map(async (time,index)=>{
            const value=time.start.getTime()-now.getTime();
            const minutes=value/(1000*60)
            if(minutes>30||minutes<0){
                return log(event.name,time.toPeriodString(),"抽選しまsen")
            }
            log(event.name,time.toPeriodString(),"抽選します")
            //30分前に抽選
            const alreadyRaffled=!!(await prisma.raffle.findFirst({
                where:{
                    "result":{
                        notIn:["PROCESSING"]
                    }
                }
            }))
            if(alreadyRaffled){
                return log(event.name,time.toPeriodString(),"既に抽選済み")
            }
            await raffle(event.id,index,event.capacity)
            log(event.name,time.toPeriodString(),"抽選完了")
        })
    })
}