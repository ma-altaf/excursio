"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "../(services)/authProvider";
import { useEffect } from "react";

export default function OwnerTag({ origin }: { origin: string }) {
  const { authLoading, user } = useAuthContext();

  useEffect(() => {
    if (!authLoading && !user) {
      redirect(`/signin?origin=${origin}`);
    }
  }, [user, authLoading, origin]);

  return <div>{user?.uid}</div>;
}
