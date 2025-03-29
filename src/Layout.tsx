import PrimarySearchAppBar from "./Components/AppBar/AppBar.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return <div>
        <PrimarySearchAppBar></PrimarySearchAppBar>
        <main>
            <Outlet /> {/* This renders the child components */}
        </main>
    </div>
}

export default Layout;