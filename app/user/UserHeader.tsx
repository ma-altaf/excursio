import Image from "next/image";
import AccountLink from "./AccountLink";
import { db } from "@/services/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function UserHeader({ uid }: { uid: string }) {
  const user = (await getDoc(doc(db, `users/${uid}`))).data();

  return (
    <section className="w-full">
      <div className="flex flex-col md:flex-row p-4 items-center">
        <Image
          className="rounded-full aspect-square w-48 object-cover"
          src={user?.image || "/images/profile.jpg"}
          width={640}
          height={640}
          alt="Picture of the author"
        />
        <div className="p-2 md:ml-8">
          <p className="font-bold text-lg">{user?.username}</p>
          <p className="my-2 mb-6">{user?.about}</p>
          <AccountLink uid={uid} />
        </div>
      </div>
      <hr className="border-gray-200 mt-2" />
    </section>
  );
}
