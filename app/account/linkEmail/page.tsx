"use client";

import { linkAnomToEmail } from "@/features/users/services/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft, FaLink } from "react-icons/fa6";

export default function Email() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  if (success) redirect(`/account`);

  function linkAccount(email: string, password: string) {
    if (email === "") return setError("Email is required");
    setStatus("Linking Account...");
    linkAnomToEmail(email, password)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "password policy") {
          setStatus("");
          return setError("Password must contain atleast 6 characters");
        }
        setError("Failed to link account");
        setStatus("");
      });
  }

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="p-5 flex flex-col w-full max-w-[420px]">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          className="mb-2 rounded-md px-2 py-1 border-2 border-black outline-accent"
          onChange={(event) => {
            setError("");
            setStatus("");
            setEmail(event.target.value);
          }}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="P4s5w0rd"
          className="rounded-md px-2 py-1 border-2 border-black outline-accent"
          onChange={(event) => {
            setError("");
            setStatus("");
            setPassword(event.target.value);
          }}
        />

        <span className="flex flex-row mt-2">
          <Link
            href={`/account`}
            className="p-button rounded-md bg-gray-200 flex flex-row justify-center items-center mr-2 w-fit"
          >
            <FaArrowLeft className="mr-1 size-4" />
            Back
          </Link>

          {status ? (
            <p className="p-button bg-gray-100 w-full rounded-md text-center">
              {status}
            </p>
          ) : (
            <button
              onClick={() => {
                linkAccount(email, password);
              }}
              className="p-button rounded-md bg-blue-300 flex flex-row justify-center items-center w-full"
            >
              <FaLink className="mr-4 size-5" />
              <p>Link Account</p>
            </button>
          )}
        </span>

        <span className="w-full flex flex-col items-center mt-2">
          {error && (
            <p className="p-button bg-red-300 w-full rounded-md text-center mb-2">
              {error}
            </p>
          )}
        </span>
      </div>
    </section>
  );
}
