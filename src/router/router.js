import React from "react";
import {createBrowserRouter} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";


const router = createBrowserRouter([
        {
                path: "/",
                element: <MainPage />,
        },
        {
                path: "/login",
                element: <LoginPage />,
        },
        {
                path: "/registration",
                element: <RegistrationPage />,
        },
]);

export default router;