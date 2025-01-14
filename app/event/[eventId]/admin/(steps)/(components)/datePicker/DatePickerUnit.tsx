import { formatDate, fullDay, TimeStateType } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";

export default function DateUnit({
  date,
  isActive,
  disabled,
  setDates,
  setChanged,
}: {
  date: Date;
  isActive: boolean;
  disabled: boolean;
  setDates: Dispatch<SetStateAction<Map<string, TimeStateType[]>>>;
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  function updateDates(date: Date) {
    const dateStr = formatDate(date);

    setDates((prev) => {
      if (isActive) {
        prev.delete(dateStr);
      } else {
        prev.set(dateStr, [...fullDay]);
      }
      setChanged(true);
      return new Map(prev);
    });
  }

  return (
    <span className="flex justify-center items-center p-1 w-full">
      {disabled ? (
        <div className="flex justify-center items-center rounded-md size-14 bg-gray-100 text-gray-300">
          {date.getDate()}
        </div>
      ) : (
        <button
          onClick={() => updateDates(date)}
          disabled={disabled}
          className={`flex justify-center items-center transition-colors ${
            isActive ? "bg-accent" : "bg-gray-200"
          } rounded-md size-14 border-black hover:border-2`}
        >
          {date.getDate()}
        </button>
      )}
    </span>
  );
}
