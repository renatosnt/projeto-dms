import React from "react";

// validação e valores de formularios
const useForm = () => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validate() {
    setError("Preencha a senha");
    // TODO provavelmente será feito no firebase
    // validação com erros de email invalido
    // validação com erro de senha fraca
  }

  function onChange({ target }) {
    validate();
    setValue(target.value);
  }

  return {
    value,
    setValue,
    error,
    onChange,
  };
};

export default useForm;
