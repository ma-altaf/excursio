"use client";

import { completeEmailSignUp } from "@/app/(services)/auth";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function EmailSignUp() {
  const redirectUrl = useSearchParams().get("redirectUrl") || "account";

  useEffect(() => {
    (async () => {
      const success = await completeEmailSignUp();
      if (success) {
        redirect(`/${redirectUrl}`);
      }
    })();
  });

  return (
    <section className="flex justify-center items-center">
      <h1 className="text-6xl">atttempting to sign up</h1>
    </section>
  );
}
