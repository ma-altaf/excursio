import {
  getSetectedLocations,
  getSelectedTimes,
  getDateTimes,
} from "@/features/events/services/firestore";
import Time from "./Time";

// MODERATE
export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const selectedLoc = await getSetectedLocations(eventId);
  const selectedTime = await getSelectedTimes(eventId);
  const times = await getDateTimes(eventId);

  return (
    <Time
      eventId={eventId}
      times={times}
      selectedLoc={selectedLoc}
      selectedTime={selectedTime}
    />
  );
}
