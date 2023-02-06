import React from "react";
import styles from "./Input.module.css";
const Input = ({
  type,
  label,
  name,
  value,
  setValue,
  error,
  onChange,
  placeholder,
  ...props
}) => {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className={styles.input}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default Input;
