import { createContext, useContext, useEffect, useState } from "react";
// import { food_list } from "../assets/frontend_assets/assets";
import {
  DETAILS_DELIVERY_FOOD,
  TOKEN_DELIVERY,
  URL_API,
} from "../constant/Contant";
import axios from "axios";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

// eslint-disable-next-line react/prop-types
const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem(TOKEN_DELIVERY)) || null
  );
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem(DETAILS_DELIVERY_FOOD)) || null
  );
  const [food_list, setFood_list] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      try {
        const { data } = await axios.post(
          `${URL_API}/cart/add`,
          { itemId },
          { headers: { token } }
        );
        if (data.success) {
          toast.success(data.message);
        } else {
          console.log(`something went wrong`);
        }
      } catch (err) {
        console.log(err);
        toast.error(
          err && err.response && err.response.data
            ? err.response.data.message
            : err.message
        );
      }
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        const { data } = await axios.post(
          `${URL_API}/cart/remove`,
          { itemId },
          { headers: { token } }
        );
        if (data.success) {
          toast.warning(data.message);
        } else {
          console.log(`something went wrong`);
        }
      } catch (err) {
        console.log(err);
        toast.error(
          err && err.response && err.response.data
            ? err.response.data.message
            : err.message
        );
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const { data } = await axios.get(`${URL_API}/food/list`);
      setFood_list(data.data);
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  const loadCartData = async (token) => {
    try {
      const res = await axios.post(
        `${URL_API}/cart/get`,
        {},
        { headers: { token } }
      );
      setCartItems(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (JSON.parse(localStorage.getItem(TOKEN_DELIVERY))) {
        setToken(JSON.parse(localStorage.getItem(TOKEN_DELIVERY)));
        await loadCartData(JSON.parse(localStorage.getItem(TOKEN_DELIVERY)));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    isDisabled,
    token,
    role,
    setRole,
    setToken,
    setIsDisabled,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export const StoreCTX = () => useContext(StoreContext);

export default StoreContextProvider;
