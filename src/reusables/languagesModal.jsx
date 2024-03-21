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
import "./reusables.scss";
import { useHistory } from "react-router-dom";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTransition = (props) => {
  const {
    open,
    rowId,
    langId,
    deleteItems,
    setOpen,
    idData,
    redirectFunc,
    response,
    getList,
  } = props;
  const history = useHistory();
  // ** State
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    deleteItems(idData);
    setOpen(false);
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
          <DialogContentText className="add_languages">
            <ul>
              {rowId.length &&
                rowId.map((i) => {
                  return (
                    <li
                      key={i?.id}
                      onClick={()=>{redirectFunc(langId,i)}}
                      className={i?.moduleId == langId ? "boldClass" : ""}
                    >
                      {i.name}
                    </li>
                  );
                })}
            </ul>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="dialog-actions-dense">
          <div style={{ margin: "0px", padding: "0px" }} className="actionButton">
            <Button
              style={{ fontSize: "12px" }}
              size="small"
              variant="contained"
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DialogTransition;
