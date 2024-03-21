import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  TextField,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  Card,
  Divider,
  Breadcrumbs,
  div,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Link,
  Input,
  Radio,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
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
import {
  GetDocumentationTypes,
  getDocById,
  createDocType,
  updateDocType,
  GetDocumentationCH3,
  GetDocumentationCH4,
  getch3ById,
  getch4ById,
} from "../../../redux/Actions";
export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();

  // const DocCh3data = params?.id ? useSelector((state)=>state.getdocch3ReducerById) : ((state)=>state.getdocCH3Reducer)  
  // const DocCh4data = params?.id ? useSelector((state)=>state.getdocCH4Reducer): ((state)=>state.getdocCH4Reducer)

  const [selectArray , setSelectArray] = useState([])
  const [selectArray1 , setSelectArray1] = useState([])
  const nameData = useSelector((state) => state.getdocTypeReducer);
  const [data, setData] = useState({
    name: "",
    documentationId: 0,
    documentationTypeId:0,
    chapter3TypeId:selectArray,
    chapter4TypeId:selectArray1,
    proxy: false,
    isActive:false,
    addressInfoPage: false,
    kyc: false

  });
  const [DocCh3data,setDocCh3data]=useState([]);
  const [DocCh4data,setDocCh4data]=useState([]);
  const [error, setError] = useState({
    name: false,
    documentationTypeId: false,
  });

  useEffect(()=>{
    if(params.id){
      dispatch(getch3ById(params?.id,(data)=>{setDocCh3data(data)}));
      dispatch(getch4ById(params?.id,(data)=>{setDocCh4data(data)}));

    }else{
    dispatch(GetDocumentationCH3((data)=>{setDocCh3data(data)}));
    dispatch(GetDocumentationCH4((data)=>{setDocCh4data(data)}));
    }
  },[params?.id])


  useEffect(()=>{
   
  
  },[])

  useEffect(() => {
    dispatch(GetDocumentationTypes());
    if (params.id) {
      dispatch(
        getDocById(params.id, (data) => {
          setData({ ...data, name: data.name });
          setData({ ...data, documentationTypeId: data.documentTypeId });
         
        })
      );
    }
  }, []);

  const handleToggle = (e, itemId) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectArray([...selectArray,
         itemId]);
    } else {
      setSelectArray(prevArray => prevArray.filter(id => id !== itemId));
    }
  };



  const handleToggle1 = (e, itemId) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      setSelectArray1([...selectArray1, itemId]);
    } else {
      setSelectArray1(prevArray => prevArray.filter(id => id !== itemId));
    }
  };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleToggleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.name == "" || data.documentationTypeId <= 1) {
      if (data.name.trim() == "") {
        setError({ ...error, name: true });
      } else if (data.documentationTypeId <= 0) {
        setError({
          ...error,
          documentationTypeId: true,
        });
      }
    } else {
      setError({
        name: false,
        documentationTypeId: false,
      });
      if (params?.id) {
        let updateData = {
          name: data?.name,
          documentationId: data?.id,
          documentationTypeId: data?.documentationTypeId,
          chapter3TypeId: selectArray,
          isActive:data?.isActive,
          chapter4TypeId: selectArray1,
          proxy: data?.proxy,
          addressInfoPage: data?.addressInfoPage,
          kyc: data?.kyc

        }
        dispatch(updateDocType(updateData));
      } 
      else {
        let updateData = {
          name: data?.name,
          documentationId: 0,
          documentationTypeId: data?.documentationTypeId,
          chapter3TypeId: selectArray,
          chapter4TypeId: selectArray1,
          isActive:data?.isActive,
          proxy: data?.proxy,
          addressInfoPage: data?.addressInfoPage,
          kyc: data?.kyc
        }
        dispatch(createDocType(updateData));
      }
      history.push("/documentation");
    }
  };
  return (
    <Fragment>
      <ThemeOptions />
      
      <div className="app-main">
        <AppSidebar />
        {/* <form onSubmit={documentationI}> */}
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  underline="hover"
                  color="#0c62a8"
                  onClick={() => {
                    history.push("/documentation");
                  }}
                >
                  Documentation
                </Link>
                <p underline="hover" color="#000000">
                  Documentation Details
                </p>
              </Breadcrumbs>
            </div>
            <div className="col-12 my-3"></div>
            <div className=" row m-1 border p-3 box_style">
              {
                <div className="row headingLabel complyColor">
                  {params.id ? " Edit Documentation" : "Add Documentation"}
                </div>
              }
              <div className="col-12 my-3 head">
                <div className="w-100 head">Document Name:<span style={{color:"red"}}>*</span></div>  
                <TextField
                  className="textFieldClass w-50 bg-white"
                  required
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                />
              
                {error.name ? (<p className="errorClass">Please Enter Name</p>):""}
              </div>
              <div className="col-12">
                <div className="w-100 head">Document Type:</div>
                <FormControl
                  required
                  className="w-50"
                  sx={{ minWidth: 120 }}
                  size="small"
                >
                  <Select
                    required
                    className="selectBox table_content"
                    name="documentationTypeId"
                    value={data.documentationTypeId}
                    onChange={handleChange}
                  >
                    <MenuItem value={0}>---Select---</MenuItem>
                    {nameData?.docTypeData?.map((i, ind) => {
                      return (
                        <MenuItem key={i.id} value={i.id}>
                          {i.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {error.documentationTypeId ? (<p className="errorClass">Please Enter Name</p>):""}
                </FormControl>
              </div>

<div className="col-12 d-flex">

<div className="col-5">
                <div className="d-flex">
                  <span>
                 
                    {console.log( data.isActive,"0909")}
                    <Checkbox size="small" type="checkbox" name="isActive" checked={data.isActive} onChange={(e) => handleToggleChange(e)} />
                    <span className=" fw-500 table_content">
                      Auto Request Document Setting: Set to appear for all
                    </span>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <span>
                    <Checkbox size="small" type="checkbox" name="proxy" checked={data.proxy}  onChange={(e) => handleToggleChange(e)}/>
                    <span className=" fw-500 table_content">
                      Proxy
                    </span>
                  </span>
                </div>
              </div>
</div>
             
<div className="col-12 d-flex">

<div className="col-5">
                <div className="d-flex">
                  <span>
                    <Checkbox size="small" type="checkbox" name="addressInfoPage" checked={data.addressInfoPage}  onChange={(e) => handleToggleChange(e)} />
                    <span className=" fw-500 table_content">
                    Address Info Page
                    </span>
                  </span>
                </div>
              </div>
              <div className="col-6">
                <div className="d-flex">
                  <span>
                    <Checkbox size="small" type="checkbox" name="kyc" checked={data.kyc}  onChange={(e) => handleToggleChange(e)}/>
                    <span className=" fw-500 table_content">
                     KYC
                    </span>
                  </span>
                </div>
              </div>
</div>
<div className="d-flex mt-2">

<div className="col-5">
<div className="table_Content">Chapter 3 Entity Types:</div>
                <div className="d-flex row">
                {DocCh3data?.map((item)=>{
   return ( 
                  <span key={item.id}>
                    <Checkbox   checked={selectArray.includes(item.id)}
            onChange={(e) => handleToggle(e, item.id)}size="small" type="checkbox" />
                    <span className="  table_contentt">
                    {item.name}
                    </span>
                  </span>
                    )
                  })}
                </div>
              </div>
             


              <div className="col-5">
                <div className="table_Content">Chapter 4 Status:</div>
                <div className="d-flex row">
                {DocCh4data?.map((item)=>{
   return ( 
                  <span key={item.id}>
                    <Checkbox onClick={(e) => handleToggle1(e,item.id)}  checked={selectArray1.includes(item.id)} size="small" type="checkbox" />
                   
                    <span className="table_contentt">
                    {item.name}
                    </span>
                  </span>
                    )
                  })}
                </div>
              </div>
</div>
              

             

              <div className="col-12 my-2 mx-auto">
                <div className="col-12 ">
                  <Button
                    size="small"
                    variant="contained"
                    type="submit"
                    style={{ float: "right" }}
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    className="mx-2"
                    style={{ float: "right" }}
                    onClick={() => history.push("/documentation")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    </Fragment>
  );
}