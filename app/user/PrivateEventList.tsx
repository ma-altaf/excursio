"use client";

import { getEvents } from "@/features/events/services/firestore";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { useCallback, useEffect, useRef, useState } from "react";
import EventCard from "./EventCard";
import EventListSkeleton from "./EventListSkeleton";

export default function PrivateEventList({ uid }: { uid: string }) {
  const NUM_EXCURSIONS: number = 1;
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<
    DocumentSnapshot<DocumentData, DocumentData>[]
  >([]);

  const lastDocRef = useRef<DocumentSnapshot<DocumentData, DocumentData>>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  const fetchPrivateDocs = useCallback(
    async (lastDoc: DocumentSnapshot<DocumentData, DocumentData> | null) => {
      setLoading(true);
      const res = await getEvents(uid, lastDoc, NUM_EXCURSIONS);
      if (!res) return;

      const { docs, lastSnap } = res;

      setLoading(false);
      setEvents((prev) => [...prev, ...docs]);

      if (docs.length == 0) {
        if (loadMoreRef.current) loadMoreRef.current.style.display = "none";
      } else {
        lastDocRef.current = lastSnap;
        if (loadMoreRef.current) loadMoreRef.current.style.display = "block";
      }
    },
    [uid]
  );

  useEffect(() => {
    lastDocRef.current = null;
    setLoading(true);
    getEvents(uid, lastDocRef.current, NUM_EXCURSIONS).then((res) => {
      if (!res) return;
      const { docs, lastSnap } = res;
      if (!docs) return;

      setLoading(false);
      setEvents(docs);

      if (docs.length == 0) {
        if (loadMoreRef.current) loadMoreRef.current.style.display = "none";
      } else {
        lastDocRef.current = lastSnap;
        if (loadMoreRef.current) loadMoreRef.current.style.display = "block";
      }
    });
  }, [uid]);

  return (
    <section className="w-full flex flex-col">
      <div className="grid grid-flow-row gap-2 py-2">
        {!loading && events.length == 0 ? (
          <div className="w-full flex justify-center items-center py-20">
            <p>No excursions.</p>
          </div>
        ) : (
          events.map((doc) => {
            const data = doc.data();
            if (data) return <EventCard key={data.eventId} data={data} />;
          })
        )}
        {loading && <EventListSkeleton count={NUM_EXCURSIONS} />}
      </div>
      <button
        ref={loadMoreRef}
        onClick={() => fetchPrivateDocs(lastDocRef.current)}
        className="p-button rounded-md bg-gray-200 border-2 mx-2 mb-2 hidden"
      >
        Load more
      </button>
    </section>
  );
}
