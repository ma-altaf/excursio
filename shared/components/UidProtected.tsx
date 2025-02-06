"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import Spinner from "./loading/Spinner";
import { useRouter } from "next/navigation";

export default function UidProtected({
  uid,
  redirectUrl = "/",
  children,
}: {
  uid: string;
  redirectUrl?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { authLoading, user } = useAuthContext();

  if (authLoading)
    return (
      <section className="flex justify-center items-center w-full min-h-screen">
        <Spinner text="Loading..." />
      </section>
    );

  if (user && user.uid === uid) return <>{children}</>;

  router.replace(redirectUrl);
}
