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
export type EventStepsType = "description" | "invites";
export type EventType = {
  ownerId: string;
  eventId: string;
  title: string;
  description: string;
  inProgress: Set<EventStepsType>;
  created_at: Date;
  visibility: VisibilityType;
};

const EXCURSION_STEPS = new Set<EventStepsType>(["description", "invites"]);

export async function createExcursion(uid: string, title: string) {
  if (!title) throw new Error("Title is required.");

  if (
    !(
      await getDocs(
        query(
          collection(db, "events"),
          where("ownerId", "==", uid),
          where("title", "==", title)
        )
      )
    ).empty
  ) {
    throw new Error("Title must be unique.");
  }

  const eventRef = await addDoc(collection(db, "events"), {
    ownerId: uid,
    title,
    description: "",
    visibility: "private",
    created_at: serverTimestamp(),
    inProgress: EXCURSION_STEPS,
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
            where("ownerId", "==", uid),
            where("visibility", "==", visibility),
            orderBy("created_at", "desc"),
            limit(count)
          )
        )
      : await getDocs(
          query(
            eventCollection,
            where("ownerId", "==", uid),
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

export async function updateDescription(
  eventId: string,
  description: string,
  inProgress?: Set<EventStepsType>
) {
  description = description.trim();
  let newData: { description: string; inProgress?: Array<EventStepsType> } = {
    description,
  };

  if (inProgress) {
    inProgress.delete("description");
    newData = { ...newData, inProgress: Array.from(inProgress) };
  }

  await updateDoc(doc(db, `events/${eventId}`), newData);
}
