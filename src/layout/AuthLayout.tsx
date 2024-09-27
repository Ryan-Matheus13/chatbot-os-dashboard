import { useLocation } from "react-router-dom";
import Login from "../pages/Login";
import { ToastContainer, Bounce } from "react-toastify";

export default function AuthLayout() {
  const location = useLocation();
  return (
    <>
      {location.pathname == "/login" && <Login />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}
