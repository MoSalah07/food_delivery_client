import "./cart.css";
import { Button } from "@mui/material";
import TableCart from "../../components/cart/TableCart";
import { StoreCTX } from "../../context/StoreProvider";
import { formatCurrency } from "../../lib/formating-currency";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { getTotalCartAmount, cartItems } = StoreCTX();
  const navigate = useNavigate();

  if (Object.keys(cartItems).length <= 0 || getTotalCartAmount() === 0) {
    return (
      <div className="h-[48.4vh] flex items-center justify-center bg-[#444] text-white text-lg sm:text-2xl font-bold">
        <p className="capitalize text-center">
          Cart Is Empty{" "}
          <span
            onClick={() => navigate(`/`)}
            className="text-orange-500 transition-colors duration-200 hover:text-orange-300 cursor-pointer sm:ml-1"
          >
            Go To Home
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="cart">
      <TableCart />
      <div className="cart-content">
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{formatCurrency(getTotalCartAmount())}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Food</p>
              <p>{getTotalCartAmount() === 0 ? 0 : formatCurrency(2)}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{formatCurrency(getTotalCartAmount() + 2)}</p>
            </div>
          </div>
          <Button
            onClick={() => navigate(`/order`)}
            style={{
              background: "tomato",
              marginTop: ".5rem",
              color: "white",
              padding: ".4rem 2rem",
            }}
          >
            PROCEED TO CHECKOUT
          </Button>
        </div>
        <div className="cart-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cart-promocode-input">
            <input type="text" placeholder="promo code" />
            <Button
              sx={{ backgroundColor: "black", color: "white", width: "15%" }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
