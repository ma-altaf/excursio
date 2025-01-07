import Image from "next/image";
import { getUser } from "@/features/users/services/firestore";
import { lazy } from "react";

const AccountPanel = lazy(() => import("./AccountPanel"));

export default async function UserHeader({ uid }: { uid: string }) {
  const user = await getUser(uid);

  return (
    <section className="w-full">
      <div className="flex flex-col w-full md:flex-row p-4 items-center">
        <Image
          className="rounded-full aspect-square w-48 object-cover"
          src={user!.imageURL || "/images/profile.jpg"}
          width={640}
          height={640}
          alt="Picture of the author"
          priority
        />

        <div className="p-2 md:ml-8 w-full">
          <p className="font-bold text-lg">{user?.username}</p>
          <p className="my-2 mb-6">{user?.about}</p>
          <AccountPanel uid={uid} />
        </div>
      </div>

      <hr className="border-gray-200 mt-2 w-full" />
    </section>
  );
}
