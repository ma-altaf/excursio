import { DocumentData } from "firebase/firestore";

export default function EventCard({ data }: { data: DocumentData }) {
  const { eventId, title, description, created_at, hidden } = data;
  return (
    <div key={eventId} className="rounded-md bg-background shadow-lg p-4 my-2">
      <p>{title}</p>
      <p>{description}</p>
      <p>{new Date(created_at.toMillis()).toUTCString()}</p>
      <p>{hidden}</p>
    </div>
  );
}
