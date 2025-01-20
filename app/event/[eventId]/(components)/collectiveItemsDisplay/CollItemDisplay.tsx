"use client";

import { useEffect, useState } from "react";
import ColItemProgress from "./ColItemProgress";
import {
  colItemsSnapShot,
  CollectiveItemsMapType,
  MemberType,
} from "@/features/events/services/firestore";

export default function CollItemDisplay({
  eventId,
  member,
}: {
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

          <h2 className="font-bold">Items to contribute</h2>
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
