/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function SelectBoxRole({
  roleSelect,
  setRoleSelect,
  isEdit,
  width = 120,
}) {
  const handleChange = (event) => {
    setRoleSelect(event.target.value);
  };

  return (
    <Box sx={{ minWidth: width }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={roleSelect}
          label="Role"
          onChange={handleChange}
          disabled={!isEdit}
        >
          <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
          <MenuItem value={"MANAGER"}>MANAGER</MenuItem>
          <MenuItem value={"USER"}>USER</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
