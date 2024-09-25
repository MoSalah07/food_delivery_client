import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { assets } from "../../../assets/admin_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import {
  DETAILS_DELIVERY_FOOD,
  TOKEN_DELIVERY,
} from "../../../constant/Contant";
import { StoreCTX } from "../../../context/StoreProvider";

export default function MenuNavbar() {
  const navigate = useNavigate();

  const { setToken, setRole, setCartItems } = StoreCTX();

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_DELIVERY);
    localStorage.removeItem(DETAILS_DELIVERY_FOOD);
    setToken(null);
    setRole(null);
    setCartItems({});
    navigate(`/`);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img className="profile" src={assets.profile_image} alt="profile" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link to={`/`} style={{ display: "block", width: "100%" }}>
            Home Page
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            handleLogout();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
