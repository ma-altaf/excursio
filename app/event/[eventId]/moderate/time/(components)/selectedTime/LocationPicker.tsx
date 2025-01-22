"use client";

import {
  LocationType,
  SelectedTimeType,
} from "@/features/events/services/firestore";
import Toggle from "@/shared/components/Toggle";

export default function LocationPicker({
  selectedLoc,
  selectedTimeData,
  date,
  time,
  setLocs,
}: {
  selectedLoc: LocationType[];
  selectedTimeData: SelectedTimeType;
  date: string;
  time: string;
  setLocs: (date: string, time: string, loc: LocationType[]) => void;
}) {
  const locs = selectedTimeData.locations || [];

  function updatedLocs(loc: LocationType): LocationType[] {
    if (locs.map((el) => el.title).includes(loc.title))
      return locs.filter((el) => el.title !== loc.title);

    return [...locs, loc];
  }

  return (
    <div className="w-full border-b-2 rounded-md border-black">
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
