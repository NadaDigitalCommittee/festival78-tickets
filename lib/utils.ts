import { EventSchema } from "./server/cms";
import { Time } from "./time";
import { Event } from "./types";

/**
 * Converts an EventSchema object to an Event object.
 * @param event - The EventSchema object to be converted.
 * @returns The converted Event object.
 */
export function convertEvent(event: EventSchema): Event {
  const time: Time[] = [];
  for (let i = 0; i < event.start.length; i++) {
    time.push(
      new Time(
        event.start[i].hour,
        event.start[i].minute,
        event.end[i].hour,
        event.end[i].minute
      )
    );
  }
  return {
    ...event,
    id: event.number,
    time: time,
  };
}
