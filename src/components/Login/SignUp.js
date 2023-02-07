import React from "react";
import useForm from "../../hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/DatabaseService";
const SignUp = () => {
  const email = useForm();
  const password = useForm();
  const passwordConfirmation = useForm();
  const [signUpError, setSignUpError] = React.useState(null);
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();
    // console.log(email.value);
    // console.log(password.value);
    // console.log(passwordConfirmation.value);
    await createUser(email, password, setSignUpError).then(() => {
      navigate("/funcionarios");
    });
  }

  return (
    <div>
      <h1 className={styles.title}>Cadastrar</h1>
      <form onSubmit={handleSignUp}>
        <Input label="E-mail" name="email" type="text" {...email} />
        <Input label="Senha" name="password" type="password" {...password} />
        <Input
          label="Confirme sua senha"
          name="password-confirmation"
          type="password"
          {...passwordConfirmation}
        />

        <Button className={styles.button}>Cadastrar</Button>
        {signUpError && <span className={styles.error}>{signUpError}</span>}
      </form>
    </div>
  );
};

export default SignUp;
