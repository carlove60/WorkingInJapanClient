import NavBar from "./Components/AppBar/AppBar.tsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
    return <div>
        <NavBar></NavBar>
        <main>
            <Outlet /> {/* This renders the child components */}
        </main>
    </div>
}

export default Layout;