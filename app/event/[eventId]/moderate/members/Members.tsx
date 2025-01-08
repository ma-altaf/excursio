"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import ActiveMembers from "./(components)/ActiveMembers";
import Waitlist from "./(components)/Waitlist";
import Spinner from "@/shared/components/loading/Spinner";
import { redirect } from "next/navigation";

export default function Members({
  eventId,
  ownerId,
}: {
  eventId: string;
  ownerId: string;
}) {
  const { authLoading, user } = useAuthContext();

  if (authLoading)
    return (
      <section className="flex justify-center items-center w-full min-h-screen">
        <Spinner text="Loading..." />
      </section>
    );

  if (user && user.uid === ownerId)
    return (
      <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
        <h1 className="text-3xl p-4">Moderate Members</h1>
        <ActiveMembers ownerId={ownerId} eventId={eventId} />
        <hr className="w-full border-b-2 my-2" />
        <Waitlist eventId={eventId} />
      </section>
    );

  redirect(`/event/${eventId}`);
}
