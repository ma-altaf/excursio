"use client";

import { useEffect, useState } from "react";
import Poll from "./(components)/Poll";
import {
  getSetectedLocations,
  LocationType,
  membersSnapShot,
  MemberType,
  pollsSnapShot,
  setSelectedLocations,
  VoteLocationType,
} from "@/features/events/services/firestore";
import LoadingCover from "@/shared/components/loading/LoadingCover";
import WaitList from "@/shared/components/WaitList";
import { redirect } from "next/navigation";
import SelectedLocationsList from "./(components)/SelectedLocationsList";

export default function SelectLocations({ eventId }: { eventId: string }) {
  const [polls, setPolls] = useState<VoteLocationType[]>([]);
  const [members, setMembers] = useState<MemberType[]>([]);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const pollsSnap = pollsSnapShot(eventId, (polls) => {
      setPolls(polls.map((el) => el).sort((a, b) => b.vote - a.vote));
    });

    const namesSnap = membersSnapShot(eventId, true, (res) => {
      setMembers(res);
    });

    getSetectedLocations(eventId).then((res) => {
      if (res) setLocations(res);
    });

    return () => {
      pollsSnap.then(() => console.log("Unsub to polls."));
      namesSnap.then(() => console.log("Unsub to members."));
    };
  }, [eventId]);

  if (success) redirect(`/event/${eventId}`);

  const length = members.length;

  if (length <= 0) return <LoadingCover text="Loading polls..." />;

  function toggleLocation(title: string) {
    if (locations.map((el) => el.title).includes(title)) return onRemove(title);

    setLocations((prev) => {
      const newLocation = polls.find((el) => el.location.title === title);

      if (!newLocation) {
        setError("Could not add location.");
        return prev;
      }
      return [...prev, newLocation.location];
    });
  }

  function onRemove(title: string) {
    setLocations((prev) => prev.filter((l) => l.title !== title));
  }

  function submit(selectedLocations: LocationType[]) {
    if (locations.length === 0)
      return setError("Select at least one location.");
    setSelectedLocations(eventId, selectedLocations)
      .then(() => setSuccess(true))
      .catch((e) => setError(e.message));
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-4">Select Locations</h1>

      <WaitList
        headerText="Waiting for vote:"
        completionText="All members have voted."
        waitingMembers={members.filter((m) => !m.vote)}
      />

      <hr className="w-full border-b-2 my-2" />

      <Poll
        polls={polls.map(({ location, vote }) => ({
          title: location.title,
          vote,
        }))}
        length={length}
        toggleLocation={toggleLocation}
        activeLocations={locations}
      />

      <hr className="w-full border-b-2 mb-2" />

      <SelectedLocationsList
        selectedLocations={locations}
        onRemove={onRemove}
      />

      <span className="w-full flex flex-row justify-end my-2">
        <button
          className="p-button rounded-md bg-accent"
          onClick={() => submit(locations)}
        >
          Submit
        </button>
      </span>

      {error && (
        <p className="p-1 w-full bg-gray-100 border-2 border-gray-200 rounded-md">
          {error}
        </p>
      )}
    </section>
  );
}
