"use client";

import { redirect } from "next/navigation";
import { useAuthContext } from "../authentication";
import { useEffect } from "react";

export default function OwnerTag({ origin }: { origin: string }) {
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      redirect(`/logIn?origin=${origin}`);
    }
  }, [user, origin]);

  return <div>{user?.uid}</div>;
}
