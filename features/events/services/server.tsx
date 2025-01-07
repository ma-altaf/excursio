"use server";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getEvent, MemberType } from "./firestore";
import { db } from "@/shared/services/firestore";
import { JoinForm } from "@/app/event/[eventId]/join/JoinForm";

export async function joinEvent(joinForm: JoinForm) {
  // TODO: use server side firebase
  const { eventId, uid, displayName, secret } = joinForm;
  const eventInfo = await getEvent(eventId);
  if (!eventInfo) throw Error("Event not found");

  const { inviteOpt } = eventInfo;
  if (!inviteOpt) throw Error("Event not setup yet.");

  const { secret: reqSecret, needApproval } = inviteOpt;

  if (reqSecret !== secret) throw Error("Incorrect secret phrase.");

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

  return setDoc(doc(db, `events/${eventId}/members/${uid}`), memberData);
}
