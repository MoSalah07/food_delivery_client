import "./sidebar.css";
import { assets } from "../../../assets/admin_assets/assets";
import { NavLink } from "react-router-dom";
import { IconButton } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-options">
        <NavLink to={`/dashboard/add`} className="sidebar-option">
          <img src={assets.add_icon} alt="add_icon" />
          <p>Add Items</p>
        </NavLink>{" "}
        <NavLink to={`/dashboard/list`} className="sidebar-option">
          <img src={assets.order_icon} alt="list_icon" />
          <p>List Items</p>
        </NavLink>{" "}
        <NavLink to={`/dashboard/orders`} className="sidebar-option">
          <img src={assets.order_icon} alt="orders_icon" />
          <p>Orders</p>
        </NavLink>{" "}
        <NavLink to={`/dashboard/users`} className="sidebar-option">
          <IconButton>
            <PeopleIcon />
          </IconButton>
          <p>Users</p>
        </NavLink>{" "}
      </div>
    </aside>
  );
}

export default Sidebar;
