import { getEvent } from "@/features/events/services/firestore";
import UidProtected from "@/shared/components/UidProtected";
import { redirect } from "next/navigation";

export default async function layout({
  params,
  children,
}: {
  params: Promise<{ eventId: string }>;
  children: React.ReactNode;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);

  if (!eventData) redirect("/error");

  const { ownerId } = eventData;

  return <UidProtected uid={ownerId}>{children}</UidProtected>;
}
