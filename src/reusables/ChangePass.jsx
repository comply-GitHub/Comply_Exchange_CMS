
import { forwardRef, Fragment } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Slide from '@mui/material/Slide'
import DialogContentText from '@mui/material/DialogContentText'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  TextField,
  CardHeader,

  CardContent,
  CardActions,
  Card,
  Divider,
  div,
  Select,
  MenuItem,
  Checkbox,
  Button,
} from "@mui/material";
import "./reusables.scss";

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import {changePassword, createFormInstruction,
    getFormInstructionById,
    updateFormInstruction, } from "../redux/Actions";




const DialogEdit = props => {
  const { open, setOpen, idData,setIdData, response, getList } = props
  
  const handleClose = () =>{ setOpen(false); setIdData({}) ;setData({id: 0,
    oldPassword: "",
    password: ""})}
 
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();

  const formData = useSelector((state) => state.ParentDropDownReducer);
  
  const [data, setData] = useState({
    id: 0,
    oldPassword: "",
    password: ""
  });
  
  //   useEffect(() => {
    //     if(idData){
      //       dispatch(getFormInstructionById(idData,(data)=>{ setData(data)}));
      //     }else{
        //       setData({})
        //     }
        // }, [idData]); 
        
const handleChange = (e) => {
          setData({ ...data, [e.target.name]: e.target.value });
  };
  const isPasswordValid = (password) => {
    // Implement your password validation logic here
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{12,})/;
    return passwordRegex.test(password);
  };
  
  // ...
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!isPasswordValid(data.password)) {
      // Password does not meet requirements, handle accordingly
      alert("Password must have one capital, one number, a special character, and be at least 12 characters long");
      return;
    }
  
    let updateData = {
      id: idData?.id,
      oldPassword: data.oldPassword,
      password: data.password,
    };
  
    if (idData) {
      dispatch(changePassword(updateData));
    }
    handleClose();
  };
  console.log(idData,"paprams")
  return (
    <Fragment>
     
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
      
      >
      
        <DialogContent>
          <DialogContentText>
<form  onSubmit={(e) => {
          handleSubmit(e);
        }}>

{ <div className="row headingtext ">Change Password</div>}
              <div className="row">
                <div className="col-3 table_text" >
                  <div
                   
                    className='table_text'
                  >
                    Old Password:<span style={{color:"red"}}>*</span>
                  </div>
                </div>
                <div className="col-9">
                

                  <TextField
                    required
                    type='password'
                    className='table_text'
                    size="small"
                    name="oldPassword"
                    value={data.oldPassword}
                    onChange={handleChange}
                    
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3 table_text" >
                  <div
                   
                    className='table_text'
                  >
                New Password:<span style={{color:"red"}}>*</span>
                  </div>
                </div>
                <div className="col-9">
                

                  <TextField
                   className='table_text'
                    size="small"
                    type='password'
                    name="password"
                    value={data.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              {/* <div className="row">
                <div className="col-3 table_text">
                  <div
                   
                    className='table_text'
                  >
                    Confirm Password:<span style={{color:"red"}}>*</span>

                  </div>
                </div>
                <div className="col-9">
                  <TextField
                   className='table_text'
                  size="small"
                    name="url"
                    value={data.url}
                    onChange={handleChange}
                    isRequired="true"
                    required
                   
                  />
                </div>
              </div> */}
           
           

            <div  style={{margin:"0px"}} className="actionButton mt-3">
              <Button
               style={{fontSize:"12px"}}
                type="reset"
                size="small"
                // onClick={()=>{history.push("/form_instruction")}}
                variant="outlined"
                onClick={handleClose}
                sx={{ mr: 1}}
              >
                cancel
              </Button>

              <Button
               style={{fontSize:"12px"}}
                size="small"
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </div>

                  </form>   
          </DialogContentText>
        </DialogContent>
       
      </Dialog>
    </Fragment>
  )
}

export default DialogEdit
