"use client";

import {
  createuserWithEmail,
  resetPasswordWithEmail,
  signWithEmail,
} from "@/features/users/services/auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaUserPlus } from "react-icons/fa6";
import { IoLogIn } from "react-icons/io5";

export default function Email() {
  const router = useRouter();
  const redirectUrl = useSearchParams().get("redirectUrl") || "account";
  const isCreateParam = useSearchParams().get("create") || "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreate, setIsCreate] = useState(isCreateParam === "true");
  const [success, setSuccess] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (success) {
      router.push(`/${redirectUrl}`);
    }
  }, [router, success, redirectUrl]);

  function createAccount(email: string, password: string) {
    if (email === "") return setError("Email is required");
    setStatus("Creating Account...");
    createuserWithEmail(email, password)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "password policy") {
          setStatus("");
          return setError("Password must contain atleast 6 characters");
        }
        setError("Failed to create account");
        setStatus("");
      });
  }

  function signIn(email: string, password: string) {
    if (email === "") return setError("Email is required");
    setStatus("Logging In...");

    signWithEmail(email, password)
      .then(() => {
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.message === "password policy") {
          setStatus("");
          return setError("Password must contain atleast 6 characters");
        }
        setError("Email/password is incorrect");
        setStatus("");
      });
  }

  function resetPassword(email: string) {
    if (email === "") return setError("Email is required");
    setStatus("Sending email...");

    resetPasswordWithEmail(email)
      .then(() => {
        setStatus("Email sent, check your email");
      })
      .catch((error) => {
        console.log(error.message);
        setError("Incorrect Email address");
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
            href={`/signin?origin=${redirectUrl}`}
            className="p-button rounded-md bg-gray-200 flex flex-row justify-center items-center mr-2 w-fit"
          >
            <FaArrowLeft className="mr-1 size-4" />
            Back
          </Link>

          {status ? (
            <p className="p-button bg-gray-100 w-full rounded-md text-center">
              {status}
            </p>
          ) : isCreate ? (
            <button
              onClick={() => {
                createAccount(email, password);
              }}
              className="p-button rounded-md bg-blue-300 flex flex-row justify-center items-center w-full"
            >
              <FaUserPlus className="mr-4 size-5" />
              <p>Create Account</p>
            </button>
          ) : (
            <button
              onClick={() => {
                signIn(email, password);
              }}
              className="p-button rounded-md bg-blue-300 flex flex-row justify-center items-center w-full"
            >
              <IoLogIn className="mr-4 size-5" />
              <p>Sign In</p>
            </button>
          )}
        </span>

        <span className="w-full flex flex-col items-center mt-2">
          {error && (
            <p className="p-button bg-red-300 w-full rounded-md text-center mb-2">
              {error}
            </p>
          )}

          {isCreate ? (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setError("");
                  setIsCreate(false);
                }}
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline"
              >
                Log In
              </button>
            </p>
          ) : (
            <p>
              Don{"'"}t have an account?{" "}
              <button
                onClick={() => {
                  setError("");
                  setIsCreate(true);
                }}
                className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline"
              >
                Create Account
              </button>
            </p>
          )}

          <p>
            Forgot password?{" "}
            <button
              onClick={() => {
                resetPassword(email);
              }}
              className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline"
            >
              Send Reset password
            </button>
          </p>
        </span>
      </div>
    </section>
  );
}
