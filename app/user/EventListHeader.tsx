import { Dispatch, SetStateAction } from "react";
import { visibilityType } from "@/features/events/services/firestore";

export default function EventListHeader({
  visibility,
  setVisibility,
}: {
  visibility: visibilityType;
  setVisibility: Dispatch<SetStateAction<visibilityType>>;
}) {
  return (
    <div className="w-full flex flex-row justify-evenly">
      <button
        onClick={() => setVisibility("public")}
        className={`${
          visibility == "public" ? "border-black border-t-2 font-bold" : ""
        } w-full flex flex-row justify-center p-1 mx-6`}
      >
        <p>Public</p>
      </button>
      <div className="bg-gray-200 w-[1px]"></div>
      <button
        onClick={() => setVisibility("private")}
        className={`${
          visibility == "private" ? "border-black border-t-2 font-bold" : ""
        } w-full flex flex-row justify-center p-1 mx-6`}
      >
        <p>Private</p>
      </button>
    </div>
  );
}
