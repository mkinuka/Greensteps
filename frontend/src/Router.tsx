import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { LandingPage } from "./pages/LandingPage"
import { About } from "./pages/About";
import { Food } from "./pages/Food";
import { Transport } from "./pages/Transport";
import { Shopping } from "./pages/Shopping";
import { Electricity } from "./pages/Electricity";
import { DashBoard } from "./pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path: "/",
                element: <LandingPage/>
            },
            {
                path: "/dashboard",
                element: <DashBoard/>
            },
            {
                path: "/About",
                element: <About/>
            },
            {
                path: "/Food",
                element: <Food/>
            },
            {
                path:"/Transport",
                element: <Transport/>
            },
            {
                path: "/Shopping",
                element:<Shopping/>
            },
            {
                path: "/Electricity",
                element: <Electricity/>
            }

        ]
    }
])