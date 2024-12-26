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
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";

export type VisibilityType = "public" | "private";
export type EventStepsType =
  | "description"
  | "invitation"
  | "time"
  | "location"
  | "items";
export type InProgressType = {
  description: boolean;
  invitation: boolean;
  time: boolean;
  location: boolean;
  items: boolean;
};
export type EventType = {
  ownerId: string;
  eventId: string;
  title: string;
  description: string;
  inProgress: InProgressType;
  created_at: Date;
  visibility: VisibilityType;
  inviteOpt?: InvitationOptType;
  locationOpt?: LocationOptType;
  ItemsOptType?: LocationOptType;
  time: Map<string, boolean[]>;
};

export type InvitationOptType = {
  limit: number;
  needApproval: boolean;
  secret: string;
};

export type LocationOptType = {};

export type ItemsOptType = {};

export const orderedEventSteps: EventStepsType[] = [
  "description",
  "invitation",
  "time",
  "location",
  "items",
];

const EXCURSION_STEPS = {
  invitation: true,
  time: true,
  location: true,
  items: true,
};

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

export async function updateDescription(eventId: string, description: string) {
  description = description.trim();
  await updateDoc(doc(db, `events/${eventId}`), { description });
}

export async function updateInvitation(
  eventId: string,
  newInvitationOpt: InvitationOptType,
  inProgress: InProgressType
) {
  inProgress.invitation = false;
  await updateDoc(doc(db, `events/${eventId}`), {
    inviteOpt: newInvitationOpt,
    inProgress,
  });
}

export async function setDateTimes(
  eventId: string,
  dateMaps: Map<string, boolean[]>,
  inProgress: InProgressType
) {
  inProgress.time = false;
  const data = Object.fromEntries(dateMaps);

  await setDoc(doc(db, `events/${eventId}/times/setup`), data);
  await updateDoc(doc(db, `events/${eventId}`), {
    inProgress,
  });
}

export async function getDateTimes(eventId: string) {
  const dateTime = (
    await getDoc(doc(db, `events/${eventId}/times/setup`))
  ).data() as { [key: string]: boolean[] };
  return new Map(Object.entries(dateTime));
}
