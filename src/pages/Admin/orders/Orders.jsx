import "./order.css";
import { URL_API } from "../../../constant/Contant";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../../assets/admin_assets/assets";

function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const { data } = await axios.get(`${URL_API}/order/list`);
      if (data.success) {
        setOrders(data.data);
      } else {
        toast.error(`Error fetching order`);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      return err;
    }
  };

  const statusOrderDeliveryHandler = async (event, orderId) => {
    try {
      const { data } = await axios.post(`${URL_API}/order/status`, {
        orderId,
        status: event.target.value,
      });
      if (data.success) {
        await fetchAllOrders();
        toast.success(data.message);
      }
      return data;
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      return err;
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="parcel-icon" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  } else {
                    return `${item.name} x ${item.quantity} ,`;
                  }
                })}
              </p>
              <p className="order-item-name">{`${order.address.firstName} ${order.address.lastName}`}</p>
              <div className="order-item-address">
                <p>{`${order.address.street},`}</p>
                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipCode}`}</p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>${order.amount}</p>
            <select
              value={order.status}
              onChange={(event) => statusOrderDeliveryHandler(event, order._id)}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
