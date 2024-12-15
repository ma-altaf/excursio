import Spinner from "@/components/loading/Spinner";

export default function Loading() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center">
      <Spinner />
      <p className="mt-4">Loading...</p>
    </section>
  );
}
