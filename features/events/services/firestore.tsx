import { db } from "@/shared/services/firestore";
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

export type visibilityType = "public" | "private";

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
