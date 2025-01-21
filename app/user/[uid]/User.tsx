import UserHeader from "@/app/user/UserHeader";
import PrivateEventList from "../PrivateEventList";

export default function User({ uid }: { uid: string }) {
  return (
    <section className="w-full min-h-screen flex flex-col items-center md:px-[10%] lg:px-[20%]">
      <UserHeader uid={uid} />
      <PrivateEventList uid={uid} />
    </section>
  );
}
