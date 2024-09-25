/* eslint-disable react/prop-types */
import axios from "axios";
import { StoreCTX } from "../../../context/StoreProvider";
import { URL_API } from "../../../constant/Contant";
import { toast } from "react-toastify";
import DialogRemove from "../../../components/Admin/users/DialogRemove";

function TbodyUsersRemove({ _id, name, email, role, createdAt, getAllUsers }) {
  const { token, role: currentUserRole } = StoreCTX();
  const date = new Date(createdAt);

  // Format the date into a readable string
  const formattedDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const removeUser = async () => {
    try {
      const { data } = await axios.delete(
        `${URL_API}/users/deleteUser/${_id}`,
        {
          headers: { token, role: currentUserRole },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllUsers();
      } else {
        toast.error("something went wrong");
      }
    } catch (err) {
      toast.error(err.message);
      return err;
    }
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-orange-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-orange-900">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="px-6 py-4 text-white">{email}</td>
        <td className="px-6 py-4 text-white">{role}</td>
        <td className="px-6 py-4 text-white">{formattedDate}</td>
        <td className="px-6 py-4 text-white text-right">
          <DialogRemove removeUser={removeUser} id={_id} email={email} />
        </td>
      </tr>
    </>
  );
}

export default TbodyUsersRemove;
