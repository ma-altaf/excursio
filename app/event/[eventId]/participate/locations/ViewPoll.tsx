import {
  pollsSnapShot,
  membersListSnapShot,
  PollType,
} from "@/features/events/services/firestore";
import LoadingCover from "@/shared/components/loading/LoadingCover";
import { useState, useEffect } from "react";
import Poll from "./(components)/Poll";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

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
      <span className="m-4 w-full flex justify-center items-center">
        <Link
          href={`/event/${eventId}`}
          className="p-3 bg-gray-100 rounded-md flex flex-row items-center"
        >
          <FaArrowLeft className="size-4" />
        </Link>
        <h1 className="text-3xl w-full text-center">Live Polling</h1>
      </span>

      <div className="w-full my-auto">
        <Poll polls={polls} length={length} />
      </div>
    </section>
  );
}
