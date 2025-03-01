import TimeSelected from "./TimeSelected";
import TimeInProgress from "./TimeInProgress";
import {
  getDateTimes,
  getSelectedTimes,
  SelectedTimeMap,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { TimeStateType } from "@/shared/services/utils";

export default function TimeDisplay({
  isOwner,
  eventId,
}: {
  isOwner: boolean;
  eventId: string;
}) {
  const [selectedTimes, setSelectedTimes] = useState<
    SelectedTimeMap | undefined
  >(undefined);
  const [times, setTimes] = useState<Map<string, TimeStateType[]> | undefined>(
    undefined
  );

  useEffect(() => {
    getSelectedTimes(eventId).then((res) => setSelectedTimes(res));
  }, [eventId]);

  useEffect(() => {
    if (!selectedTimes) {
      getDateTimes(eventId).then((res) => {
        if (res) setTimes(res);
      });
    }
  }, [eventId, selectedTimes]);

  return (
    <>
      <span className="flex flex-row w-full justify-between items-center">
        <h2 className="font-bold">Times</h2>

        {isOwner && (
          <Link
            href={`/event/${eventId}/moderate/time`}
            className="px-2 py-1 rounded-md bg-accent"
          >
            Moderate
          </Link>
        )}
      </span>

      <div className="flex w-full px-2">
        {selectedTimes ? (
          <TimeSelected selectedTimes={selectedTimes} />
        ) : times ? (
          <TimeInProgress eventId={eventId} />
        ) : (
          <p>
            Not setup, wait for the orginizer to setup time participation or set
            the times.
          </p>
        )}
      </div>
    </>
  );
}
