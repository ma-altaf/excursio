"use client";

import {
  MembersListSnapShot,
  pollsSnapShot,
  VoteLocationType,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import PollItem from "./PollItem";
import LoadingCover from "@/shared/components/loading/LoadingCover";

export default function Poll({ eventId }: { eventId: string }) {
  const [polls, setPolls] = useState<VoteLocationType[]>([]);
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const pollsSnap = pollsSnapShot(eventId, (polls) => {
      setPolls(polls.sort((a, b) => b.vote - a.vote));
    });

    const membersSnap = MembersListSnapShot(eventId, (res) => {
      setNames(res);
    });

    return () => {
      pollsSnap.then(() => console.log("Unsub to polls."));
      membersSnap.then(() => console.log("Unsub to members."));
    };
  }, [eventId]);

  const length = names.length;
  const votedLength = polls.reduce((total, m) => total + m.vote, 0);

  if (length <= 0) return <LoadingCover text="Loading polls..." />;

  return (
    <div className="w-full flex flex-col items-end">
      <ul className="w-full border-2 border-black rounded-md overflow-hidden">
        {polls.map((poll, i) => (
          <PollItem key={i} length={length} poll={poll} />
        ))}
      </ul>
      <p>
        Members voting: {votedLength}/{length}
      </p>
    </div>
  );
}
