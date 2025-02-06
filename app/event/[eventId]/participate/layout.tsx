import MemberProtected from "@/shared/components/MemberProtected";
import { notFound } from "next/navigation";

export default async function layout({
  params,
  children,
}: {
  params: Promise<{ eventId: string }>;
  children: React.ReactNode;
}) {
  const { eventId } = await params;

  if (!eventId) notFound();

  return (
    <MemberProtected eventId={eventId} redirectUrl={`/event/${eventId}`}>
      {children}
    </MemberProtected>
  );
}
