import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import UserRegistrationComponent from "../Register/UserRegistrationComponent.tsx";

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
        <MenuItem onClick={goToProfile}>Profile<UserRegistrationComponent /></MenuItem>
        <MenuItem onClick={goToAccount}>My account</MenuItem>
    </Menu>
};

export default MenuComponent;