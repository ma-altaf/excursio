"use client";

import { sendEmailSignLink } from "@/features/users/services/auth";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { BiMailSend } from "react-icons/bi";
import { FaArrowLeft } from "react-icons/fa";

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
          className="my-2 rounded-md px-2 py-1 border-2 border-black outline-accent"
          onChange={(event) => {
            setEmailStatus("");
            setEmail(event.target.value);
          }}
        />

        <span className="flex flex-row">
          <Link
            href={`/signin?origin=${redirectUrl}`}
            className="p-button rounded-md bg-gray-200 flex flex-row justify-center items-center mr-1 w-fit"
          >
            <FaArrowLeft className="mr-1 size-3" />
            Back
          </Link>
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
                    setEmailStatus("Email sent, please check your inbox.");
                  })
                  .catch((error) => {
                    console.log(error);
                    setEmailStatus("Failed to send email!");
                  });
              }}
              className="p-button rounded-md bg-blue-300 flex flex-row justify-center items-center w-full"
            >
              <BiMailSend className="mr-4 size-5" />
              <p>Send Email</p>
            </button>
          )}
        </span>
      </div>
    </section>
  );
}
