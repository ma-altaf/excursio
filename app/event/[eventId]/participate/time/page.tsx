import Time from "./Time";

// PARTICIPATE
export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  return <Time eventId={eventId} />;
}
