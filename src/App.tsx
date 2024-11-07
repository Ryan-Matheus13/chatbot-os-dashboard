/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks/useAppSelector";
import { useAppDispatch } from "./store/hooks/useAppDispatch";
import { clearErrors, logout } from "./store/applicationStore/actions";

function App() {
  const navigate = useNavigate();
  const {
    user,
    errorCategory,
    errorLogin,
    errorServiceOrders,
    errorStatus,
    errorTeam,
    errorTeams,
  } = useAppSelector((store) => store.application);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const errors = [
      errorCategory,
      errorLogin,
      errorServiceOrders,
      errorStatus,
      errorTeam,
      errorTeams,
    ];

    if (errors.some((error) => error?.includes("Token has expired"))) {
      dispatch(logout());
      navigate("/login");
    }
  }, [
    errorCategory,
    errorLogin,
    errorServiceOrders,
    errorStatus,
    errorTeam,
    errorTeams,
  ]);

  useEffect(() => {
    dispatch(clearErrors());
    if (user.accessToken) {
      navigate("/ordens-de-servicos");
      return;
    }
    navigate("/login");
  }, [user.accessToken]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
