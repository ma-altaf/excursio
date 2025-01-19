"use client";

import {
  LocationType,
  SelectedTimeType,
} from "@/features/events/services/firestore";
import Toggle from "@/shared/components/Toggle";
import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

export default function LocationPicker({
  selectedLoc,
  selectedTimeData,
  date,
  time,
  setLocs,
  open,
}: {
  selectedLoc: LocationType[];
  selectedTimeData: SelectedTimeType;
  date: string;
  time: string;
  setLocs: (date: string, time: string, loc: LocationType[]) => void;
  open: Dispatch<SetStateAction<boolean>>;
}) {
  const locs = selectedTimeData.locations || [];

  function updatedLocs(loc: LocationType): LocationType[] {
    if (locs.map((el) => el.title).includes(loc.title))
      return locs.filter((el) => el.title !== loc.title);

    return [...locs, loc];
  }

  return (
    <div
      className="w-full h-full bg-black bg-opacity-50 absolute top-0 left-0 flex justify-center items-center"
      onClick={() => open(false)}
    >
      <div
        className="bg-white w-fit rounded-md p-2"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <span className="flex flex-row items-center justify-between mb-1">
          <p>Locations:</p>
          <button
            onClick={() => open(false)}
            className="ml-4 p-1 rounded-md bg-gray-100 hover:bg-gray-200 transition-all"
          >
            <IoClose className="size-5" />
          </button>
        </span>
        <ul className="flex flex-col">
          {selectedLoc.map((loc, i) => (
            <LocItem
              key={i}
              locData={loc}
              checked={locs.map((el) => el.title).includes(loc.title)}
              updateLocs={() => setLocs(date, time, updatedLocs(loc))}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

function LocItem({
  locData,
  checked,
  updateLocs,
}: {
  locData: LocationType;
  checked: boolean;
  updateLocs: () => void;
}) {
  const { title } = locData;
  return (
    <label
      htmlFor={`loc-${title}`}
      className="flex flex-row items-center justify-between hover:bg-gray-100 py-1 px-2 rounded-md"
    >
      {title}
      <Toggle checked={checked} id={`loc-${title}`} onChange={updateLocs} />
    </label>
  );
}
