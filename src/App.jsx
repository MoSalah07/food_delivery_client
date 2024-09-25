// React_Router_Dom
import { Route, Routes } from "react-router-dom";
// Pages
import Add from "./pages/Admin/add/Add";
import List from "./pages/Admin/list/List";
import Orders from "./pages/Admin/orders/Orders";
import Dashboard from "./pages/Admin/dashboard/Dashboard.jsx";
import Cart from "./pages/cart/Cart";
import PlaceOrder from "./pages/order/PlaceOrder";
import ErrorPage from "./pages/error/ErrorPage";
import Users from "./pages/Admin/users/Users.jsx";
// Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home/Home";
// Fonts MUi
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
// Context Auth
import AuthContextProvider from "./context/AuthProvider.jsx";
import Verify from "./pages/verify/verify.jsx";
import MyOrders from "./pages/my-orders/MyOrders.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

function App() {
  return (
    <div className="">
      <ToastContainer
        position="top-center"
        limit={5}
        autoClose={2200}
        pauseOnFocusLoss
        pauseOnHover
      />
      <div>
        <Routes>
          {/* Main Layout */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
            <Route
              path="/orders"
              element={
                <AuthContextProvider>
                  <Orders />
                </AuthContextProvider>
              }
            />
            <Route
              path="/cart"
              element={
                <AuthContextProvider>
                  <Cart />
                </AuthContextProvider>
              }
            />
            <Route
              path="/order"
              element={
                <AuthContextProvider>
                  <PlaceOrder />
                </AuthContextProvider>
              }
            />

            <Route
              path="/verify"
              element={
                <AuthContextProvider>
                  <Verify />
                </AuthContextProvider>
              }
            />

            <Route
              path="/myorders"
              element={
                <AuthContextProvider>
                  <MyOrders />
                </AuthContextProvider>
              }
            />
          </Route>
          {/* Dashbaord Layout */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/add" element={<Add />} />
            <Route path="dashboard/list" element={<List />} />
            <Route path="dashboard/orders" element={<Orders />} />
            <Route path="dashboard/users" element={<Users />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
