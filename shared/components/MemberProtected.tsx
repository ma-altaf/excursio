"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import Spinner from "./loading/Spinner";
import { redirect } from "next/navigation";
import { MemberType } from "@/features/events/services/firestore";

export default function MemberProtected({
  eventMembers,
  redirectUrl = "/error",
  children,
}: {
  eventMembers: MemberType[];
  redirectUrl?: string;
  children: React.ReactNode;
}) {
  const { authLoading, user } = useAuthContext();

  if (authLoading)
    return (
      <section className="flex justify-center items-center w-full min-h-screen">
        <Spinner text="Loading..." />
      </section>
    );

  if (user && eventMembers.map((m) => m.uid).indexOf(user.uid) !== 0)
    return <>{children}</>;

  redirect(redirectUrl);
}
