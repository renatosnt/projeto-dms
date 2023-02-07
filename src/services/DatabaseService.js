import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { deleteEmployeeFolder, getPhotoUrl } from "./StorageService";

export async function saveRecord(data, myID) {
  const uid = auth.currentUser.uid;
  console.log(myID);
  const docRef = doc(db, "users", uid, "history", myID);

  await setDoc(
    docRef,
    {
      records: arrayUnion({ modifiedAt: new Date().toString(), ...data }),
    },
    { merge: true }
  )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log("aqui");
      console.log(error);
    });
}

//
export async function createEmployee(data) {
  let myID = null;
  const uid = auth.currentUser.uid;
  const collectionRef = collection(db, "users", uid, "employees");
  console.log("data sendo criada", data);
  await addDoc(collectionRef, {
    createdAt: new Date().toString(),
    ...data,
  }).then((response) => {
    myID = response.id;
  });
  console.log("id do documento recem criado", myID);
  return myID;
}

export async function updateEmployee(id, data) {
  const uid = auth.currentUser.uid;

  const docRef = doc(db, "users", uid, "employees", id);

  await updateDoc(docRef, {
    ...data,
  });
}

export async function deleteEmployee(id) {
  const uid = auth.currentUser.uid;
  const docRef = doc(db, "users", uid, "employees", id);
  await deleteEmployeeFolder(id);
  await deleteDoc(docRef);
}

export async function getEmployeeData(id, dataForm, setPhotoUrl) {
  const uid = auth.currentUser.uid;

  const docRef = doc(db, "users", uid, "employees", id);

  const docSnap = await getDoc(docRef);

  Object.entries(dataForm).forEach((entry) => {
    const [key, value] = entry;
    value.setValue(docSnap.data()[key]);
  });
  const photoUrl = await getPhotoUrl(id);
  setPhotoUrl(photoUrl);
}

export async function savePhotoUrl(id) {
  const newData = {
    photoUrl: await getPhotoUrl(id),
  };
  updateEmployee(id, newData);
}

export async function createUser(email, password, setSignUpError) {
  const user = await createUserWithEmailAndPassword(
    auth,
    email.value,
    password.value
  )
    .then((userCredential) => {
      console.log("registrado ", userCredential);
    })
    .catch((error) => {
      console.log("erro ", error.code);
      if (error.code === "auth/internal-error") setSignUpError("Erro interno.");
    });
  console.log("user", user);
}

export async function loginUser(email, password) {
  const user = await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("logado", userCredential);
    })
    .catch((error) => {
      console.log(error);
    });
}
