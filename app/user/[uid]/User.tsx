import EventList from "@/app/user/EventList";
import UserHeader from "@/app/user/UserHeader";

export default function User({ uid }: { uid: string }) {
  return (
    <section className="w-full min-h-screen flex flex-col items-center md:px-[10%] lg:px-[20%]">
      <UserHeader uid={uid} />
      <EventList uid={uid} />
    </section>
  );
}
