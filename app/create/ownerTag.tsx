"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "../(services)/authProvider";
import { useEffect } from "react";

export default function OwnerTag({ origin }: { origin: string }) {
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      redirect(`/signin?origin=${origin}`);
    }
  }, [user, origin]);

  return <div>{user?.uid}</div>;
}
