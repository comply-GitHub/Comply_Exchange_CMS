
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
import Divider from '@mui/material/Divider';
import {
  TextField,
  CardHeader,

  CardContent,
  CardActions,
  Card,

  div,
  Select,
  MenuItem,
  Checkbox,
  Button,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import "./reusables.scss";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


import {createFormInstruction,
    getFormInstructionById,
    updateFormInstruction, } from "../redux/Actions";
import { RadioButtonChecked } from '@mui/icons-material'




const ViewErr = props => {
  const { open, setOpen, idData, response, getList } = props
 
  const handleClose = () => setOpen(false)
 
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();

  const formData = useSelector((state) => state.ParentDropDownReducer);

  const [data, setData] = useState({
   description:"",
   url:""
  });

  useEffect(() => {
    if(idData){
      dispatch(getFormInstructionById(idData,(data)=>{ setData(data)}));
    }else{
      setData({})
    }
}, [idData]); 

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    let createData={
      description:data.description,
      url:data.url
    }
    let updateData={
      description: data.description,
      id: idData ,
      url: data.url,
    }
 
    if (idData) {
      dispatch(updateFormInstruction(updateData));
    } else {
      dispatch(createFormInstruction(createData));
    }
    handleClose()
  };
  return (
    <Fragment>
     
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
      
      >
      
        <DialogContent>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
          <DialogContentText>
<form  onSubmit={(e) => {
          handleSubmit(e);
        }}>

{ <div className="row headingLabel ">View</div>}
              <div className="row">
                <div className='col-12 table_text'>
                  <div
                   
                    className='table_text1'
                  >
                "businessCountry":"Australia","businessCountryISO":"AU","businessCountryOther":"","businessName":"Chei Wen pty ltd Test2","businessUnit":"Certa Testing","countryOfBirth":"","countryOfBirthISO":"","countryOfBirthOther":"","countryOfCitizenship":"","countryOfCitizenshipISO":"","countryOfCitizenshipOther":"","custCountryOrigin":"NON-US","custTypeCd":"Corporation","dateOfBirth":"","entityDetermination":"Entity","entityInformation":"contactName":"Chen WenTest4","emailAddress":"CheiWenTest2Con@test.com","phoneCountry":"","phoneCountryCode":"","phoneNumber":"","primaryTelephoneCountry":"","primaryTelephoneCountryCode":"","primaryTelephoneNumber":"","firstName":"","lastName":"","mailingAddress":"city":"","country":"","countryISO":"","countryOther":"","isCareOfAddress":false,"isPoBox":false,"isRuralRoute":false,"line1":"","line2":"","line3":"","state":"","zipcode":"","primaryAddress":"city":"Ivanhoe","country":"Australia","countryISO":"AU","countryOther":"","isCareOfAddress":false,"isPoBox":false,"isRuralRoute":false,"line1":"180 upper Heidelberg Road","line2":"","line3":"","state":"VIC","zipcode":"3079","taxIdentification":"foreignTaxCountry":"Australia","foreignTaxCountryISO":"AU","foreignTaxId":"38 487 297 378","giin":"","taxPayerId":"","tinType":"","vat":"17999990252","townCityOfBirth":"","uniqueIdentifier":"10731"
                  </div>
                </div>
               

               

          
              </div>
            

                  </form>   
          </DialogContentText>
        </DialogContent>
       
      </Dialog>
    </Fragment>
  )
}

export default ViewErr
