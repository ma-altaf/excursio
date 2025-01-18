import { SelectedTimeMap } from "@/features/events/services/firestore";
import SelectedTimeItems from "./SelectedTimeItems";

export default function TimeSelected({
  selectedTimes,
}: {
  selectedTimes: SelectedTimeMap;
}) {
  return (
    <div className="grid gap-1 grid-flow-row w-full p-1">
      {selectedTimes
        .entries()
        .toArray()
        .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
        .map(([date, selectedTimes], i) => (
          <>
            <SelectedTimeItems
              key={date}
              date={date}
              selectedTimes={selectedTimes}
            />

            {i !== selectedTimes.size - 1 && (
              <hr className="w-full border-b-2" />
            )}
          </>
        ))}
    </div>
  );
}
