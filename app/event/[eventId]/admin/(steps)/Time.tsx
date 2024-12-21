"use client";

import { useState } from "react";
import { useEventContext } from "../eventProvider";
import { getDateFormat } from "@/shared/services/utils";
import DatePicker from "@/shared/components/DatePicker";

export default function Time() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <section className="w-full min-h-full h-fit flex flex-col justify-center">
      {eventData?.inProgress.time && <p>In progress</p>}
      <span>
        <span>
          <label htmlFor="startTime">Start:</label>
          <input
            type="date"
            name="startTime"
            id="startTime"
            value={getDateFormat(startDate)}
            min={getDateFormat(new Date())}
            max={`${endDate && getDateFormat(endDate)}`}
            onChange={(e) => {
              setStartDate(() => {
                const newDate = new Date(e.target.value);
                if (endDate && newDate > endDate) {
                  return endDate;
                }
                return newDate;
              });
            }}
          />
        </span>
        <span>
          <label htmlFor="endTime">End:</label>
          <input
            type="date"
            name="endTime"
            id="endTime"
            min={`${getDateFormat(startDate)}`}
            value={
              (endDate && getDateFormat(endDate)) || getDateFormat(startDate)
            }
            onChange={(e) => {
              setEndDate(() => {
                const newDate = new Date(e.target.value);
                if (newDate < startDate) {
                  return startDate;
                }
                return newDate;
              });
            }}
          />
        </span>
      </span>
      <DatePicker />
    </section>
  );
}
