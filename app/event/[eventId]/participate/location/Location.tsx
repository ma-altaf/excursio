"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import Spinner from "@/shared/components/loading/Spinner";
import { redirect } from "next/navigation";
import Suggestion from "./Suggestion";

export default function Location({
  eventId,
  num_suggestions,
}: {
  eventId: string;
  num_suggestions: number;
}) {
  const { authLoading, user } = useAuthContext();

  if (authLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner text="Loading user..." />
      </div>
    );

  if (!user) redirect(`event/${eventId}`);

  const { uid } = user;

  return (
    <Suggestion eventId={eventId} num_suggestions={num_suggestions} uid={uid} />
  );
}
