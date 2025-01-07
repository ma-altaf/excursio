import { getEvent } from "@/features/events/services/firestore";
import EditBtn from "./EditBtn";

import EventDetails from "./(components)/eventDetails/EventDetails";
import { getUser } from "@/features/users/services/firestore";

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
  const userDetails = await getUser(ownerId);

  return (
    <section className="w-full min-h-screen flex flex-col p-2 md:px-[10%] lg:px-[20%]">
      <div className="flex flex-col justify-center items-center w-full mb-4">
        <h1 className="text-3xl p-4">{title}</h1>
        <EditBtn ownerId={ownerId} eventId={eventId} />
        <p className="mt-2"> {userDetails!.username}</p>
      </div>
      <p>{description}</p>

      <EventDetails ownerId={ownerId} eventId={eventId} />
    </section>
  );
}
