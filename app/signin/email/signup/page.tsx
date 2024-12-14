"use client";

import { completeEmailSignUp } from "@/app/(services)/auth";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailSignUp() {
  const [signUpStatus, setSignUpStatus] = useState(
    "Atttempting to sign you up..."
  );
  const redirectUrl = useSearchParams().get("redirectUrl") || "account";

  useEffect(() => {
    (async () => {
      const success = await completeEmailSignUp();
      if (success) {
        redirect(`/${redirectUrl}`);
      } else {
        setSignUpStatus("Failed to sign you up. This link might be expired.");
      }
    })();
  });

  return (
    <section className="flex justify-center items-center w-full min-h-screen">
      <h1 className="text-6xl">{signUpStatus}</h1>
    </section>
  );
}
