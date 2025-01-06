"use client";

import TimeDisplay from "../timeDisplay/TimeDisplay";
import LocationDisplay from "../locationDisplay/LocationDisplay";
import ColItemProgress from "../collectiveItemsDisplay/ColItemProgress";
import { use } from "react";
import { getColItems, getReqItems } from "@/features/events/services/firestore";

export default function RenderDetails({ eventId }: { eventId: string }) {
  const eventReqItems = use(getReqItems(eventId));
  const eventColItems = use(getColItems(eventId));

  return (
    <>
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
      <h2 className="font-bold">Time</h2>
      <TimeDisplay eventId={eventId} />

      <hr className="w-full border-b-1 my-1" />
      <h2 className="font-bold">Location</h2>
      <LocationDisplay eventId={eventId} />

      {eventColItems.length != 0 && (
        <>
          <hr className="w-full border-b-1 my-1" />

          <h2 className="font-bold">Items to contribute</h2>
          <ul className="flex flex-col px-1">
            {eventColItems.map((colItemData, i) => (
              <li key={i} className="my-1">
                <ColItemProgress colItemData={colItemData} />
              </li>
            ))}
          </ul>
        </>
      )}

      <hr className="w-full border-b-1 my-1" />
      <h2 className="font-bold">Transport</h2>
    </>
  );
}
