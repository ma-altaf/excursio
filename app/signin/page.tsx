"use client";

import { useAuthContext } from "../(services)/authProvider";
import { useEffect } from "react";
import { redirect, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { signWithAnonymous, signWithGoogle } from "../(services)/auth";

export default function Signin() {
  const { user } = useAuthContext();
  const origin = useSearchParams().get("origin") || "account";

  useEffect(() => {
    if (user) {
      redirect(`/${origin}`);
    }
  }, [user, origin]);

  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="p-5 items-center flex flex-col max-w-[420px]">
        <h1 className="text-lg mb-2 font-bold">
          How would you like to sign in?
        </h1>
        <button
          className="p-button flex justify-center items-center m-2 w-full rounded-md bg-white border-gray-300 border-2"
          onClick={() => signWithGoogle()}
        >
          <FcGoogle className="mr-4 size-5" />
          <p>Sign in with Google</p>
        </button>

        <Link
          href={`signin/email?redirectUrl=${origin}`}
          className="p-button flex justify-center items-center m-2 w-full rounded-md bg-blue-300 border-blue-300 border-2"
        >
          <MdEmail className="mr-4 size-5" />
          <p>Sign in with Email Link</p>
        </Link>

        <div className="my-2 flex w-full items-center">
          <hr className=" w-full border-black" />
          <p className="mx-2">OR</p>
          <hr className=" w-full border-black" />
        </div>
        <button
          className="p-button flex justify-center items-center m-2 w-full rounded-md text-white bg-gray-600 border-gray-600 border-2"
          onClick={() => signWithAnonymous()}
        >
          <FaUser className="mr-4 size-5" />
          <p>Continue as Guest</p>
        </button>

        <div className="mt-2 p-2 bg-gray-100 border-gray-200 border-[3px] rounded-lg">
          <p>
            Guest account cannot be use on different devices and is lost if
            browser cache is cleared.
          </p>
          <p>
            Start with a guess account and link it to a sign in method later.
          </p>
        </div>
      </div>
    </section>
  );
}
