"use client";

import { createExcursion } from "@/features/events/services/firestore";
import { useAuthContext } from "@/features/users/components/authProvider";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Create() {
  const { authLoading, user } = useAuthContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventStatus, setEventStatus] = useState("");
  const origin = useSearchParams().get("origin") || "";

  useEffect(() => {
    if (!authLoading && !user) redirect("/signin");
  }, [authLoading, user]);

  function create(uid: string, title: string, description: string) {
    createExcursion(uid, title, description)
      .then(() => {
        // TODO: more to next step
      })
      .catch((error) => {
        setEventStatus(error.message);
      });
  }

  return (
    <section className="w-full min-h-screen flex flex-col px-4 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl my-8">Create Excursion</h1>
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
        placeholder="Excursion Title"
        required
      />
      <label htmlFor="description" className="mt-4">
        Description: (Optional)
      </label>
      <textarea
        id="description"
        name="description"
        value={description}
        rows={10}
        onChange={(e) => setDescription(e.currentTarget.value)}
        className="border-2 border-black rounded-md py-1 px-2 outline-accent"
        placeholder="What is this excursion about."
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
          onClick={() => create(user!.uid, title, description)}
          className="p-button rounded-md bg-accent"
        >
          Create Excursion
        </button>
      </span>
    </section>
  );
}
