"use client";

import { PollType } from "@/features/events/services/firestore";
import PollItem from "./PollItem";

export default function Poll({
  polls,
  length,
}: {
  polls: PollType[];
  length: number;
}) {
  const votedLength = polls.reduce((total, m) => total + m.vote, 0);

  return (
    <div className="w-full flex flex-col items-end">
      <ul className="w-full border-2 border-black rounded-md overflow-hidden">
        {polls.map((poll, i) => (
          <PollItem key={i} length={length} poll={poll} />
        ))}
      </ul>
      <p>
        Members voting: {votedLength} out of {length}
      </p>
    </div>
  );
}
