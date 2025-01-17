import { SelectedTimeMap } from "@/features/events/services/firestore";
import { namedDays, TimeStateType } from "@/shared/services/utils";
import React, { Dispatch, SetStateAction } from "react";

export default function Day({
  membersTimes,
  selectedTimesUseState,
  DateDates,
  setChanged,
}: {
  membersTimes: Map<string, TimeStateType[]>[];
  selectedTimesUseState: [
    SelectedTimeMap | undefined,
    Dispatch<SetStateAction<SelectedTimeMap | undefined>>
  ];
  DateDates: [number, string[]];
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const numMembers = membersTimes.length;
  const [date, dates] = DateDates;
  const fullDate = dates.find((d) => Number(d.split("-")[2]) == date);
  const [selectedTimes, setSelectedTimes] = selectedTimesUseState;

  if (!fullDate) throw new Error("date not found");

  const dateTime = membersTimes[0].get(fullDate);
  const day = new Date(fullDate).getDay();

  if (!dateTime) throw new Error("date times not found");

  function toggleTime(time: Date, active: boolean | undefined) {
    setChanged(true);
    setSelectedTimes((prev) => {
      if (!prev) prev = new Map();

      if (!fullDate) throw new Error("date not found");
      let newVal = prev.get(fullDate) || [];

      if (active) {
        newVal = newVal.filter(
          (el) => el.startTime.getTime() != time.getTime()
        );
      } else {
        newVal.push({
          startTime: time,
          comment: "",
        });
      }

      if (newVal.length === 0) {
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
      {dateTime.map((v, i) => {
        const availableMembers = membersTimes.reduce(
          (total, m) => total + (m.get(fullDate)![i] === "available" ? 1 : 0),
          0
        );
        const time = new Date(new Date(fullDate).setHours(24 + i, 0, 0, 0));

        const active = selectedTimes
          ?.get(fullDate)
          ?.map((el) => el.startTime.getTime())
          .includes(time.getTime());

        return (
          <>
            {v === "disable" ? (
              <div
                key={`${fullDate}-${i}`}
                className="border-b-2 border-black h-8 w-12 bg-black"
              ></div>
            ) : (
              <button
                draggable="false"
                onMouseDown={() => toggleTime(time, active)}
                onMouseOver={(e) => {
                  if (e.buttons === 1) toggleTime(time, active);
                }}
                key={`${fullDate}-${i}`}
                className="border-b-2 border-black h-8 w-12 transition-all"
                style={{
                  backgroundColor: `rgba(137, 232, 148, ${
                    (availableMembers / numMembers) * 255
                  })`,
                  outline: active ? "solid var(--accent)" : "none",
                  zIndex: active ? "1" : "0",
                }}
              ></button>
            )}
          </>
        );
      })}
    </div>
  );
}
