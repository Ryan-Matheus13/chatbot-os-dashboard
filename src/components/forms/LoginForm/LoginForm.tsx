import React from "react";
import styles from "./LoginForm.module.css";

import { useFormik } from "formik";

import { LoginFormValues } from "./LoginForm.types";
import { loginSchema } from "./ValidationSchema";
import InputField from "../../common/InputField/InputField";
// import { useNavigate } from "react-router-dom";

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const LoginForm: React.FC = () => {
  // const navigate = useNavigate();

  // const [loginError, setLoginError] = useState("");

  const formik = useFormik<LoginFormValues>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values: LoginFormValues) => {
      console.log("Form values:", values);
      // handleLogin(values.username, values.password);
    },
  });

  // const handleLogin = async (username: string, password: string) => {
  //   const response = await fetch("/users.json");
  //   const users = await response.json();

  //   const user = users.find(
  //     (u: LoginFormValues) => u.username === username && u.password === password
  //   );

  //   if (user) {
  //     navigate("/ordens-de-servicos");
  //     setLoginError("");
  //   } else {
  //     setLoginError("Nome de usuário ou senha incorretos!");
  //   }
  // };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
      <InputField
        id="username"
        label="Username"
        type="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        error={formik.touched.username && !!formik.errors.username}
        helperText={formik.touched.username ? formik.errors.username : ""}
      />

      <InputField
        id="password"
        label="Senha"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password ? formik.errors.password : ""}
      />

      {/* <div className={styles.submitErrorContainer}>
        <span className={styles.submitError}>{loginError}</span>
      </div> */}

      <div className={styles.btnRow}>
        <a className={styles.link} href="#">
          Esqueceu a senha?
        </a>
        <button className={styles.btn} type="submit">
          Entrar
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
