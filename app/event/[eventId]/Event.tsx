"use client";

import { EventType } from "@/features/events/services/firestore";
import { lazy, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Description = lazy(() => import("./(steps)/Description"));

export default function Event({ eventData }: { eventData: EventType }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <h1 className="text-3xl p-4">{eventData.title}</h1>
      <section className="w-full flex flex-col p-2 border-b-2 border-t-2">
        <button
          className="w-full p-2 flex justify-between items-center"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          <h2 className="text-xl flex flex-row items-center justify-center">
            <span className="w-10 h-10 p-2 rounded-full bg-blue-300 mr-4">
              <p>1</p>
            </span>
            Change the description
          </h2>
          {showDescription ? (
            <IoIosArrowUp className="size-5" />
          ) : (
            <IoIosArrowDown className="size-5" />
          )}
        </button>
        {showDescription && <Description eventData={eventData} />}
      </section>
    </main>
  );
}
