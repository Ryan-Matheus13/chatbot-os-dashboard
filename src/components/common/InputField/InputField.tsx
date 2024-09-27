import React from "react";
import { TextField } from "@mui/material";
import { InputFieldProps } from "./InputField.types";

import styles from "./InputField.module.css";

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  error = false,
  helperText,
  ...rest
}) => {
  return (
    <TextField
      className={styles.input}
      id={id}
      name={id}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      fullWidth
      variant="outlined"
      margin="normal"
      {...rest}
    />
  );
};

export default InputField;
