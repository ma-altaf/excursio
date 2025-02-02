import { connectStorageEmulator, getStorage } from "firebase/storage";

export const storage = getStorage();

if (process.env.NEXT_PUBLIC_ENV_TYPE === "emulator") {
  // Point to the Storage emulator running on localhost.
  connectStorageEmulator(storage, "127.0.0.1", 9199);
}
