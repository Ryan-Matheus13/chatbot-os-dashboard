import "react";
import LoginForm from "../components/forms/LoginForm/LoginForm";
import styles from "../styles/login.module.css";
import Logo from "../assets/logo.svg";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  return (
    <section className={"page-container"}>
      <div className={styles.login}>
        <div className={styles.loginFormContainer}>
          <div className={styles.loginFormHeaderContainer}>
            <div className={styles.loginFormHeader}>
              <h1>Entrar</h1>
              <h2>Insira as credenciais abaixo</h2>
            </div>
            <img className={styles.loginLogo} src={Logo} alt={"Logo"} />
          </div>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
