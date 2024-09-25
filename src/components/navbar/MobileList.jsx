/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { StoreCTX } from "../../context/StoreProvider";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

export default function MobileList({
  openMobileList: open,
  setOpenMobileList: setOpen,
  handleLogout,
  setOpen: setOpenFormAuth,
}) {
  const { token, role } = StoreCTX();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, bgcolor: "#af4f0f", color: "white", height: "100%" }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {token ? (
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingBagIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <Link to={`/cart`}>
                  <ListItemText primary={`Cart`} />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LocalShippingIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <Link to={`/myorders`}>
                  <ListItemText primary={`Orders`} />
                </Link>
              </ListItemButton>
            </ListItem>
            {role === "ADMIN" ||
              (role === "MANAGER" && (
                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                      <DashboardIcon sx={{ color: "white" }} />
                    </ListItemIcon>
                    <ListItemText primary={`Admin Dashboard`} />
                  </ListItemButton>
                </ListItem>
              ))}
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={`Logout`} />
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  setOpenFormAuth(true);
                }}
              >
                <ListItemIcon>
                  <LoginIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary={`SIGN IN`} />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <IconButton type="button" onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: "white" }} />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
