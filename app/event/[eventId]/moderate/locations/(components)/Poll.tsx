"use client";

import { LocationType } from "@/features/events/services/firestore";
import PollItem from "./PollItem";
import { IoCheckmark } from "react-icons/io5";

export type PollType = { title: string; vote: number };

export default function Poll({
  polls,
  length,
  activeLocations,
  toggleLocation,
}: {
  polls: PollType[];
  length: number;
  activeLocations: LocationType[];
  toggleLocation: (title: string) => void;
}) {
  const votedLength = polls.reduce((total, m) => total + m.vote, 0);

  return (
    <div className="w-full flex flex-col items-end">
      <ul className="w-full border-2 border-black rounded-md overflow-hidden">
        {polls.map((poll, i) => {
          const active = activeLocations
            .map((el) => el.title)
            .includes(poll.title);
          return (
            <button
              className="w-full overflow-hidden relative"
              key={i}
              title={`${active ? "Remove" : "Add"}: ${poll.title}`}
              onClick={() => toggleLocation(poll.title)}
            >
              <PollItem length={length} poll={poll} />
              {active && (
                <IoCheckmark className="absolute top-0 right-0 h-full size-5 mr-2" />
              )}
            </button>
          );
        })}
      </ul>
      <p>
        Members voted: {votedLength} out of {length}
      </p>
    </div>
  );
}
