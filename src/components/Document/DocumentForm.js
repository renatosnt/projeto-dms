import React from "react";
import { Avatar, Button } from "@mui/material";
import Input from "../Forms/Input";

import SaveIcon from "@mui/icons-material/Save";
import styles from "./DocumentForm.module.css";
import Select from "../Forms/Select";
import UploadImage from "../Forms/UploadImage";
const DocumentForm = ({
  handleSave,
  name,
  gender,
  address,
  phoneNumber,
  setPhoto,
  photoUrl,
  birthDate,
  role,
  admissionDate,
  sector,
  salary,
}) => {
  return (
    <form className={styles.form} onSubmit={handleSave}>
      <div className={styles.fieldsContainer}>
        <div>
          <Input required label="Nome" name="nome" type="text" {...name} />
          <Select
            required
            label="Cargo"
            name="role"
            options={[
              "Gerente",
              "Desenvolvedor Front-End",
              "Estagiário",
              "Analista",
            ]}
            {...role}
          />
        </div>

        <div>
          <UploadImage photoUrl={photoUrl} setPhoto={setPhoto} />
        </div>
      </div>

      <div className={styles.fieldsContainer}>
        <Select
          required
          label="Setor"
          name="sector"
          options={["Financeiro", "RH", "Desenvolvimento"]}
          {...sector}
        />
        <Input
          required
          label="Salário"
          name="salary"
          type="number"
          placeholder="Sem R$"
          {...salary}
        />
      </div>

      <Input
        required
        label="Endereço"
        name="address"
        type="text"
        placeholder="Rua Fulano de Tal, nº 100, Bairro X"
        {...address}
      />

      <div className={styles.fieldsContainer}>
        <Input
          required
          label="Data de Admissão"
          name="admission"
          type="date"
          {...admissionDate}
        />
        <Input
          required
          label="Telefone"
          name="phone"
          type="tel"
          placeholder="(99) - 99999-9999"
          {...phoneNumber}
        />
        <Select
          required
          label="Sexo"
          name="gender"
          options={["Masculino", "Feminino"]}
          {...gender}
        />
        <Input
          required
          label="Nascimento"
          name="birth"
          type="date"
          {...birthDate}
        />
      </div>
      <div className={styles.saveOptions}>
        <Button variant="contained" endIcon={<SaveIcon />}>
          Baixar PDF
        </Button>
        <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default DocumentForm;
