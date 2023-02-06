import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Gerencie seus documentos</h1>
      <p>
        Bem-vindo à solução de gerenciamento de documentos de funcionários que
        simplifica o trabalho e aumenta a produtividade. Armazene, organize e
        acesse todos os seus documentos importantes em um local seguro e
        centralizado. Adeus aos arquivos dispersos, olá à colaboração sem
        problemas. Cadastre-se agora!
      </p>
      <Button
        onClick={() => navigate("/login/registrar")}
        variant="contained"
        color="success"
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
  );
};

export default Home;
