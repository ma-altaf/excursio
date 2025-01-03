import { getDateTimes, getSetectedTimes } from "../../services/firestore";
import TimeSelected from "./TimeSelected";
import TimeInProgress from "./TimeInProgress";

export default async function TimeDisplay({ eventId }: { eventId: string }) {
  const selectedTimes = await getSetectedTimes(eventId);
  let times: Map<string, boolean[]> | undefined;

  if (!selectedTimes) {
    times = await getDateTimes(eventId);
  }

  return (
    <div className="flex w-full p-1">
      {selectedTimes ? (
        <TimeSelected selectedTimes={selectedTimes} />
      ) : times ? (
        <TimeInProgress times={times} />
      ) : (
        <p>
          Not Setup, wait for orginizer to setup time participation or set the
          times.
        </p>
      )}
    </div>
  );
}
