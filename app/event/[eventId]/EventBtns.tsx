"use client";

import { useAuthContext } from "@/features/users/components/authProvider";
import Link from "next/link";
import React, { useState } from "react";
import { IoMdCreate, IoIosCopy } from "react-icons/io";

export default function EventBtns({
  ownerId,
  eventId,
}: {
  ownerId: string;
  eventId: string;
}) {
  const defCopyText = "Copy Link";
  const { authLoading, user } = useAuthContext();
  const [copyText, setCopyText] = useState(defCopyText);

  return (
    <span className="grid gap-2 grid-flow-col">
      {!authLoading && user?.uid == ownerId && (
        <Link
          href={`/event/${eventId}/admin`}
          className="flex flex-row items-center p-button rounded-md bg-gray-200 h-fit"
        >
          <IoMdCreate className="mr-2 size-5" />
          <p>Edit Event</p>
        </Link>
      )}

      <button
        className={`flex flex-row items-center p-button rounded-md h-fit transition-all ${
          copyText === defCopyText ? "bg-gray-200" : "bg-accent"
        }`}
        title="Copy event link to your clipboard"
        onClick={() => {
          navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/event/${eventId}`
          );
          setCopyText("Copied!");
          setTimeout(() => {
            setCopyText(defCopyText);
          }, 1000);
        }}
      >
        <IoIosCopy className="mr-2 size-5" />
        <p>{copyText}</p>
      </button>
    </span>
  );

  return <></>;
}
