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
  const currMonth = new Date(new Date().setDate(1));
  function incrementMonth(increment: number) {
    currDate.setMonth(currDate.getMonth() + increment);
    if (currDate < currMonth) return currMonth;
    return new Date(currDate);
  }

  return (
    <div className="flex flex-row w-full items-center justify-between p-1 border-b-2 border-black">
      <button
        className="py-2 px-3 bg-gray-200 hover:bg-gray-300 rounded-md"
        onClick={() => {
          const newDate = incrementMonth(-1);
          setCurrDate(newDate);
        }}
      >
        <IoIosArrowBack className="size-5" />
      </button>
      <p>
        <b>{namedMonths[currDate.getMonth()]}</b> / {currDate.getFullYear()}
      </p>
      <button
        className="py-2 px-3 bg-gray-200 hover:bg-gray-300 rounded-md"
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
