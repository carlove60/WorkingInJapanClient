import { Outlet } from "react-router-dom";
import BubbleComponent from "./Components/Bubble/BubbleComponent.tsx";
import Box from "@mui/material/Box";

const Layout = () => {
  return (
    <>
      <BubbleComponent />
      <main style={{ paddingTop: "50px" }}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Outlet /> {/* This renders the child components */}
        </Box>
      </main>
    </>
  );
};

export default Layout;
