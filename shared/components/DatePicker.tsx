import { Dispatch, SetStateAction, useState } from "react";

export default function DatePicker() {
  const [currDate, setCurrDate] = useState(new Date(new Date().setDate(1)));

  return (
    <div className="bg-black flex flex-col w-full max-w-screen-sm">
      <DateHeader currDate={currDate} setCurrDate={setCurrDate} />
      <div className="w-full p-1 grid grid-cols-7">
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
      </div>
    </div>
  );
}

function DateHeader({
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
    <div className="flex flex-row w-full justify-between">
      <button
        className="py-1 px-4 bg-gray-200 rounded-md"
        onClick={() => {
          const newDate = incrementMonth(-1);
          setCurrDate(newDate);
        }}
      >
        {"<"}
      </button>
      <p>
        {currDate.getMonth() + 1} / {currDate.getFullYear()}
      </p>
      <button
        className="py-1 px-4 bg-gray-200 rounded-md"
        onClick={() => {
          const newDate = incrementMonth(1);
          setCurrDate(newDate);
        }}
      >
        {">"}
      </button>
    </div>
  );
}
