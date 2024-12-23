import { useState } from "react";
import DateHeader from "./DatePickerHeader";
import DateUnit from "./DatePickerUnit";
import { namedDays } from "@/shared/services/utils";

export default function DatePicker() {
  const [currDate, setCurrDate] = useState(new Date(new Date().setDate(1)));

  function renderUnits(month: Date) {
    const firstDayIndex = month.getDay();
    const lastDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const components = [];
    for (let index = 0; index < firstDayIndex; index++) {
      components.push(<div key={`filler-${index}`}></div>);
    }
    for (let index = 1; index < lastDate.getDate() + 1; index++) {
      components.push(
        <DateUnit text={`${index}`} isActive={false} key={`${index}`} />
      );
    }
    return components;
  }

  return (
    <div className="flex flex-col w-fit">
      <DateHeader currDate={currDate} setCurrDate={setCurrDate} />
      <div className="p-1 grid grid-cols-7">
        {namedDays.map((d) => (
          <div className="flex justify-center items-center p-1" key={d}>
            {d.substring(0, 3)}
          </div>
        ))}
        {renderUnits(currDate)}
      </div>
    </div>
  );
}
