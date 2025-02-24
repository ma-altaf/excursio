import { getEvent } from "@/features/events/services/firestore";
import EventBtns from "./EventBtns";

import EventDetails from "./(components)/eventDetails/EventDetails";
import { getUser } from "@/features/users/services/firestore";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);

  if (!eventData) notFound();

  const { ownerId, title, description } = eventData;
  const ownerDetails = await getUser(ownerId);

  return (
    <section className="w-full min-h-screen flex flex-col p-2 md:px-[10%] lg:px-[20%]">
      <div className="flex flex-col justify-center items-center w-full mb-4">
        <h1 className="text-3xl pt-4">{title}</h1>
        <span className="flex flex-row items-center my-2">
          <Image
            className="rounded-full size-8 aspect-square object-cover pointer-events-none bg-gray-200"
            src={ownerDetails?.imageURL || "/images/user_pp.webp"}
            width={64}
            height={64}
            alt="Picture of the author"
            priority
          />
          <Link href={`/user/${ownerDetails!.uid}`} className="ml-1">
            {ownerDetails!.username}
          </Link>
        </span>
        <EventBtns ownerId={ownerId} eventId={eventId} />
      </div>
      <p>{description}</p>

      <EventDetails ownerId={ownerId} eventId={eventId} />
    </section>
  );
}
