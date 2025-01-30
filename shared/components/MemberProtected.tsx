"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import Spinner from "./loading/Spinner";
import { redirect } from "next/navigation";
import { getMember, MemberType } from "@/features/events/services/firestore";
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
  const [eventMember, setEventMember] = useState<MemberType | undefined | null>(
    undefined
  );

  const { authLoading, user } = useAuthContext();

  useEffect(() => {
    if (!user) return;
    getMember(eventId, user.uid)
      .then((res) => {
        setEventMember(res);
      })
      .catch((e) => {
        console.log(e.message);
        setEventMember(null);
      });
  }, [eventId, eventMember, user]);

  if (authLoading || eventMember == undefined)
    return (
      <section className="flex justify-center items-center w-full min-h-screen">
        <Spinner text="Loading..." />
      </section>
    );

  if (user && eventMember.active) return <>{children}</>;

  redirect(redirectUrl);
}
