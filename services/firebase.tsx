import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  signOut,
  signInWithPopup,
  UserCredential,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// export const analytics = getAnalytics(app);

export const auth = getAuth(app);

async function createNewUser(userCred: UserCredential) {
  const docRef = doc(db, `users/${userCred.user.uid}`);

  if (!(await getDoc(docRef)).exists()) {
    // create document
    await setDoc(docRef, {
      uid: userCred.user.uid,
      username: userCred.user.displayName || "Guest",
      about: "Hey, I am on Excursio!",
    });
  }
}

export async function signWithAnonymous() {
  try {
    const userCred = await signInAnonymously(auth);
    await createNewUser(userCred);
  } catch (error) {
    console.log(error);
  }
}

export async function signWithGoogle() {
  const provider = new GoogleAuthProvider();
  try {
    const userCred = await signInWithPopup(auth, provider);
    await createNewUser(userCred);
  } catch (error) {
    console.log(error);
  }
}

export async function sendEmailSignLink(email: string, redirectUrl: string) {
  console.log(email);

  const actionCodeSettings = {
    url: `${process.env.NEXT_PUBLIC_URL}/signin/email/signup?redirectUrl=${redirectUrl}`,
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
      await createNewUser(userCred);
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
