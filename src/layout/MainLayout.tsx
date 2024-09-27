import { useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import { ToastContainer, Bounce } from "react-toastify";

export default function MainLayout() {
  const location = useLocation();
  return (
    <>
      <div className="main">
        {location.pathname == "/ordens-de-servicos" && <Dashboard />}
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
