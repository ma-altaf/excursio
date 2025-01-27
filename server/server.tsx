"use server";

import {
  EventPrivateType,
  EventType,
} from "../features/events/services/firestore";
import { JoinForm } from "@/app/event/[eventId]/join/JoinForm";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { cert } from "firebase-admin/app";

console.log("--------------------server--------------------");

const app = admin.initializeApp({
  credential: cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: String(process.env.PRIVATE_KEY).replace(/\\n/gm, "\n"),
  }),
});

const adb = getFirestore(app);

export async function getEvent(eventId: string) {
  return (await adb.doc(`events/${eventId}`).get()).data() as
    | EventType
    | undefined;
}

async function getEventSecret(eventId: string) {
  const res = (
    await adb.doc(`events/${eventId}/private/secret`).get()
  ).data() as EventPrivateType | undefined;

  if (!res) return "";

  return res.secret;
}

export async function joinEvent(joinForm: JoinForm) {
  const { eventId, uid, displayName, secret } = joinForm;
  const eventInfo = await getEvent(eventId);
  if (!eventInfo) throw Error("Event not found");

  const { inviteOpt } = eventInfo;
  if (!inviteOpt) throw Error("Event not setup yet.");

  const { secret: reqSecret, needApproval, limit } = inviteOpt;

  if (reqSecret && (await getEventSecret(eventId)) !== secret)
    throw Error("Incorrect secret phrase.");

  if ((await adb.doc(`events/${eventId}/members/${uid}`).get()).exists)
    throw new Error("you are already a member.");

  if (
    !(
      await adb
        .collection(`events/${eventId}/members/`)
        .where("displayName", "==", displayName)
        .get()
    ).empty
  )
    throw new Error("Name already taken.");

  await adb.runTransaction(async (transaction) => {
    const properties = (
      await transaction.get(adb.doc(`events/${eventId}/members/properties`))
    ).data() as { members: string[] } | undefined;

    if (!properties) throw new Error("Could not get event members properties.");

    if (properties.members.length + 1 > limit)
      throw new Error("Event is full, could not add you to the event.");

    if (!needApproval) {
      properties.members.push(displayName);

      transaction.update(adb.doc(`events/${eventId}/members/properties`), {
        members: properties.members,
      });
    }

    // MemberType
    transaction.set(adb.doc(`events/${eventId}/members/${uid}`), {
      uid,
      displayName,
      active: !needApproval,
      joined_time: admin.firestore.FieldValue.serverTimestamp(),
    });
  });
}
