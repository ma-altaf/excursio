import { fullDay, TimeStateType } from "@/shared/services/utils";
import { Dispatch, SetStateAction } from "react";
import Time from "./Time";

export default function TimePicker({
  dateUseState,
  setChanged,
  showGuide = true,
}: {
  dateUseState: [
    Map<string, TimeStateType[]>,
    Dispatch<SetStateAction<Map<string, TimeStateType[]>>>
  ];
  setChanged: Dispatch<SetStateAction<boolean>>;
  showGuide?: boolean;
}) {
  return (
    <div className="rounded-md border-2 border-black flex flex-col max-h-[75vh] max-w-screen-sm mx-1 w-full">
      {showGuide && (
        <div className="w-full p-1 flex flex-col">
          <p>
            <b>Click:</b> toggle time cell.
          </p>
          <p>
            <b>Double Click:</b> toggle all subsequent time cells.
          </p>
          <p>
            <b>Click + Drag:</b> toggle time cells on hover.
          </p>
        </div>
      )}

      <div
        className={`rounded-md ${
          showGuide && "border-t-2"
        } border-black flex flex-row overflow-auto`}
      >
        <div className="h-full sticky left-0 bg-background z-50 w-14">
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
    </div>
  );
}
