import { useLocation } from "react-router-dom";
import Login from "../pages/Login";

export default function AuthLayout() {
  const location = useLocation();
  return (
    <div className="main">{location.pathname == "/login" && <Login />}</div>
  );
}
