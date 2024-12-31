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
  | "contributions";
export type InProgressType = {
  description: boolean;
  invitation: boolean;
  times: boolean;
  location: boolean;
  contributions: boolean;
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
  contributionsOptType?: LocationOptType;
  times: Map<string, boolean[]>;
  locations: LocationType[] | null;
};

export type InvitationOptType = {
  limit: number;
  needApproval: boolean;
  secret: string;
};

export type LocationOptType = {
  num_suggestions: number;
};

export type LocationType = {
  title: string;
  isOnline: boolean;
  link: string;
};

export type ContributionsOptType = {};

export type RequiredItemsType = {
  title: string;
};

export type CollectiveItemsType = {
  title: string;
  amount: number;
  unit: string;
};

export const orderedEventSteps: EventStepsType[] = [
  "description",
  "invitation",
  "time",
  "location",
  "contributions",
];

const EXCURSION_STEPS = {
  invitation: true,
  times: true,
  location: true,
  contributions: true,
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

// Edit description

export async function updateDescription(eventId: string, description: string) {
  description = description.trim();
  await updateDoc(doc(db, `events/${eventId}`), { description });
}

// Edit invitation

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

// Edit times

export async function setDateTimes(
  eventId: string,
  dateMaps: Map<string, boolean[]>,
  inProgress: InProgressType
) {
  inProgress.times = false;
  const data = Object.fromEntries(dateMaps);

  await setDoc(doc(db, `events/${eventId}/lists/times`), data);
  await updateDoc(doc(db, `events/${eventId}`), {
    inProgress,
  });
}

export async function getDateTimes(eventId: string) {
  const dateTime = (
    await getDoc(doc(db, `events/${eventId}/lists/times`))
  ).data() as { [key: string]: boolean[] };
  return new Map(Object.entries(dateTime));
}

// Edit locations

export async function uploadLocationOpt(
  eventId: string,
  newLocationOpt: LocationOptType,
  inProgress: InProgressType
) {
  inProgress.location = false;
  await updateDoc(doc(db, `events/${eventId}`), {
    locationOpt: newLocationOpt,
    inProgress,
  });
}

export async function setLocations(eventId: string, locations: LocationType[]) {
  return await setDoc(doc(db, `events/${eventId}/lists/locations`), {
    locations,
  });
}

export async function getLocations(eventId: string) {
  const res = (
    await getDoc(doc(db, `events/${eventId}/lists/locations`))
  ).data();

  if (!res) return [];

  return res.locations as LocationType[];
}
