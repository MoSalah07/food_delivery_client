import Sidebar from "../components/Admin/sidebar/Sidebar";
import Navbar from "../components/Admin/navbar/Navbar";
import { Outlet } from "react-router-dom";
import AdminContextProvider from "../context/AdminProvider";

function DashboardLayout() {
  return (
    <AdminContextProvider>
      <div className="">
        <Navbar />
        <hr />
        <div className="flex">
          <Sidebar />
          <main className=" overflow-hidden w-full">
            <Outlet />
          </main>
        </div>
      </div>
    </AdminContextProvider>
  );
}

export default DashboardLayout;
