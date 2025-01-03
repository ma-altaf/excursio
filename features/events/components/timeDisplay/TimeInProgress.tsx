import Link from "next/link";

export default function TimeInProgress({ eventId }: { eventId: string }) {
  return (
    <span className="flex flex-row justify-between items-center">
      <p>In progress</p>
      <Link
        href={`/event/${eventId}/availability`}
        className="p-button rounded-md bg-accent"
      >
        Participate
      </Link>
    </span>
  );
}
