import { sortedGroups, TimeStateType } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import Year from "./Year";

export default function Time({
  dateUseState,
  setChanged,
}: {
  dateUseState: [
    Map<string, TimeStateType[]>,
    Dispatch<SetStateAction<Map<string, TimeStateType[]>>>
  ];
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const [dates] = dateUseState;

  return (
    <div className="flex flex-row h-full">
      {sortedGroups([...dates.keys()], (date) =>
        Number(date.split("-")[0])
      ).map((v: [number, string[]]) => (
        <Year
          key={v[0]}
          dateUseState={dateUseState}
          yearDates={v}
          setChanged={setChanged}
        />
      ))}
    </div>
  );
}
