import { Button } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { auth } from "./services/firebase";
const Home = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const userData = { user: user.uid, email: user.email };
          localStorage.setItem("@detailUser", JSON.stringify(userData));
          navigate("/funcionarios");
        }
      });
    }
    checkLogin();
  }, []);

  return (
    <div className={`container ${styles.home}`}>
      <div>
        <h1 className={styles.title}>Gerencie documentos de forma dinâmica</h1>
        <p className={styles.intro}>
          Bem-vindo à solução de gerenciamento de documentos de funcionários que
          simplifica o trabalho e aumenta a produtividade. Armazene, organize e
          acesse todos os seus documentos importantes em um local seguro e
          centralizado.
        </p>

        <Button
          onClick={() => navigate("/login/registrar")}
          variant="contained"
          color="success"
          sx={{ mr: "20px" }}
        >
          Cadastrar
        </Button>
        <Button
          onClick={() => navigate("/login")}
          variant="outlined"
          color="error"
        >
          Login
        </Button>
      </div>

      <div>
        <img src="/online-document.svg" />
      </div>
    </div>
  );
};

export default Home;
