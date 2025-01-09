"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import Spinner from "./loading/Spinner";
import { redirect } from "next/navigation";

export default function AdminProtected({
  ownerId,
  origin = "/error",
  children,
}: {
  ownerId: string;
  origin?: string;
  children: React.ReactNode;
}) {
  const { authLoading, user } = useAuthContext();

  if (authLoading)
    return (
      <section className="flex justify-center items-center w-full min-h-screen">
        <Spinner text="Loading..." />
      </section>
    );

  if (user && user.uid === ownerId) return <>{children}</>;

  redirect(origin);
}
