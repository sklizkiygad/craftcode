
import {createBrowserRouter} from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage";
import WelcomePage from "../pages/WelcomePage/WelcomePage";



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
        {
                path: "/welcome",
                element: <WelcomePage/>,
        },
]);

export default router;