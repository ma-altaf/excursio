"use client";

import { createEvent } from "@/features/events/services/firestore";
import { useAuthContext } from "@/features/users/components/authProvider";
import { eventNavigate } from "@/features/events/components/eventNavigate";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getUser } from "@/features/users/services/firestore";

export default function Create() {
  const router = useRouter();
  const { authLoading, user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const origin = useSearchParams().get("origin") || "";

  useEffect(() => {
    if (!authLoading && !user) router.replace("/signin");
    if (user)
      getUser(user.uid).then((res) => {
        if (res) setUsername(res?.username);
      });
  }, [authLoading, user, router]);

  function create(uid: string, title: string) {
    createEvent(uid, title)
      .then((eventRef) => {
        eventNavigate(eventRef.id);
      })
      .catch((error) => {
        setEventStatus(error.message);
      });
  }

  return (
    <section className="w-full min-h-screen flex flex-col justify-center px-4 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl my-8">Create a new Excursion</h1>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(e) => {
          setEventStatus("");
          setTitle(e.currentTarget.value);
        }}
        className="border-2 border-black rounded-md p-2 outline-accent"
        placeholder="Team Excursion - 01/01/2025"
        required
      />

      {eventStatus && (
        <p className="p-button bg-gray-200 w-full rounded-md mt-2">
          {eventStatus}
        </p>
      )}
      <span className="w-full flex flex-row justify-end my-2">
        <Link
          href={`/${origin}`}
          className="p-button rounded-md bg-gray-200 mr-2"
        >
          Exit
        </Link>
        <button
          onClick={() => create(user!.uid, title)}
          className="p-button rounded-md bg-accent"
        >
          Create Excursion
        </button>
      </span>
      <div className="p-button bg-gray-100 w-full rounded-md">
        Your username for this event will be <b>{username}</b>. If you want to
        change it{" "}
        <Link
          href="./account"
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          go to account
        </Link>{" "}
        page.
      </div>
    </section>
  );
}
