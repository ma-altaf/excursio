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

  if (!eventId) redirect("/error");

  return (
    <MemberProtected eventId={eventId} redirectUrl={`/event/${eventId}`}>
      {children}
    </MemberProtected>
  );
}
