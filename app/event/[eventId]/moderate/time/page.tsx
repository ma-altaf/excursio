import {
  getSetectedLocations,
  getSelectedTimes,
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

  return (
    <Time
      eventId={eventId}
      selectedLoc={selectedLoc}
      selectedTime={selectedTime}
    />
  );
}
