import { getEvent } from "@/features/events/services/firestore";
import EditBtn from "./EditBtn";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);

  if (!eventData)
    return (
      <section className="flex flex-col w-full min-h-screen">
        <h1>Could not found event</h1>
      </section>
    );

  const { ownerId, title, description } = eventData;

  return (
    <section className="w-full min-h-screen flex flex-col md:px-[10%] lg:px-[20%]">
      <div className="flex flex-row justify-center items-center w-full relative mb-4">
        <h1 className="text-3xl p-4">{title}</h1>
        <EditBtn ownerId={ownerId} eventId={eventId} />
      </div>
      <p>{description}</p>
    </section>
  );
}
