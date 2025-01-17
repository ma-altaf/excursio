import {
  LocationType,
  SelectedTimeType,
} from "@/features/events/services/firestore";
import { IoClose } from "react-icons/io5";

export default function SelectedDateTimeItem({
  date,
  time,
  selectedLoc,
  selectedTimeData,
  deleteDateTime,
  setComment,
}: {
  date: string;
  time: number;
  selectedLoc: LocationType[] | undefined;
  selectedTimeData: SelectedTimeType;
  deleteDateTime: (date: string, time: string) => void;
  setComment: (date: string, time: string, text: string) => void;
}) {
  const { comment, locations } = selectedTimeData;
  return (
    <div className="flex flex-col border-2 border-black rounded-md">
      <span className="flex flex-row border-b-2 border-black px-1">
        <p className="font-bold pr-1 flex items-center">{time}:00</p>

        <label
          className="border-l-2 border-black flex items-center p-1 w-full"
          htmlFor={`location-${date}-${time}`}
        >
          locations:
          <ul className="flex flex-row items-center p-1 w-full bg-green-200">
            {locations?.map((loc) => (
              <p className="p-1 rounded-md bg-gray-100" key={loc.title}>
                {loc.title}
              </p>
            ))}
          </ul>
        </label>

        <span className="border-l-2 border-black pl-1 flex items-center">
          <button
            className="p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
            title={`Remove: ${date} : ${time}:00`}
            onClick={() => deleteDateTime(date, time)}
          >
            <IoClose className="size-5" />
          </button>
        </span>
      </span>
      <span className="p-1 flex flex-col">
        <label htmlFor={`comment-${date}-${time}`}>Comment:</label>
        <textarea
          className="py-1 px-2 rounded-md focus:outline-accent"
          name={`comment-${date}-${time}`}
          rows={3}
          id={`comment-${date}-${time}`}
          defaultValue={comment}
          onChange={(e) => setComment(date, time, e.target.value)}
        ></textarea>
      </span>
    </div>
  );
}
