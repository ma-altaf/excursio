"use client";

import { EventType } from "@/features/events/services/firestore";
import { lazy, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Description = lazy(() => import("./(steps)/Description"));

export default function Event({ eventData }: { eventData: EventType }) {
  const [showDescription, setShowDescription] = useState(false);

  const { title, inProgress } = eventData;
  const inProgressSet = new Set(inProgress);

  return (
    <main className="w-full min-h-screen flex flex-col items-center md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-4">{title}</h1>
      <section className="w-full flex flex-col p-2 border-b-2 border-t-2">
        <button
          className="w-full p-2 flex justify-between items-center"
          onClick={() => setShowDescription((prev) => !prev)}
        >
          <h2 className="text-xl flex flex-row items-center justify-center">
            Change the description
          </h2>
          <span className="flex flex-row items-center">
            <div
              className={`p-button rounded-md flex flex-row items-center ml-4 ${
                inProgressSet.has("description") ? "bg-red-100" : "bg-gray-100"
              }`}
            >
              {showDescription ? (
                <>
                  <p className="hidden sm:block mr-2">Collapse</p>
                  <IoIosArrowUp className="size-5" />
                </>
              ) : (
                <>
                  <p className="hidden sm:block mr-2">Expand</p>
                  <IoIosArrowDown className="size-5" />
                </>
              )}
            </div>
          </span>
        </button>
        {showDescription && <Description eventData={eventData} />}
      </section>
    </main>
  );
}
