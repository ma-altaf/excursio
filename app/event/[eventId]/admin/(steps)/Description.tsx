"use client";

import { updateDescription } from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import { useEventContext } from "../eventProvider";

export default function Description() {
  const { eventData, setEventData } = useEventContext();
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(eventData!.description);
  }, []);

  function update(newDescription: string) {
    updateDescription(eventData!.eventId, newDescription, eventData!.inProgress)
      .then(() => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");
          const inProgress = { ...eventData!.inProgress, description: false };

          return { ...prev, description, inProgress };
        });
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="w-full flex flex-col px-4">
      {eventData?.inProgress.description && <p>In progress</p>}
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
