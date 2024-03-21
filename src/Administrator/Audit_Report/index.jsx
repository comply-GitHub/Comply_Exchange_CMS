import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
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
  Breadcrumbs,
  Link,
  Button,
  Input,
} from "@mui/material";


import ThemeOptions from "../../Layout/ThemeOptions";
import AppHeader from "../../Layout/AppHeader";
import { Fragment } from "react";
import AppSidebar from "../../Layout/AppSidebar";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./index.scss";
// import { createCapacities, getCapacitiesById ,updateCapacities} from "../../../redux/Actions";

export default function Countries_details() {
  const dispatch = useDispatch();
  let params = useParams();
  let history= useHistory();
//   const formData = useSelector((state) => state.getCapacitiesById);
  // createCapacities
  // getCapacitiesByfId
  const [data, setData] = useState(params.id ? {
    id: 0,
    name: "",
    isProxyMandatory: false,
    isCountryOfResidenceRequired: false,
    isImportant: false,
    isUSIndividual: false,
    isNonUSIndividual: false,
    isUSBusiness: false,
    isNonUSBusiness: false,
    isIntermediary: false,
    isNonUSGovernment: false,
  }:{
    name: "",
    isProxyMandatory: false,
    isCountryOfResidenceRequired: false,
    isImportant: false,
    isUSIndividual: false,
    isNonUSIndividual: false,
    isUSBusiness: false,
    isNonUSBusiness: false,
    isIntermediary: false,
    isNonUSGovernment: false,
  });
//    useEffect(()=>{
//     setData(formData?.capacityDataById)
//    },[formData])

  useEffect(() => {
    // dispatch(getCapacitiesById(params.id),(data)=>{ setData(data) });
  }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if(params.id){
//       dispatch(updateCapacities(data));
//     }
//     else{
//       dispatch(createCapacities(data));
//     }
//     history.push("/capacities");
//   };

 
//   const handleToogle = (e) => {
//     setData({ ...data, [e.target.name]: e.target.checked });
//   };
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <Fragment>
        <ThemeOptions />
        {/* <AppHeader /> */}

        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer" style={{height:'915px'}}>
          <div className="app-main__inner">
          <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <p
                   underline="hover"
                   color="#000000"
                   aria-current="page"
                  
                >
                  Audit Report
                </p>
              </Breadcrumbs>
            </div>
          <div className="row m-1 border p-3 box_style">
          <form >
            <div  >
            { <div className="row headingLabel complyColor">Audit Report</div>}
            <div className="heading">Enter the date range for the Audit Report</div>
              <div className="row my-0">
                <div className="col-2" >
                  <div
                   
                    className="table_content"
                  >
                 Start Date: 
                  </div>
                </div>
                <div className="col-10">
                  <div
                   
                    className="table_content"
                  ></div>

                  <TextField
                    type="date"
                  className="table_content"
                    size="small"
                    name="name"
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row my-0" >
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
             End Date:


                  </div>
                </div>
                <div className="col-10">
                <TextField
                  type="date"
                  className="table_content"
                    size="small"
                    name="name"
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
                 Purge Audit Data:

                  </div>
                </div>
                <div className="col-10">
               <Button className="btn-class"size="small" variant="contained">
                Purge Now
               </Button>
                </div>
              </div>
              <Button className="btn-class"size="small" variant="contained">
                Run
               </Button>

               <div className="heading">Create a scheduled report</div>
<div className="table_content">
    <span>
        <Checkbox/>
        Enable
    </span>
</div>

              <div className="row">
                <div className="col-2">
                  <div
                 
                    className="table_content"
                  >
            Repeat every:

                  </div>
                </div>
                <div className="col-10">

                <TextField
                  className="table_content"
                    size="small"
                    name="name"
                   
                    onChange={handleChange}
                    required
                  />
                  <span className="mx-2 table_content">(days from today)</span>
            
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
           Email recipients:

                  </div>
                </div>
                <div className="col-10">
                <TextField
               
                  className="table_content"
                    size="small"
                    name="name"
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <Button className="btn-class" size="small" variant="contained">
                Save
               </Button>
               <div className="heading">Enter the date range for the Application Event Error Report</div>
               <div className="row">
                <div className="col-2" >
                  <div
                   
                    className="table_content"
                  >
                 Start Date: 
                  </div>
                </div>
                <div className="col-10">
                  <div
                   
                    className="table_content"
                  ></div>

                  <TextField
                   type="date"
                  className="table_content"
                    size="small"
                    name="name"
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
             End Date:


                  </div>
                </div>
                <div className="col-10">
                <TextField
                  type="date"
                  className="table_content"
                    size="small"
                    name="name"
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <Button className="btn-class"size="small" variant="contained">
                Run
               </Button>
           
            </div>

<div>


</div>
         

           
          </form>
          
        </div>
        <div className="actionBtn mt-1">
              <Button
                type="reset"
                size="small"
               
                variant="outlined"
                sx={{ mx: 1,my:1}}
               
              >
                cancel
              </Button>

              <Button
                size="small"
                type="submit"
                sx={{ mr: 1 ,my:1}}
                className="btn-cstm"
                variant="contained"
              >
                Save
              </Button>
            </div>
        </div>
        </div>
        </div>
      </Fragment>
    </Card>
  );
}
