import {
  SelectedTimeType,
  SelectedTimeMap,
} from "@/features/events/services/firestore";
import { namedDays, TimeStateType } from "@/shared/services/utils";
import React, { Dispatch, SetStateAction } from "react";

export default function Day({
  membersTimes,
  selectedTimesUseState,
  DateDates,
  times,
  setChanged,
}: {
  membersTimes: Map<string, TimeStateType[]>[];
  selectedTimesUseState: [
    SelectedTimeMap | undefined,
    Dispatch<SetStateAction<SelectedTimeMap | undefined>>
  ];
  DateDates: [number, string[]];
  times: Map<string, TimeStateType[]>;
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const numMembers = membersTimes.length;
  const [date, dates] = DateDates;
  const fullDate = dates.find((d) => Number(d.split("-")[2]) == date);
  const [selectedTimes, setSelectedTimes] = selectedTimesUseState;

  if (!fullDate) throw new Error("date not found");

  const dateTime = times.get(fullDate);
  const day = new Date(fullDate).getDay();

  if (!dateTime) throw new Error("date times not found");

  function toggleTime(time: string, active: boolean | undefined) {
    setChanged(true);
    setSelectedTimes((prev) => {
      if (!prev) prev = new Map();

      if (!fullDate) throw new Error("date not found");
      const newVal = prev.get(fullDate) || new Map<string, SelectedTimeType>();

      if (active) {
        newVal.delete(time);
      } else {
        newVal.set(time, { comment: "" });
      }

      if (newVal.size === 0) {
        prev.delete(fullDate);
      } else {
        prev.set(fullDate, newVal);
      }

      return new Map(prev);
    });
  }

  return (
    <div className="flex flex-col border-r-2 border-black h-full">
      <p className="h-12 px-1 border-black border-b-2 flex flex-col justify-center items-center">
        <b>{namedDays[day].substring(0, 3)}</b>
        {date}
      </p>
      {dateTime.map((v, time) => {
        const availableMembers = membersTimes.reduce(
          (total, m) =>
            total + (m.get(fullDate)![time] === "available" ? 1 : 0),
          0
        );
        const activeStart = selectedTimes?.get(fullDate)?.has(`${time}`);

        if (v === "disable") {
          return (
            <div
              key={`${fullDate}-${time}`}
              className="border-b-2 border-black h-8 w-12 bg-black"
            ></div>
          );
        }

        return (
          <button
            draggable="false"
            onMouseDown={() => toggleTime(`${time}`, activeStart)}
            onMouseOver={(e) => {
              if (e.buttons === 1) toggleTime(`${time}`, activeStart);
            }}
            key={`${fullDate}-${time}`}
            className={`border-b-2 border-black h-8 w-12 transition-all relative ${
              activeStart ? "startTime" : ""
            }`}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundColor: "rgb(137, 232, 148)",
                opacity: availableMembers / numMembers || 0,
              }}
            ></div>
            {availableMembers > 0 && (
              <p className="text-sm absolute bottom-0 right-1">
                {availableMembers}
              </p>
            )}
          </button>
        );
      })}
    </div>
  );
}
