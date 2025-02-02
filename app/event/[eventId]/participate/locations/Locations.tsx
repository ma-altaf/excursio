"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import { useRouter } from "next/navigation";
import Suggestion from "./Suggestion";
import LoadingCover from "@/shared/components/loading/LoadingCover";

export default function Locations({
  eventId,
  num_suggestions,
}: {
  eventId: string;
  num_suggestions: number;
}) {
  const router = useRouter();
  const { authLoading, user } = useAuthContext();

  if (authLoading) <LoadingCover />;

  if (!user) {
    router.replace(`event/${eventId}`);
    return <></>;
  }

  const { uid } = user;

  return (
    <Suggestion eventId={eventId} num_suggestions={num_suggestions} uid={uid} />
  );
}
