import type { Metadata } from "next";
import Event from "./Event";
import { getEvent } from "@/features/events/services/firestore";

export const metadata: Metadata = {
  title: "Event",
  description: "Manage event.",
};

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);

  if (!eventData) return <p>Event Does not exists.</p>;

  return <Event eventData={JSON.parse(JSON.stringify(eventData))} />;
}
