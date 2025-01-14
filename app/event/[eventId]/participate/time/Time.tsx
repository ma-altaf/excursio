"use client";

// PARTICIPATE
import { useState } from "react";
import TimePicker from "./(components)/timePicker/TimePicker";
import { TimeStateType } from "@/shared/services/utils";

// TODO: allow user to participate in adding their availability
export default function Time({
  eventId,
  times,
}: {
  eventId: string;
  times: Map<string, TimeStateType[]>;
}) {
  const dateUseState = useState(times);
  const [changed, setChanged] = useState(false);

  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-4">Time</h1>
      <TimePicker dateUseState={dateUseState} setChanged={setChanged} />
      {changed && (
        <p className="mt-2 py-1 px-2 bg-gray-100 rounded-md border-2 border-gray-200">
          *Unsubmitted Changes, please submit your changes to save them.
        </p>
      )}
    </section>
  );
}
