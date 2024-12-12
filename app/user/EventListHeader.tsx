import { Dispatch, SetStateAction } from "react";

export default function EventListHeader({
  hidden,
  setHidden,
}: {
  hidden: boolean;
  setHidden: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="w-full flex flex-row justify-evenly">
      <button
        onClick={() => setHidden(false)}
        className={`${
          !hidden ? "border-black border-t-2" : ""
        } w-full flex flex-row justify-center p-1 mx-6`}
      >
        <p>Public</p>
      </button>
      <div className="bg-gray-200 w-[1px]"></div>
      <button
        onClick={() => setHidden(true)}
        className={`${
          hidden ? "border-black border-t-2" : ""
        } w-full flex flex-row justify-center p-1 mx-6`}
      >
        <p>Private</p>
      </button>
    </div>
  );
}
