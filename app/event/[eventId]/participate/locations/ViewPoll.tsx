import {
  pollsSnapShot,
  membersListSnapShot,
  PollType,
} from "@/features/events/services/firestore";
import LoadingCover from "@/shared/components/loading/LoadingCover";
import { useState, useEffect } from "react";
import Poll from "./(components)/Poll";

export default function ViewPoll({ eventId }: { eventId: string }) {
  const [polls, setPolls] = useState<PollType[]>([]);
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    const pollsSnap = pollsSnapShot(eventId, (polls) => {
      setPolls(
        polls
          .map((el) => ({ title: el.location.title, vote: el.vote }))
          .sort((a, b) => b.vote - a.vote)
      );
    });

    const namesSnap = membersListSnapShot(eventId, (res) => {
      setNames(res);
    });

    return () => {
      pollsSnap.then(() => console.log("Unsub to polls."));
      namesSnap.then(() => console.log("Unsub to members."));
    };
  }, [eventId]);

  const length = names.length;

  if (length <= 0) return <LoadingCover text="Loading polls..." />;

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-4">Live Polling</h1>

      <div className="w-full my-auto">
        <Poll polls={polls} length={length} />
      </div>
    </section>
  );
}
