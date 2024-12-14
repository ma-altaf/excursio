import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

export const storage = getStorage();

export function uploadProfilePic(uid: string, file: File) {
  const userProfilePicRef = ref(storage, `images/profilePic/user-${uid}.jpg`);
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
