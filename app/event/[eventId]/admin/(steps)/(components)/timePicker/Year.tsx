import { sortedGroups, TimeStateType } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import Month from "./Month";

export default function Year({
  dateUseState,
  yearDates,
  setChanged,
}: {
  dateUseState: [
    Map<string, TimeStateType[]>,
    Dispatch<SetStateAction<Map<string, TimeStateType[]>>>
  ];
  yearDates: [number, string[]];
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const [year, dates] = yearDates;

  return (
    <div className="flex flex-col border-r-2 border-black h-full">
      <div className="h-8 px-1 border-black border-b-2 border-r-4 flex justify-center items-center">
        <p className="sticky right-1 left-1">{year}</p>
      </div>
      <div className="flex flex-row h-full">
        {sortedGroups(dates, (date) => Number(date.split("-")[1])).map(
          (v: [number, string[]]) => (
            <Month
              key={`${year}-${v[0]}`}
              dateUseState={dateUseState}
              monthDates={v}
              setChanged={setChanged}
            />
          )
        )}
      </div>
    </div>
  );
}
