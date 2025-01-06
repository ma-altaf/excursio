import {
  EventType,
  getEvent,
  getSetectedLocations,
} from "@/features/events/services/firestore";
import LocationInProgress from "./LocationInProgress";
import LocationSelected from "./LocationSelected";

export default async function LocationDisplay({
  eventId,
}: {
  eventId: string;
}) {
  const selectedLocations = await getSetectedLocations(eventId);
  let eventData: EventType | undefined;

  if (!selectedLocations) {
    eventData = await getEvent(eventId);
  }
  return (
    <div className="flex w-full p-1">
      {selectedLocations ? (
        <LocationSelected selectedLocations={selectedLocations} />
      ) : eventData?.locationOpt ? (
        <LocationInProgress eventId={eventId} />
      ) : (
        <p>
          Not Setup, wait for orginizer to setup time participation or set the
          times.
        </p>
      )}
    </div>
  );
}
