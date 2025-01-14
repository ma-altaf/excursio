import { fullDay, TimeStateType } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import Time from "./Time";

export default function TimePicker({
  dateUseState,
  setChanged,
}: {
  dateUseState: [
    Map<string, TimeStateType[]>,
    Dispatch<SetStateAction<Map<string, TimeStateType[]>>>
  ];
  setChanged: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="rounded-md border-2 border-black flex flex-row max-h-[75vh] max-w-screen-sm overflow-auto">
      <div className="h-full">
        <div
          className=" border-b-2 border-r-2 border-black"
          style={{ height: "7rem" }}
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
      <Time dateUseState={dateUseState} setChanged={setChanged} />
    </div>
  );
}
