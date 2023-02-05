import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsBfTtMwhyCamoFNSsLHpCx9Y0nb_qtq8",
  authDomain: "projeto-taugor.firebaseapp.com",
  projectId: "projeto-taugor",
  storageBucket: "projeto-taugor.appspot.com",
  messagingSenderId: "873553183830",
  appId: "1:873553183830:web:011a13757994193d7527f7",
  measurementId: "G-VW790BW96N",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, app };
