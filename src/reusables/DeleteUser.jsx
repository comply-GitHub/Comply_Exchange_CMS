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
import {getAllEformsDetails,UpsertEFormsAgent} from "../redux/Actions"
import { useDispatch } from "react-redux";
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTransition = (props) => {
  const { open, deleteItems,data, setOpen, idData, response, getList,closeCallback } = props;

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [isActive , setIsActive] = useState(1);
  const [value , setValue]= useState(deleteItems)
 
  console.log(deleteItems,idData,"88")
  const handleClose = () => setOpen(false);

  const handleDelete = async () => {
    setValue(true);
    // Assuming you want to update the entire value state
    // const updatedValue = { ...value, isDeleted: true };
    let currentDateTime = new Date().toISOString();
    let updatedValue = {
       
        id: data?.id,
        userName: data?.userName,
        password: data?.password,
        agentId: data?.agentId,
        emailId: data?.emailId,
        isActive: data?.isActive,
        isDeleted: !value,
        numberofWrongPasswordAttempts: data?.numberofWrongPasswordAttempts,
        createdOn: currentDateTime,
        createdBy: 0,
        updatedOn: currentDateTime,
        updatedBy: 0
       
      };
   
  
    setOpen(false);
    console.log(updatedValue, "122");
  
    dispatch(UpsertEFormsAgent(updatedValue));
    dispatch(getAllEformsDetails(page, size,search??"",isActive));
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        // onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
       
        <DialogContent>
          <DialogContentText style={{ color: "black",fontSize:"15px"}}
           id="alert-dialog-slide-description">
            Are you sure you want to delete ?
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
             style={{fontSize:"12px"}} size="small" variant="contained" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default DialogTransition;
