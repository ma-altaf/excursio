import { fullDay } from "@/shared/services/utils";
import React, { Dispatch, SetStateAction } from "react";

export default function DayPicker({
  dateUseState,
  DateDates,
}: {
  dateUseState: [
    Map<string, boolean[]>,
    Dispatch<SetStateAction<Map<string, boolean[]>>>
  ];
  DateDates: [number, string[]];
}) {
  const [date, dates] = DateDates;
  const fullDate = dates.find((d) => Number(d.split("-")[2]) == date);
  const [datesTime, setDates] = dateUseState;

  function toggleTime(i: number, fullDate: string | undefined) {
    console.log(`${fullDate}: ${datesTime.get(fullDate || "")}`);
    // TODO: fix ERROR
    if (!fullDate) {
      throw new Error("date not found");
    }
    setDates((prev) => {
      const prevTime = prev.get(fullDate);
      if (!prevTime) {
        throw new Error("cannot toggle date");
      }
      prevTime[i] = !prevTime[i];
      return prev.set(fullDate, prevTime);
    });
  }

  return (
    <div className="flex flex-col border-r-2 border-black h-full">
      <p className="h-8 px-1 border-black border-b-2 flex justify-center items-center">
        {date}
      </p>
      {fullDay.map((_, i) => {
        return (
          <button
            onClick={() => toggleTime(i, fullDate)}
            key={i}
            className={`border-b-2 border-black h-8 w-12 bg-${
              datesTime.get(fullDate || "")![i] ? "accent" : "foreground"
            }`}
          ></button>
        );
      })}
    </div>
  );
}
