export default function EventListSkeleton({ count }: { count: number }) {
  const empty_array = [...Array(count).keys()];

  return (
    <div className="w-full flex flex-col">
      {empty_array.map((i) => (
        <div
          key={i}
          className="rounded-lg bg-gray-200 animate-pulse h-24 mx-2"
        ></div>
      ))}
    </div>
  );
}
