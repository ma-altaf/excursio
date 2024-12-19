"use client";

import { lazy } from "react";
import { useEventContext } from "./eventProvider";
import Expandable from "./Expandable";
import { redirect } from "next/navigation";
import EventLoading from "../../EventLoading";

const Description = lazy(() => import("./(steps)/Description"));

export default function Event() {
  const { eventLoading, eventData } = useEventContext();

  if (eventLoading) return <EventLoading />;

  if (!eventData) redirect("/event/error");

  const { title } = eventData;

  return (
    <main className="w-full min-h-screen flex flex-col items-center md:px-[10%] lg:px-[20%] bg-blue-100">
      <h1 className="text-3xl p-4">{title}</h1>
      <Expandable title="Change the description">
        <Description />
      </Expandable>
    </main>
  );
}
