"use client";

import { useEffect, useState } from "react";
import { useEventContext } from "../eventProvider";
import {
  getDateTimes,
  orderedEventSteps,
  setDateTimes,
} from "@/features/events/services/firestore";
import RangedDateToggle from "./(components)/datePicker/RangedDateToggle";
import DatePicker from "./(components)/datePicker/DatePicker";
import TimePicker from "./(components)/timePicker/TimePicker";
import { TimeStateType } from "@/shared/services/utils";

export default function Time() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const [showDatePicker, setShowDatePicker] = useState(true);
  const dateUseState = useState<Map<string, TimeStateType[]>>(new Map());
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");

  const [dates, setDates] = dateUseState;

  useEffect(() => {
    if (!eventData) return;

    if (!eventData.times) {
      getDateTimes(eventData.eventId)
        .then((data) => {
          if (!data) throw new Error("Counld not get dates.");
          setEventData((prev) => {
            if (!prev) throw new Error("No event.");

            return { ...prev, times: data };
          });
          setDates(structuredClone(data));
        })
        .catch((e) => console.log(e));
    }

    if (eventData.times) {
      setDates(structuredClone(eventData?.times));
    }
  }, [eventData]);

  useEffect(() => {
    if (error && dates.size > 0) setError("");
  }, [dates]);

  function uploadDateTime() {
    const eventId = eventData?.eventId;

    if (!eventId) {
      console.log("no event ID");
      return;
    }

    setDateTimes(eventId, dates)
      .then(() => {
        setEventData((prev) => {
          if (!prev) throw new Error("No event.");

          return { ...prev, times: dates };
        });
        setActiveSection(orderedEventSteps[3]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <section className="w-full min-h-full h-fit flex flex-col justify-center items-center p-1">
      <div className="w-full flex flex-col items-center justify-center">
        <span className="w-fit flex flex-col items-center max-w-full">
          {showDatePicker ? (
            <>
              <RangedDateToggle
                dateUseState={dateUseState}
                setChanged={setChanged}
              />
              <DatePicker dateUseState={dateUseState} setChanged={setChanged} />
              <span className="w-full flex flex-row justify-end mt-2">
                <button
                  onClick={() => {
                    if (dates.size > 0) {
                      setShowDatePicker(false);
                    } else {
                      setError("Please, select atleast one day.");
                    }
                  }}
                  className="p-button rounded-md bg-accent"
                >
                  Next
                </button>
              </span>
            </>
          ) : (
            <>
              <TimePicker dateUseState={dateUseState} setChanged={setChanged} />
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

        {error && (
          <p className="mt-2 py-1 px-2 bg-red-300 rounded-md">{error}</p>
        )}

        {changed && (
          <p className="mt-2 py-1 px-2 bg-gray-100 rounded-md border-2 border-gray-200">
            *Unsubmitted Changes, please submit your changes to save them.
          </p>
        )}
      </div>
    </section>
  );
}
