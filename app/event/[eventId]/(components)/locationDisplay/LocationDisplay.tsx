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
import Link from "next/link";

export default function LocationDisplay({
  suggestions,
  isOwner,
  eventId,
}: {
  suggestions?: LocationType[];
  isOwner: boolean;
  eventId: string;
}) {
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
    <>
      <span className="flex flex-row w-full justify-between items-center">
        <h2 className="font-bold">Location</h2>

        {isOwner && (
          <Link
            href={`/event/${eventId}/moderate/locations`}
            className="px-2 py-1 rounded-md bg-accent"
          >
            Moderate
          </Link>
        )}
      </span>

      <div className="flex w-full px-2">
        {selectedLocations ? (
          <LocationSelected selectedLocations={selectedLocations} />
        ) : eventData?.locationOpt ? (
          <LocationInProgress suggestions={suggestions} eventId={eventId} />
        ) : (
          <p>
            Not Setup, wait for orginizer to setup time participation or set the
            times.
          </p>
        )}
      </div>
    </>
  );
}
