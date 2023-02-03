import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src="/marca-taugor.png" alt="Taugor logo" />
      <img className={styles.home} src="/house-solid.svg" alt="Home button" />
    </header>
  );
};

export default Header;
