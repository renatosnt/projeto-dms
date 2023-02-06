import React from "react";
import DocumentPage from "./DocumentPage";
import History from "./History";

import styles from "./DocumentEdit.module.css";
import useForm from "./../../Hooks/useForm";
import { PDFViewer, pdf } from "@react-pdf/renderer";

import { storage } from "../../services/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  onSnapshot,
  runTransaction,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { useNavigate, useParams } from "react-router-dom";

import DocumentForm from "./DocumentForm";
import Menu from "./Menu";
import { getPhotoUrl, uploadPhoto } from "../../services/StorageService";

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function base64ToBlob(base64) {
  let response = await fetch(base64);
  let pdf = await response.blob();
  return pdf;
}

const DocumentEdit = () => {
  const name = useForm();
  const gender = useForm();
  const address = useForm();
  const phoneNumber = useForm();
  const birthDate = useForm();
  const role = useForm();
  const admissionDate = useForm();
  const sector = useForm();
  const salary = useForm();

  const [photo, setPhoto] = React.useState(null);
  const [photoUrl, setPhotoUrl] = React.useState(null);

  const data = {
    name: name.value,
    gender: gender.value,
    address: address.value,
    phoneNumber: phoneNumber.value,
    birthDate: birthDate.value,
    photoUrl: photoUrl,
    role: role.value,
    admissionDate: admissionDate.value,
    sector: sector.value,
    salary: salary.value,
  };
  const dataForm = {
    name: name,
    gender: gender,
    address: address,
    phoneNumber: phoneNumber,
    birthDate: birthDate,
    role: role,
    admissionDate: admissionDate,
    sector: sector,
    salary: salary,
  };

  const navigate = useNavigate();
  const { id } = useParams();

  // TODO REFATORAR
  React.useEffect(() => {
    async function getEmployeeData() {
      if (id) {
        const docRef = doc(db, "funcionarios", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const pdfBase64 = docSnap.data().pdf;
          const myBlob = await base64ToBlob(docSnap.data().pdf);

          Object.entries(dataForm).forEach((entry) => {
            const [key, value] = entry;
            value.setValue(docSnap.data()[key]);
          });

          //get photo
          setPhotoUrl(getPhotoUrl(id));
          // await getDownloadURL(ref(storage, `employee/${id + ".jpeg"}`)).then(
          //   (url) => {
          //     setPhotoUrl(url);
          //   }
          // );
        } else {
          console.log("funcionario não existe");
        }
      } else {
      }
    }
    getEmployeeData();
  }, []);
  // TODO REFATORAR

  async function handleSave(e) {
    e.preventDefault();

    const element = <DocumentPage {...data} />;

    let myPDF = pdf(element);
    let myBlob = await myPDF.toBlob();
    let myID = id;
    if (!id) {
      await blobToBase64(myBlob).then(async (pdf) => {
        // TODO tem que ser AWAIT
        const docRef = await addDoc(collection(db, "funcionarios"), {
          createdAt: new Date().toString(),
          ...data,
          pdf,
        });
        myID = docRef.id;
      });
    } else if (id) {
      await blobToBase64(myBlob).then(async (pdf) => {
        // TODO tem que ser AWAIT
        await updateDoc(doc(db, "funcionarios", id), {
          createdAt: new Date().toString(),
          ...data,
          pdf,
        });
      });
    }
    // await getDoc(doc(db, "funcionarios", myID)).then((docSnap) => {
    //   if (docSnap.data().photoUrl !== photoUrl) {
    //   }
    // });
    if (photo) {
      uploadPhoto(photo, myID);
    }
    const docRef = doc(db, "historico", myID);
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
        console.log(error);
      });

    navigate("/funcionarios");
  }

  return (
    <div className={styles.editWrapper}>
      <div className={styles.formWrapper}>
        <Menu id={id} name={`${data.name}`} />
        <DocumentForm
          photoUrl={photoUrl}
          setPhoto={setPhoto}
          handleSave={handleSave}
          {...dataForm}
        />
        <hr></hr>
        {id && <History id={id} />}
      </div>

      <PDFViewer className={styles.pdfViewer}>
        <DocumentPage {...data} />
      </PDFViewer>

      <div className={styles.bg}>
        <div className={styles.pdfWrapper}>
          <DocumentPage {...data} />
        </div>
      </div>
    </div>
  );
};

export default DocumentEdit;
