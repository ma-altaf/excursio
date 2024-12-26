import { sortedGroups } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import MonthPicker from "./MonthPicker";

export default function YearPicker({
  dateUseState,
  yearDates,
  setChange,
}: {
  dateUseState: [
    Map<string, boolean[]>,
    Dispatch<SetStateAction<Map<string, boolean[]>>>
  ];
  yearDates: [number, string[]];
  setChange: Dispatch<SetStateAction<boolean>>;
}) {
  const [year, dates] = yearDates;

  return (
    <div className="flex flex-col border-r-2 border-black h-full">
      <p className="h-8 px-1 border-black border-b-2 flex justify-center items-center">
        {year}
      </p>
      <div className="flex flex-row h-full">
        {sortedGroups(dates, (date) => Number(date.split("-")[1])).map(
          (v: [number, string[]]) => (
            <MonthPicker
              key={v[0]}
              dateUseState={dateUseState}
              monthDates={v}
              setChange={setChange}
            />
          )
        )}
      </div>
    </div>
  );
}
