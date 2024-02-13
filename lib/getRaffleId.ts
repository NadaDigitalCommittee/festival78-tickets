import { createHash } from "crypto";
import { Time } from "./time";
import { getEvents } from "./cms";

export const RaffleIds: Map<string, string> = new Map();

function encode(eventId: number, timeId: number): string {
  const now = Time.nowJST();
  const testString = `${now.getFullYear()}${now.getMonth() + 1}${now.getDate()}${process.env.JWTSECRET}${eventId}${timeId}`;
  const hash = createHash("sha256");
  hash.update(testString);
  const data = hash.digest("hex");
  return data.slice(0, 3).toUpperCase();
}

async function setData() {
  const events = await getEvents();
  events.forEach((event) => {
    event.time.forEach((_t, i) => {
      RaffleIds.set(
        JSON.stringify({
          eventId: event.id,
          timeId: i,
        }),
        encode(event.id, i)
      );
    });
  });
}

setData();
setTimeout(setData, 1000 * 60 * 60);
