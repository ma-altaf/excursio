import Time from "./Time";

// MODERATE
export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  return <Time eventId={eventId} />;
}
