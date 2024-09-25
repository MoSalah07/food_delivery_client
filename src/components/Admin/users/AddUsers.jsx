import React, { useState } from "react";
import HeadingUsers from "./HeadingUsers";
import TextField from "@mui/material/TextField";
import {
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RoleAddUser from "./RoleAddUser";
import { StoreCTX } from "../../../context/StoreProvider";
import axios from "axios";
import { URL_API } from "../../../constant/Contant";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function AddUsers({ getAllUsers }) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [roleSelect, setRoleSelect] = React.useState("");
  const { token, role } = StoreCTX();
  const [dataInputs, setDataInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isDisabled, setIsDisabled] = useState(false);

  const getValuesInputs = (e) =>
    setDataInputs({ ...dataInputs, [e.target.name]: e.target.value });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setIsDisabled(true);
    try {
      const { data } = await axios.post(
        `${URL_API}/users/createUser`,
        {
          role: roleSelect,
          name: dataInputs.name,
          email: dataInputs.email,
          password: dataInputs.password,
        },
        { headers: { token, role } }
      );
      if (data.success) {
        setIsDisabled(true);
        toast.success(data.message);
        setDataInputs({ email: "", password: "", name: "" });
        setRoleSelect("");
        getAllUsers();
      } else {
        toast.error("something went wrong");
      }
    } catch (err) {
      toast.error(err.response ? err.response.data.message : err.message);
      setIsDisabled(false);
      console.log(err);
      return err;
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="container mx-auto px-1 md:px-8">
      <HeadingUsers title={`Add User`} />
      <div>
        <form onSubmit={handleAddUser}>
          <Stack sx={{ mb: 2 }} direction={"row"} alignItems={"center"} gap={1}>
            <TextField
              required
              id="outlined-required"
              label="User Name"
              name="name"
              fullWidth
              onChange={getValuesInputs}
              value={dataInputs.name}
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              name="email"
              fullWidth
              onChange={getValuesInputs}
              value={dataInputs.email}
            />
          </Stack>
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                onChange={getValuesInputs}
                value={dataInputs.password}
                name="password"
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <RoleAddUser
              roleSelect={roleSelect}
              setRoleSelect={setRoleSelect}
            />
          </Stack>
          <Button
            // className="disabled:cursor-not-allowed"
            type="submit"
            color="secondary"
            fullWidth
            disabled={isDisabled}
            sx={{
              mt: 4,
              border: "1px solid purple",
              cursor: isDisabled ? "not-allowed" : "pointer",
            }}
          >
            Add User
          </Button>
        </form>
      </div>
    </div>
  );
}

export default AddUsers;
