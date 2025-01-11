import { getEvent } from "@/features/events/services/firestore";
import Location from "./Location";
import Vote from "./Vote";

export default async function page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);

  if (!eventData)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>No Event Found</p>
      </div>
    );

  const { locationOpt } = eventData;

  if (!locationOpt)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p>location participation not setup.</p>
      </div>
    );

  const { num_suggestions, status } = locationOpt;

  if (status === "suggestion")
    return <Location num_suggestions={num_suggestions} eventId={eventId} />;
  if (status === "vote") return <Vote eventId={eventId} />;
}
