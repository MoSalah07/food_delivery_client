/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DialogRemove({ removeUser, id, email }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveUser = async () => {
    await removeUser();
    handleClose();
  };

  return (
    <React.Fragment>
      <Button color="warning" variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon fontSize="medium" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Are You Sure Remove user`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are You Sure Remove User Email: is ${email} And ID: is ${id} `}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleRemoveUser} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
