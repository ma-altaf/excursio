import { NUM_EXCURSIONS } from "../(services)/firestore";

export default function EventListSkeleton() {
  const empty_array = [...Array(NUM_EXCURSIONS).keys()];

  return (
    <div className="w-full flex flex-col">
      {empty_array.map((i) => (
        <div
          key={i}
          className="rounded-lg bg-gray-200 animate-pulse h-24 m-2"
        ></div>
      ))}
    </div>
  );
}
