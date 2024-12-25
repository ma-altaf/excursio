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

  if (!fullDate) throw new Error("date not found");

  const dateTime = datesTime.get(fullDate);

  if (!dateTime) throw new Error("date times not found");

  function toggleTime(i: number, currStatus: boolean) {
    console.log(`${fullDate}: ${datesTime.get(fullDate || "")}`);

    setDates((prev) => {
      if (!dateTime || !fullDate) {
        throw new Error("failed to update time");
      }
      dateTime[i] = !currStatus;
      prev.set(fullDate, dateTime);
      return new Map(prev);
    });
  }

  return (
    <div className="flex flex-col border-r-2 border-black h-full">
      <p className="h-8 px-1 border-black border-b-2 flex justify-center items-center">
        {date}
      </p>
      {dateTime.map((v, i) => {
        return (
          <button
            onClick={() => toggleTime(i, v)}
            key={i}
            className={`border-b-2 border-black h-8 w-12 ${
              v ? "bg-accent" : "bg-background"
            }`}
          ></button>
        );
      })}
    </div>
  );
}
