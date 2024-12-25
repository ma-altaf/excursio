import { sortedGroups } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import YearPicker from "./YearPicker";

export default function TimePanel({
  dateUseState,
}: {
  dateUseState: [
    Map<string, boolean[]>,
    Dispatch<SetStateAction<Map<string, boolean[]>>>
  ];
}) {
  const [dates] = dateUseState;

  return (
    <div className="flex flex-row h-full">
      {sortedGroups([...dates.keys()], (date) =>
        Number(date.split("-")[0])
      ).map((v: [number, string[]]) => (
        <YearPicker key={v[0]} dateUseState={dateUseState} yearDates={v} />
      ))}
    </div>
  );
}
