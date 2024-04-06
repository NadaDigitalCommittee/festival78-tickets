import { Time } from "./time";

/**
 * Converts an EventSchema object to an Event object.
 * @param event - The EventSchema object to be converted.
 * @returns The converted Event object.
 */
export function convertEvent<T extends Schema>(
  event: T
): Omit<T, "start" | "end"> & { id: number; time: Time[] } {
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

type Schema = {
  number: number;
  start: { hour: number; minute: number }[];
  end: { hour: number; minute: number }[];
};
