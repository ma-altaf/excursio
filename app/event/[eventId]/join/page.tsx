import { getEvent } from "@/features/events/services/firestore";
import { getUser } from "@/features/users/services/firestore";
import JoinForm from "./JoinForm";

export default async function Join({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);
  if (!eventData)
    return (
      <section className="flex flex-col justify-center items-center w-full min-h-screen">
        <h1>Could not found event.</h1>
      </section>
    );
  const { ownerId, title, inviteOpt } = eventData;

  if (!inviteOpt)
    return (
      <section className="flex flex-col justify-center items-center w-full min-h-screen">
        <h1>Event not setup yet.</h1>
      </section>
    );

  const userDetails = await getUser(ownerId);

  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center p-2 md:px-[10%] lg:px-[20%]">
      <h1 className="text-3xl p-2">{title}</h1>
      <p>{userDetails!.username}</p>
      <JoinForm eventId={eventId} requireSecret={inviteOpt.secret.length > 0} />
    </section>
  );
}
