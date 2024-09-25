import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// Components
import TableUsers from "../../../components/Admin/users/TableUsers";
import RemoveUsers from "../../../components/Admin/users/RemoveUsers";
import EditUsers from "../../../components/Admin/users/EditUsers";
import AddUsers from "../../../components/Admin/users/AddUsers";
// Lib
import { URL_API } from "../../../constant/Contant";
// Context
import { StoreCTX } from "../../../context/StoreProvider";

const MenuList = ["List Users", "Add Users", "Edit Users", "Remove Users"];

function Users() {
  const { token, role } = StoreCTX();
  const [allAccounts, setAllAccounts] = useState([]);
  const [menuUsers, setMenuUsers] = useState("List Users");

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get(`${URL_API}/users/subscribers`, {
        headers: { token, role },
      });
      if (data.success) {
        setAllAccounts(data.data.users);
      } else {
        toast.error("something went wrong");
      }
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const renderComponentUsersPage = () => {
    switch (menuUsers) {
      case "List Users":
        return <TableUsers allAccounts={allAccounts} />;
      case "Remove Users":
        return (
          <RemoveUsers allAccounts={allAccounts} getAllUsers={getAllUsers} />
        );
      case "Edit Users":
        return (
          <EditUsers allAccounts={allAccounts} getAllUsers={getAllUsers} />
        );
      case "Add Users":
        return <AddUsers getAllUsers={getAllUsers} />;
      default:
        return <TableUsers allAccounts={allAccounts} />;
    }
  };

  return (
    <div className=" w-full">
      <div className="my-auto container px-2 md:px-8 bg-primary-orange  py-8">
        <div className="flex items-center justify-between">
          {MenuList.map((item, idx) => (
            <p
              className={`${
                menuUsers === item
                  ? "text-black-100 border border-black py-2 px-4 "
                  : "text-white transition-all duration-75 cursor-pointer"
              }`}
              key={idx}
              onClick={() => setMenuUsers(item)}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-5">{renderComponentUsersPage()}</div>
    </div>
  );
}

export default Users;
