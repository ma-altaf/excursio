import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { app } from "../../../shared/services/firebase";
import { createNewUser } from "../../../shared/services/firestore";

export const auth = getAuth(app);

export async function signWithAnonymous() {
  try {
    const userCred = await signInAnonymously(auth);
    await createNewUser(userCred, "anonymous");
  } catch (error) {
    console.log(error);
  }
}

export async function signWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const userCred = await signInWithPopup(auth, provider);
    await createNewUser(userCred, "google");
  } catch (error) {
    console.log(error);
  }
}

export async function sendEmailSignLink(email: string, redirectUrl: string) {
  console.log(email);

  const actionCodeSettings = {
    url: `${process.env.NEXT_PUBLIC_URL}/signin/email/completeSignUp?redirectUrl=${redirectUrl}`,
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
  } catch (error) {
    console.log(error);
  }
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

export async function logOut() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
}
