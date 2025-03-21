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
import {apiClient} from "./ApiClient.ts";
import {RegistrationTypeObject} from "../generated-client/models";

function App() {
    React.useEffect(() => {
        const apiFetch = async () => {
            apiClient.api.auth.checkSession.get().then(((x) => {
            if (x) {
                if (isNotNullOrEmpty(x)) {
                    localStorage.setItem("token", x);
                }
            }}
            )).catch((x) => console.log(x.headers));

        };
        apiFetch().finally();
    }, []);

    const CheckSession = (interval = 300000) => {
        React.useEffect(() => {
            const timer = setInterval(async () => {
                if (isNotNullOrUndefined(localStorage.getItem("token"))) {
                    const response = await apiClient.api.auth.checkSession.get();
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
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}

export default App
