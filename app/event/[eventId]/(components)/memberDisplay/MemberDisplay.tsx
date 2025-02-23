"use client";

import {
  getMembersList,
  MemberInListType,
} from "@/features/events/services/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";
import MembersBtn from "./MembersBtn";

export default function MemberDisplay({
  isOwner,
  eventId,
}: {
  isOwner: boolean;
  eventId: string;
}) {
  const [members, setMembers] = useState<MemberInListType[]>([]);

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

      <MembersBtn members={members} />
    </div>
  );
}
