import { getEvent } from "@/features/events/services/firestore";
import Members from "./Members";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);

  if (!eventData) throw new Error("Incorrect event");

  const { ownerId } = eventData;

  return <Members eventId={eventId} ownerId={ownerId} />;
}
