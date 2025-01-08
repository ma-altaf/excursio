import TimeSelected from "./TimeSelected";
import TimeInProgress from "./TimeInProgress";
import {
  getDateTimes,
  getSetectedTimes,
  SelectedTimeMap,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";

export default function TimeDisplay({ eventId }: { eventId: string }) {
  const [selectedTimes, setSelectedTimes] = useState<
    SelectedTimeMap | undefined
  >(undefined);
  const [times, setTimes] = useState<Map<string, boolean[]> | undefined>(
    undefined
  );

  useEffect(() => {
    getSetectedTimes(eventId).then((res) => setSelectedTimes(res));
  }, [eventId]);

  useEffect(() => {
    if (!selectedTimes) {
      getDateTimes(eventId).then((res) => setTimes(res));
    }
  }, [eventId, selectedTimes]);

  return (
    <div className="flex w-full p-1">
      {selectedTimes ? (
        <TimeSelected selectedTimes={selectedTimes} />
      ) : times ? (
        <TimeInProgress eventId={eventId} />
      ) : (
        <p>
          Not Setup, wait for orginizer to setup time participation or set the
          times.
        </p>
      )}
    </div>
  );
}
