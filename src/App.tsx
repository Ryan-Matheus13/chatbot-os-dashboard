/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, []);

  return <Outlet />;
}

export default App;
