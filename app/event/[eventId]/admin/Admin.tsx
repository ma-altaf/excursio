"use client";

import { lazy, useEffect } from "react";
import { useEventContext } from "./eventProvider";
import { useRouter, useSearchParams } from "next/navigation";
import {
  EventStepsType,
  orderedEventSteps,
} from "@/features/events/services/firestore";
import UidProtected from "@/shared/components/UidProtected";
import LoadingCover from "@/shared/components/loading/LoadingCover";

const Description = lazy(() => import("./(steps)/Description"));
const Invitation = lazy(() => import("./(steps)/Invitation"));
const Time = lazy(() => import("./(steps)/Time"));
const Location = lazy(() => import("./(steps)/Location"));
const Contributions = lazy(() => import("./(steps)/Contributions"));

export default function Admin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { activeSection, eventLoading, eventData, setActiveSection } =
    useEventContext();

  useEffect(() => {
    if (
      searchParams.get("step") &&
      orderedEventSteps.includes(searchParams.get("step") as EventStepsType)
    ) {
      setActiveSection(searchParams.get("step") as EventStepsType);
    }
  });

  if (eventLoading) return <LoadingCover text="Loading Event." />;

  if (!eventData) {
    router.replace("/event/error");
    return <></>;
  }

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
