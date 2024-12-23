"use client";

import { useState } from "react";
import { useEventContext } from "../eventProvider";
import { formatDate } from "@/shared/services/utils";
import DatePicker from "@/shared/components/datePicker/DatePicker";

export default function Time() {
  const { eventData, setEventData, setActiveSection } = useEventContext();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);
  const dateUseState = useState<Map<string, boolean[]>>(new Map());

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
            value={formatDate(startDate)}
            min={formatDate(new Date())}
            max={`${endDate && formatDate(endDate)}`}
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
            min={`${formatDate(startDate)}`}
            value={(endDate && formatDate(endDate)) || formatDate(startDate)}
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
      <div className="w-full flex items-center justify-center">
        <DatePicker dateUseState={dateUseState} />
      </div>
    </section>
  );
}
