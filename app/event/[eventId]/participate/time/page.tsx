import { getDateTimes } from "@/features/events/services/firestore";
import Time from "./Time";
import { redirect } from "next/navigation";

// PARTICIPATE
export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const times = await getDateTimes(eventId);

  if (!times) redirect(`event/${eventId}`);

  return <Time times={times} eventId={eventId} />;
}
