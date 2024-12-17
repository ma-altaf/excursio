import { db } from "@/shared/services/firestore";
import {
  addDoc,
  collection,
  DocumentData,
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

export type visibilityType = "public" | "private";

export async function createExcusion(
  uid: string,
  title: string,
  description: string
) {
  try {
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
      description,
      visibility: "private",
      created_at: serverTimestamp(),
    });
    updateDoc(eventRef, { eventId: eventRef.id });
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getEvents(
  uid: string,
  lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
  count: number,
  visibility: visibilityType
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
