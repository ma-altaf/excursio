import Poll from "./(components)/Poll";

export default function ViewPoll({ eventId }: { eventId: string }) {
  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-4">Live Polling</h1>
      <div className="w-full my-auto">
        <Poll eventId={eventId} />
      </div>
    </section>
  );
}
