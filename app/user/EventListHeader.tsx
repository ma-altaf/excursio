import { Dispatch, SetStateAction } from "react";
import { VisibilityType } from "@/features/events/services/firestore";

export default function EventListHeader({
  visibility,
  setVisibility,
}: {
  visibility: VisibilityType;
  setVisibility: Dispatch<SetStateAction<VisibilityType>>;
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
