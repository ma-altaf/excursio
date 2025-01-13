import { getEvent } from "@/features/events/services/firestore";
import Location from "./Location";
import SelectLocations from "./(components)/SelectLocations";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);

  if (!eventData) return <p>Event not found.</p>;

  if (eventData.locationOpt?.status === "vote")
    return <SelectLocations eventId={eventId} />;

  return <Location eventId={eventId} />;
}
