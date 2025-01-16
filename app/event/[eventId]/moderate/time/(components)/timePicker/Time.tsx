import { sortedGroups, TimeStateType } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import Year from "./Year";
import { SelectedTimeMap } from "@/features/events/services/firestore";

export default function Time({
  membersTimes,
  selectedTimesUseState,
  setChanged,
}: {
  membersTimes: Map<string, TimeStateType[]>[];
  selectedTimesUseState: [
    SelectedTimeMap | undefined,
    Dispatch<SetStateAction<SelectedTimeMap | undefined>>
  ];
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const [dates] = membersTimes;

  return (
    <div className="flex flex-row h-full">
      {sortedGroups([...dates.keys()], (date) =>
        Number(date.split("-")[0])
      ).map((v: [number, string[]]) => (
        <Year
          membersTimes={membersTimes}
          key={v[0]}
          selectedTimesUseState={selectedTimesUseState}
          yearDates={v}
          setChanged={setChanged}
        />
      ))}
    </div>
  );
}
