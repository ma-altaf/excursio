import Image from "next/image";
import { UserDetails } from "@/features/users/services/firestore";
import { lazy } from "react";

const AccountPanel = lazy(() => import("./AccountPanel"));

export default async function UserHeader({ user }: { user: UserDetails }) {
  return (
    <section className="w-full">
      <div className="flex flex-col w-full md:flex-row p-4 pb-1 md:pb-4 items-center">
        <Image
          className="rounded-full aspect-square w-48 object-cover"
          src={user?.imageURL || "/images/user_pp.webp"}
          width={640}
          height={640}
          alt="Picture of the author"
          priority
        />

        <div className="p-2 md:ml-8 w-full">
          <p className="font-bold text-lg">{user?.username}</p>
          <p className="my-2 mb-6">{user?.about}</p>
          <AccountPanel uid={user.uid} />
        </div>
      </div>

      <hr className="border-gray-200 w-full" />
    </section>
  );
}
