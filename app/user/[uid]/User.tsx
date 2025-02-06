import UserHeader from "@/app/user/UserHeader";
import PrivateEventList from "../PrivateEventList";
import { UserDetails } from "@/features/users/services/firestore";

export default function User({ user }: { user: UserDetails }) {
  return (
    <section className="w-full min-h-screen flex flex-col items-center md:px-[10%] lg:px-[20%]">
      <UserHeader user={user} />
      <PrivateEventList uid={user.uid} />
    </section>
  );
}
