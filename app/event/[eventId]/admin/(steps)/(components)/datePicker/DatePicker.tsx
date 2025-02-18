import { Dispatch, SetStateAction, useState } from "react";
import DateHeader from "./DatePickerHeader";
import DateUnit from "./DatePickerUnit";
import {
  formatDate,
  namedDays,
  TimeStateType,
  today,
} from "@/shared/services/utils";

export default function DatePicker({
  dateUseState,
  setChanged,
}: {
  dateUseState: [
    Map<string, TimeStateType[]>,
    Dispatch<SetStateAction<Map<string, TimeStateType[]>>>
  ];
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  const [currDate, setCurrDate] = useState(new Date(new Date().setDate(1)));
  const [dates, setDates] = dateUseState;

  function renderUnits(month: Date) {
    const firstDayIndex = month.getDay();
    const lastDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const components = [];
    for (let index = 0; index < firstDayIndex; index++) {
      components.push(<div key={`filler-${index}`}></div>);
    }
    for (let index = 1; index < lastDate.getDate() + 1; index++) {
      const date = new Date(month.setDate(index));
      const dateStr = formatDate(date);

      components.push(
        <DateUnit
          disabled={date < today}
          date={date}
          isActive={dates.has(dateStr)}
          setDates={setDates}
          setChanged={setChanged}
          key={`${index}`}
        />
      );
    }
    return components;
  }

  return (
    <div className="flex flex-col w-fit rounded-md border-2 border-black">
      <DateHeader currDate={currDate} setCurrDate={setCurrDate} />
      <div className="p-1 grid grid-cols-7 gap-1 sm:gap-2">
        {namedDays.map((d) => (
          <div className="flex justify-center items-center" key={d}>
            {d.substring(0, 3)}
          </div>
        ))}
        {renderUnits(new Date(currDate))}
      </div>
    </div>
  );
}
