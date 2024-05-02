import { randomUUID } from "crypto";
import { transports } from "./transports";

export function getTransportId(uuid:string){
    return Math.abs(uuid.split("").reduce((a,b)=>a+b.charCodeAt(0),0))%transports.length;
}

console.log(getTransportId(randomUUID()))