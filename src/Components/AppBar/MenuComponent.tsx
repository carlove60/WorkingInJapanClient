import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paths from "../../Constants/Paths.ts";
import { Link } from "react-router-dom";

interface MenuComponentProps {
    isMenuOpen: boolean;
    handleMenuClose: () => void;
    menuId: string;
    anchorEl: Element | null;
}
const MenuComponent = ({isMenuOpen, handleMenuClose, menuId, anchorEl}: MenuComponentProps) => {
    const goToProfile = () => {}
    const goToAccount = () => {}

    return <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
    >
        <MenuItem onClick={goToProfile}>Profile</MenuItem>
        <MenuItem onClick={goToAccount}>My account</MenuItem>
        <MenuItem><Link to={Paths.RegisterCompany}>Register as Company</Link></MenuItem>
        <MenuItem><Link to={Paths.RegisterUser}>Register as User</Link></MenuItem>
    </Menu>
};

export default MenuComponent;