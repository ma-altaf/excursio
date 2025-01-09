"use client";

import { lazy } from "react";
import { useEventContext } from "./eventProvider";
import { redirect } from "next/navigation";
import { EventStepsType } from "@/features/events/services/firestore";
import EventLoading from "../../EventLoading";
import UidProtected from "@/shared/components/UidProtected";

const Description = lazy(() => import("./(steps)/Description"));
const Invitation = lazy(() => import("./(steps)/Invitation"));
const Time = lazy(() => import("./(steps)/Time"));
const Location = lazy(() => import("./(steps)/Location"));
const Contributions = lazy(() => import("./(steps)/Contributions"));

export default function Event() {
  const { activeSection, eventLoading, eventData } = useEventContext();

  if (eventLoading) return <EventLoading />;

  if (!eventData) redirect("/event/error");

  const { eventId, title, ownerId } = eventData;

  function renderEventSection(activeSection: EventStepsType) {
    switch (activeSection) {
      case "description":
        return <Description />;
      case "invitation":
        return <Invitation />;
      case "time":
        return <Time />;
      case "location":
        return <Location />;
      case "contributions":
        return <Contributions />;
      default:
        return <p>Unknown section selected</p>;
    }
  }

  return (
    <UidProtected uid={ownerId} redirectUrl={`/event/${eventId}`}>
      <main className="w-full min-h-screen flex flex-col items-center md:px-[10%] lg:px-[20%]">
        <div className="h-[10vh] items-center justify-center flex">
          <h1 className="text-3xl p-4">{title}</h1>
        </div>
        <div className="min-h-[90vh] w-full pb-2 overflow-y-auto">
          {renderEventSection(activeSection)}
        </div>
      </main>
    </UidProtected>
  );
}
