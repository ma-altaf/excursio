"use client";

import ActiveMembers from "./(components)/ActiveMembers";
import Waitlist from "./(components)/Waitlist";

export default function Members({
  eventId,
  ownerId,
}: {
  eventId: string;
  ownerId: string;
}) {
  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-4">Moderate Members</h1>
      <ActiveMembers ownerId={ownerId} eventId={eventId} />
      <hr className="w-full border-b-2 my-2" />
      <Waitlist eventId={eventId} />
      <p className="mt-2 p-1 rounded-md bg-gray-100 border-2 border-gray-200">
        NOTE: you can approve more than the limit on members in the event
        properties. Once the limited amount has been approved users will not be
        able to join the waitlist.
      </p>
    </section>
  );
}
