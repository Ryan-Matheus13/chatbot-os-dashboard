/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks/useAppSelector";

function App() {
  const navigate = useNavigate();
  const applicationStore = useAppSelector((store) => store.application);

  useEffect(() => {
    if (applicationStore.user.isLogged) {
      navigate("/ordens-de-servicos");
      return;
    }
    navigate("/login");
  }, [applicationStore.user.isLogged]);

  return <Outlet />;
}

export default App;
