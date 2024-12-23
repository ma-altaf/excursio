import { namedMonths } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function DateHeader({
  currDate,
  setCurrDate,
}: {
  currDate: Date;
  setCurrDate: Dispatch<SetStateAction<Date>>;
}) {
  function incrementMonth(increment: number) {
    currDate.setMonth(currDate.getMonth() + increment);
    return new Date(currDate);
  }

  return (
    <div className="flex flex-row w-full justify-between p-1">
      <button
        className="py-1 px-2 bg-gray-100 rounded-md"
        onClick={() => {
          const newDate = incrementMonth(-1);
          setCurrDate(newDate);
        }}
      >
        <IoIosArrowBack className="size-5" />
      </button>
      <p>
        {namedMonths[currDate.getMonth()]} / {currDate.getFullYear()}
      </p>
      <button
        className="py-1 px-2 bg-gray-100 rounded-md"
        onClick={() => {
          const newDate = incrementMonth(1);
          setCurrDate(newDate);
        }}
      >
        <IoIosArrowForward className="size-5" />
      </button>
    </div>
  );
}
