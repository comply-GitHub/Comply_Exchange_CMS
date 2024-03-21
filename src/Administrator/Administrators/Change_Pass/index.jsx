import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
import {
  TextField,
  CardHeader,
  Breadcrumbs,Link,
  CardContent,
  CardActions,
  Card,
  Divider,
  div,
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

export default function Countries_details() {
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
//    useEffect(()=>{
//     setData(formData?.capacityDataById)
//    },[formData])

  useEffect(() => {
    // dispatch(getCapacitiesById(params.id),(data)=>{ setData(data) });
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
          <div className="app-main__outer" style={{height:'1000px'}}>
          <div className="app-main__inner">
          <div className=" row mx-2">
          <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                   underline="hover"
                   color="#0c62a8"
                  onClick={()=>{history.push("/administrators")}}
                  
                >
  Administrators
                </Link>
                <Link
                   underline="hover"
                   color="#000000"
                  
               
                  
                >
  Administrator Change Password
                </Link>
              </Breadcrumbs>
            </div>
          <form >
            <div  >
            { <div className="row headingLabel complyColor">Administrator Details</div>}
              <div className="row">
                <div className="col-2" >
                  <div
                   
                    className="table_content"
                  >
                 Email:
                  </div>
                </div>
                <div className="col-10">
                  <div
                   
                    className="table_content"
                  ></div>

                  <TextField
                  className="table_content"
                    size="small"
                    name="name"
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2" >
                  <div
                   
                    className="table_content"
                  >
                 Password:
                  </div>
                </div>
                <div className="col-10">
                  <div
                   
                    className="table_content"
                  ></div>

                  <TextField
                  className="table_content"
                    size="small"
                    name="name"
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2" >
                  <div
                   
                    className="table_content"
                  >
                Password Confirmation:
                  </div>
                </div>
                <div className="col-10">
                  <div
                   
                    className="table_content"
                  ></div>

                  <TextField
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
               Enable MFA (Multi Factor Authentication) - Email:


                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isUSIndividual"
                        //   onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isUSIndividual}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
                  Enable MFA (Multi Factor Authentication) - Message:


                  </div>
                </div>
                <div className="col-10">
                <Checkbox name="isUSIndividual"
                        //   onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isUSIndividual}/>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
             Country Code:

                  </div>
                </div>
                <div className="col-10">

                    <Select type="Mobile"className='selectBox text' >
                        <MenuItem> ---Select----</MenuItem>
                        <MenuItem>Sort Code</MenuItem>
                        <MenuItem>ABA/Routing Numbers</MenuItem>
                    </Select>
                 {/* <Checkbox name="isImportant"
                        //   onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isImportant}/> */}
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
             Mobile Number:

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
           
            </div>

<div>


</div>
         

            <div className="actionBtn">
              <Button
                type="reset"
                size="small"
               
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={()=>{history.push("/capacities")}}
              >
                cancel
              </Button>

              <Button
                size="small"
                type="submit"
               handleChange={handleSubmit}
                sx={{ mr: 2 }}
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
