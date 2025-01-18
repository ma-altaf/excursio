import {
  LocationType,
  SelectedTimeType,
} from "@/features/events/services/firestore";
import { IoClose } from "react-icons/io5";
import SelectedDateTimeItem from "./SelectedDateTimeItem";

export default function SelectedDateItem({
  dateData,
  selectedLoc,
  deleteDate,
  deleteDateTime,
  setComment,
}: {
  dateData: [string, Map<string, SelectedTimeType>];
  selectedLoc: LocationType[] | undefined;
  deleteDate: (date: string) => void;
  deleteDateTime: (date: string, time: string) => void;
  setComment: (date: string, time: string, text: string) => void;
}) {
  const [date, times] = dateData;
  return (
    <div className="border-2 border-black rounded-md">
      <span className="flex flex-row items-center justify-between px-2 p-1">
        <b>{date}</b>
        <span className="border-l-2 pl-1">
          <button
            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
            title={`Remove: ${date}`}
            onClick={() => deleteDate(date)}
          >
            <IoClose className="size-5" />
          </button>
        </span>
      </span>
      <ul className="grid gap-1 grid-flow-row p-1 w-full rounded-md border-t-2 border-black">
        {times
          .entries()
          .toArray()
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map(([time, selectedTimeData], i) => (
            <SelectedDateTimeItem
              date={date}
              time={time}
              selectedLoc={selectedLoc}
              selectedTimeData={selectedTimeData}
              key={i}
              setComment={setComment}
              deleteDateTime={deleteDateTime}
            />
          ))}
      </ul>
    </div>
  );
}
