"use client";

import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import EventListHeader from "./EventListHeader";
import { db } from "@/services/firebase";
import EventCard from "./EventCard";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuthContext } from "../authentication";

export default function EventList({ uid }: { uid: string }) {
  const { user } = useAuthContext();

  const PAGE_COUNT = 1;
  const eventCollection = collection(db, "events");
  const [hidden, setHidden] = useState(false);
  const [events, setEvents] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const lastDocRef =
    useRef<QueryDocumentSnapshot<DocumentData, DocumentData>>(null);
  const loadMoreRef = useRef<HTMLButtonElement>(null);

  const fetchDocs = useCallback(async () => {
    try {
      const querySnap = !lastDocRef.current
        ? await getDocs(
            query(
              eventCollection,
              where("owner", "==", uid),
              where("hidden", "==", false),
              orderBy("created_at", "desc"),
              limit(PAGE_COUNT)
            )
          )
        : await getDocs(
            query(
              eventCollection,
              where("owner", "==", uid),
              where("hidden", "==", false),
              orderBy("created_at", "desc"),
              startAfter(lastDocRef.current),
              limit(PAGE_COUNT)
            )
          );

      if (querySnap.docs.length == 0) {
        if (loadMoreRef.current) loadMoreRef.current.style.display = "none";
      } else {
        lastDocRef.current = querySnap.docs[querySnap.docs.length - 1];
        if (loadMoreRef.current) loadMoreRef.current.style.display = "block";
      }

      setEvents((prev) => [...prev, ...querySnap.docs]);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchDocs();
  }, []);

  return (
    <section className="w-full">
      {uid == user?.uid && (
        <EventListHeader hidden={hidden} setHidden={setHidden} />
      )}
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
        <button
          ref={loadMoreRef}
          onClick={() => fetchDocs()}
          className="p-button rounded-md bg-gray-200 border-2 m-4 hidden"
        >
          Load more
        </button>
      </div>
    </section>
  );
}
