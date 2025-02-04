"use client";

import {
  getDateTimes,
  getSelectedTimes,
  getSetectedLocations,
  LocationType,
  membersSnapShot,
  MemberType,
  SelectedTimeMap,
  setSelectedTimes,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import TimePicker from "./(components)/timePicker/TimePicker";
import WaitList from "@/shared/components/WaitList";
import SelectedTime from "./(components)/selectedTime/SelectedTime";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TimeStateType } from "@/shared/services/utils";
import MemberTime from "./(components)/membersTime/MemberTime";
import { FaArrowLeft } from "react-icons/fa";

// MODERATE
// TODO: View users availability + finalize time
export default function Time({ eventId }: { eventId: string }) {
  const selectedTimesUseState = useState<SelectedTimeMap | undefined>(
    undefined
  );
  const [selectedLoc, setSelectedLoc] = useState<LocationType[] | undefined>(
    undefined
  );
  const [times, setTimes] = useState<Map<string, TimeStateType[]> | undefined>(
    undefined
  );

  const router = useRouter();
  const [members, setMembers] = useState<MemberType[]>([]);
  const [changed, setChanged] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [availableMembers, setAvailableMembers] = useState<
    Map<string, TimeStateType[]>[]
  >([]);
  const useStateMembers = useState(new Set<string>());
  const [membersId] = useStateMembers;

  const [selectedTimes, setSelectedTime] = selectedTimesUseState;

  useEffect(() => {
    const unsub = membersSnapShot(eventId, true, (members) => {
      setMembers(members);
    });

    Promise.all([
      getDateTimes(eventId),
      getSetectedLocations(eventId),
      getSelectedTimes(eventId),
    ]).then(([times, selectedLoc, selectedTime]) => {
      setTimes(times);
      setSelectedLoc(selectedLoc);
      setSelectedTime(selectedTime);
    });

    return () => {
      unsub.then(() => console.log("unsub members."));
    };
  }, [eventId, setSelectedTime]);

  useEffect(() => {
    if (membersId.size === 0) {
      setAvailableMembers(
        members.map((m) => m.times).filter((t) => t !== undefined)
      );
    } else {
      setAvailableMembers(
        members
          .filter((el) => membersId.has(el.uid))
          .map((m) => m.times)
          .filter((t) => t !== undefined)
      );
    }
  }, [membersId, members]);

  useEffect(() => {
    if (success) {
      router.push(`/event/${eventId}`);
    }
  }, [router, eventId, success]);

  function submit(selectedTimes: SelectedTimeMap | undefined) {
    if (!selectedTimes) return setError("Select at least one time slot.");
    setSelectedTimes(eventId, selectedTimes)
      .then(() => setSuccess(true))
      .catch((e) => setError(e.message));
  }

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%] relative">
      <span className="m-4 w-full relative flex justify-center items-center">
        <Link
          href={`/event/${eventId}`}
          className="absolute -translate-y-1/2 top-1/2 left-2 px-2 py-1 bg-gray-100 rounded-md flex flex-row items-center"
        >
          <FaArrowLeft className="mr-2 size-3" />
          Back
        </Link>
        <h1 className="text-3xl">Select Time</h1>
      </span>

      <span className="h-fit max-w-full w-fit flex flex-col">
        <WaitList
          headerText="Waiting for time availability:"
          completionText={`All members (${members.length}) have provided their availability.`}
          waitingMembers={members.filter((m) => m.times === undefined)}
        />

        <hr className="w-full border-b-2 my-1" />

        {times ? (
          <TimePicker
            times={times}
            membersTimes={availableMembers}
            selectedTimesUseState={selectedTimesUseState}
            setChanged={setChanged}
          />
        ) : (
          <div className="flex flex-col p-1 border-2 border-black rounded-md w-full">
            <p className="text-center flex flex-col">
              Time not setup.
              <Link
                href={`/event/${eventId}/admin?step=time`}
                className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
              >
                Set up the times available
              </Link>
            </p>
          </div>
        )}

        <hr className="w-full border-b-2 my-1" />

        <MemberTime
          members={members.filter((m) => m.times !== undefined)}
          useStateMembers={useStateMembers}
        />

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
