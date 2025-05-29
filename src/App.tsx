import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./Layout.tsx";
import {styled} from "@mui/material/styles";
import WaitingListPage from "./Pages/WaitingList/WaitingList.tsx";

function App() {
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


    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />, // A common layout with a navbar
            children: [
            ],
        },
        { path: "*", element: <WaitingListPage /> }, // Catch-all 404 page
    ]);
    return <Root><RouterProvider router={router} /></Root>
}

export default App
