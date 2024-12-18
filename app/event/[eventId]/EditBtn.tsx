"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import Link from "next/link";
import React from "react";
import { IoMdCreate } from "react-icons/io";

export default function EditBtn({
  ownerId,
  eventId,
}: {
  ownerId: string;
  eventId: string;
}) {
  const { authLoading, user } = useAuthContext();

  if (!authLoading && user?.uid == ownerId)
    return (
      <Link
        href={`/event/${eventId}/admin`}
        className="flex flex-row items-center p-button rounded-md bg-gray-200 h-fit absolute right-0"
      >
        <p>Edit</p>
        <IoMdCreate className="ml-2 size-5" />
      </Link>
    );

  return <></>;
}
