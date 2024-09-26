import { useLocation } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export default function MainLayout() {
  const location = useLocation();
  return (
    <div className="main">
      {location.pathname == "/ordens-de-servicos" && <Dashboard />}
    </div>
  );
}
