"use client";

import { useState } from "react";
import { useEventContext } from "../eventProvider";
import DatePicker from "@/shared/components/datePicker/DatePicker";
import RangedDateToggle from "@/shared/components/datePicker/RangedDateToggle";
import TimePicker from "@/shared/components/timePicker/TimePicker";

export default function Time() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const [showDatePicker, setShowDatePicker] = useState(true);
  const dateUseState = useState<Map<string, boolean[]>>(new Map());

  return (
    <section className="w-full min-h-full h-fit flex flex-col justify-center items-center">
      {eventData?.inProgress.time && <p>In progress</p>}
      <div className="w-full flex items-center justify-center">
        <span className="w-fit flex flex-col items-center">
          {showDatePicker ? (
            <>
              <RangedDateToggle dateUseState={dateUseState} />
              <DatePicker dateUseState={dateUseState} />
              <span className="w-full flex flex-row justify-end mt-2">
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="p-button rounded-md bg-accent"
                >
                  Next
                </button>
              </span>
            </>
          ) : (
            <>
              <TimePicker dateUseState={dateUseState} />
              <span className="w-full flex flex-row justify-end mt-2">
                <button
                  onClick={() => setShowDatePicker(true)}
                  className="p-button rounded-md bg-gray-100 mr-2"
                >
                  Back
                </button>
                <button
                  onClick={() => {}}
                  className="p-button rounded-md bg-accent"
                >
                  Next
                </button>
              </span>
            </>
          )}
        </span>
      </div>
    </section>
  );
}
