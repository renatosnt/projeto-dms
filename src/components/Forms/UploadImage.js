import { Avatar, Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import styles from "./UploadImage.module.css";
import React from "react";

const UploadImage = ({ setPhoto, photoUrl }) => {
  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }

  return (
    <div className={styles.wrapper}>
      <Avatar
        className={styles.avatar}
        alt="avatar"
        src={photoUrl}
        sx={{ width: "10rem", height: "10rem" }}
      />
      <Button
        component="label"
        variant="outlined"
        size="small"
        endIcon={<UploadIcon />}
      >
        Adicionar Foto
        <input type="file" hidden onChange={handleChange} />
      </Button>
      {/* <span className={styles.warning}>Apenas .jpeg</span> */}
    </div>
  );
};

export default UploadImage;
