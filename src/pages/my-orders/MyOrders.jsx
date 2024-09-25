import "./my-orders.css";
import { useEffect, useState } from "react";
import { StoreCTX } from "../../context/StoreProvider";
import axios from "axios";
import { URL_API } from "../../constant/Contant";
import { assets } from "../../assets/frontend_assets/assets";
import { formatCurrency } from "../../lib/formating-currency";
import { Button } from "@mui/material";

function MyOrders() {
  const { token } = StoreCTX();
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const { data } = await axios.post(
      `${URL_API}/order/userorders`,
      {},
      { headers: { token } }
    );
    setData(data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2 className="text-center text-base sm:text-xl md:text-2xl lg:text-4xl">
        My Orders
      </h2>
      <div className="order-container">
        {data.map((order, index) => (
          <div key={index} className="my-orders-order">
            <img src={assets.parcel_icon} alt="parcel_icon" />
            <p>
              {order.items.map((item, index) => {
                if (index === order.items.length - 1) {
                  return `${item.name} x ${item.quantity}`;
                } else {
                  return `${item.name} x ${item.quantity} ,`;
                }
              })}
            </p>
            <p>{formatCurrency(order.amount)}</p>
            <p>Items: {order.items.length}</p>
            <p>
              <span>&#x25cf;</span>
              <b>{order.status}</b>
            </p>
            <Button size="small">Track Order</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyOrders;
