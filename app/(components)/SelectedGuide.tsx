"use client";

import { StepsType } from "@/shared/services/utils";
import { useState } from "react";

const selectedSteps: StepsType[] = [
  {
    title: "Location",
    description: `Organizer add suggestions. 
    All members participate in providing suggestions.
    Organizer then select the locations to be voted on.
    All members vote on the location they wish to go to.
    Organizer then finalizes the locations.`,
    vidURL: "/videos/locations.mp4",
  },
  {
    title: "Time",
    description: `Organizer set the time open for the excursion. 
    All members provide their available time.
    Organizer then finalizes the time for the event.`,
    vidURL: "/videos/time.mp4",
  },
  {
    title: "Contribution",
    description: `Organizer set the items to contribute to.
    All members contribute to the items.`,
    vidURL: "/videos/contribution.mp4",
  },
];

export default function SelectedGuide() {
  const [activeStep, setActiveStep] = useState(0);

  const { description, vidURL } = selectedSteps[activeStep];

  return (
    <>
      <span className="flex flex-col my-2">
        <span className="flex flex-row items-center">
          <b className="rounded-full size-8 flex justify-center items-center aspect-square bg-accent mr-2">
            4
          </b>
          <h3 className="text-xl font-bold">Participate & Moderate Event</h3>
        </span>
      </span>

      <div className="border-2 border-black rounded-md">
        <span className="w-full grid grid-flow-col gap-2 p-2">
          {selectedSteps.map(({ title }, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`p-button rounded-md w-full transition-all ${
                i == activeStep ? "bg-accent" : "bg-gray-100"
              }`}
            >
              {title}
            </button>
          ))}
        </span>
        <div className="w-full flex flex-col rounded-md border-t-2 border-black p-2">
          <p className="mb-2">{description}</p>
          <video
            src={vidURL}
            muted
            loop
            controls
            className="rounded-md object-cover w-full border-black border-2"
          />
        </div>
      </div>
    </>
  );
}
