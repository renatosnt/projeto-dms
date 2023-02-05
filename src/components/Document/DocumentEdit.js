import Input from "../Forms/Input";
import React from "react";
import DocumentPage from "./DocumentPage";
import styles from "./DocumentEdit.module.css";
import useForm from "./../../Hooks/useForm";
import ReactPDF, {
  BlobProvider,
  PDFViewer,
  renderToStream,
  PDFDownloadLink,
  usePDF,
} from "@react-pdf/renderer";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { addDoc, collection } from "firebase/firestore";
import { db, app } from "../../firebaseConnection";
import { FirebaseError } from "firebase/app";

function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

const DocumentEdit = () => {
  const name = useForm();
  const gender = useForm();
  const address = useForm();
  const phoneNumber = useForm();
  const photo = useForm();
  const birthDate = useForm();
  const role = useForm();
  const admissionDate = useForm();
  const sector = useForm();
  const salary = useForm();

  const [instance, updateInstance] = usePDF({ document: <DocumentPage /> });

  async function handleSave(e) {
    e.preventDefault();
    // const base64 = await blobToBase64(instance.blob).then(async (base64) => {
    //   console.log(base64);
    //   await fetch(base64).then(async (response) => {
    //     await response.blob().then((bl) => {
    //       console.log(bl);
    //     });
    //   });
    // });
    await blobToBase64(instance.blob).then((pdf) => {
      const docRef = addDoc(collection(db, "funcionarios"), {
        name: name.value,
        gender: gender.value,
        address: address.value,
        phoneNumber: phoneNumber.value,
        photo: photo.value,
        birthDate: birthDate.value,
        role: role.value,
        admissionDate: admissionDate.value,
        sector: sector.value,
        salary: salary.value,
        pdf,
      });
    });
  }

  return (
    <div className={styles.editWrapper}>
      <div className={styles.form}>
        <form onSubmit={handleSave}>
          <Input label="Nome" name="nome" type="text" {...name} />
          <Input label="Sexo" name="sexo" type="select" {...gender} />
          <Input label="Endereço" name="nome" type="text" {...address} />
          <Input label="Telefone" name="nome" type="tel" {...phoneNumber} />
          <Input label="Foto de Perfil" name="nome" type="file" {...photo} />
          <Input label="Nascimento" name="nome" type="date" {...birthDate} />

          <Input label="Cargo" name="nome" type="select" {...role} />
          <Input
            label="Data de Admissão"
            name="nome"
            type="date"
            {...admissionDate}
          />
          <Input label="Setor" name="nome" type="select" {...sector} />
          <Input label="Salário" name="nome" type="number" {...salary} />

          <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
            Salvar
          </Button>
        </form>
      </div>

      {/* COMPONENTE DO PDF */}
      {/* <div className={styles.bg}> */}
      {/* <div className={styles.pdfWrapper}> */}
      <PDFViewer className={styles.pdfViewer}>
        <DocumentPage
          name={name.value}
          gender={gender.value}
          address={address.value}
          phoneNumber={phoneNumber.value}
          photo={photo.value}
          birthDate={birthDate.value}
          role={role.value}
          admissionDate={admissionDate.value}
          sector={sector.value}
          salary={salary.value}
        />
      </PDFViewer>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default DocumentEdit;
