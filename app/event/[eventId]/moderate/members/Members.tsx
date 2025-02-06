"use client";

import Link from "next/link";
import ActiveMembers from "./(components)/ActiveMembers";
import WaitingMembers from "./(components)/WaitingMembers";
import { FaArrowLeft } from "react-icons/fa";

export default function Members({
  eventId,
  ownerId,
}: {
  eventId: string;
  ownerId: string;
}) {
  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <span className="m-4 w-full flex justify-center items-center">
        <Link
          href={`/event/${eventId}`}
          className="p-3 aspect-square bg-gray-100 rounded-md flex flex-row items-center"
        >
          <FaArrowLeft className="size-4" />
        </Link>
        <h1 className="text-3xl w-full text-center">Moderate Members</h1>
      </span>
      <ActiveMembers ownerId={ownerId} eventId={eventId} />
      <hr className="w-full border-b-2 my-2" />
      <WaitingMembers eventId={eventId} />
      <p className="mt-2 p-1 rounded-md bg-gray-100 border-2 border-gray-200">
        NOTE: you can approve more than the limit on members in the event
        properties. Once the limited amount has been approved users will not be
        able to join the waitlist.
      </p>
    </section>
  );
}
