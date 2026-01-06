import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { LandingPage } from "./pages/LandingPage";
import { Auth } from "./pages/Auth";
import { About } from "./pages/About";
import { Food } from "./pages/Food";
import { Transport } from "./pages/Transport";
import { Shopping } from "./pages/Shopping";
import { Electricity } from "./pages/Electricity";
import { DashBoard } from "./pages/Dashboard";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/app",
    element: <Layout />,
    children: [
      {
        path: "/app/dashboard",
        element: <DashBoard />,
      },
      {
        path: "/app/about",
        element: <About />,
      },
      {
        path: "/app/food",
        element: <Food />,
      },
      {
        path: "/app/transport",
        element: <Transport />,
      },
      {
        path: "/app/shopping",
        element: <Shopping />,
      },
      {
        path: "/app/settings",
        element: <Settings />,
      },
      // {
      //   path: "/app/electricity",
      //   element: <Electricity />,
      // },
    ],
  },
]);
