"use client";

import { useEffect, useState } from "react";
import ColItemProgress from "./ColItemProgress";
import {
  colItemsSnapShot,
  CollectiveItemsMapType,
} from "@/features/events/services/firestore";

export default function CollItemDisplay({ eventId }: { eventId: string }) {
  const [eventColItems, setEventColItems] = useState<CollectiveItemsMapType>();

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
      {eventColItems && eventColItems.size !== 0 && (
        <>
          <hr className="w-full border-b-1 my-1" />

          <h2 className="font-bold">Items to contribute</h2>
          <ul className="flex flex-col px-1">
            {eventColItems
              .entries()
              .toArray()
              .map(([, colItemData], i) => (
                <li key={i} className="my-1">
                  <ColItemProgress colItemData={colItemData} />
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
