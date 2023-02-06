import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadPhoto(file, id) {
  const storageRef = ref(storage, `employee/${id + ".jpeg"}`);
  await uploadBytes(storageRef, file).then((snapshot) => {
    console.log("Uploaded blob or file!");
  });
}

export async function getPhotoUrl(id) {
  return await getDownloadURL(ref(storage, `employee/${id + ".jpeg"}`));
}
