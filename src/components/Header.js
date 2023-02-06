import React from "react";
import styles from "./Header.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConnection";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  async function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("deslogado");
        navigate("/");
      })
      .catch((error) => {
        console.log("erro");
      });
  }
  return (
    <header className={styles.header}>
      <img className={styles.logo} src="/marca-taugor.png" alt="Taugor logo" />
      <div>
        {/* <img className={styles.home} src="/house-solid.svg" alt="Home button" /> */}
        <IconButton onClick={handleLogout} aria-label="logout" size="large">
          <LogoutIcon fontSize="inherit" />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
