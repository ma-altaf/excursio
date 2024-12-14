"use client";

import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import EventListHeader from "./EventListHeader";
import EventCard from "./EventCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../(services)/authProvider";
import { getEvents, visibilityType } from "../(services)/firestore";
import NoSSR from "../(services)/noSSR";

export default function EventList({ uid }: { uid: string }) {
  const { user } = useAuthContext();

  const [visibility, setVisibility] = useState<visibilityType>("public");
  const [events, setEvents] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const lastDocRef =
    useRef<QueryDocumentSnapshot<DocumentData, DocumentData>>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  const fetchDocs = useCallback(
    async (
      visibility: visibilityType,
      lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | null
    ) => {
      const queryDocs = (await getEvents(uid, lastDoc, visibility))?.docs;

      if (queryDocs == undefined) return;

      setEvents((prev) => [...prev, ...queryDocs]);

      if (queryDocs.length == 0) {
        if (loadMoreRef.current) loadMoreRef.current.style.display = "none";
      } else {
        lastDocRef.current = queryDocs[queryDocs.length - 1];
        if (loadMoreRef.current) loadMoreRef.current.style.display = "block";
      }
    },
    [uid]
  );

  useEffect(() => {
    lastDocRef.current = null;
    getEvents(uid, lastDocRef.current, visibility).then((querySnap) => {
      const queryDocs = querySnap?.docs;

      if (queryDocs == undefined) return;

      setEvents(queryDocs);

      if (queryDocs.length == 0) {
        if (loadMoreRef.current) loadMoreRef.current.style.display = "none";
      } else {
        lastDocRef.current = queryDocs[queryDocs.length - 1];
        if (loadMoreRef.current) loadMoreRef.current.style.display = "block";
      }
    });
  }, [visibility]);

  return (
    <section className="w-full flex flex-col">
      {uid == user?.uid && (
        <EventListHeader
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
      <NoSSR>
        <div className="flex flex-col">
          {events.length == 0 ? (
            <div className="w-full flex justify-center items-center py-20">
              <p>No excursions.</p>
            </div>
          ) : (
            events.map((doc) => {
              const data = doc.data();
              return <EventCard key={data.eventId} data={data} />;
            })
          )}
        </div>
      </NoSSR>
      <button
        ref={loadMoreRef}
        onClick={() => fetchDocs(visibility, lastDocRef.current)}
        className="p-button rounded-md bg-gray-200 border-2 m-3 hidden"
      >
        Load more
      </button>
    </section>
  );
}
