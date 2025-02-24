import { namedDays, TimeStateType } from "@/shared/services/utils";
import React, { Dispatch, SetStateAction } from "react";

export default function Day({
  dateUseState,
  DateDates,
  setChanged,
}: {
  dateUseState: [
    Map<string, TimeStateType[]>,
    Dispatch<SetStateAction<Map<string, TimeStateType[]>>>
  ];
  DateDates: [number, string[]];
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const [date, dates] = DateDates;
  const fullDate = dates.find((d) => Number(d.split("-")[2]) == date);
  const [datesTime, setDates] = dateUseState;

  if (!fullDate) throw new Error("date not found");

  const dateTime = datesTime.get(fullDate);
  const day = new Date(fullDate).getDay();

  if (!dateTime) throw new Error("date times not found");

  function toggleTime(i: number, currStatus: TimeStateType) {
    setDates((prev) => {
      if (!dateTime || !fullDate) {
        throw new Error("failed to update time");
      }
      dateTime[i] = currStatus === "enable" ? "available" : "enable";
      prev.set(fullDate, dateTime);
      setChanged(true);
      return new Map(prev);
    });
  }

  function toggleList(i: number) {
    if (!dateTime) throw new Error("time not available");
    const state = dateTime[i];
    while (
      i < dateTime.length &&
      (dateTime[i] === state || dateTime[i] === "disable")
    ) {
      if (dateTime[i] !== "disable") {
        toggleTime(i, dateTime[i]);
      }
      i += 1;
    }
  }

  return (
    <div className="flex flex-col border-r-2 border-black h-full">
      <div className="h-12 px-1 border-black border-b-2 flex flex-col justify-center items-center sticky top-16 bg-background z-40">
        <b>{namedDays[day].substring(0, 3)}</b>
        {date}
      </div>
      {dateTime.map((v, i) => {
        if (v === "disable") {
          return (
            <div
              key={i}
              className="border-b-2 border-black h-8 w-12 bg-black"
            ></div>
          );
        }

        return (
          <button
            draggable="false"
            onMouseDown={() => toggleTime(i, v)}
            onMouseOver={(e) => {
              if (e.buttons === 1) toggleTime(i, v);
            }}
            onDoubleClick={() => toggleList(i)}
            title={`${v === "available" ? "Remove" : "Add"}: ${fullDate}`}
            key={i}
            className={`border-b-2 border-black h-8 w-12 transition-all ${
              v === "available" ? "bg-accent" : "bg-background"
            }`}
          ></button>
        );
      })}
    </div>
  );
}
