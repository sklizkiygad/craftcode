import React from "react";
import {createBrowserRouter,createRoutesFromElements,Route} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";

import LoginPage from "../pages/LoginPage/LoginPage";


const router = createBrowserRouter([
        {
                path: "/",
                element: <MainPage />,
        },
        {
                path: "/login",
                element: <LoginPage />,
        },
]);

export default router;