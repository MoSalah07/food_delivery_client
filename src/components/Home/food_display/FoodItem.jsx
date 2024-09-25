import "./food-item.css";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Stack } from "@mui/material";
import { assets } from "../../../assets/frontend_assets/assets";
import { formatCurrency } from "../../../lib/formating-currency";
import { StoreCTX } from "../../../context/StoreProvider";
import { URL_API } from "../../../constant/Contant";

// eslint-disable-next-line react/prop-types
export default function FoodItem({ id, name, description, price, image }) {
  const { cartItems, addToCart, removeFromCart } = StoreCTX();

  return (
    <Card className="food-item" sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={`${URL_API}/images/${image}`}
          alt="green iguana"
        />
        <CardContent>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              className=" text-sm lg:text-base font-medium whitespace-nowrap"
              gutterBottom
              variant="p"
              component="div"
            >
              {name}
            </Typography>
            <img
              src={assets.rating_starts}
              alt="rating-starts"
              className="block mb-1"
            />
          </Stack>
          <Typography variant="body2" sx={{ color: "#676767", mt: 1 }}>
            {description}
          </Typography>
          <Typography
            variant="body2"
            sx={{ mt: 1, color: "tomato", fontWeight: "500", fontSize: "22px" }}
          >
            {formatCurrency(price)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className="container-actions-card">
        {!cartItems[id] ? (
          <img
            className="add"
            src={assets.add_icon_white}
            onClick={() => addToCart(id)}
          />
        ) : (
          <div className="food-item-counter">
            <Button size="small" color="primary">
              <img
                onClick={() => removeFromCart(id)}
                src={assets.remove_icon_red}
                alt="remove"
              />
            </Button>
            <p
              className="bg-white w-10 text-center font-bold "
              style={{ color: "tomato" }}
            >
              {cartItems[id]}
            </p>
            <Button size="small" color="primary">
              <img
                onClick={() => addToCart(id)}
                src={assets.add_icon_green}
                alt="green-icon"
              />
            </Button>
          </div>
        )}
      </CardActions>
    </Card>
  );
}
