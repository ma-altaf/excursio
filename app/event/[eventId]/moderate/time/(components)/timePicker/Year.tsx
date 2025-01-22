import { sortedGroups, TimeStateType } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import Month from "./Month";
import { SelectedTimeMap } from "@/features/events/services/firestore";

export default function Year({
  membersTimes,
  yearDates,
  selectedTimesUseState,
  times,
  setChanged,
}: {
  membersTimes: Map<string, TimeStateType[]>[];
  selectedTimesUseState: [
    SelectedTimeMap | undefined,
    Dispatch<SetStateAction<SelectedTimeMap | undefined>>
  ];
  yearDates: [number, string[]];
  times: Map<string, TimeStateType[]>;
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const [year, dates] = yearDates;

  return (
    <div className="flex flex-col border-r-2 border-black h-full">
      <p className="h-8 px-1 border-black border-b-2 border-r-4 flex justify-center items-center">
        {year}
      </p>
      <div className="flex flex-row h-full">
        {sortedGroups(dates, (date) => Number(date.split("-")[1])).map(
          (v: [number, string[]]) => (
            <Month
              membersTimes={membersTimes}
              key={`${year}-${v[0]}`}
              selectedTimesUseState={selectedTimesUseState}
              monthDates={v}
              times={times}
              setChanged={setChanged}
            />
          )
        )}
      </div>
    </div>
  );
}
