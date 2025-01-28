import ColItems from "./ColItems";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;

  return <ColItems eventId={eventId} />;
}
