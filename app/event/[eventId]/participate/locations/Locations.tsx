"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import { redirect } from "next/navigation";
import Suggestion from "./Suggestion";
import LoadingCover from "@/shared/components/loading/LoadingCover";

export default function Locations({
  eventId,
  num_suggestions,
}: {
  eventId: string;
  num_suggestions: number;
}) {
  const { authLoading, user } = useAuthContext();

  if (authLoading) <LoadingCover />;

  if (!user) redirect(`event/${eventId}`);

  const { uid } = user;

  return (
    <Suggestion eventId={eventId} num_suggestions={num_suggestions} uid={uid} />
  );
}
