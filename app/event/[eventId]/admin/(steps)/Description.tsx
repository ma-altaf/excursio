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
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setDescription(eventData!.description);
  }, []);

  useEffect(() => {
    setChanged(description != eventData?.description);
  }, [description, eventData]);

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
    <section className="w-full h-full flex flex-col justify-center p-1">
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
        {changed ? "Submit" : "Next"}
      </button>
      {changed && (
        <p className="mt-2 py-1 px-2 bg-gray-100 rounded-md border-2 border-gray-200">
          *Unsubmitted Changes, please submit your changes to save them.
        </p>
      )}
    </section>
  );
}
