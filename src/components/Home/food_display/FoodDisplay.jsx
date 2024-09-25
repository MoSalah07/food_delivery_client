/* eslint-disable react/prop-types */
import styles from "./food_display.module.css";
import { StoreCTX } from "../../../context/StoreProvider";
import FoodItem from "./FoodItem";

function FoodDisplay({ category }) {
  const { food_list } = StoreCTX();

  return (
    <div className={styles.food_display}>
      <h2 className="main-heading-sections">top dishes near you</h2>
      <div className={styles.food_list_display}>
        {food_list &&
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return <FoodItem key={index} id={item._id} {...item} />;
            }
          })}
      </div>
    </div>
  );
}

export default FoodDisplay;
