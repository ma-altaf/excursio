"use client";

import { useEffect, useState } from "react";
import { useEventContext } from "../eventProvider";
import DatePicker from "@/shared/components/datePicker/DatePicker";
import RangedDateToggle from "@/shared/components/datePicker/RangedDateToggle";
import TimePicker from "@/shared/components/timePicker/TimePicker";
import {
  getDateTimes,
  orderedEventSteps,
  setDateTimes,
} from "@/features/events/services/firestore";

export default function Time() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const [showDatePicker, setShowDatePicker] = useState(true);
  const dateUseState = useState<Map<string, boolean[]>>(new Map());
  const [changed, setChanged] = useState(false);

  const [dates, setDates] = dateUseState;

  useEffect(() => {
    if (!eventData?.times) {
      getDateTimes(eventData!.eventId)
        .then((data) => {
          setEventData((prev) => {
            if (!prev) throw new Error("No event.");

            return { ...prev, times: data };
          });
          setDates(structuredClone(data));
        })
        .catch((e) => console.log(e));
    }

    if (eventData?.times) {
      setDates(structuredClone(eventData?.times));
    }
  }, [eventData]);

  function uploadDateTime() {
    const eventId = eventData?.eventId;

    if (!eventId) {
      console.log("no event ID");
      return;
    }

    setDateTimes(eventId, dates, eventData!.inProgress)
      .then(() => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");
          const inProgress = { ...eventData!.inProgress, times: false };

          return { ...prev, times: dates, inProgress };
        });
        setActiveSection(orderedEventSteps[3]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <section className="w-full min-h-full h-fit flex flex-col justify-center items-center">
      {eventData?.inProgress.times && <p>In progress</p>}
      <div className="w-full flex flex-col items-center justify-center">
        <span className="w-fit flex flex-col items-center">
          {showDatePicker ? (
            <>
              <RangedDateToggle dateUseState={dateUseState} />
              <DatePicker dateUseState={dateUseState} setChange={setChanged} />
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
              <TimePicker dateUseState={dateUseState} setChange={setChanged} />
              <span className="w-full flex flex-row justify-end mt-2">
                <button
                  onClick={() => setShowDatePicker(true)}
                  className="p-button rounded-md bg-gray-100 mr-2"
                >
                  Back
                </button>
                <button
                  onClick={() => uploadDateTime()}
                  className="p-button rounded-md bg-accent"
                >
                  Submit
                </button>
              </span>
            </>
          )}
        </span>
        {changed && (
          <p className="mt-2 py-1 px-2 bg-gray-100 rounded-md border-2 border-gray-200">
            *Unsubmitted Changes, please submit your changes to save them.
          </p>
        )}
      </div>
    </section>
  );
}
