"use client";

import { lazy } from "react";
import { useEventContext } from "./eventProvider";
import NoEvent from "../NoEvent";
import Expandable from "./Expandable";

const Description = lazy(() => import("./(steps)/Description"));

export default function Event() {
  const { eventData } = useEventContext();

  if (!eventData) return <NoEvent />;

  const { title } = eventData;

  return (
    <main className="w-full min-h-screen flex flex-col items-center md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-4">{title}</h1>
      <Expandable title="Change the description">
        <Description eventData={eventData} />
      </Expandable>
    </main>
  );
}
