import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const email = useForm();
  const password = useForm();
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        console.log("logado", userCredential);
        navigate("/funcionarios");
      })
      .catch((error) => {
        console.log(error);
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
