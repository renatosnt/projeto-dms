import React from "react";
import { Avatar, Button } from "@mui/material";
import Input from "../Forms/Input";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./DocumentForm.module.css";
const DocumentForm = ({
  handleSave,
  name,
  gender,
  address,
  phoneNumber,
  photo,
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
          <Input label="Nome" name="nome" type="text" {...name} />
          <Input label="Cargo" name="nome" type="select" {...role} />
        </div>
        <div>
          <Avatar
            className={styles.avatar}
            alt="avatar"
            src="/avatar.svg"
            sx={{ width: "10rem", height: "10rem" }}
          />
          <input
            accept="image/*"
            className={styles.input}
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button variant="raised" component="span" className={styles.button}>
              Upload
            </Button>
          </label>
          {/* <Input label="Foto de Perfil" name="nome" type="file" {...photo} /> */}
        </div>
      </div>

      <div className={styles.fieldsContainer}>
        <Input label="Setor" name="nome" type="select" {...sector} />
        <Input label="Salário" name="nome" type="number" {...salary} />
      </div>

      <Input
        label="Endereço"
        name="nome"
        type="text"
        placeholder="Rua Fulano de Tal, nº 100, Bairro X"
        {...address}
      />

      <div className={styles.fieldsContainer}>
        <Input
          label="Data de Admissão"
          name="nome"
          type="date"
          {...admissionDate}
        />
        <Input
          label="Telefone"
          name="nome"
          type="tel"
          placeholder="(99) - 99999-9999"
          {...phoneNumber}
        />
        <Input label="Sexo" name="sexo" type="select" {...gender} />
        <Input label="Nascimento" name="nome" type="date" {...birthDate} />
      </div>
      <div className={styles.saveOptions}>
        <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default DocumentForm;
