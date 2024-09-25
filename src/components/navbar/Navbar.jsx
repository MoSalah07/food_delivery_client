import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { List, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
// Hooks
import useMediaMui from "../../hooks/useMediaMui";
import FromAuth from "../auth/FromAuth";
import { Link, useNavigate } from "react-router-dom";
import { StoreCTX } from "../../context/StoreProvider";
import { DETAILS_DELIVERY_FOOD, TOKEN_DELIVERY } from "../../constant/Contant";
// Components
import MobileList from "./MobileList";

const MENULIST = [
  { id: 1, title: "home", href: "/" },
  { id: 2, title: "menu", href: "/" },
  { id: 3, title: "mobile app", href: "/" },
  { id: 4, title: "contact us", href: "/" },
];

export default function NavbarMain() {
  const { isQueryScreen: isMediumScreen } = useMediaMui("md");
  const { isQueryScreen: isSmallScreen } = useMediaMui("sm");
  const [open, setOpen] = useState(false);
  const [openMobileList, setOpenMobileList] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, role, setRole, setCartItems } =
    StoreCTX();

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_DELIVERY);
    localStorage.removeItem(DETAILS_DELIVERY_FOOD);
    setToken(null);
    setRole(null);
    setCartItems({});
    navigate(`/`);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className="bg-or"
        position="static"
        sx={{ backgroundColor: "#ED6C16" }}
      >
        <Toolbar className="flex items-center justify-between">
          {/* Mobile List */}
          {isSmallScreen && (
            <MobileList
              setOpen={setOpen}
              handleLogout={handleLogout}
              openMobileList={openMobileList}
              setOpenMobileList={setOpenMobileList}
            />
          )}
          <Stack alignItems={"center"} flexDirection={"row"}>
            <Typography variant="h6" component="div">
              <Link to={`/`}>DeliveryFood</Link>
            </Typography>
          </Stack>
          {!isSmallScreen && (
            <>
              <List sx={{ display: isMediumScreen ? "none" : "block" }}>
                {MENULIST.map((item) => (
                  <Button
                    onClick={() => setSelectedMenu(item.title)}
                    key={item.id}
                    color="inherit"
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "1.1rem",
                      color: selectedMenu === item.title ? "#9a3412" : "white",
                    }}
                  >
                    {item.title}
                  </Button>
                ))}
              </List>
              <List
                className={`flex items-center ${
                  isMediumScreen ? "gap-1" : "gap-4"
                }`}
              >
                <IconButton
                  fontSize={isMediumScreen ? "medium" : "large"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SearchIcon
                    sx={{ marginTop: 1 }}
                    fontSize={isMediumScreen ? "medium" : "large"}
                  />
                </IconButton>
                <IconButton sx={{ position: "relative" }}>
                  <Link to={`/cart`}>
                    <span
                      className={`${
                        getTotalCartAmount() === 0
                          ? ""
                          : "absolute w-4 h-4 top-1 right-2 bg-orange-800 rounded-full"
                      }`}
                    ></span>
                    <ShoppingBagIcon
                      fontSize={isMediumScreen ? "medium" : "large"}
                    />
                  </Link>
                </IconButton>
                {token ? (
                  <>
                    <div>
                      <IconButton
                        fontSize={isMediumScreen ? "medium" : "large"}
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        sx={{ marginTop: 1 }}
                        // color="inherit"
                      >
                        <AccountCircle
                          fontSize={isMediumScreen ? "medium" : "large"}
                        />
                      </IconButton>
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem onClick={handleClose}>
                          <Link to={`/myorders`}>Orders</Link>
                        </MenuItem>
                        {role === "ADMIN" ||
                          (role === "MANAGER" && (
                            <MenuItem>
                              <Link to={`/dashboard`}>Admin Dashboard</Link>
                            </MenuItem>
                          ))}
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
                  </>
                ) : (
                  <>
                    <Button
                      size={isMediumScreen ? "small" : "medium"}
                      sx={{ backgroundColor: "#fb8c00", color: "black" }}
                      onClick={() => setOpen(true)}
                    >
                      Sign in
                    </Button>
                  </>
                )}
              </List>
            </>
          )}
        </Toolbar>
        {open && <FromAuth open={open} setOpen={setOpen} />}
      </AppBar>
    </Box>
  );
}
