"use client";

import {
  LocationType,
  membersSnapShot,
  MemberType,
  SelectedTimeMap,
  setSelectedTimes,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import TimePicker from "./(components)/timePicker/TimePicker";
import WaitList from "@/shared/components/WaitList";
import SelectedTime from "./(components)/timePicker/selectedTime/SelectedTime";
import { redirect } from "next/navigation";

// MODERATE
// TODO: View users availability + finalize time
export default function Time({
  eventId,
  selectedLoc,
  selectedTime,
}: {
  eventId: string;
  selectedLoc: LocationType[] | undefined;
  selectedTime: SelectedTimeMap | undefined;
}) {
  const [members, setMembers] = useState<MemberType[]>([]);
  const selectedTimesUseState = useState<SelectedTimeMap | undefined>(
    selectedTime
  );
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [selectedTimes] = selectedTimesUseState;

  useEffect(() => {
    const unsub = membersSnapShot(eventId, true, (members) => {
      setMembers(members);
    });

    return () => {
      unsub.then(() => console.log("unsub members."));
    };
  }, [eventId]);

  function submit(selectedTimes: SelectedTimeMap | undefined) {
    if (!selectedTimes) return setError("Select atlease one time.");
    setSelectedTimes(eventId, selectedTimes)
      .then(() => setSuccess(true))
      .catch((e) => setError(e.message));
  }

  if (success) redirect(`/event/${eventId}`);

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%] relative">
      <h1 className="text-3xl p-4">Select Time</h1>

      <span className="h-fit w-fit flex flex-col">
        <WaitList
          headerText="Waiting for time availability:"
          completionText="All members have provided their availability."
          waitingMembers={members.filter((m) => m.times === undefined)}
        />

        <hr className="w-full border-b-2 my-1" />

        {members && members.length >= 1 ? (
          <TimePicker
            membersTimes={members
              .map((m) => m.times)
              .filter((t) => t !== undefined)}
            selectedTimesUseState={selectedTimesUseState}
            setChanged={setChanged}
          />
        ) : (
          <div className="flex flex-col p-1 border-2 border-black rounded-md w-full">
            <p className="text-center">
              No member has provided their available time.
            </p>
          </div>
        )}

        <hr className="w-full border-b-2 my-1" />

        <SelectedTime
          setChanged={setChanged}
          selectedTimesUseState={selectedTimesUseState}
          selectedLoc={selectedLoc}
        />

        <span className="w-full flex items-center justify-end mt-2">
          <button
            className="p-button rounded-md bg-accent"
            onClick={() => submit(selectedTimes)}
          >
            Submit
          </button>
        </span>

        {changed && (
          <p className="mt-2 py-1 px-2 w-full bg-gray-100 rounded-md border-2 border-gray-200">
            *Unsubmitted Changes, please submit your changes to save them.
          </p>
        )}

        {error && (
          <p className="mt-2 py-1 px-2 w-full bg-red-100 rounded-md border-2 border-red-200">
            {error}
          </p>
        )}
      </span>
    </section>
  );
}
