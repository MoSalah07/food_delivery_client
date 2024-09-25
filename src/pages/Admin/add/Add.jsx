import "./add.css";
import { assets } from "../../../assets/admin_assets/assets";
import { useState } from "react";
import axios from "axios";
import { URL_API } from "../../../constant/Contant";
import { toast } from "react-toastify";

const categoriesList = [
  { id: 1, value: "Salad" },
  { id: 2, value: "Rolls" },
  { id: 3, value: "Deserts" },
  { id: 4, value: "Sandwich" },
  { id: 5, value: "Cake" },
  { id: 6, value: "Pure Veg" },
  { id: 7, value: "Pasta" },
  { id: 8, value: "Noodles" },
];

function Add() {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("image", image);
    try {
      const res = await axios.post(`${URL_API}/food/add`, formData);
      console.log(res);
      if (res.data.success) {
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(false);
        toast.success(res.data.message);
        return res;
      } else {
        toast.error(res.data.message);
        return null;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response ? err.response.data.message : err.message);
      return err;
    }
  };

  return (
    <div className="w-full mt-8">
      <form onSubmit={onSubmitHandler} className="flex-col">
        <h2 className="mb-8 text-lg sm:text-2xl lg:text-4xl text-primary-orange">
          Add Items
        </h2>
        <div className="add-img-upload flex-col">
          <p className="mb-4">Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="upload"
            />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            id="description"
            rows={6}
            placeholder="Write Content Here"
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              {categoriesList.map((item) => (
                <option key={item.id} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name="price"
              placeholder="$20"
              min={0}
              max={2000}
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>
    </div>
  );
}

export default Add;
