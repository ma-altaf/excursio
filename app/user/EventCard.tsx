import { DocumentData } from "firebase/firestore";

export default function EventCard({ data }: { data: DocumentData }) {
  const { eventId, title, description, created_at } = data;
  return (
    <div
      key={eventId}
      className="rounded-lg bg-background border-gray-200 border-2 px-3 py-2 m-2 min-h-24"
    >
      <p className="font-bold">{title}</p>
      <p>{description}</p>
      <p>{new Date(created_at.toMillis()).toUTCString()}</p>
    </div>
  );
}
