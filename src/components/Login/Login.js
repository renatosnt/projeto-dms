import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import LoginCreate from "./LoginCreate";
import LoginPasswordLost from "./LoginPasswordLost";

const Login = () => {
  return (
    <div className={`${styles.login} container`}>
      <img
        className={styles.image}
        src="/hiring.svg"
        // src="/online-document.svg"
        alt="Imagem representativa de uma pessoa gerenciando documentos"
      />
      <div className={styles.form}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/criar" element={<LoginCreate />} />
          <Route path="/perdeu" element={<LoginPasswordLost />} />
        </Routes>
      </div>
    </div>
  );
};

export default Login;
