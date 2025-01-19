import {
  LocationType,
  SelectedTimeType,
} from "@/features/events/services/firestore";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import LocationPicker from "./LocationPicker";
import { MdEditLocationAlt } from "react-icons/md";

export default function SelectedDateTimeItem({
  date,
  time,
  selectedLoc,
  selectedTimeData,
  deleteDateTime,
  setComment,
  setLocs,
}: {
  date: string;
  time: string;
  selectedLoc: LocationType[] | undefined;
  selectedTimeData: SelectedTimeType;
  deleteDateTime: (date: string, time: string) => void;
  setComment: (date: string, time: string, text: string) => void;
  setLocs: (date: string, time: string, loc: LocationType[]) => void;
}) {
  const { comment, locations } = selectedTimeData;
  const [isSelectLocs, setIsSelectLocs] = useState(false);

  return (
    <div className="flex flex-col border-2 border-black rounded-md">
      {selectedLoc && isSelectLocs && (
        <LocationPicker
          date={date}
          time={time}
          selectedLoc={selectedLoc}
          selectedTimeData={selectedTimeData}
          setLocs={setLocs}
          open={setIsSelectLocs}
        />
      )}

      <span className="flex flex-row border-b-2 border-black px-1">
        <p className="font-bold pr-1 flex items-center">{time}:00</p>

        {selectedLoc ? (
          <>
            <label
              className="border-l-2 border-black flex items-center p-1 w-full"
              htmlFor={`location-${date}-${time}`}
            >
              locations:
              <ul className="grid grid-flow-col gap-1 px-1 w-fit max-w-full overflow-auto">
                {locations?.map((loc) => (
                  <p
                    key={loc.title}
                    className="p-1 w-fit rounded-md bg-gray-100"
                  >
                    {loc.title}
                  </p>
                ))}
              </ul>
            </label>

            <button
              id={`location-${date}-${time}`}
              onClick={() => setIsSelectLocs((prev) => !prev)}
              className="p-1 m-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
            >
              <MdEditLocationAlt className="size-5" />
            </button>
          </>
        ) : (
          <p>Select locations to be able to add locations.</p>
        )}

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
