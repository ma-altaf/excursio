import { getDateTimes } from "@/features/events/services/firestore";
import Time from "./Time";

// MODERATE
export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const times = await getDateTimes(eventId);

  return <Time eventId={eventId} />;
}
