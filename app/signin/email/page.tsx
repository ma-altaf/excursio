"use client";

import { sendEmailSignLink } from "@/features/users/services/auth";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiMailSend } from "react-icons/bi";

export default function Email() {
  const [email, setEmail] = useState("");
  const [EmailStatus, setEmailStatus] = useState("");
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
        {EmailStatus ? (
          <p className="p-button bg-gray-200 w-full rounded-md text-center">
            {EmailStatus}
          </p>
        ) : (
          <button
            onClick={() => {
              setEmailStatus("sending Email...");
              sendEmailSignLink(email, redirectUrl)
                .then(() => {
                  setEmailStatus("Email sent, please check your email inbox.");
                })
                .catch((error) => {
                  console.log(error);
                  setEmailStatus("Failed to send email!");
                });
            }}
            className="p-button rounded-md bg-blue-300 flex flex-row justify-center"
          >
            <BiMailSend className="mr-4 size-5" />
            <p>Send Email</p>
          </button>
        )}
      </div>
    </section>
  );
}
