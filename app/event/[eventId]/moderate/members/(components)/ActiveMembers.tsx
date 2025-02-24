"use client";

import {
  deleteMember,
  membersSnapShot,
  MemberType,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";

export default function ActiveMembers({
  eventId,
  ownerId,
}: {
  eventId: string;
  ownerId: string;
}) {
  const [members, setMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    const subMembers = membersSnapShot(eventId, true, (res) => {
      setMembers(res.filter((doc) => doc.uid !== ownerId));
    });

    return () => {
      subMembers.then();
    };
  }, [eventId, ownerId]);

  return (
    <ul className="grid grid-flow-row gap-1 w-full p-1 rounded-md border-2">
      <h2 className="font-bold">Current Members:</h2>
      {members.map((member) => (
        <li key={member.uid}>
          <ActiveMembersItem eventId={eventId} member={member} />
        </li>
      ))}
      {members.length === 0 && <p>No members.</p>}
    </ul>
  );
}

function ActiveMembersItem({
  eventId,
  member,
}: {
  eventId: string;
  member: MemberType;
}) {
  const { displayName, uid } = member;
  return (
    <div className="py-1 px-2 flex flex-row justify-between items-center rounded-md border-2">
      <p>{displayName}</p>
      <span className="flex flex-row">
        <button
          className="p-2 rounded-md bg-gray-100 hover:bg-red-100 transition-all"
          title="Remove"
          onClick={() => deleteMember(eventId, uid, displayName)}
        >
          <p>Remove</p>
        </button>
      </span>
    </div>
  );
}
