import { useState } from "react";
import axios from "axios";
import { IconButton, Stack, TextField } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import SelectBoxRole from "../../Admin/users/SelectBoxRole";
import { StoreCTX } from "../../../context/StoreProvider";
import { URL_API } from "../../../constant/Contant";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function TbodyUsersEdit({ _id, email, name, role, getAllUsers }) {
  const { token, role: currentUserRole } = StoreCTX();
  const [isEdit, setIsEdit] = useState(false);
  const [roleSelect, setRoleSelect] = useState(role || "");
  const [dataEdit, setDataEdit] = useState({
    name: name || "",
    email: email || "",
  });

  const getValues = (e) => {
    setDataEdit({ ...dataEdit, [e.target.name]: e.target.value });
  };

  const updateUsers = async () => {
    const emailNotChanged = dataEdit.email === email;
    try {
      const { data } = await axios.patch(
        `${URL_API}/users/updateUser`,
        {
          id: _id,
          name: dataEdit.name,
          email: emailNotChanged ? null : dataEdit.email,
          role: roleSelect,
        },
        { headers: { token, role: currentUserRole } }
      );
      if (data.success) {
        setIsEdit(false);
        toast.success(data.message);
        getAllUsers();
      } else {
        toast.error(`something went wrong`);
      }
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      return err;
    }
  };

  return (
    <>
      <tr className="bg-white border-b dark:bg-orange-400 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-orange-200 dark:text-white">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          <TextField
            onChange={getValues}
            value={dataEdit.name}
            id="outlined-basic"
            label="Name"
            name="name"
            variant="outlined"
            disabled={!isEdit}
            // defaultValue={name}
            sx={{ color: "white" }}
          />
        </th>
        <td className="px-6 py-4">
          <TextField
            onChange={getValues}
            value={dataEdit.email}
            id="outlined-basic"
            label="Email"
            name="email"
            variant="outlined"
            disabled={!isEdit}
            // defaultValue={email}
          />
        </td>
        <td className="px-6 py-4">
          <SelectBoxRole
            isEdit={isEdit}
            roleSelect={roleSelect}
            setRoleSelect={setRoleSelect}
          />
        </td>
        <td className="px-6 py-4 text-right">
          {isEdit ? (
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <IconButton
                onClick={() => {
                  updateUsers(_id, dataEdit.name, dataEdit.email, roleSelect);
                  setIsEdit(false);
                }}
              >
                <CheckIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton onClick={() => setIsEdit(false)}>
                <ClearIcon sx={{ color: "white" }} />
              </IconButton>
            </Stack>
          ) : (
            <IconButton
              sx={{ fontSize: "16px", fontWeight: "400", color: "skyblue" }}
              size="large"
              onClick={() => setIsEdit(true)}
            >
              Edit
            </IconButton>
          )}
        </td>
      </tr>
    </>
  );
}

export default TbodyUsersEdit;
