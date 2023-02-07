import React from "react";
import { Avatar, Button } from "@mui/material";
import Input from "../Forms/Input";

import { getPDFLink } from "../../services/StorageService";
import SaveIcon from "@mui/icons-material/Save";
import styles from "./DocumentForm.module.css";
import Select from "../Forms/Select";
import UploadImage from "../Forms/UploadImage";
import { deleteEmployee } from "../../services/DatabaseService";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import CancelIcon from "@mui/icons-material/Cancel";
const DocumentForm = ({
  handleSave,
  name,
  active,

  gender,
  address,
  phoneNumber,
  setPhoto,
  photoUrl,
  birthDate,
  role,
  id,
  admissionDate,
  sector,
  salary,
}) => {
  const navigate = useNavigate();

  async function downloadPDF() {
    const link = document.createElement("a");
    link.setAttribute("download", "");
    link.href = await getPDFLink(id);
    link.setAttribute("download", `document.pdf`);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  }

  async function handleDelete() {
    deleteEmployee(id);
    navigate("/funcionarios");
  }

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
      <Select
        label="Contrato"
        name="contract"
        options={["Selecione", "Ativo", "Inativo"]}
        {...active}
      />

      <div className={styles.saveOptions}>
        {id && (
          <div className={styles.options}>
            <Button
              onClick={handleDelete}
              variant="contained"
              endIcon={<DeleteIcon />}
              sx={{ bgcolor: "#C04949" }}
            >
              Excluir
            </Button>

            <Button
              onClick={downloadPDF}
              variant="contained"
              endIcon={<DownloadIcon />}
            >
              Baixar PDF
            </Button>
          </div>
        )}
        <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default DocumentForm;
