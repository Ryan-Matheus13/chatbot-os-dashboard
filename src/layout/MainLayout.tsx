/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ServiceOrders from "../pages/ServiceOrders";
import { ToastContainer, Bounce, toast } from "react-toastify";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Router, Navigation } from "@toolpad/core";
import { createTheme } from "@mui/material";
// import Logo from "../assets/logo.svg";
import LayersIcon from "@mui/icons-material/Layers";
import MapIcon from "@mui/icons-material/MapRounded";
import OrdersMap from "../pages/OrdersMap";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { logout } from "../store/applicationStore/actions";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Dashboard",
  },
  {
    segment: "ordens-de-servicos",
    title: "Ordens de Serviço",
    icon: <LayersIcon />,
  },
  {
    segment: "mapa-de-ordens",
    title: "Mapa",
    icon: <MapIcon />,
  },
];

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  palette: {
    primary: {
      main: "#5DCDCD",
      contrastText: "#fff",
    },
    // secondary: {},
  },
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: theme.palette.mode === "dark" ? "none" : "1px  solid #dcdcdc",
        }),
      },
    },
    MuiTypography: {
      styleOverrides: {
        h3: {
          fontSize: "1.5rem",
        },
        h5: {
          fontSize: "1.2rem",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#5DCDCD !important",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          backgroundColor: "#035656 !important",
        },
      },
    },
  },
});

interface LayoutProps {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

function PageContent({ pathname }: { pathname: string }) {
  return (
    <div className="content">
      {pathname == "/ordens-de-servicos" && <ServiceOrders />}
      {pathname == "/mapa-de-ordens" && <OrdersMap />}
    </div>
  );
}

export default function MainLayout(props: LayoutProps) {
  const dispatch = useAppDispatch();
  const applicationStore = useAppSelector((store) => store.application);

  const location = useLocation();
  const navigate = useNavigate();
  const { window } = props;

  const router = React.useMemo<Router>(() => {
    return {
      pathname: location.pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: any) => navigate(String(path)),
    };
  }, [location.pathname, navigate]);

  const layoutWindow = window !== undefined ? window() : undefined;

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout efetuado com sucesso!");
  };

  return (
    <>
      <div className="container-main">
        <AppProvider
          branding={{
            logo: <img src={""} height={0} width={0} alt="" />,
            title: "Smart Serviços",
          }}
          authentication={{
            signIn: () => {},
            signOut: handleLogout,
          }}
          session={{
            user: {
              email: "test@email.com",
              name: applicationStore.user.username,
            },
          }}
          navigation={NAVIGATION}
          router={router}
          theme={theme}
          window={layoutWindow}
        >
          <DashboardLayout>
            <PageContent pathname={location.pathname} />
          </DashboardLayout>
        </AppProvider>
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
