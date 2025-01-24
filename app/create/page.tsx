"use client";

import { createEvent } from "@/features/events/services/firestore";
import { useAuthContext } from "@/features/users/components/authProvider";
import { eventNavigate } from "@/features/events/components/eventNavigate";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Create() {
  const { authLoading, user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const origin = useSearchParams().get("origin") || "";

  useEffect(() => {
    if (!authLoading && !user) redirect("/signin");
  }, [authLoading, user]);

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
        placeholder="Team Excusion - 01/01/2025"
        required
      />
      {eventStatus && (
        <p className="p-button bg-gray-200 w-full rounded-md mt-4">
          {eventStatus}
        </p>
      )}
      <span className="w-full flex flex-row justify-end my-4">
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
    </section>
  );
}
