"use server";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  where,
} from "firebase/firestore";
import { getEvent, getEventSecret, MemberType } from "./firestore";
import { db } from "@/shared/services/firestore";
import { JoinForm } from "@/app/event/[eventId]/join/JoinForm";

export async function joinEvent(joinForm: JoinForm) {
  // TODO: use server side firebase
  const { eventId, uid, displayName, secret } = joinForm;
  const eventInfo = await getEvent(eventId);
  if (!eventInfo) throw Error("Event not found");

  const { inviteOpt } = eventInfo;
  if (!inviteOpt) throw Error("Event not setup yet.");

  const { secret: reqSecret, needApproval, limit } = inviteOpt;

  if (reqSecret && (await getEventSecret(eventId)) !== secret)
    throw Error("Incorrect secret phrase.");

  if ((await getDoc(doc(db, `events/${eventId}/members/${uid}`))).exists())
    throw new Error("you are already a member.");

  if (
    !(
      await getDocs(
        query(
          collection(db, `events/${eventId}/members/`),
          where("displayName", "==", displayName)
        )
      )
    ).empty
  )
    throw new Error("Name already taken.");

  const memberData: MemberType = {
    uid,
    displayName,
    active: !needApproval,
  };

  await runTransaction(db, async (transaction) => {
    const properties = (
      await transaction.get(doc(db, `events/${eventId}/members/properties`))
    ).data() as { members: string[] } | undefined;

    const members = (
      await transaction.get(doc(db, `events/${eventId}`))
    ).data() as { members: string[] } | undefined;

    if (!properties) throw new Error("Could not get event members properties.");
    if (!members) throw new Error("Could not get event members.");

    if (properties.members.length + 1 > limit)
      throw new Error("Event is full, could not add you to the event.");

    members.members.push(uid);

    transaction.update(doc(db, `events/${eventId}`), { members });

    if (!needApproval) {
      properties.members.push(displayName);

      transaction.update(doc(db, `events/${eventId}/members/properties`), {
        members: properties.members,
      });
    }

    transaction.set(doc(db, `events/${eventId}/members/${uid}`), memberData);
  });
}
