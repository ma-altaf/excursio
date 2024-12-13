import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  setDoc,
  startAfter,
  where,
} from "firebase/firestore";
import { app } from "./firebase";
import { UserCredential } from "firebase/auth";

export const db = getFirestore(app);

export type visibilityType = "public" | "private";

export async function createNewUser(userCred: UserCredential) {
  const docRef = doc(db, `users/${userCred.user.uid}`);

  if (!(await getDoc(docRef)).exists()) {
    // create document
    await setDoc(docRef, {
      uid: userCred.user.uid,
      username: userCred.user.displayName || "Guest",
      about: "Hey, I am on Excursio!",
      provider: userCred.providerId,
    });
  }
}

export async function getUser(uid: string) {
  return (await getDoc(doc(db, `users/${uid}`))).data();
}

export async function getEvents(
  uid: string,
  lastDoc: QueryDocumentSnapshot<DocumentData, DocumentData> | null,
  visibility: visibilityType
) {
  const PAGE_COUNT = 1;
  const eventCollection = collection(db, "events");

  try {
    return !lastDoc
      ? await getDocs(
          query(
            eventCollection,
            where("owner", "==", uid),
            where("visibility", "==", visibility),
            orderBy("created_at", "desc"),
            limit(PAGE_COUNT)
          )
        )
      : await getDocs(
          query(
            eventCollection,
            where("owner", "==", uid),
            where("visibility", "==", visibility),
            orderBy("created_at", "desc"),
            startAfter(lastDoc),
            limit(PAGE_COUNT)
          )
        );
  } catch (error) {
    console.log(error);
  }
}
