import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { app } from "./firebase";

export const db = getFirestore(app);

if (process.env.NEXT_PUBLIC_ENV_TYPE === "emulator") {
  // Point to the Firestore emulator running on localhost.
  connectFirestoreEmulator(db, "127.0.0.1", 8080);
}
