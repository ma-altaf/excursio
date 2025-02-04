import { namedMonths } from "@/shared/services/utils";
import { DocumentData } from "firebase/firestore";
import Link from "next/link";

const MAX_TEXT_LENGTH = 128;

export default function EventCard({ data }: { data: DocumentData }) {
  const { eventId, title, description, created_time } = data;
  const time = new Date(created_time.toMillis());

  return (
    <Link
      href={`/event/${eventId}`}
      key={eventId}
      className="rounded-lg bg-background border-gray-200 border-2 px-1 py-2 mx-2 min-h-24 flex flex-row"
    >
      <div className="flex flex-col p-2 w-12 justify-center items-center">
        <p>{time.getDate()}</p>
        <p className="font-bold uppercase">
          {namedMonths[time.getMonth()].substring(0, 3)}
        </p>
        <p className="text-[0.75rem]">{time.getFullYear()}</p>
      </div>
      <span className="w-full flex flex-col border-l-2 pl-2">
        <h2 className="font-bold">{title}</h2>
        <p>
          {description.substring(0, MAX_TEXT_LENGTH)}
          {description.length > MAX_TEXT_LENGTH && "..."}
        </p>
      </span>
    </Link>
  );
}
