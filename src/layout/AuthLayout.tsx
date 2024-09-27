import { useLocation } from "react-router-dom";
import Login from "../pages/Login";

export default function AuthLayout() {
  const location = useLocation();
  return location.pathname == "/login" && <Login />;
}
