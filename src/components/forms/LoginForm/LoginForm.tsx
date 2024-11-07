import React, { useEffect } from "react";
import styles from "./LoginForm.module.css";

import { useFormik } from "formik";

import { LoginFormValues } from "./LoginForm.types";
import { loginSchema } from "./ValidationSchema";
import InputField from "../../common/InputField/InputField";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../../store/hooks/useAppDispatch";
import { saveUser } from "../../../store/applicationStore/actions";
import { useAppSelector } from "../../../store/hooks/useAppSelector";
import Loading from "../../common/Loading/Loading";
import { loginAsync } from "../../../store/applicationStore/thunks";

const initialValues: LoginFormValues = {
  username: "",
  password: "",
};

const LoginForm: React.FC = () => {
  const { loading, errorLogin } = useAppSelector(
    (store) => store.application
  );
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginFormValues>({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: (values: LoginFormValues) => {
      dispatch(
        loginAsync({ username: values.username, password: values.password })
      );
      dispatch(saveUser(values.username));
    },
  });

  useEffect(() => {
    toast.error(errorLogin);
  }, [errorLogin]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.formContainer}>
        {loading && <Loading />}
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

        <div className={styles.btnRow}>
          <a className={styles.link} href="#">
            Esqueceu a senha?
          </a>
          <button className={styles.btn} type="submit">
            Entrar
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
