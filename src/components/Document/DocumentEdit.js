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
  pdf,
} from "@react-pdf/renderer";
import "./Example.css";
import { Button } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db, app } from "../../firebaseConnection";
import { FirebaseError } from "firebase/app";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}
const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};
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

  const navigate = useNavigate();
  const [instance, updateInstance] = usePDF({ document: <DocumentPage /> });
  const { id } = useParams();
  const [createMode, setCreateMode] = React.useState(false);
  const [editMode, setEditMode] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [numPages, setNumPages] = React.useState(null);
  const refDocument = React.useRef(null);
  async function base64ToBlob(base64) {
    let response = await fetch(base64);
    let pdf = await response.blob();
    return pdf;
  }

  React.useEffect(() => {
    async function handleEmployeeData() {
      if (id) {
        setEditMode(true);
        // TODO puxar pdf do banco de dados

        const docRef = doc(db, "funcionarios", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let pdfBase64 = docSnap.data().pdf;
          console.log("pdf obtido do db", pdfBase64);
          setFile(pdfBase64);
          console.log("file", file);
          // const temp = await base64ToBlob(docSnap.data().pdf);
          // console.log(pdf(DocumentPage));
          // instance.blob = temp;
        } else {
          console.log("funcionario não existe");
        }
      } else {
        setCreateMode(true);
      }
    }

    handleEmployeeData();
  }, []);

  async function handleSave(e) {
    e.preventDefault();

    const element = (
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
    );

    let myPDF = pdf(element);
    let myBlob = await myPDF.toBlob();

    await blobToBase64(myBlob).then((pdf) => {
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
        <IconButton
          onClick={() => {
            navigate("/funcionarios");
          }}
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <ArrowBackIcon />
        </IconButton>

        {createMode && <h1>Adicionar novo funcionário</h1>}
        {editMode && <h1>Editando funcionário {id}</h1>}

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

      {console.log(refDocument.current)}

      {/* <div className="Example">
        <header>
          <h1>react-pdf sample page</h1>
        </header>
        <div className="Example__container">
          <div className="Example__container__document">
            <Document file={file} options={options}>
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </div>
      </div> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default DocumentEdit;
