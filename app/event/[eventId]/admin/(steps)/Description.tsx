"use client";

import {
  orderedEventSteps,
  updateDescription,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import { useEventContext } from "../eventProvider";

export default function Description() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const [description, setDescription] = useState("");

  useEffect(() => {
    setDescription(eventData!.description);
  }, []);

  function update(newDescription: string) {
    if (description == eventData?.description) {
      setActiveSection(orderedEventSteps[1]);
      return;
    }

    updateDescription(eventData!.eventId, newDescription)
      .then(() => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");

          return { ...prev, description };
        });
        setActiveSection(orderedEventSteps[1]);
      })
      .catch((error) => console.log(error));
  }

  return (
    <section className="w-full h-full flex flex-col justify-center">
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
    </section>
  );
}
