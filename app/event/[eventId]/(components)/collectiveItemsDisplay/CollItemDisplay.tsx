"use client";

import { useEffect, useState } from "react";
import ColItemProgress from "./ColItemProgress";
import {
  colItemsSnapShot,
  CollectiveItemsMapType,
  MemberType,
} from "@/features/events/services/firestore";
import Link from "next/link";

export default function CollItemDisplay({
  isOwner,
  eventId,
  member,
}: {
  isOwner: boolean;
  eventId: string;
  member: MemberType;
}) {
  const [eventColItems, setEventColItems] = useState<CollectiveItemsMapType>(
    new Map()
  );

  useEffect(() => {
    const unsub = colItemsSnapShot(eventId, (colItems) =>
      setEventColItems(colItems)
    );

    return () => {
      unsub.then();
    };
  }, [eventId]);

  return (
    <div>
      {eventColItems.size !== 0 && (
        <>
          <hr className="w-full border-b-1 my-1" />

          <span className="flex flex-row w-full justify-between items-center">
            <h2 className="font-bold">Contributions</h2>

            {isOwner && (
              <Link
                href={`/event/${eventId}/moderate/colItems`}
                className="px-2 py-1 rounded-md bg-accent"
              >
                Moderate
              </Link>
            )}
          </span>

          <ul className="flex flex-col px-1">
            {eventColItems
              .entries()
              .toArray()
              .sort()
              .map(([, colItemData]) => (
                <li key={colItemData.title} className="my-1">
                  <ColItemProgress
                    colItemData={colItemData}
                    eventId={eventId}
                    member={member}
                  />
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
