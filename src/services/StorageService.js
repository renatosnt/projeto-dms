import { auth, storage } from "./firebase";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { savePhotoUrl } from "./DatabaseService";

export async function uploadPhoto(file, id) {
  const uid = auth.currentUser.uid;
  const path = `${uid}/employees/${id}/photo.jpeg`;
  const storageRef = ref(storage, path);

  await uploadBytes(storageRef, file).then(async (snapshot) => {
    console.log("Uploaded blob or file!", snapshot);
    await savePhotoUrl(id);
  });
}
export async function getPhotoUrl(id) {
  const uid = auth.currentUser.uid;
  const path = `${uid}/employees/${id}/photo.jpeg`;
  const storageRef = ref(storage, path);
  return await getDownloadURL(storageRef);
}

export async function uploadPDF(id, blob) {
  const uid = auth.currentUser.uid;
  const path = `${uid}/employees/${id}/document.pdf`;
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blob).then((snapshot) => {
    console.log("uploaded pdf", snapshot);
  });
}

export async function getPDFLink(id) {
  const uid = auth.currentUser.uid;
  const path = `${uid}/employees/${id}/document.pdf`;
  const storageRef = ref(storage, path);

  return await getDownloadURL(storageRef);
}

export async function deleteEmployeeFolder(id) {
  const uid = auth.currentUser.uid;
  const path = `${uid}/employees/${id}`;
  const storageRef = ref(storage, path);
  deleteObject(storageRef).then(() => {
    console.log("storage deleted");
  });
}
