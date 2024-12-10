"use client";

import { signWithAnonymous, signWithGoogle } from "@/services/firebase";
import { useAuthContext } from "../authentication";
import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";

export default function Login() {
  const { user } = useAuthContext();
  const origin = useSearchParams().get("origin") || "account";

  useEffect(() => {
    if (user) {
      redirect(`/${origin}`);
    }
  }, [user, origin]);

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="p-4 flex flex-col bg-red">
        <button
          className="p-button m-1 rounded-md bg-black text-white"
          onClick={() => signWithAnonymous()}
        >
          Anonymously
        </button>
        <button
          className="p-button m-1 rounded-md bg-blue-700 text-white"
          onClick={() => signWithGoogle()}
        >
          Google
        </button>
      </div>
    </section>
  );
}
