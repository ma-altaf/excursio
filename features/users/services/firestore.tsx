import { db } from "@/shared/services/firestore";
import { UserCredential } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { uploadProfilePic } from "./storage";

export type ProviderType = "anonymous" | "email" | "google";

export type UserDetails = {
  username: string;
  imageURL?: string;
  about: string;
  provider: ProviderType;
  uid: string;
};

export async function createNewUser(
  userCred: UserCredential,
  provider: ProviderType
) {
  const docRef = doc(db, `users/${userCred.user.uid}`);

  if (!(await getDoc(docRef)).exists()) {
    // create document
    await setDoc(docRef, {
      uid: userCred.user.uid,
      username:
        provider === "google" ? userCred.user.displayName : userCred.user.uid,
      about: "Hey, I am on Excursio!",
      provider: provider,
    });
  }
}

export async function getUser(uid: string) {
  return (await getDoc(doc(db, `users/${uid}`))).data() as
    | UserDetails
    | undefined;
}

export async function updateUsername(
  uid: string | undefined,
  newUsername: string
) {
  newUsername = newUsername.trim();

  if (!uid) throw new Error(`No uid provided: ${uid}`);
  if (!newUsername) throw new Error("Invalid username");

  await runTransaction(db, async (transaction) => {
    if (
      (
        await getDocs(
          query(collection(db, `users`), where("username", "==", newUsername))
        )
      ).empty
    ) {
      transaction.update(doc(db, `users/${uid}`), { username: newUsername });
    } else {
      throw new Error("Username already exist");
    }
  });
}

export async function updateAbout(uid: string | undefined, newAbout: string) {
  newAbout = newAbout.trim();

  if (!uid) throw new Error(`No uid provided: ${uid}`);

  await updateDoc(doc(db, `users/${uid}`), { about: newAbout });
}

export async function updateProfilePic(uid: string | undefined, file: File) {
  if (!uid) {
    throw new Error("No uid provided");
  }

  try {
    const ImageURL = await uploadProfilePic(uid, file);
    return await updateDoc(doc(db, `users/${uid}`), { imageURL: ImageURL });
  } catch (error) {
    console.log(error);
  }
}
