import { fullDay } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import TimePanel from "./TimePanel";

export default function TimePicker({
  dateUseState,
}: {
  dateUseState: [
    Map<string, boolean[]>,
    Dispatch<SetStateAction<Map<string, boolean[]>>>
  ];
}) {
  return (
    <div className="rounded-md border-2 border-black flex flex-row max-h-[75vh] max-w-screen-sm overflow-auto">
      <div className="h-full">
        <div
          className="bg-blue-300 border-b-2 border-r-2 border-black"
          style={{ height: "6rem" }}
        >
          {/* spacer */}
        </div>
        <span className="flex flex-col border-r-2 border-r-black">
          {fullDay.map((_, i) => {
            return (
              <div
                key={i}
                className="h-8 px-1 border-b-2 border-black w-full flex justify-end items-center"
              >
                {i}:00
              </div>
            );
          })}
        </span>
      </div>
      <TimePanel dateUseState={dateUseState} />
    </div>
  );
}
