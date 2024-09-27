import { useLocation } from "react-router-dom";
import Login from "../pages/Login";
import { ToastContainer, Bounce } from "react-toastify";

export default function AuthLayout() {
  const location = useLocation();
  return (
    <>
      <div className="main-auth">
        {location.pathname == "/login" && <Login />}
      </div>
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
