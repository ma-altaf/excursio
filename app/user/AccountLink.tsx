"use client";

import { useAuthContext } from "@/app/authentication";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";

export default function AccountLink({ uid }: { uid: string }) {
  const { user } = useAuthContext();

  if (uid == user?.uid) {
    return (
      <div className="w-full flex flex-row justify-evenly">
        <Link
          href="/account"
          className="p-button w-full mx-2 bg-gray-200 rounded-md flex flex-row items-center justify-center"
        >
          <FaUserEdit className="mr-4 size-5" />
          <p>Edit profile</p>
        </Link>

        <Link
          href="/create"
          className="p-button w-full mx-2 bg-gray-200 rounded-md flex flex-row items-center justify-center"
        >
          <IoIosCreate className="mr-4 size-5" />
          <p>Create Excursion</p>
        </Link>
      </div>
    );
  }
  return <></>;
}
