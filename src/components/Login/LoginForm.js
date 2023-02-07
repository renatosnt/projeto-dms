import React from "react";
import { useNavigate } from "react-router-dom";

import useForm from "../../hooks/useForm";
import { loginUser } from "../../services/DatabaseService";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const email = useForm();
  const password = useForm();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    await loginUser(email.value, password.value).then(() => {
      navigate("/funcionarios");
    });
  }

  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      <form onSubmit={handleLogin}>
        <Input label="E-mail" name="email" type="text" {...email} />
        <Input label="Password" name="password" type="password" {...password} />
        <Button>Entrar</Button>
        <a href="/login/perdeu">Perdeu a senha?</a>
        <a href="/login/registrar">Ainda não possui uma conta? Cadastre-se</a>
      </form>
    </div>
  );
};

export default LoginForm;
