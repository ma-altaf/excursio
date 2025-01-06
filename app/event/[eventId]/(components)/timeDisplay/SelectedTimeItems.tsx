import { SelectedTime } from "@/features/events/services/firestore";

export default function SelectedTimeItems({
  date,
  selectedTimes,
}: {
  date: string;
  selectedTimes: SelectedTime[];
}) {
  return (
    <div className="flex flex-col">
      <p>{date}</p>
      <span className="border-l-2">
        {selectedTimes.map((selectedTime, i) => (
          <Item key={i} selectedTime={selectedTime} />
        ))}
      </span>
    </div>
  );
}

export function Item({ selectedTime }: { selectedTime: SelectedTime }) {
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
