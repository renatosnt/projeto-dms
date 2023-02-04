import Input from "../Forms/Input";
import React from "react";
import DocumentPage from "./DocumentPage";
import styles from "./DocumentEdit.module.css";
import useForm from "./../../Hooks/useForm";
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

  return (
    <div className={styles.editWrapper}>
      <div className={styles.form}>
        <form>
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
        </form>
      </div>

      {/* COMPONENTE DO PDF */}
      <div className={styles.bg}>
        <div className={styles.pdfWrapper}>
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
        </div>
      </div>
    </div>
  );
};

export default DocumentEdit;
