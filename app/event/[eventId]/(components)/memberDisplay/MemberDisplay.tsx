"use client";

import { getMembersList } from "@/features/events/services/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiCrownSimpleFill } from "react-icons/pi";

export default function MemberDisplay({
  isOwner,
  eventId,
}: {
  isOwner: boolean;
  eventId: string;
}) {
  const [members, setMembers] = useState<string[]>([]);

  useEffect(() => {
    getMembersList(eventId).then((res) => setMembers(res));
  }, [eventId]);

  return (
    <div className="flex flex-col">
      <span className="flex flex-row w-full justify-between items-center">
        <span className="flex flex-row">
          <h2 className="font-bold mr-2">Members</h2>
          <p className="px-2 bg-gray-100 rounded-full">{members.length}</p>
        </span>

        {isOwner && (
          <Link
            href={`/event/${eventId}/moderate/members`}
            className="px-2 py-1 rounded-md bg-accent"
          >
            Moderate
          </Link>
        )}
      </span>

      <ul className="max-w-full w-fit px-2 overflow-auto grid grid-rows-1 grid-flow-col gap-1">
        {members.map((el, i) => (
          <li
            className="px-3 rounded-full bg-gray-100 flex flex-row items-center"
            key={i}
          >
            {i == 0 && <PiCrownSimpleFill className="mr-1 -ml-1" />}
            <p>{el}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
