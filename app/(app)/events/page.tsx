import { getEvents } from "@/lib/server/cms";
import { EventDescription } from "./_components/EventDescription";

export default async function Page() {
  const events = await getEvents();
  return (
    <>
      {events.map((event) => (
        <EventDescription event={event} key={event.id} />
      ))}
    </>
  );
}
