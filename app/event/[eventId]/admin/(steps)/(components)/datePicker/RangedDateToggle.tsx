"use client";

import {
  formatDate,
  fullDay,
  resetTime,
  TimeStateType,
} from "@/shared/services/utils";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

export default function RangedDateToggle({
  dateUseState,
  setChanged,
}: {
  dateUseState: [
    Map<string, TimeStateType[]>,
    Dispatch<SetStateAction<Map<string, TimeStateType[]>>>
  ];
  setChanged: Dispatch<SetStateAction<boolean>>;
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

    setChanged(true);
  }

  return (
    <div className="flex flex-col p-1 w-full sm:w-fit rounded-md border-2 border-black my-2 items-center max-w-[360px]">
      <span className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 w-full">
        <span className="flex flex-col items-start">
          <label htmlFor="startTime">
            <b>From:</b>
          </label>
          <input
            type="date"
            name="startTime"
            id="startTime"
            min={formatDate(new Date())}
            max={`${endDate && formatDate(endDate)}`}
            value={formatDate(startDate)}
            className="border-2 border-black rounded-md w-full py-1 px-2 outline-accent bg-background"
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
        <FaArrowRightLong className="size-4 sm:size-4 my-1 rotate-90 sm:mx-2 sm:rotate-0" />
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
            className="border-2 border-black rounded-md w-full py-1 px-2 outline-accent bg-background"
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
