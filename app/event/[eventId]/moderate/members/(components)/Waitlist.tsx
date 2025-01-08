"use client";

import {
  acceptMember,
  deleteMember,
  membersSnapShot,
  MemberType,
} from "@/features/events/services/firestore";
import { useEffect, useState } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";

export default function Waitlist({ eventId }: { eventId: string }) {
  const [members, setMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    const subMembers = membersSnapShot(eventId, false, (res) => {
      setMembers(res);
    });

    return () => {
      subMembers.then();
    };
  }, [eventId]);

  return (
    <ul className="flex flex-col w-full p-1 rounded-md border-2">
      <h2 className="font-bold">Waitlist:</h2>
      {members.map((member) => (
        <li key={member.uid}>
          <WaitlistItem eventId={eventId} member={member} />
        </li>
      ))}
      {members.length === 0 && <p>No members waiting.</p>}
    </ul>
  );
}

function WaitlistItem({
  eventId,
  member,
}: {
  eventId: string;
  member: MemberType;
}) {
  const { displayName, uid } = member;
  return (
    <div className="py-1 px-2 my-1 flex flex-row justify-between items-center rounded-md border-2">
      <p>{displayName}</p>
      <span className="flex flex-row">
        <button
          className="p-2 rounded-md bg-gray-100 hover:bg-green-100 transition-all"
          title="Approve"
          onClick={() => acceptMember(eventId, uid)}
        >
          <IoCheckmark className="size-5" />
        </button>
        <hr className="w-1" />
        <button
          className="p-2 rounded-md bg-gray-100 hover:bg-red-100 transition-all"
          title="Reject"
          onClick={() => deleteMember(eventId, uid)}
        >
          <IoClose className="size-5" />
        </button>
      </span>
    </div>
  );
}
