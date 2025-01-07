import Link from "next/link";
import { FcApproval } from "react-icons/fc";

export default function JoinSuccess({ eventId }: { eventId: string }) {
  return (
    <div className="p-4 flex flex-col justify-center items-center">
      <FcApproval size={100} />
      <p className="py-4">Welcome!</p>
      <Link
        className="mt-2 p-button rounded-md bg-accent"
        href={`/event/${eventId}`}
      >
        Go to event
      </Link>
    </div>
  );
}
