import { getEvent } from "@/features/events/services/firestore";
import { getUser } from "@/features/users/services/firestore";
import JoinForm from "./JoinForm";
import Image from "next/image";

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
      <span className="mt-2 flex flex-row items-center">
        <Image
          className="rounded-full size-8 aspect-square object-cover pointer-events-none bg-gray-200"
          src={userDetails?.imageURL || "/images/user_pp.webp"}
          width={64}
          height={64}
          alt="Picture of the author"
          priority
        />
        <p className="ml-1">{userDetails!.username}</p>
      </span>
      <JoinForm eventId={eventId} requireSecret={inviteOpt.secret} />
    </section>
  );
}
