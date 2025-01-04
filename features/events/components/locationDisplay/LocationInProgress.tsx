import Link from "next/link";

export default function LocationInProgress({ eventId }: { eventId: string }) {
  return (
    <span className="w-full flex flex-row justify-between items-center">
      <p>In progress...</p>
      <Link
        href={`/event/${eventId}/location`}
        className="p-button rounded-md bg-accent"
      >
        Participate
      </Link>
    </span>
  );
}
