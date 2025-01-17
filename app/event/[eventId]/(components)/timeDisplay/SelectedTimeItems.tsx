import {
  SelectedTimeMap,
  SelectedTimeType,
} from "@/features/events/services/firestore";

export default function SelectedTimeItems({
  date,
  selectedTimes,
}: {
  date: string;
  selectedTimes: SelectedTimeMap;
}) {
  return (
    <div className="flex flex-col">
      <p>{date}</p>
      <span className="border-l-2">
        {selectedTimes
          .entries()
          .toArray()
          .map((selectedTime, i) => (
            <Item key={i} selectedTime={selectedTime} />
          ))}
      </span>
    </div>
  );
}

export function Item({ selectedTime }: { selectedTime: SelectedTimeType }) {
  const { startTime, comment } = selectedTime;
  return (
    <span>
      <p>
        {startTime.getHours()}:{startTime.getMinutes()}
      </p>{" "}
      <p>{comment}</p>
    </span>
  );
}
