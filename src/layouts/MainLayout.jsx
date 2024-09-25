import { Outlet } from "react-router-dom";
import NavbarMain from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

function MainLayout() {
  return (
    <div>
      <NavbarMain />
      <hr />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
