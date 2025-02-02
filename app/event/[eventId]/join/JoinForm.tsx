"use client";

import { joinEvent } from "@/server/server";
import { useAuthContext } from "@/features/users/components/authProvider";
import { signWithAnonymous } from "@/features/users/services/auth";
import Spinner from "@/shared/components/loading/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type JoinForm = {
  eventId: string;
  displayName: string;
  secret: string;
  uid: string;
};

export default function JoinForm({
  eventId,
  requireSecret,
}: {
  eventId: string;
  requireSecret: boolean;
}) {
  const router = useRouter();
  const { authLoading, user } = useAuthContext();
  const [error, setError] = useState("");
  const [joinForm, setJoinForm] = useState<JoinForm>({
    eventId: eventId,
    displayName: "",
    secret: "",
    uid: "",
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      setJoinForm((prev) => ({ ...prev, uid: user.uid }));
    }
  }, [authLoading, user]);

  function submit(formData: JoinForm) {
    const errors = [];

    if (formData.displayName.length <= 0) errors.push("Name is required.");
    if (requireSecret && formData.secret.length <= 0)
      errors.push("Secret phrase is required.");

    if (errors.length != 0) {
      setError(errors.join(" | "));
      return;
    }

    if (formData.uid !== "") {
      joinEvent(formData)
        .then((res) => {
          if (res?.message) return setError(res.message);
          setSuccess(true);
        })
        .catch((e) => {
          console.log(e.message);
          setError("Server error");
        });
    } else {
      signWithAnonymous().then((userCred) => {
        const { uid } = userCred.user;
        formData.uid = uid;
        joinEvent(formData)
          .then((res) => {
            if (res?.message) return setError(res.message);
            setSuccess(true);
          })
          .catch((e) => {
            console.log(e.message);
            setError("Server error");
          });
      });
    }
  }

  if (authLoading)
    return (
      <section className="flex justify-center items-center w-full min-h-screen">
        <Spinner text="Loading User..." />
      </section>
    );

  if (success) {
    router.replace(`/event/${eventId}`);
    return <></>;
  }

  return (
    <form className="flex flex-col w-full">
      <label htmlFor="name">Name:</label>
      <input
        className="border-2 border-black rounded-md py-1 px-2 outline-accent"
        type="text"
        id="name"
        name="name"
        required
        placeholder="Steve"
        onChange={(e) => {
          if (error) setError("");
          setJoinForm((prev) => ({ ...prev, displayName: e.target.value }));
        }}
      />
      {requireSecret && (
        <>
          <label className="mt-2" htmlFor="secret">
            Secret:
          </label>
          <input
            className="border-2 border-black rounded-md py-1 px-2 outline-accent"
            type="password"
            id="secret"
            name="secret"
            required
            onChange={(e) => {
              if (error) setError("");
              setJoinForm((prev) => ({ ...prev, secret: e.target.value }));
            }}
          />
        </>
      )}
      <input
        className="mt-4 mx-auto p-button rounded-md bg-accent w-fit cursor-pointer"
        type="submit"
        value="Join"
        onClick={(e) => {
          e.preventDefault();
          submit(joinForm);
        }}
      />

      {error && (
        <p className="px-2 py-1 mt-4 rounded-md bg-gray-100 border-2 border-gray-200">
          {error}
        </p>
      )}

      {!user && (
        <p className="w-fit px-2 py-1 mt-4 mx-auto rounded-md bg-gray-100 border-2 border-gray-200">
          Continue with Guest account. (
          <Link
            className="text-blue-500 underline"
            href={`/signin?origin=event/${eventId}/join`}
          >
            Create Account
          </Link>
          )
        </p>
      )}
    </form>
  );
}
