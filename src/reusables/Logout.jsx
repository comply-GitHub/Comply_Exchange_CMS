// ** React Imports
import { forwardRef, Fragment, useState } from "react";

// ** MUI Imports
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import "./reusables.scss";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTransition = (props) => {
  const history = useHistory();
  const { open, deleteItems, setOpen, idData, response, getList } = props;
  // ** State
  const handleClose = () => setOpen(false);
  const handleLogout = async () => {
    localStorage.clear()
    history.push("login")
    handleClose()
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
       
        <DialogContent>
          <DialogContentText style={{ color: "black",fontSize:"15px"}}
           id="alert-dialog-slide-description">
            Are you sure you want to LogOut?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-actions-dense">
          <div style={{ margin: "0px",padding:'0px' }} className="actionButton">
            <Button
             style={{fontSize:"12px"}}
              type="reset"
              size="small"
              sx={{ mr: 1 }}
              variant="outlined"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
             style={{fontSize:"12px"}} size="small" variant="contained" onClick={handleLogout}>
              Confirm
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DialogTransition;
