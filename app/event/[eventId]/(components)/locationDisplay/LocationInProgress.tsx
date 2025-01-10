import Link from "next/link";

export default function LocationInProgress({ eventId }: { eventId: string }) {
  return (
    <span className="w-full flex flex-col">
      <p>In progress...</p>
      <Link
        href={`/event/${eventId}/participate/location`}
        className="p-button rounded-md bg-accent w-fit"
      >
        Participate
      </Link>
    </span>
  );
}
