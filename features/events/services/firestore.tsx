import { db } from "@/shared/services/firestore";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

export type VisibilityType = "public" | "private";
export type EventType = {
  eventId: string;
  created_at: Date;
  description: string;
  title: string;
  visibility: VisibilityType;
};

export async function createExcursion(uid: string, title: string) {
  if (!title) throw new Error("Title is required.");

  if (
    !(
      await getDocs(
        query(
          collection(db, "events"),
          where("owner", "==", uid),
          where("title", "==", title)
        )
      )
    ).empty
  ) {
    throw new Error("Title must be unique.");
  }

  const eventRef = await addDoc(collection(db, "events"), {
    owner: uid,
    title,
    description: "",
    visibility: "private",
    created_at: serverTimestamp(),
  });
  await updateDoc(eventRef, { eventId: eventRef.id });

  return eventRef;
}

export async function getEvents(
  uid: string,
  lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
  count: number,
  visibility: VisibilityType
) {
  const eventCollection = collection(db, "events");

  try {
    return !lastDoc
      ? await getDocs(
          query(
            eventCollection,
            where("owner", "==", uid),
            where("visibility", "==", visibility),
            orderBy("created_at", "desc"),
            limit(count)
          )
        )
      : await getDocs(
          query(
            eventCollection,
            where("owner", "==", uid),
            where("visibility", "==", visibility),
            orderBy("created_at", "desc"),
            startAfter(lastDoc),
            limit(count)
          )
        );
  } catch (error) {
    console.log(error);
  }
}

export async function getEvent(eventId: string) {
  return (await getDoc(doc(db, `events/${eventId}`))).data() as
    | EventType
    | undefined;
}

export async function updateDescription(eventId: string, description: string) {
  await updateDoc(doc(db, `events/${eventId}`), { description });
}
