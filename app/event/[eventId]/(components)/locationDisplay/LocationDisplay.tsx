"use client";

import {
  EventType,
  getEvent,
  getSetectedLocations,
  LocationType,
} from "@/features/events/services/firestore";
import LocationInProgress from "./LocationInProgress";
import LocationSelected from "./LocationSelected";
import { useEffect, useState } from "react";

export default function LocationDisplay({ eventId }: { eventId: string }) {
  const [selectedLocations, setSelectedLocations] = useState<
    LocationType[] | undefined
  >(undefined);
  const [eventData, setEventData] = useState<EventType | undefined>(undefined);

  useEffect(() => {
    getSetectedLocations(eventId).then((res) => setSelectedLocations(res));
  }, [eventId]);

  useEffect(() => {
    if (!selectedLocations) {
      getEvent(eventId).then((res) => setEventData(res));
    }
  }, [eventId, selectedLocations]);

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
