"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import Spinner from "./loading/Spinner";
import { redirect } from "next/navigation";
import { getMembers, MemberType } from "@/features/events/services/firestore";
import { useEffect, useState } from "react";

export default function MemberProtected({
  eventId,
  redirectUrl = "/error",
  children,
}: {
  eventId: string;
  redirectUrl?: string;
  children: React.ReactNode;
}) {
  const [eventMembers, setEventMembers] = useState<MemberType[] | undefined>(
    undefined
  );

  const { authLoading, user } = useAuthContext();

  useEffect(() => {
    getMembers(eventId, true)
      .then((res) => {
        setEventMembers(res);
      })
      .catch((e) => {
        console.log(e.message);
        setEventMembers([]);
      });
  }, [eventId]);

  if (authLoading || !eventMembers)
    return (
      <section className="flex justify-center items-center w-full min-h-screen">
        <Spinner text="Loading..." />
      </section>
    );

  if (user && eventMembers.map((m) => m.uid).indexOf(user.uid) >= 0)
    return <>{children}</>;

  redirect(redirectUrl);
}
