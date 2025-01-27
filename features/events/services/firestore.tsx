import { getUser } from "@/features/users/services/firestore";
import { db } from "@/shared/services/firestore";
import { TimeStateType } from "@/shared/services/utils";
import {
  addDoc,
  collection,
  collectionGroup,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  setDoc,
  startAfter,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";

export type VisibilityType = "public" | "private";

export type EventStepsType =
  | "description"
  | "invitation"
  | "time"
  | "location"
  | "contributions";

export type EventType = {
  ownerId: string;
  eventId: string;
  title: string;
  description: string;
  created_time: Timestamp;
  visibility: VisibilityType;
  inviteOpt?: InvitationOptType;
  locationOpt?: LocationOptType;
  contributionsOpt?: ContributionsOptType;
  times: Map<string, TimeStateType[]>;
  locations: VoteLocationType[] | null;
  reqItems: RequiredItemsType[] | null;
  colItems: CollectiveItemsMapType | null;
};

export type InvitationOptType = {
  limit: number;
  needApproval: boolean;
  secret: boolean;
};

export type EventPrivateType = {
  secret: string;
};

export type LocationOptStatusType = "suggestion" | "vote";

export type LocationOptType = {
  status: LocationOptStatusType;
  num_suggestions: number;
};

export type LocationType = {
  title: string;
  isOnline: boolean;
  link: string;
};

export type VoteLocationType = {
  location: LocationType;
  vote: number;
};

export type ContributionsOptType = {
  requireTransport: boolean;
};

export type RequiredItemsType = {
  title: string;
};

export type CollectiveItemsType = {
  title: string;
  amount: number;
  unit: string;
  current: number;
};

export type CollectiveItemsMapType = Map<string, CollectiveItemsType>;

export type ColItemProgress = {
  userId: string;
  contribution: number;
};

export type SelectedTimeType = {
  comment: string;
  locations?: LocationType[];
};

export type SelectedTimeMap = Map<string, Map<string, SelectedTimeType>>;

export type MemberType = {
  uid: string;
  displayName: string;
  active: boolean;
  joined_time: Timestamp;
  locations?: LocationType[];
  vote?: string;
  times?: Map<string, TimeStateType[]>;
  colItem?: { [title: string]: number };
};

export type PollType = { title: string; vote: number };

export const orderedEventSteps: EventStepsType[] = [
  "description",
  "invitation",
  "time",
  "location",
  "contributions",
];

export async function createEvent(uid: string, title: string) {
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
  const owner = await getUser(uid);

  if (!owner) throw new Error("organizer does not exist.");

  const eventRef = await addDoc(collection(db, "events"), {
    ownerId: uid,
    title,
    description: "",
    visibility: "private",
    created_time: serverTimestamp(),
  });

  const batch = writeBatch(db);

  batch.update(eventRef, { eventId: eventRef.id });

  // MemberType
  batch.set(doc(db, `events/${eventRef.id}/members/${uid}`), {
    active: true,
    displayName: owner.username,
    uid: uid,
    joined_time: serverTimestamp(),
  });

  batch.set(doc(db, `events/${eventRef.id}/members/properties`), {
    members: [owner.username],
  });

  await batch.commit();

  return eventRef;
}

export async function getEvents(
  uid: string,
  lastDoc: DocumentSnapshot<DocumentData, DocumentData> | null,
  count: number
) {
  // const eventCollection = collection(db, "events");

  try {
    const res = !lastDoc
      ? await getDocs(
          query(
            collectionGroup(db, "members"),
            where("uid", "==", uid),
            orderBy("joined_time", "desc"),
            limit(count)
          )
        )
      : await getDocs(
          query(
            collectionGroup(db, "members"),
            where("uid", "==", uid),
            orderBy("joined_time", "desc"),
            startAfter(lastDoc),
            limit(count)
          )
        );

    const docs = await Promise.all(
      res.docs.map((eventDoc) =>
        getDoc(doc(db, `events/${eventDoc.ref.path.split("/")[1]}`))
      )
    );

    return { docs, lastSnap: res.docs[res.docs.length - 1] };
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
  secret?: string
) {
  const batch = writeBatch(db);

  batch.update(doc(db, `events/${eventId}`), {
    inviteOpt: newInvitationOpt,
  });

  batch.set(doc(db, `events/${eventId}/private/secret`), { secret });

  await batch.commit();
}

// Edit times

export async function setDateTimes(
  eventId: string,
  dateMaps: Map<string, TimeStateType[]>
) {
  if (!dateMaps) throw new Error("Please provide date time.");

  const data = Object.fromEntries(dateMaps);

  await setDoc(doc(db, `events/${eventId}/lists/times`), data);
}

export async function getDateTimes(eventId: string) {
  const dateTime = (
    await getDoc(doc(db, `events/${eventId}/lists/times`))
  ).data() as { [date: string]: TimeStateType[] };

  if (!dateTime) return undefined;

  return new Map(Object.entries(dateTime));
}

// Edit locations

export async function uploadLocationOpt(
  eventId: string,
  newLocationOpt: LocationOptType
) {
  await updateDoc(doc(db, `events/${eventId}`), {
    locationOpt: newLocationOpt,
  });
}

export async function setLocations(
  eventId: string,
  locations: VoteLocationType[]
) {
  return await setDoc(doc(db, `events/${eventId}/lists/locations`), {
    locations,
  });
}

export async function getLocations(eventId: string) {
  const res = (
    await getDoc(doc(db, `events/${eventId}/lists/locations`))
  ).data();

  if (!res) return [];

  return res.locations as VoteLocationType[];
}

export async function uploadContributionOpt(
  eventId: string,
  newContributionOpt: ContributionsOptType
) {
  await updateDoc(doc(db, `events/${eventId}`), {
    contributionsOpt: newContributionOpt,
  });
}

export async function setReqItems(
  eventId: string,
  reqItems: RequiredItemsType[]
) {
  return await setDoc(doc(db, `events/${eventId}/lists/reqItems`), {
    reqItems,
  });
}

export async function setColItems(
  eventId: string,
  colItems: CollectiveItemsMapType
) {
  return await setDoc(
    doc(db, `events/${eventId}/lists/colItems`),
    Object.fromEntries(colItems)
  );
}

export async function getReqItems(eventId: string) {
  const res = (
    await getDoc(doc(db, `events/${eventId}/lists/reqItems`))
  ).data();

  if (!res) return [];

  return res.reqItems as RequiredItemsType[];
}

export async function getColItems(
  eventId: string
): Promise<CollectiveItemsMapType> {
  const res = (
    await getDoc(doc(db, `events/${eventId}/lists/colItems`))
  ).data();

  if (!res) return new Map();

  return new Map(Object.entries(res));
}

export async function colItemsSnapShot(
  eventId: string,
  callback: (collItems: CollectiveItemsMapType) => void
) {
  return onSnapshot(doc(db, `events/${eventId}/lists/colItems`), (res) => {
    callback(new Map(Object.entries(res.data() || new Map())));
  });
}

export async function updateColItem(
  eventId: string,
  memberId: string,
  title: string,
  amount: number
) {
  let resAmount = amount;
  let prevAmount = 0;

  await runTransaction(db, async (transaction) => {
    let currData = (
      await transaction.get(doc(db, `events/${eventId}/lists/colItems`))
    ).data() as CollectiveItemsMapType;

    const member = (await (
      await transaction.get(doc(db, `events/${eventId}/members/${memberId}`))
    ).data()) as MemberType;

    if (member.colItem && member.colItem[title]) {
      prevAmount = member.colItem[title];
    }

    if (!currData) throw new Error("No collection items.");

    currData = new Map(Object.entries(currData));

    const collItem = currData.get(title);
    if (!collItem) throw new Error("Item not found.");

    collItem.current -= prevAmount;

    if (collItem.current + amount > collItem.amount) {
      collItem.current = collItem.amount;
      resAmount = collItem.amount - collItem.current;
    } else {
      collItem.current += amount;
    }

    currData.set(title, collItem);

    transaction.update(
      doc(db, `events/${eventId}/lists/colItems`),
      Object.fromEntries(currData)
    );

    if (!member.colItem) {
      member.colItem = { [title]: resAmount };
    }

    member.colItem = { ...member.colItem, [title]: resAmount };

    transaction.update(
      doc(db, `events/${eventId}/members/${memberId}`),
      member
    );
  });

  return resAmount;
}

export async function getSelectedTimes(eventId: string) {
  const res = (
    await getDoc(doc(db, `events/${eventId}/lists/selectedTimes`))
  ).data();

  if (!res) return undefined;

  const selectedTimes = new Map(Object.entries(res));

  selectedTimes.forEach((content, date) => {
    selectedTimes.set(date, new Map(Object.entries<SelectedTimeType>(content)));
  });

  return selectedTimes as SelectedTimeMap;
}

export async function getSetectedLocations(eventId: string) {
  const res = (
    await getDoc(doc(db, `events/${eventId}/lists/selectedLocations`))
  ).data();

  if (!res) return undefined;

  return res.selectedLocations as LocationType[];
}

export async function setSelectedLocations(
  eventId: string,
  selectedLocations: LocationType[]
) {
  await setDoc(doc(db, `events/${eventId}/lists/selectedLocations`), {
    selectedLocations,
  });
}

export function memberFromDoc(member: MemberType) {
  if (member?.times) member.times = new Map(Object.entries(member.times));
  return member;
}

export async function getMember(eventId: string, uid: string) {
  const member = (
    await getDoc(doc(db, `events/${eventId}/members/${uid}`))
  ).data() as MemberType | undefined;

  if (!member) return undefined;
  return memberFromDoc(member);
}

export async function getMembersList(eventId: string) {
  const res = (
    await getDoc(doc(db, `events/${eventId}/members/properties`))
  ).data();
  if (!res) throw new Error("Failed to retrieve members properties.");
  return res.members as string[];
}

export async function getMembers(eventId: string, active = false) {
  const res = await getDocs(
    query(
      collection(db, `events/${eventId}/members/`),
      where("active", "==", active)
    )
  );

  return res.docs.map((doc) =>
    memberFromDoc(doc.data() as MemberType)
  ) as MemberType[];
}

export async function membersSnapShot(
  eventId: string,
  active = false,
  callback: (members: MemberType[]) => void
) {
  return onSnapshot(
    query(
      collection(db, `events/${eventId}/members/`),
      where("active", "==", active)
    ),
    (res) => {
      callback(res.docs.map((doc) => memberFromDoc(doc.data() as MemberType)));
    }
  );
}

export async function deleteMember(
  eventId: string,
  uid: string,
  displayName: string
) {
  await runTransaction(db, async (transaction) => {
    const member = (
      await transaction.get(doc(db, `events/${eventId}/members/${uid}`))
    ).data() as MemberType;

    if (!member) throw new Error("member not found");

    let colItems = (
      await transaction.get(doc(db, `events/${eventId}/lists/colItems`))
    ).data() as CollectiveItemsMapType;

    if (colItems) colItems = new Map(Object.entries(colItems));

    const properties = (
      await transaction.get(doc(db, `events/${eventId}/members/properties`))
    ).data() as { members: string[] } | undefined;

    if (!properties) throw Error("Could not get properties");

    if (member.colItem) {
      Object.entries(member.colItem).forEach(([title, count]) => {
        const prev = colItems.get(title);

        if (prev) {
          colItems.set(title, { ...prev, current: prev.current - count });
        }
      });

      transaction.update(
        doc(db, `events/${eventId}/lists/colItems`),
        Object.fromEntries(colItems)
      );
    }

    transaction.delete(doc(db, `events/${eventId}/members/${uid}`));

    transaction.update(doc(db, `events/${eventId}/members/properties`), {
      members: properties.members.filter((el) => el !== displayName),
    });
  });
}

export async function acceptMember(
  eventId: string,
  uid: string,
  displayName: string
) {
  await runTransaction(db, async (transaction) => {
    const properties = (
      await transaction.get(doc(db, `events/${eventId}/members/properties`))
    ).data() as { members: string[] } | undefined;

    if (!properties) throw Error("Could not get properties");

    transaction.update(doc(db, `events/${eventId}/members/${uid}`), {
      active: true,
    });

    properties.members.push(displayName);

    transaction.update(doc(db, `events/${eventId}/members/properties`), {
      members: properties.members,
    });
  });
}

export async function addSuggestion(
  eventId: string,
  memberId: string,
  suggestionList: LocationType[]
) {
  await updateDoc(doc(db, `events/${eventId}/members/${memberId}`), {
    locations: suggestionList,
  });
}

export async function updateLocationOptStatus(
  eventId: string,
  newStatus: LocationOptStatusType
) {
  await runTransaction(db, async (transaction) => {
    const eventData = (
      await transaction.get(doc(db, `events/${eventId}`))
    ).data() as EventType;

    transaction.update(doc(db, `events/${eventId}`), {
      ...eventData,
      locationOpt: { ...eventData.locationOpt, status: newStatus },
    });
  });
}

export async function submitVote(
  eventId: string,
  memberId: string,
  title: string
) {
  await runTransaction(db, async (transaction) => {
    const member = (
      await transaction.get(doc(db, `events/${eventId}/members/${memberId}`))
    ).data() as MemberType | undefined;

    if (member?.vote) throw new Error(`You Already vote for ${member.vote}.`);

    const res = (
      await transaction.get(doc(db, `events/${eventId}/lists/locations/`))
    ).data() as { locations: VoteLocationType[] } | undefined;

    if (!res) throw new Error("Location suggestions not found.");

    const { locations } = res;

    transaction.update(doc(db, `events/${eventId}/members/${memberId}`), {
      vote: title,
    });

    locations[
      locations.findIndex((el) => el.location.title === title)
    ].vote += 1;

    transaction.update(doc(db, `events/${eventId}/lists/locations/`), {
      locations,
    });
  });
}

export async function membersListSnapShot(
  eventId: string,
  callback: (names: string[]) => void
) {
  return onSnapshot(doc(db, `events/${eventId}/members/properties`), (res) => {
    const data = res.data();
    if (!data) throw new Error("Failed to retrieve members properties.");
    callback(data.members as string[]);
  });
}

export async function pollsSnapShot(
  eventId: string,
  callback: (polls: VoteLocationType[]) => void
) {
  return onSnapshot(
    doc(db, `events/${eventId}/lists/locations`),

    (res) => {
      const polls = res.data() as { locations: VoteLocationType[] } | undefined;
      if (!polls) throw new Error("location suggestions not found.");
      callback(polls.locations);
    }
  );
}

export async function setMemberTimes(
  eventId: string,
  memberId: string,
  dates: Map<string, TimeStateType[]>
) {
  await updateDoc(doc(db, `events/${eventId}/members/${memberId}`), {
    times: Object.fromEntries(dates),
  });
}

export async function setSelectedTimes(
  eventId: string,
  dateTimesData: SelectedTimeMap
) {
  dateTimesData.forEach((content, date) => {
    // @ts-expect-error converting inner Map to Object
    dateTimesData.set(date, Object.fromEntries(content));
  });
  const data = Object.fromEntries(dateTimesData);

  await setDoc(doc(db, `events/${eventId}/lists/selectedTimes`), data);
}
