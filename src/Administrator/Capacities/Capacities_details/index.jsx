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
  Breadcrumbs,Link,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Input,
} from "@mui/material";


import ThemeOptions from "../../../Layout/ThemeOptions/";
import AppHeader from "../../../Layout/AppHeader/";
import { Fragment } from "react";
import AppSidebar from "../../../Layout/AppSidebar/";
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
import { createCapacities, getCapacitiesById ,updateCapacities} from "../../../redux/Actions";

export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  let history= useHistory();
  const formData = useSelector((state) => state.getCapacitiesById);
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
   useEffect(()=>{
    setData(formData?.capacityDataById)
   },[formData])

  useEffect(() => {
    if (params.id){
      dispatch(getCapacitiesById(params.id),(data)=>{ setData(data) });
    }
   else{
    setData({ name: "",
    isProxyMandatory: false,
    isCountryOfResidenceRequired: false,
    isImportant: false,
    isUSIndividual: false,
    isNonUSIndividual: false,
    isUSBusiness: false,
    isNonUSBusiness: false,
    isIntermediary: false,
    isNonUSGovernment: false})
   }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(params.id){
      dispatch(updateCapacities(data));
    }
    else{
      dispatch(createCapacities(data));
    }
    history.push("/capacities");
  };

 
  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };
  
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
          <div className="app-main__outer" >
          <div className="app-main__inner">
          <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                   underline="hover"
                   color="#0c62a8"
                   onClick={()=>{
                    history.push("/capacities")
                   }}
                 
                  
                >
    Capacities
                </Link>
                <p
                   underline="hover"
                   color="#000000"
                   
                 
                  
                >
    Capacity details
                </p>
              </Breadcrumbs>
            </div>
          <div className=" row m-1 border p-3 box_style">
          <form onSubmit={handleSubmit}>
            <div  >
            { <div className="row headingLabel complyColor">{params.id ?" Edit Capacity" : "Add Capacity"}</div>}
              <div className="row">
                <div className="col-2" >
                  <div
                    variant="body2"
                    className="table_content"
                  >
                    Name:<span style={{color:"red"}}>*</span>
                  </div>
                </div>
                <div className="col-10">
                  <div
                    variant="body2"
                    className="table_content"
                  ></div>

                  <TextField
                  className="table_content"
                    size="small"
                    name="name"
                    value={data?.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                    variant="body2"
                    
                    className="table_content"
                  >
                   Is proxy mandatory:


                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isProxyMandatory"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isProxyMandatory}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                    variant="body2"
                    
                    className="table_content"
                  >
                   Is country of residence required:


                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isCountryOfResidenceRequired"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isCountryOfResidenceRequired}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                    variant="body2"
                    
                    className="table_content"
                  >
                   Is important:


                  </div>
                </div>
                <div className="col-10">
                 <Checkbox name="isImportant"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isImportant}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                    variant="body2"
                    
                    className="table_content"
                  >
                   Is U.S. individual:


                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isUSIndividual"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isUSIndividual}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                    variant="body2"
                    
                    className="table_content"
                  >
                   Is Non U.S. individual:


                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isNonUSIndividual"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isNonUSIndividual}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                    variant="body2"
                    
                    className="table_content"
                  >
                   Is U.S. business:


                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isUSBusiness"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isUSBusiness}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                    variant="body2"
                    
                    className="table_content"
                  >
                  Is Non U.S. business:


                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isNonUSBusiness"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isNonUSBusiness}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                    variant="body2"
                    className="table_content"
                  >
                  Is intermediary:

            
                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isIntermediary"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isIntermediary}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                    variant="body2"
                    
                    className="table_content"
                  >
                 

                  Is non U.S. government:
                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isNonUSGovernment"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isNonUSGovernment}/>
                </div>
              </div>
            </div>

            <div className="actionBtn">
              <Button
                type="reset"
                size="small"
               
                variant="outlined"
                sx={{ mr: 1 }}
                onClick={()=>{history.push("/capacities")}}
              >
                cancel
              </Button>

              <Button
                size="small"
                type="submit"
               
                sx={{ mr: 1 }}
                variant="contained"
              >
                Save
              </Button>
            </div>
          </form>
        </div>
        </div>
        </div>
        </div>
      </Fragment>
    </Card>
  );
}
