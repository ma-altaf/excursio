import {
  namedMonths,
  sortedGroups,
  TimeStateType,
} from "@/shared/services/utils";
import React, { Dispatch, SetStateAction } from "react";
import Day from "./Day";
import { SelectedTimeMap } from "@/features/events/services/firestore";

export default function Month({
  membersTimes,
  monthDates,
  selectedTimesUseState,
  setChanged,
}: {
  membersTimes: Map<string, TimeStateType[]>[];
  selectedTimesUseState: [
    SelectedTimeMap | undefined,
    Dispatch<SetStateAction<SelectedTimeMap | undefined>>
  ];
  monthDates: [number, string[]];
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const [month, dates] = monthDates;

  return (
    <div className="flex flex-col border-r-2 border-black h-full">
      <p className="h-8 px-1 border-black border-b-2 border-r-2 flex justify-center items-center">
        {namedMonths[month - 1].substring(0, 3)}
      </p>
      <div className="flex flex-row h-full">
        {sortedGroups(dates, (date) => Number(date.split("-")[2])).map(
          (v: [number, string[]]) => (
            <Day
              membersTimes={membersTimes}
              key={`${month}-${v[0]}`}
              selectedTimesUseState={selectedTimesUseState}
              DateDates={v}
              setChanged={setChanged}
            />
          )
        )}
      </div>
    </div>
  );
}
