import './App.css'
import FrontPage from "./Components/FrontPage.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout.tsx";
import AboutPage from "./Pages/AboutPage.tsx";
import NotFoundPage from "./Pages/NotFoundPage.tsx";
import RegistrationPage from "./Pages/Login/RegisterPage.tsx";
import Paths from "./Constants/Paths.ts";
import * as React from "react";
import {isNotNullOrEmpty} from "./Helpers/StringHelper.ts";
import {isNotNullOrUndefined} from "./Helpers/Guard.ts";
import {RegistrationTypeObject} from "../generated-api/models";
import Client from "./ApiClient.ts";
import {styled} from "@mui/material/styles";

function App() {
    React.useEffect(() => {
        const apiFetch = async () => {
            Client.instance.api.auth.checkSession.get().then(((x) => {
            if (x) {
                if (isNotNullOrEmpty(x)) {
                    localStorage.setItem("token", x);
                }
            }}
            )).catch((x) => console.log(x.headers));

        };
        apiFetch().finally();
    }, []);

    const Root = styled('div')(({ theme }) => ({
        width: '100%',
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
        ...theme.typography.body2,
        color: (theme.cssVariables || theme).palette.text.secondary,
        '& > :not(style) ~ :not(style)': {
            marginTop: theme.spacing(2),
        },
    }));


    const CheckSession = (interval = 300000) => {
        React.useEffect(() => {
            const timer = setInterval(async () => {
                if (isNotNullOrUndefined(localStorage.getItem("token"))) {
                    const response = await Client.instance.api.auth.checkSession.get();
                    if (response) {
                        localStorage.removeItem("token");
                        window.location.href = "/" + Paths.Login; // Redirect to login
                    }
                }
            }, interval);

            return () => clearInterval(timer);
        }, [interval]);
    };
    CheckSession();

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />, // A common layout with a navbar
            children: [
                { index: true, element: <FrontPage /> }, // Default route
                { path: Paths.About, element: <AboutPage /> },
                { path: Paths.RegisterUser, element: <RegistrationPage type={RegistrationTypeObject.User} />},
                { path: Paths.RegisterCompany, element: <RegistrationPage type={RegistrationTypeObject.Company} />}
            ],
        },
        { path: "*", element: <NotFoundPage /> }, // Catch-all 404 page
    ]);
    return <Root><RouterProvider router={router} /></Root>
}

export default App
