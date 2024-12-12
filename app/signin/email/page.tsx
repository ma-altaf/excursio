"use client";

import { sendEmailSignLink } from "@/services/firebase";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiMailSend } from "react-icons/bi";

export default function Email() {
  const [email, setEmail] = useState("");
  const redirectUrl = useSearchParams().get("redirectUrl") || "account";

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="p-5 flex flex-col w-full max-w-[420px]">
        <label htmlFor="email">Enter your email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          className="my-2 rounded-md px-2 py-1 border-2 border-black"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button
          onClick={() => sendEmailSignLink(email, redirectUrl)}
          className="p-button rounded-md bg-blue-300 flex flex-row justify-center"
        >
          <BiMailSend className="mr-4 size-5" />
          <p>Send Email</p>
        </button>
      </div>
    </section>
  );
}
