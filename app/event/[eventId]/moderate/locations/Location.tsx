"use client";

import { useEffect, useState } from "react";
import SelectedSuggestions from "./(components)/SelectedSuggestions";
import SuggestedLocations from "./(components)/SuggestedLocations";
import {
  getLocations,
  LocationType,
  membersSnapShot,
  MemberType,
  setLocations,
  updateLocationOptStatus,
  VoteLocationType,
} from "@/features/events/services/firestore";
import { useRouter } from "next/navigation";
import WaitList from "@/shared/components/WaitList";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function Location({ eventId }: { eventId: string }) {
  const router = useRouter();
  const [members, setMembers] = useState<MemberType[]>([]);
  const [toVote, setToVote] = useState<VoteLocationType[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const sub = membersSnapShot(eventId, true, (members) =>
      setMembers(members.filter((el) => el.active))
    );

    return () => {
      sub.then(() => {
        console.log("unsub member snapshot");
      });
    };
  }, [eventId]);

  useEffect(() => {
    if (success) {
      router.push(`/event/${eventId}`);
    }
  }, [router, eventId, success]);

  useEffect(() => {
    getLocations(eventId).then((res) => setToVote(res));
  }, [eventId]);

  function onRemove(title: string) {
    setToVote((prev) => prev.filter((l) => l.location.title !== title));
  }

  function onAdd(locData: LocationType) {
    setToVote((prev) => [...prev, { location: locData, vote: 0 }]);
  }

  function save(toVote: VoteLocationType[]) {
    setLocations(eventId, toVote)
      .then(() => setSuccess(true))
      .catch((e) => setError(e.message));
  }

  function submit(toVote: VoteLocationType[]) {
    setLocations(eventId, toVote)
      .then(() => {
        updateLocationOptStatus(eventId, "vote")
          .then(() => setSuccess(true))
          .catch((e) => setError(e.message));
      })
      .catch((e) => setError(e.message));
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <span className="m-4 w-full flex justify-center items-center">
        <Link
          href={`/event/${eventId}`}
          className="p-3 bg-gray-100 rounded-md flex flex-row items-center"
        >
          <FaArrowLeft className="size-4" />
        </Link>
        <h1 className="text-3xl w-full text-center">Moderate Locations</h1>
      </span>

      <WaitList
        headerText="Waiting for suggestions:"
        completionText={`All members (${members.length}) have suggested their locations.`}
        waitingMembers={members.filter((el) => el.locations === undefined)}
      />

      <hr className="w-full border-b-2 my-1" />

      <SuggestedLocations
        onAdd={onAdd}
        members={members}
        selectedLocations={toVote}
      />

      <hr className="w-full border-b-2 my-1" />

      <SelectedSuggestions selectedLocations={toVote} onRemove={onRemove} />

      <span className="w-full flex items-center justify-end my-2">
        <button
          className="p-button rounded-md bg-gray-100"
          onClick={() => save(toVote)}
        >
          Save
        </button>
        <hr className="w-2" />
        <button
          className="p-button rounded-md bg-accent"
          onClick={() => submit(toVote)}
        >
          Submit & move to Vote
        </button>
      </span>

      <Link
        href={`/event/${eventId}/admin?step=location`}
        className="p-1 bg-gray-100 border-2 border-gray-200 rounded-md underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
      >
        Add selected suggestions as admin
      </Link>

      {error && (
        <p className="p-1 bg-gray-100 border-2 border-gray-200 rounded-md">
          {error}
        </p>
      )}
    </section>
  );
}
