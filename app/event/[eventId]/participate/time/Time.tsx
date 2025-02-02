"use client";

// PARTICIPATE
import { useEffect, useState } from "react";
import TimePicker from "./(components)/timePicker/TimePicker";
import { TimeStateType } from "@/shared/services/utils";
import DatePicker from "./(components)/datePicker/DatePicker";
import { useAuthContext } from "@/features/users/components/authProvider";
import {
  getDateTimes,
  getMember,
  setMemberTimes,
} from "@/features/events/services/firestore";
import { useRouter } from "next/navigation";
import LoadingCover from "@/shared/components/loading/LoadingCover";
import Spinner from "@/shared/components/loading/Spinner";

// TODO: allow user to participate in adding their availability
export default function Time({ eventId }: { eventId: string }) {
  const router = useRouter();
  const { authLoading, user } = useAuthContext();
  const dateUseState = useState<Map<string, TimeStateType[]>>(new Map());
  const [changed, setChanged] = useState(false);
  const [isDatePicking, setIsDatePicking] = useState(true);

  const [dates, setDates] = dateUseState;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getDateTimes(eventId)
      .then((res) => {
        if (!res) return;
        setDates(res);
      })
      .catch((e) => console.log(e));
  }, [eventId]);

  useEffect(() => {
    if (user) {
      getMember(eventId, user.uid)
        .then((res) => {
          if (res?.times) setDates(res.times);
        })
        .catch((e) => console.log(e.message));
    }
  }, [eventId, setDates, user]);

  if (authLoading) return <LoadingCover />;

  if (!user || success) {
    router.replace(`/event/${eventId}`);
    return <></>;
  }

  function submit(availableTimes: Map<string, TimeStateType[]>) {
    setMemberTimes(eventId, user!.uid, availableTimes)
      .then(() => setSuccess(true))
      .catch((e) => setError(e.message));
  }

  if (dates.size === 0)
    return (
      <div className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
        <Spinner text="Loading dates" />
      </div>
    );

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-4">Time</h1>
      <span className="w-fit">
        {isDatePicking ? (
          <DatePicker dateUseState={dateUseState} setChanged={setChanged} />
        ) : (
          <TimePicker dateUseState={dateUseState} setChanged={setChanged} />
        )}

        <span className="w-full mt-2 flex flex-row justify-end">
          {isDatePicking ? (
            <button
              className="p-button rounded-md bg-accent"
              onClick={() => setIsDatePicking(false)}
            >
              Next
            </button>
          ) : (
            <>
              <button
                className="p-button rounded-md bg-gray-100"
                onClick={() => setIsDatePicking(true)}
              >
                Back
              </button>
              <hr className="w-2" />
              <button
                className="p-button rounded-md bg-accent"
                onClick={() => submit(dates)}
              >
                Submit
              </button>
            </>
          )}
        </span>
      </span>

      {changed && (
        <p className="mt-2 py-1 px-2 bg-gray-100 rounded-md border-2 border-gray-200">
          *Unsubmitted Changes, please submit your changes to save them.
        </p>
      )}

      {error && (
        <p className="mt-2 py-1 px-2 bg-red-100 rounded-md border-2 border-red-200">
          {error}
        </p>
      )}
    </section>
  );
}
