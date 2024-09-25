import { createContext, useContext } from "react";
import { StoreCTX } from "./StoreProvider";
import { Link } from "react-router-dom";

export const AdminContext = createContext(null);

const AdminRoleComponent = () => {
  return (
    <div className="min-h-screen bg-primary-orange text-white flex items-center justify-center">
      <p className="capitalize text-xl sm:text-2xl font-semibold transition-colors duration-200 hover:text-gray-800 hover:cursor-pointer flex flex-col items-center">
        {" "}
        <Link className="mb-8" to={`/`}>
          {" "}
          You cannot access this page because you do not have access permissions
          to this page
        </Link>
        <Link to={`/`}>Go Home Page</Link>
      </p>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const AdminContextProvider = ({ children }) => {
  const { role } = StoreCTX();

  return (
    <AdminContext.Provider value={{}}>
      {role === "ADMIN" || role === "MANAGER" ? (
        children
      ) : (
        <AdminRoleComponent />
      )}
    </AdminContext.Provider>
  );
};

export const AuthCTX = () => useContext(AdminContext);

export default AdminContextProvider;
