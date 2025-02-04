"use client";

import {
  getLocations,
  getMember,
  MemberType,
  submitVote,
  VoteLocationType,
} from "@/features/events/services/firestore";
import { useAuthContext } from "@/features/users/components/authProvider";
import LoadingCover from "@/shared/components/loading/LoadingCover";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import VoteItems from "./(components)/VoteItems";
import ViewPoll from "./ViewPoll";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Vote({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { authLoading, user } = useAuthContext();
  const [locationChoices, setLocationChoices] = useState<VoteLocationType[]>(
    []
  );
  const [index, setIndex] = useState(-1);
  const [error, setError] = useState("");
  const [member, setMember] = useState<MemberType | undefined>(undefined);

  useEffect(() => {
    getLocations(eventId)
      .then((res) => setLocationChoices(res))
      .catch((e) => setError(e.message));
  }, [eventId]);

  useEffect(() => {
    if (user) {
      getMember(eventId, user.uid).then((e) => {
        setMember(e);
      });
    }
  }, [eventId, user]);

  if (authLoading) return <LoadingCover />;

  if (!user) {
    router.replace(`/event/${eventId}`);
    return <></>;
  }

  function submit(title: string) {
    if (!title) {
      return setError("Please select an location suggestion.");
    }
    submitVote(eventId, user!.uid, title)
      .then(() =>
        setMember((prev) => {
          if (!prev) return undefined;
          return { ...prev, vote: title };
        })
      )
      .catch((e) => setError(e.message));
  }

  if (member?.vote) return <ViewPoll eventId={eventId} />;

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <span className="m-4 w-full relative flex justify-center items-center">
        <Link
          href={`/event/${eventId}`}
          className="absolute -translate-y-1/2 top-1/2 left-2 px-2 py-1 bg-gray-100 rounded-md flex flex-row items-center"
        >
          <FaArrowLeft className="mr-2 size-3" />
          Back
        </Link>
        <h1 className="text-3xl">Vote</h1>
      </span>

      <p>Make a selection to vote for.</p>

      <ul className="my-2 flex flex-col w-full border-2 border-black rounded-md p-1">
        {locationChoices.map((item, i) => (
          <button onClick={() => setIndex(i)} key={i}>
            <VoteItems item={item} active={i === index} />
          </button>
        ))}
      </ul>

      <span className="w-full flex justify-end">
        {index >= 0 ? (
          <button
            className="p-button rounded-md bg-accent"
            onClick={() => submit(locationChoices[index].location.title)}
          >
            Vote (<b>{locationChoices[index].location.title}</b>)
          </button>
        ) : (
          <p className="p-button bg-gray-100 border-2 border-gray-200 rounded-md">
            Please select a location
          </p>
        )}
      </span>

      {error && (
        <p className="mt-2 p-1 bg-gray-100 w-full border-2 border-gray-200 rounded-md">
          {error}
        </p>
      )}
    </section>
  );
}
