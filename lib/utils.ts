import { EventSchema } from "./cms";
import { Time } from "./time";
import { Event } from "./types";

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
    id: event.number,
    name: event.name,
    capacity: event.capacity,
    description: event.description,
    location: event.place,
    time: time,
  };
}
