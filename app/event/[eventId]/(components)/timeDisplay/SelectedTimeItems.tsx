import { SelectedTimeType } from "@/features/events/services/firestore";
import { namedMonths } from "@/shared/services/utils";

export default function SelectedTimeItems({
  date,
  selectedTimes,
}: {
  date: string;
  selectedTimes: Map<string, SelectedTimeType>;
}) {
  const [year, month, d] = date.split("-");
  return (
    <div className="flex flex-row w-full items-center">
      <span>
        <div className="flex flex-col p-2 w-12 justify-center items-center">
          <p>{d}</p>
          <p className="font-bold uppercase">
            {namedMonths[Number(month) - 1].substring(0, 3)}
          </p>
          <p className="text-[0.75rem]">{year}</p>
        </div>
      </span>
      <span className="border-l-2 p-2 w-full">
        {selectedTimes
          .entries()
          .toArray()
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map((selectedTime, i) => (
            <span key={`item-${i}`}>
              <Item selectedTime={selectedTime} />
              {i !== selectedTimes.size - 1 && (
                <hr className="w-full border-b-2" />
              )}
            </span>
          ))}
      </span>
    </div>
  );
}

export function Item({
  selectedTime,
}: {
  selectedTime: [string, SelectedTimeType];
}) {
  const [time, { comment, locations }] = selectedTime;
  return (
    <div className="flex flex-col py-1 w-full">
      <span className="flex flex-row">
        <p className="flex items-center font-bold">{time}:00</p>
        {locations && (
          <ul className="ml-1 px-1 border-l-2 border-black max-w-full w-fit grid grid-flow-col gap-1 overflow-auto">
            <p>location{locations.length > 1 && "s"}:</p>
            {locations.map(({ title }, i) => (
              <p key={i} className="px-1 w-fit rounded-md bg-gray-100">
                {title}
              </p>
            ))}
          </ul>
        )}
      </span>
      <p className="px-1 border-l-2">{comment}</p>
    </div>
  );
}
