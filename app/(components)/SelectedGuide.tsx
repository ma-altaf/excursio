"use client";

import { StepsType } from "@/shared/services/utils";
import { useState } from "react";

const selectedSteps: StepsType[] = [
  {
    title: "Location",
    description: "Type a unique title for the event and click on create.",
    vidURL: "/videos/create excursion.mp4",
  },
  {
    title: "Time",
    description: "Set your desired properties for the event.",
    vidURL: "",
  },
  {
    title: "Contribution",
    description: "Copy the link and share it with the members.",
    vidURL: "",
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
