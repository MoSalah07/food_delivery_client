import { createContext, useContext } from "react";
import { StoreCTX } from "./StoreProvider";

export const AuthContext = createContext(null);

const AuthComponent = () => {
  return (
    <div className="min-h-[47.9vh] bg-primary-orange text-white flex items-center justify-center">
      <p className="capitalize text-xl sm:text-2xl lg:text-4xl font-semibold transition-colors duration-200 hover:text-gray-800 hover:cursor-pointer">
        {" "}
        You must register before entering this page. please click on sign in
      </p>
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const AuthContextProvider = ({ children }) => {
  const { token } = StoreCTX();

  return (
    <AuthContext.Provider value={{}}>
      {token ? children : <AuthComponent />}
    </AuthContext.Provider>
  );
};

export const AuthCTX = () => useContext(AuthContext);

export default AuthContextProvider;
