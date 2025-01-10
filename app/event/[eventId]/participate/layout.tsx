import { getMembers } from "@/features/events/services/firestore";
import MemberProtected from "@/shared/components/MemberProtected";
import { redirect } from "next/navigation";

export default async function layout({
  params,
  children,
}: {
  params: Promise<{ eventId: string }>;
  children: React.ReactNode;
}) {
  const { eventId } = await params;
  const eventMembers = await getMembers(eventId);

  if (!eventId) redirect("/error");

  return (
    <MemberProtected
      eventMembers={eventMembers}
      redirectUrl={`/event/${eventId}`}
    >
      {children}
    </MemberProtected>
  );
}
