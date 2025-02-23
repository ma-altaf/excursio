"use server";

import {
  EventPrivateType,
  EventType,
} from "../features/events/services/firestore";
import { JoinForm } from "@/app/event/[eventId]/join/JoinForm";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { cert } from "firebase-admin/app";

const adminApp = admin.initializeApp({
  credential: cert({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: String(process.env.PRIVATE_KEY).replace(/\\n/gm, "\n"),
  }),
});

const adb = getFirestore(adminApp);

if (process.env.NEXT_PUBLIC_ENV_TYPE === "emulator") {
  adb.settings({
    host: "127.0.0.1:8080",
    ssl: false,
  });
}

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

function resError(message: string) {
  return { message };
}

export async function joinEvent(joinForm: JoinForm) {
  const { eventId, uid, displayName, secret } = joinForm;
  const eventInfo = await getEvent(eventId);
  if (!eventInfo) return resError("Event not found");

  const { inviteOpt } = eventInfo;
  if (!inviteOpt) return resError("Event not setup yet.");

  const { secret: reqSecret, needApproval, limit } = inviteOpt;

  if (reqSecret && (await getEventSecret(eventId)) !== secret)
    return resError("Incorrect secret phrase.");

  if ((await adb.doc(`events/${eventId}/members/${uid}`).get()).exists)
    return resError("you are already a member.");

  if (
    !(
      await adb
        .collection(`events/${eventId}/members/`)
        .where("displayName", "==", displayName)
        .get()
    ).empty
  )
    return resError("Name already taken.");

  await adb.runTransaction(async (transaction) => {
    const properties = (
      await transaction.get(adb.doc(`events/${eventId}/members/properties`))
    ).data() as { members: string[] } | undefined;

    if (!properties) return resError("Could not get event members properties.");

    if (properties.members.length + 1 > limit)
      return resError("Event is full, could not add you to the event.");

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
