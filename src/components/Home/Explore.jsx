import { menu_list } from "../../assets/frontend_assets/assets";
import "./explore.css";

// eslint-disable-next-line react/prop-types
function Explore({ category, setCategory }) {
  return (
    <div>
      <h2 className="main-heading-sections">Explore our menu</h2>
      <p className="w-full text-center sm:text-left sm:max-w-[60%] text-gray-500 ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero
        laudantium illo omnis ipsam reprehenderit asperiores iste, amet soluta
        esse veritatis!
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name
                )
              }
            >
              <img
                src={item.menu_image}
                alt="image"
                className={category === item.menu_name ? "active" : ""}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default Explore;
