"use client";

import { useAuthContext } from "@/app/authentication";
import Link from "next/link";
import { FaUserEdit } from "react-icons/fa";

export default function AccountLink({ uid }: { uid: string }) {
  const { user } = useAuthContext();

  if (uid == user?.uid) {
    return (
      <Link
        href="/account"
        className="p-button w-fit bg-gray-200 rounded-md flex flex-row items-center justify-center"
      >
        <FaUserEdit className="mr-4 size-5" />
        <p>Edit profile</p>
      </Link>
    );
  }
  return <></>;
}
