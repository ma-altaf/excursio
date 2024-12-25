import { namedMonths, sortedGroups } from "@/shared/services/utils";
import React, { Dispatch, SetStateAction } from "react";
import DayPicker from "./DayPicker";

export default function MonthPicker({
  dateUseState,
  monthDates,
}: {
  dateUseState: [
    Map<string, boolean[]>,
    Dispatch<SetStateAction<Map<string, boolean[]>>>
  ];
  monthDates: [number, string[]];
}) {
  const [month, dates] = monthDates;

  return (
    <div className="flex flex-col border-r-2 border-black h-full">
      <p className="h-8 px-1 border-black border-b-2 flex justify-center items-center">
        {namedMonths[month - 1].substring(0, 3)}
      </p>
      <div className="flex flex-row h-full">
        {sortedGroups(dates, (date) => Number(date.split("-")[2])).map(
          (v: [number, string[]]) => (
            <DayPicker key={v[0]} dateUseState={dateUseState} DateDates={v} />
          )
        )}
      </div>
    </div>
  );
}
