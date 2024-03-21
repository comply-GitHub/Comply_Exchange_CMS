
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


import { createLanguages, getLanguagesById, updateLanguage,getLanguageList } from "../redux/Actions";




const  DialogEdit = props => {
  const { open, setOpen, idData,rowData, response, getList,data,setData } = props
 
  const handleClose = () => setOpen(false)
 
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();

  const formData = useSelector((state) => state.getLanguageByIdReducer);



  useEffect(()=>{
    if(idData!==0){
    setData(rowData)
    dispatch(getLanguagesById(idData),(item)=>{ setData(item)});
  }
},[])

useEffect(()=>{

if(idData){
  dispatch(getLanguagesById(idData),(data)=>{ setData(data)});
}
},[idData])

  

  const handleChange = (e) => {
    console.log(e.target.value)
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (idData) {
      dispatch(updateLanguage(data));
    } else {
      dispatch(createLanguages(data));
    }
    dispatch(getLanguageList(1, 10, ""));
    handleClose();
  };
  return (
    <Fragment>
     
      <Dialog
     
        open={open}
        keepMounted
        onClose={handleClose}
      
        // TransitionComponent={Transition}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
      
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
<form  onSubmit={(e) => {
          handleSubmit(e);
        }}>

       { <div className="row headingtext">{idData ?" Edit Language" : "Add Language"}</div>}        
                  <div>
                    <div className="row">
                      <div className="col-3 table_text">
                        <div
                         
                          className='table_text'
                        >
                          Name:
                        </div>
                      </div>
                      <div className="col-9">
                       

                        <TextField
                        required
                         className='table_text'
                          size="small"
                          name="name"
                          value={data?.name}
                          onChange={handleChange}
                         
                          
                        />
                      </div>
                    </div>
                    <div className="row" >
                      <div className="col-3 table_text">
                        <div
                         
                          className='table_text'
                        >
                          ISO Code:
                        </div>
                      </div>
                      <div className="col-9">
                   

                        <TextField
                        required
                         className='table_text'
                          size="small"
                          name="isoCode"
                          value={data?.isoCode}
                          onChange={handleChange}
                         
                         
                        />
                      </div>
                    </div>
                  </div>
                  <div  style={{margin:"0px"}}className="actionButton mt-3">
                    <Button
                     style={{fontSize:"12px"}}
                      type="reset"
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={handleClose}
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
