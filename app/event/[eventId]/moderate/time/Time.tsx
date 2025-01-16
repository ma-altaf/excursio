"use client";

import {
  membersSnapShot,
  MemberType,
  SelectedTimeMap,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import TimePicker from "./(components)/timePicker/TimePicker";
import WaitList from "@/shared/components/WaitList";

// MODERATE
// TODO: View users availability + finalize time
export default function Time({ eventId }: { eventId: string }) {
  const [members, setMembers] = useState<MemberType[]>([]);
  const selectedTimesUseState = useState<SelectedTimeMap | undefined>(
    undefined
  );
  const [changed, setChanged] = useState(false);

  const [selectedTimes, setSelectedTimes] = selectedTimesUseState;

  useEffect(() => {
    const unsub = membersSnapShot(eventId, true, (members) => {
      setMembers(members);
    });

    return () => {
      unsub.then(() => console.log("unsub members."));
    };
  }, [eventId]);

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      {members && members.length >= 1 && (
        <TimePicker
          membersTimes={members
            .map((m) => m.times)
            .filter((t) => t !== undefined)}
          selectedTimesUseState={selectedTimesUseState}
          setChanged={setChanged}
        />
      )}

      <hr className="w-full border-b-2 my-1" />

      <WaitList
        headerText="Waiting for time availability:"
        completionText="All members have provided their availability."
        waitingMembers={members.filter((m) => m.times === undefined)}
      />

      {changed && (
        <p className="mt-2 py-1 px-2 bg-gray-100 rounded-md border-2 border-gray-200">
          *Unsubmitted Changes, please submit your changes to save them.
        </p>
      )}
    </section>
  );
}
