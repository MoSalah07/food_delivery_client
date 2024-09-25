import { Button } from "@mui/material";
import "./place-order.css";
import TextField from "@mui/material/TextField";
import { StoreCTX } from "../../context/StoreProvider";
import { formatCurrency } from "../../lib/formating-currency";
import { URL_API } from "../../constant/Contant";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { getTotalCartAmount, token, food_list, cartItems } = StoreCTX();
  const navigate = useNavigate();

  const [dataInputs, setDataInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const getValues = (e) => {
    setDataInputs({ ...dataInputs, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: dataInputs,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    try {
      const { data } = await axios.post(`${URL_API}/order/place`, orderData, {
        headers: { token },
      });

      if (data.success) {
        const { session_url, message } = data.data;
        toast.success(message);
        window.location.replace(session_url);
      }

      return data;
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    if (getTotalCartAmount() === 0) {
      navigate(`/cart`);
    }
  }, [getTotalCartAmount, navigate]);

  return (
    <div className="w-full min-h-[50vh] container mx-auto px-8 relative">
      <form onSubmit={placeOrder} className="my-16 capitalize">
        <div className=" flex flex-col lg:flex-row  justify-between">
          {/* Col_1 */}
          <div className="flex flex-col gap-y-3">
            <h2 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-8">
              delivery information
            </h2>
            <div className=" flex items-center gap-x-3">
              <TextField
                id="outlined-text-input"
                label="First Name"
                type="text"
                name="firstName"
                fullWidth
                onChange={getValues}
                value={dataInputs.firstName}
                required
              />
              <TextField
                id="outlined-text-input"
                label="last Name"
                type="text"
                name="lastName"
                fullWidth
                onChange={getValues}
                value={dataInputs.lastName}
                required
              />
            </div>
            <div className="flex flex-col gap-y-3">
              <TextField
                id="outlined-email-input"
                label="Email"
                type="email"
                name="email"
                required
                fullWidth
                onChange={getValues}
                value={dataInputs.email}
              />
              <TextField
                id="outlined-street-input"
                label="Street"
                name="street"
                type="text"
                required
                fullWidth
                onChange={getValues}
                value={dataInputs.street}
              />
            </div>
            <div className="flex items-center gap-x-3">
              <TextField
                id="outlined-city-input"
                label="City"
                name="city"
                type="text"
                fullWidth
                onChange={getValues}
                value={dataInputs.city}
                required
              />
              <TextField
                id="outlined-state-input"
                label="State"
                name="state"
                type="text"
                fullWidth
                onChange={getValues}
                value={dataInputs.state}
                required
              />
            </div>
            <div className="flex items-center gap-x-3">
              <TextField
                id="outlined-zipcode-input"
                label="Zip Code"
                type="text"
                name="zipCode"
                fullWidth
                onChange={getValues}
                value={dataInputs.zipCode}
                required
              />
              <TextField
                id="outlined-text-input"
                label="Country"
                type="text"
                name="country"
                fullWidth
                onChange={getValues}
                value={dataInputs.country}
                required
              />
            </div>
            <div>
              <TextField
                id="outlined-zipcode-input"
                label="Phone"
                type="number"
                name="phone"
                required
                fullWidth
                onChange={getValues}
                value={dataInputs.phone}
                inputProps={{ min: 0 }}
              />
            </div>
          </div>
          {/* Col_2 */}
          <div className="mt-8 lg:mt-0">
            <h2 className="text-xl lg:text-2xl font-bold mb-6 lg:mb-8">
              Cart Totals
            </h2>
            <div className="flex items-center justify-between font-medium relative  after:absolute after:bottom-[-7px] after:left-0 after:w-full after:h-[2px] after:bg-gray-400">
              <p>subtotal</p>
              <p>{formatCurrency(getTotalCartAmount())}</p>
            </div>
            <div className="flex items-center justify-between my-4 font-medium relative after:absolute after:bottom-[-7px] after:left-0 after:w-full after:h-[2px] after:bg-gray-400">
              <p>delivery fee</p>
              <p>{formatCurrency(2)}</p>
            </div>
            <div className="flex items-center justify-between font-bold">
              <p>total</p>
              <p>{formatCurrency(getTotalCartAmount() + 2)}</p>
            </div>
            <div className="mt-4">
              <Button
                fullWidth
                sx={{
                  color: "white",
                  backgroundColor: "#fc6b29",
                  padding: ".45rem 1.25rem",
                }}
                type="submit"
              >
                proceed to payment
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PlaceOrder;
