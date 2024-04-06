//キャンパスツアー 10:30 11:00 11:30スタートは定員が20名

export function extendCapacity(eventId:number,timeId:number){
 if(eventId===1&&[3,4,5].includes(timeId)) return 20
 return undefined
}