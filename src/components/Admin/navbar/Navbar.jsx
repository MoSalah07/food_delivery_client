import "./navbar.css";
import { assets } from "../../../assets/admin_assets/assets";
import { Link } from "react-router-dom";
import MenuNavbar from "./MenuNavbar";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to={`/dashboard`}>
        <img className="logo" src={assets.logo} alt="logo" />
      </Link>
      <MenuNavbar />
    </nav>
  );
}

export default Navbar;
