import { StepsType } from "@/shared/services/utils";

export default function StepItem({
  stepDetails,
  index,
}: {
  stepDetails: StepsType;
  index: number;
}) {
  const { title, description, vidURL } = stepDetails;
  return (
    <div
      className={`w-full flex flex-col justify-between items-center ${
        index % 2 ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <span className="flex flex-col w-full">
        <span className="flex flex-col">
          <span className="flex flex-row items-center">
            <b className="rounded-full size-8 flex justify-center items-center aspect-square bg-accent mr-2">
              {index + 1}
            </b>
            <h3 className="text-xl font-bold">{title}</h3>
          </span>
          <p className="ml-10">{description}</p>
        </span>
      </span>

      <div className="w-full h-fit flex justify-center items-center p-2">
        <video
          src={vidURL}
          muted
          loop
          controls
          className="rounded-md object-cover border-black border-2 w-full"
        />
      </div>
    </div>
  );
}
