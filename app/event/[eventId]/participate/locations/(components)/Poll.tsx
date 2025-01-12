"use client";

import {
  getMembers,
  pollsSnapShot,
  VoteLocationType,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import PollItem from "./PollItem";
import LoadingCover from "@/shared/components/loading/LoadingCover";

export default function Poll({ eventId }: { eventId: string }) {
  const [polls, setPolls] = useState<VoteLocationType[]>([]);
  const [length, setLength] = useState(0);

  useEffect(() => {
    const pollsSnap = pollsSnapShot(eventId, (polls) => {
      setPolls(polls.sort((a, b) => b.vote - a.vote));
    });

    getMembers(eventId, true).then((res) => {
      setLength(res.length);
    });

    return () => {
      pollsSnap.then(() => console.log("Unsub to polls."));
    };
  }, [eventId]);

  if (length <= 0) return <LoadingCover text="Loading polls..." />;

  return (
    <ul className="w-full border-2 border-black rounded-md overflow-hidden">
      {polls.map((poll, i) => (
        <PollItem key={i} length={length} poll={poll} />
      ))}
    </ul>
  );
}
