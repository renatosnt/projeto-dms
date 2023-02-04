import React from "react";
import { Route, Routes } from "react-router-dom";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";
import LoginPasswordLost from "./LoginPasswordLost";

const Login = () => {
  return (
    <div className={`${styles.login} container`}>
      <img
        className={styles.image}
        src="/hiring.svg"
        alt="Imagem representativa de uma pessoa gerenciando documentos"
      />
      <div className={styles.form}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/registrar" element={<SignUp />} />
          <Route path="/perdeu" element={<LoginPasswordLost />} />
        </Routes>
      </div>
    </div>
  );
};

export default Login;
