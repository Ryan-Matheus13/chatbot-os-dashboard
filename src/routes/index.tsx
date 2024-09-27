import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ServiceOrders from "../pages/ServiceOrders";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import AuthLayout from "../layout/AuthLayout";
import OrdersMap from "../pages/OrdersMap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "ordens-de-servicos",
            element: <ServiceOrders />,
          },
          {
            path: "mapa-de-ordens",
            element: <OrdersMap />,
          },
        ],
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default router;
