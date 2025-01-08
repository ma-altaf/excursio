import { getEvent } from "@/features/events/services/firestore";
import EditBtn from "./EditBtn";

import EventDetails from "./(components)/eventDetails/EventDetails";
import { getUser } from "@/features/users/services/firestore";
import Image from "next/image";

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
        <h1 className="text-3xl pt-4">{title}</h1>
        <span className="flex flex-row items-center my-2">
          <Image
            className="rounded-full size-8 aspect-square object-cover pointer-events-none bg-gray-200"
            src={userDetails?.imageURL || "/images/profile.jpg"}
            width={64}
            height={64}
            alt="Picture of the author"
            priority
          />
          <p className="ml-1">{userDetails!.username}</p>
        </span>
        <EditBtn ownerId={ownerId} eventId={eventId} />
      </div>
      <p>{description}</p>

      <EventDetails ownerId={ownerId} eventId={eventId} />
    </section>
  );
}
