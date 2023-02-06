import React from "react";
import IconButton from "@mui/material/IconButton";
import styles from "./Menu.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
const Menu = ({ id, name }) => {
  const navigate = useNavigate();
  let editMode = false;
  if (id) editMode = true;
  const previousName = name;

  return (
    <div className={styles.menu}>
      <div className={styles.menuButtons}>
        <IconButton
          onClick={() => {
            navigate("/funcionarios");
          }}
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <ArrowBackIcon variant="contained" />
        </IconButton>
        {editMode && (
          <Button href="#history" variant="contained">
            Histórico
          </Button>
        )}
      </div>
      <div className={styles.menuHeader}>
        {editMode ? (
          <h1>Editando funcionário</h1>
        ) : (
          <h1>Adicionar novo funcionário</h1>
        )}
      </div>
    </div>
  );
};

export default Menu;
