import {
  LocationType,
  SelectedTimeMap,
  SelectedTimeType,
} from "@/features/events/services/firestore";
import { Dispatch, SetStateAction } from "react";
import SelectedDateItem from "./SelectedDateItem";

export default function SelectedTime({
  selectedTimesUseState,
  selectedLoc,
}: {
  selectedTimesUseState: [
    SelectedTimeMap | undefined,
    Dispatch<SetStateAction<SelectedTimeMap | undefined>>
  ];
  selectedLoc: LocationType[] | undefined;
}) {
  const [selectedTimes, setSelectedTimes] = selectedTimesUseState;

  function deleteDate(date: string) {
    setSelectedTimes((prev) => {
      if (!prev) return prev;
      prev.delete(date);
      return new Map(prev);
    });
  }

  function deleteDateTime(date: string, time: string) {
    setSelectedTimes((prev) => {
      if (!prev) return prev;

      const currTime = prev.get(date) || new Map<string, SelectedTimeType>();
      currTime.delete(time);

      if (currTime.size !== 0) {
        prev.set(date, currTime);
      } else {
        prev.delete(date);
      }

      return new Map(prev);
    });
  }

  function setComment(date: string, time: string, text: string) {
    setSelectedTimes((prev) => {
      if (!prev) return prev;

      const currTime = prev.get(date) || new Map<string, SelectedTimeType>();
      prev.set(
        date,
        currTime.set(time, {
          ...currTime.get(time),
          comment: text,
        })
      );

      return new Map(prev);
    });
  }

  return (
    <div className="flex flex-col p-1 border-2 border-black rounded-md w-full">
      {selectedTimes && selectedTimes.size !== 0 ? (
        <ul className="w-full grid gap-1 grid-flow-row">
          {selectedTimes
            .entries()
            .toArray()
            .map((dateData) => (
              <SelectedDateItem
                key={dateData[0]}
                dateData={dateData}
                selectedLoc={selectedLoc}
                deleteDate={deleteDate}
                deleteDateTime={deleteDateTime}
                setComment={setComment}
              />
            ))}
        </ul>
      ) : (
        <p className="text-center">No selected time.</p>
      )}
    </div>
  );
}
