// PARTICIPATE
// TODO: allow user to participate in adding their availability
export default function Time({
  times,
  eventId,
}: {
  times: Map<string, boolean[]>;
  eventId: string;
}) {
  return (
    <section className="w-full min-h-screen flex flex-col items-center p-2 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-4">Time</h1>
    </section>
  );
}
