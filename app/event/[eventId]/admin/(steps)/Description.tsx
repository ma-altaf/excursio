"use client";

import { updateDescription } from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import { useEventContext } from "../eventProvider";
import EventLoading from "@/app/event/eventLoading";
import { redirect } from "next/navigation";

export default function Description() {
  const { eventLoading, eventData, setEventData } = useEventContext();
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!eventData) redirect("/event/error");

    setDescription(eventData.description);
  }, [eventLoading, eventData]);

  if (eventLoading) return <EventLoading />;

  const inProgressSet = new Set(eventData?.inProgress);

  function update(newDescription: string) {
    updateDescription(eventData!.eventId, newDescription, inProgressSet)
      .then(() => {
        inProgressSet.delete("description");
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");

          return { ...prev, description, inProgress: inProgressSet };
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="w-full flex flex-col px-4">
      <label htmlFor="description">Description: (Optional)</label>
      <textarea
        id="description"
        name="description"
        value={description}
        rows={10}
        onChange={(e) => setDescription(e.currentTarget.value)}
        className="border-2 border-black rounded-md py-1 px-2 outline-accent"
        placeholder="What is this excursion about."
      />
      <button
        onClick={() => update(description)}
        className="p-button rounded-md bg-accent mt-2"
      >
        Next
      </button>
    </div>
  );
}
