import { StepsType } from "@/shared/services/utils";
import StepItem from "./StepItem";
import SelectedGuide from "./SelectedGuide";

const steps: StepsType[] = [
  {
    title: "Create Event",
    description:
      "Create an account/sign in. Click on Create Excursion and type a unique title for the event and click on create.",
    vidURL: "/videos/create excursion.mp4",
  },
  {
    title: "Set Event Properties",
    description: "Set your desired properties for the event.",
    vidURL: "/videos/excursion setting.mp4",
  },
  {
    title: "Share Link",
    description: "Copy the link and share it with the members.",
    vidURL: "/videos/share link.mp4",
  },
];

export default function Guide() {
  return (
    <section className="w-full flex flex-col p-3 md:px-[10%] lg:px-[20%]">
      <h2 className="text-3xl font-bold text-center mb-4">
        How to Plan and Participate in Events
      </h2>
      {steps.map((stepDetails, i) => (
        <span key={i}>
          <StepItem stepDetails={stepDetails} index={i} />
          {i != steps.length - 1 && <hr className="border-b-1 my-3 mx-4" />}
        </span>
      ))}
      <SelectedGuide />
    </section>
  );
}
