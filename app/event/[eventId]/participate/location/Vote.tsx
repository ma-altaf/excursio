"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import LoadingCover from "@/shared/components/loading/LoadingCover";
import { redirect } from "next/navigation";

export default function Vote({ eventId }: { eventId: string }) {
  // TODO: participate
  const { authLoading, user } = useAuthContext();

  if (authLoading) return <LoadingCover />;

  if (!user) redirect(`/event/${eventId}`);

  return (
    <section className="w-full min-h-screen flex flex-col p-2 md:px-[10%] lg:px-[20%]"></section>
  );
}
