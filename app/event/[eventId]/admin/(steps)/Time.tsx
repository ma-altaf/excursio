"use client";

import { useState } from "react";
import { useEventContext } from "../eventProvider";
import DatePicker from "@/shared/components/datePicker/DatePicker";
import RangedDateToggle from "@/shared/components/datePicker/RangedDateToggle";

export default function Time() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const dateUseState = useState<Map<string, boolean[]>>(new Map());

  return (
    <section className="w-full min-h-full h-fit flex flex-col justify-center items-center">
      {eventData?.inProgress.time && <p>In progress</p>}
      <RangedDateToggle dateUseState={dateUseState} />
      <div className="w-full flex items-center justify-center">
        <DatePicker dateUseState={dateUseState} />
      </div>
    </section>
  );
}
