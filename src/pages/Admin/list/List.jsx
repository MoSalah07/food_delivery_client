import "./list.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL_API } from "../../../constant/Contant";
import { toast } from "react-toastify";
import { StoreCTX } from "../../../context/StoreProvider";

function List() {
  const [list, setList] = useState([]);
  const { role } = StoreCTX();

  const fetchList = async () => {
    try {
      const res = await axios.get(`${URL_API}/food/list`);
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error("error");
      }
    } catch (err) {
      toast.error(err);
      return err;
    }
  };

  const removeFood = async (foodId) => {
    try {
      const res = await axios.delete(`${URL_API}/food/remove/${foodId}`, {
        headers: { role },
      });
      await fetchList();
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={`${URL_API}/images/${item.image}`} alt="image" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p className="cursor-pointer" onClick={() => removeFood(item._id)}>
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default List;
