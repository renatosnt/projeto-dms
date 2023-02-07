import React from "react";
import DocumentPage from "./DocumentPage";
import History from "./History";

import styles from "./DocumentEdit.module.css";
import useForm from "../../hooks/useForm";
import { PDFViewer, pdf } from "@react-pdf/renderer";

import { useNavigate, useParams } from "react-router-dom";

import DocumentForm from "./DocumentForm";
import Menu from "./Menu";
import {
  createEmployee,
  getEmployeeData,
  saveRecord,
  updateEmployee,
} from "../../services/DatabaseService";

import { uploadPDF, uploadPhoto } from "../../services/StorageService";
import { getDownloadURL } from "firebase/storage";

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
  const [active, setActive] = React.useState(true);

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
    active: active,
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

  React.useEffect(() => {
    getEmployeeData(id, dataForm, setPhotoUrl);
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    let myID = null;
    if (!id) {
      myID = await createEmployee(data);
    } else if (id) {
      await updateEmployee(id, data);
      myID = id;
    }
    if (photo) {
      await uploadPhoto(photo, myID);
    }

    const myBlob = await pdf(<DocumentPage {...data} />).toBlob();
    console.log("blob", myBlob);

    await uploadPDF(myID, myBlob);
    await saveRecord(data, myID);
    navigate("/funcionarios");
  }

  return (
    <div className={styles.editWrapper}>
      <div className={styles.formWrapper}>
        <Menu id={id} name={`${data.name}`} />
        <DocumentForm
          id={id}
          setActive={setActive}
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

      {/* <div className={styles.bg}>
        <div className={styles.pdfWrapper}>
          <DocumentPage {...data} />
        </div>
      </div> */}
    </div>
  );
};

export default DocumentEdit;
