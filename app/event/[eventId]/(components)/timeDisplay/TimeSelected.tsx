import { SelectedTimeMap } from "@/features/events/services/firestore";
import SelectedTimeItems from "./SelectedTimeItems";

export default function TimeSelected({
  selectedTimes,
}: {
  selectedTimes: SelectedTimeMap;
}) {
  return (
    <div className="flex flex-col">
      {selectedTimes.entries().map(([date, selectedTimes]) => (
        <SelectedTimeItems
          key={date}
          date={date}
          selectedTimes={selectedTimes}
        />
      ))}
    </div>
  );
}
