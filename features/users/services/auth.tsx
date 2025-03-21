import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  linkWithRedirect,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  validatePassword,
  linkWithCredential,
  connectAuthEmulator,
} from "firebase/auth";
import { createNewUser, ProviderType } from "./firestore";
import { app } from "@/shared/services/firebase";
import { EmailAuthProvider } from "firebase/auth/web-extension";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/shared/services/firestore";

export const auth = getAuth(app);

if (process.env.NEXT_PUBLIC_ENV_TYPE === "emulator") {
  // Point to the Auth emulator running on localhost.
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
}

export async function signWithAnonymous() {
  const userCred = await signInAnonymously(auth);
  await createNewUser(userCred, "anonymous");
  return userCred;
}

export async function signWithGoogle() {
  const provider = new GoogleAuthProvider();

  const userCred = await signInWithPopup(auth, provider);
  await createNewUser(userCred, "google");
  return userCred;
}

export async function sendEmailSignLink(email: string, redirectUrl: string) {
  const actionCodeSettings = {
    url: `${process.env.NEXT_PUBLIC_URL}/signin/email/completeSignUp?redirectUrl=${redirectUrl}`,
    handleCodeInApp: true,
  };

  await sendSignInLinkToEmail(auth, email, actionCodeSettings);
  window.localStorage.setItem("emailForSignIn", email);
}

export async function createuserWithEmail(email: string, password: string) {
  const passwordStatus = await validatePassword(auth, password);

  if (!passwordStatus.isValid) throw new Error("password policy");

  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  await createNewUser(userCred, "email");
  return userCred;
}

export async function signWithEmail(email: string, password: string) {
  const passwordStatus = await validatePassword(auth, password);

  if (!passwordStatus.isValid) throw new Error("password policy");
  await signInWithEmailAndPassword(auth, email, password);
}

export async function resetPasswordWithEmail(email: string) {
  const actionCodeSettings = {
    url: `${process.env.NEXT_PUBLIC_URL}/signin/email?create=false`,
    handleCodeInApp: true,
  };
  await sendPasswordResetEmail(auth, email, actionCodeSettings);
}

export async function completeEmailSignUp(): Promise<boolean> {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    let email = window.localStorage.getItem("emailForSignIn");

    if (!email) {
      email = window.prompt("Please provide your email for confirmation") || "";
      return false;
    }

    try {
      const userCred = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      await createNewUser(userCred, "email");
      window.localStorage.removeItem("emailForSignIn");
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  return false;
}

export async function linkAnomToGoogle() {
  if (!auth.currentUser)
    throw new Error("Sign with an anonymous account first.");

  await linkWithRedirect(auth.currentUser, new GoogleAuthProvider());

  const newProvider: { provider: ProviderType } = { provider: "google" };

  await updateDoc(doc(db, `users/${auth.currentUser.uid}`), newProvider);
}

export async function linkAnomToEmail(email: string, password: string) {
  if (!auth.currentUser)
    throw new Error("Sign with an anonymous account first.");
  const passwordStatus = await validatePassword(auth, password);

  if (!passwordStatus.isValid) throw new Error("password policy");

  await linkWithCredential(
    auth.currentUser,
    EmailAuthProvider.credential(email, password)
  );

  const newProvider: { provider: ProviderType } = { provider: "email" };

  await updateDoc(doc(db, `users/${auth.currentUser.uid}`), newProvider);
}

export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}
