//キャンパスツアー 10:30 11:00 11:30スタートは定員が20名

import { Time } from "@/lib/time";

export function extendCapacity(eventId: number, timeId: number) {
  if (eventId === 1 && [3, 4, 5].includes(timeId)) return 20;
  return undefined;
}

//LEGO 45分前抽選

export function isRaffleTimeOver(eventId: number, time: Time) {
  const now = Time.nowJST().getTime();
  if (eventId === 0) {
    return now > time.start.getTime() - 46 * 60 * 1000;
  } else {
    return now > time.start.getTime() - 31 * 60 * 1000;
  }
}
