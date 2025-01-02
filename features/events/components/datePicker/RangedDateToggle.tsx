"use client";

import { formatDate, fullDay, resetTime } from "@/shared/services/utils";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function RangedDateToggle({
  dateUseState,
}: {
  dateUseState: [
    Map<string, boolean[]>,
    Dispatch<SetStateAction<Map<string, boolean[]>>>
  ];
}) {
  const [startDate, setStartDate] = useState<Date>(resetTime(new Date()));
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const endDateInputref = useRef<HTMLInputElement>(null);
  const [, setDates] = dateUseState;

  function toggleRange(startDate: Date, endDate?: Date) {
    let dateIter = new Date(startDate);

    if (!endDate) {
      endDateInputref.current?.focus();
      return;
    }

    setDates((prev) => {
      while (dateIter <= endDate) {
        const date = formatDate(dateIter);
        if (prev.has(date)) {
          prev.delete(date);
        } else {
          prev.set(date, [...fullDay]);
        }
        dateIter = new Date(dateIter.setDate(dateIter.getDate() + 1));
      }
      return new Map(prev);
    });
  }

  return (
    <div className="flex flex-col p-2 rounded-md border-2 border-black my-2 items-center max-w-[360px]">
      <span className="flex flex-row items-center justify-between mb-1">
        <span className="flex flex-col items-start">
          <label htmlFor="startTime">
            <b>From:</b>
          </label>
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
                newDate.setHours(24, 0, 0, 0); // date from string behave differently

                if (endDate && newDate > endDate) {
                  return endDate;
                }
                return newDate;
              });
            }}
          />
        </span>
        <FaArrowRightLong className="size-5 mx-4" />
        <span className="flex flex-col items-start">
          <label htmlFor="endTime">
            <b>To:</b>
          </label>
          <input
            type="date"
            name="endTime"
            id="endTime"
            ref={endDateInputref}
            min={`${formatDate(startDate)}`}
            value={(endDate && formatDate(endDate)) || formatDate(startDate)}
            onChange={(e) => {
              setEndDate(() => {
                const newDate = new Date(e.target.value);
                newDate.setHours(24, 0, 0, 0); // date from string behave differently

                if (newDate < startDate) {
                  return startDate;
                }
                return newDate;
              });
            }}
          />
        </span>
      </span>
      <button
        onClick={() => toggleRange(startDate, endDate)}
        className="p-button w-full rounded-md bg-gray-200 hover:bg-gray-300"
      >
        Toggle days
      </button>
    </div>
  );
}
