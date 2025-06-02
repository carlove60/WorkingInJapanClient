import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { FrontPage } from "./Pages/FrontPage.tsx";

function App() {
  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    height: "100vh",
    backgroundColor: theme.palette.background.paper,
    ...theme.typography.body2,
    color: (theme.cssVariables || theme).palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  const router = createBrowserRouter([
    {
      path: "/",
      element: undefined,
      children: [
        { index: true, element: <FrontPage /> },
        { path: "*", element: <FrontPage /> },
      ],
    },
  ]);
  return (
    <Root>
      <RouterProvider router={router} />
    </Root>
  );
}

export default App;
