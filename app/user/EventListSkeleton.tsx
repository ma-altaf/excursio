import Spinner from "@/components/loading/Spinner";

export default async function EventListSkeleton() {
  return (
    <div className="w-full flex justify-center items-center py-20 flex-col">
      <Spinner />
      <p className="mt-4">Loading Excursions...</p>
    </div>
  );
}
