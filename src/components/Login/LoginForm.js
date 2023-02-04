import React from "react";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const email = useForm();
  const password = useForm();
  return (
    <div>
      <h1 className={styles.title}>Login</h1>
      <form>
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
