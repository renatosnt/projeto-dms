import React from "react";
import styles from "./Header.module.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";
import { signOut } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    if (localStorage.getItem("@detailUser")) {
      const userData = JSON.parse(localStorage.getItem("@detailUser"));
      setUser(userData);
    }
  }, []);

  async function handleLogout() {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("@detailUser");
        setUser(null);
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
        {user && (
          <div>
            <span className={styles.email}> {user.email}</span>
            <IconButton
              sx={{ mr: "2rem" }}
              onClick={handleLogout}
              aria-label="logout"
              size="large"
            >
              <LogoutIcon fontSize="inherit" />
            </IconButton>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
