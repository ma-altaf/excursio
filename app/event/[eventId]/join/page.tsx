import { getEvent } from "@/features/events/services/firestore";
import { getUser } from "@/features/users/services/firestore";
import JoinForm from "./JoinForm";
import Image from "next/image";
import { notFound } from "next/navigation";
import NotSetup from "./notSetup";

export default async function Join({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const eventData = await getEvent(eventId);

  if (!eventData) notFound();

  const { ownerId, title, inviteOpt } = eventData;

  if (!inviteOpt) return <NotSetup />;

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
