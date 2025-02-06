"use client";

import {
  DocumentData,
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import EventCard from "./EventCard";
import { lazy, useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "@/features/users/components/authProvider";

import EventListSkeleton from "./EventListSkeleton";
import {
  getEvents,
  VisibilityType,
} from "@/features/events/services/firestore";

const EventListHeader = lazy(() => import("./EventListHeader"));

export default function EventList({ uid }: { uid: string }) {
  const NUM_EXCURSIONS: number = 1;

  const { user } = useAuthContext();

  const [visibility, setVisibility] = useState<VisibilityType>("public");
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<
    DocumentSnapshot<DocumentData, DocumentData>[]
  >([]);

  const lastDocRef =
    useRef<QueryDocumentSnapshot<DocumentData, DocumentData>>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  const fetchDocs = useCallback(
    async (
      visibility: VisibilityType,
      lastDoc: DocumentSnapshot<DocumentData, DocumentData> | null
    ) => {
      setLoading(true);
      const res = await getEvents(uid, lastDoc, NUM_EXCURSIONS);
      if (!res) return setLoading(false);
      const { docs, lastSnap } = res;

      if (!docs) return setLoading(false);
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
    getEvents(uid, lastDocRef.current, NUM_EXCURSIONS)
      .then((res) => {
        if (!res) return;
        const { docs, lastSnap } = res;
        if (!docs) return;

        setEvents(docs);

        if (docs.length == 0) {
          if (loadMoreRef.current) loadMoreRef.current.style.display = "none";
        } else {
          lastDocRef.current = lastSnap;
          if (loadMoreRef.current) loadMoreRef.current.style.display = "block";
        }
      })
      .catch(() => {
        console.log("No event found.");
      })
      .finally(() => setLoading(false));
  }, [uid, visibility]);

  return (
    <section className="w-full flex flex-col">
      {uid == user?.uid && (
        <EventListHeader
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
      <div className="flex flex-col">
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
        onClick={() => fetchDocs(visibility, lastDocRef.current)}
        className="p-button rounded-md bg-gray-200 border-2 m-3 hidden"
      >
        Load more
      </button>
    </section>
  );
}
