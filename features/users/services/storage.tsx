import { storage } from "@/shared/services/storage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export function uploadProfilePic(uid: string, file: File) {
  const userProfilePicRef = ref(storage, `images/profilePic/${uid}`);
  const uploadTask = uploadBytesResumable(userProfilePicRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      // progress
      () => {},
      // error
      (error) => {
        reject(error);
      },
      // complete
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });
}
