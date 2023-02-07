import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";

const Login = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const userData = localStorage.getItem("@detailUser");
    if (userData) {
      navigate("/funcionarios");
    }
  }, []);

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
        </Routes>
      </div>
    </div>
  );
};

export default Login;
