"use client";

import TimeDisplay from "../timeDisplay/TimeDisplay";
import LocationDisplay from "../locationDisplay/LocationDisplay";
import { useEffect, useState } from "react";
import {
  getReqItems,
  MemberType,
  RequiredItemsType,
} from "@/features/events/services/firestore";
import MemberDisplay from "../memberDisplay/MemberDisplay";
import CollItemDisplay from "../collectiveItemsDisplay/CollItemDisplay";

export default function RenderDetails({
  member,
  isOwner,
  eventId,
}: {
  member: MemberType;
  isOwner: boolean;
  eventId: string;
}) {
  const [eventReqItems, setEventReqItems] = useState<RequiredItemsType[]>([]);

  useEffect(() => {
    getReqItems(eventId).then((res) => setEventReqItems(res));
  }, [eventId]);

  return (
    <>
      <hr className="w-full border-b-1 my-1" />
      <MemberDisplay eventId={eventId} isOwner={isOwner} />

      {eventReqItems.length != 0 && (
        <>
          <hr className="w-full border-b-1 my-1" />

          <h2 className="font-bold">Required items to bring</h2>
          <ul className="flex flex-col px-1">
            {eventReqItems.map((reqItemData, i) => (
              <li key={i}>
                <b>{i + 1}.</b> {reqItemData.title}
              </li>
            ))}
          </ul>
        </>
      )}

      <hr className="w-full border-b-1 my-1" />
      <TimeDisplay isOwner={isOwner} eventId={eventId} />

      <hr className="w-full border-b-1 my-1" />
      <LocationDisplay
        isOwner={isOwner}
        suggestions={member.locations}
        eventId={eventId}
      />

      <CollItemDisplay eventId={eventId} member={member} />

      <hr className="w-full border-b-1 my-1" />
      <h2 className="font-bold">Transport</h2>
    </>
  );
}
