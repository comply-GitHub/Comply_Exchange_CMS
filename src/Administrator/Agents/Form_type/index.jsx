import React, { Fragment, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import "bootstrap/dist/css/bootstrap.css";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import { Editor } from "react-draft-wysiwyg";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";

// Theme Options
import {
  TextField,
  Typography,
  Collapse,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
  Card,
  Breadcrumbs,
  Divider,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Link,
} from "@mui/material";
import "./index.scss";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
// Charts
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import table from "@mui/material/table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import AppFooter from "../../../Layout/AppFooter/";

import {
  getSelfCertificationById,
  postSelfCertificationHidden,
  getAllFormTypes,
  getSelfCertificationSettingById,
  postSelfCertificationSetting
} from "../../../redux/Actions";

import ThemeOptions from "../../../Layout/ThemeOptions/";
import { CheckBox } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./index.scss";
import { useLocation,useParams, useHistory } from "react-router-dom";

function FormType({ match }) {
  const dispatch = useDispatch();
  let params = useParams();
  const location = useLocation();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [name, setName] = useState('');
  useEffect(() => {
   
    const newName = location.state?.name;

    if (newName) {
      setName(newName);
      localStorage.setItem('name', newName);
    } else {
     
      const storedName = localStorage.getItem('name');
      if (storedName) {
        setName(storedName);
      }
    }
  }, [location.state]);
  const history = useHistory();
  const [open, setOpen] = useState("");
  const [editorValue, setEditorValue] = useState(EditorState.createEmpty());

  const handleOpen = (val) => {
    if (open === val) {
      setOpen("");
    } else setOpen(val);
  };
  useEffect(() => {
    dispatch
      (getSelfCertificationSettingById(params.id, (item) => {
        console.log("iittemm", item)
        if(item.length){
          setSetting(item[0]);
        }
        
      })
    );
    dispatch(getAllFormTypes(page, size, search));
    dispatch(
      getSelfCertificationById(params.id, (item) => {
        console.log("iittemm", item)
        if(item.length){
          setData(item[0]);
        }
        
      })
    );
  }, []);
  const SelfCert = useSelector((state) => state.getAllFormTypesReducer);
  const nameData = useSelector((state) => state.getSelfCertificationReducer);
  const[setting, setSetting]= useState({
    agentId: params?.id,
    usIndividualW9: false,
    usEntityW9: false,
    nonUSIndividualW9: false,
    nonUSEntityW9: false,
    usIndividualSelfCert: false,
    usEntitySelfCert: false,
    nonUSIndividualSelfCert: false,
    nonUSEntitySelfCert: false,
    usIndividualSelfCertFormType: 0,
    usEntitySelfCertFormType: 0,
    nonUSIndividualSelfCertFormType: 0,
    nonUSEntitySelfCertFormType: 0,
  })
  const [data, setData] = useState({
    agentId: params?.id,
    selfcertvisibilty: false,
    visibilty8233: false,
    enableW9: false,
    enableW8BEN: false,
    enableW8BENE: false,
    enableW8IMY: false,
    enableW8ECI: false,
    enableW8EXP: false,
    
  });

  //getSelfCertificationReducer


  const handleToogleSetting = (e) => {
    setSetting({ ...setting, [e.target.name]: e.target.checked });
  };

  const handleChangeSetting = (e) => {
    setSetting({ ...setting, [e.target.name]: e.target.value });
  };

  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const handleChange = (e) => {
    setSetting({ ...setting, [e.target.name]: e.target.value });
  };

  const handleSettingSubmit = async () => {
    let currentDateTime = new Date().toISOString();
    let payload = {
      agentId: params?.id,
      usIndividualW9: setting?.usIndividualW9,
      usEntityW9: setting?.usEntityW9,
      nonUSIndividualW9: setting?.nonUSIndividualW9,
      nonUSEntityW9: setting?.nonUSEntityW9,
      usIndividualSelfCert: setting?.usIndividualSelfCert,
      usEntitySelfCert: setting?.usEntitySelfCert,
      nonUSIndividualSelfCert: setting?.nonUSIndividualSelfCert,
      nonUSEntitySelfCert: setting?.nonUSEntitySelfCert,
      usIndividualSelfCertFormType: setting?.usIndividualSelfCertFormType,
      usEntitySelfCertFormType: setting?.usEntitySelfCertFormType,
      nonUSIndividualSelfCertFormType: setting?.nonUSIndividualSelfCertFormType,
      nonUSEntitySelfCertFormType: setting?.nonUSEntitySelfCertFormType,
      createdOn:currentDateTime,
      CreatedBy:0
    };
    dispatch(postSelfCertificationSetting(payload,params?.id));
    history.push("/agent");
  };

  const handleSubmit = async () => {

    let payload = {
      agentId: params?.id,
      selfcertvisibilty: data?.selfcertvisibilty,
      visibilty8233: data?.visibilty8233,
      enableW9: data?.enableW9,
      enableW8BEN: data?.enableW8BEN,
      enableW8BENE: data?.enableW8BENE,
      enableW8IMY: data?.enableW8IMY,
      enableW8ECI: data?.enableW8ECI,
      enableW8EXP: data?.enableW8EXP,
    };
    dispatch(postSelfCertificationHidden(payload,params?.id));
    history.push("/agent");
  };

  const handleButtonClick = (e) => {
    if (e) {
      e.preventDefault();
    }
    handleSubmit();
    handleSettingSubmit();
  };
  return (
    <Fragment>
      <ThemeOptions />
      {/* <AppHeader /> */}
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-div="breadcrumb">
                <Link
                  underline="hover"
                  color="#0e548c"
                  onClick={() => {
                    history.push("/agent");
                  }}
                >
                  Agents
                </Link>
                <Link underline="hover" color="#000000">
                  Agent Form Type
                </Link>
              </Breadcrumbs>
            </div>

            <div className="col-12 row m-1 border p-3 box_style">
              <h5 className="row headingLabel complyColor my-2"> {name}</h5>
            </div>
            <div
              className=" row  m-md-1 card p-3"
              style={{ overflowX: "auto" }}
            >
              <div className="headings">
                Self Certification Activation Settings:
              </div>
              <div className="col-12 d-flex overflow-x-auto">
                <table class="table table-hover table-striped">
                  <TableHead>
                    <TableRow>
                      <TableCell scope="col" className="table_head">
                        Type
                      </TableCell>
                      <TableCell scope="col" className="w-25">
                        <div
                          style={{ minWidth: "max-content" }}
                          className="table_head"
                        >
                          W series
                        </div>
                      </TableCell>
                      <TableCell scope="col" className="table_head">
                        Self Certification
                      </TableCell>
                      <TableCell scope="col"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className="tableField">
                        <div className="text-start">
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content mx-1"
                          >
                            U.S. Individual
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                        <div className="d-flex align-items-center setting">
                         <Checkbox
                         name="usIndividualW9"
        className="p-0"
        checked={setting?.usIndividualW9 || false}
        onClick={(e) => handleToogleSetting(e)}
      />
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content"
                          >
                            W9
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                        <div className="d-flex align-items-center setting">
                        <Checkbox
        name="usIndividualSelfCert"
        className="p-0"
        checked={setting?.usIndividualSelfCert || false}
        onClick={(e) => handleToogleSetting(e)}
      />
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content"
                          >
                            Self Certification
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                      <select
    className="selectBox"
    style={{ textAlign: "center" }}
    value={setting?.usIndividualSelfCert ? setting?.usIndividualSelfCertFormType : "0"}
    fullWidth
    name="usIndividualSelfCertFormType"
    onChange={handleChange}
    disabled={!setting?.usIndividualSelfCert}
  >
    <option value="1">---Select---</option>
    {SelfCert?.formsData?.records
  ?.filter(rows1 => rows1.isActive)
  .map((rows1, ind) => (
    <option key={ind} value={rows1.id}>
      {rows1.name}
    </option>
  ))}
  </select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="tableField">
                        <div className="text-start">
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content mx-1"
                          >
                            U.S. Entity
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                        <div className="d-flex align-items-center setting">
                         <Checkbox
                         name="usEntityW9"
        className="p-0"
        checked={setting?.usEntityW9 || false}
        onClick={(e) => handleToogleSetting(e)}
      />
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content"
                          >
                            W9
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                        <div className="d-flex align-items-center setting">
                        <Checkbox
        name="usEntitySelfCert"
        className="p-0"
        checked={setting?.usEntitySelfCert || false}
        onClick={(e) => handleToogleSetting(e)}
      />
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content"
                          >
                            Self Certification
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                      <select
    className="selectBox"
    style={{ textAlign: "center" }}
    value={setting?.usEntitySelfCert ? setting?.usEntitySelfCertFormType : "0"}
    fullWidth
    name="usEntitySelfCertFormType"
    onChange={handleChange}
    disabled={!setting?.usEntitySelfCert} 
  >
    <option value="1">---Select---</option>
    {SelfCert?.formsData?.records
  ?.filter(rows1 => rows1.isActive)
  .map((rows1, ind) => (
    <option key={ind} value={rows1.id}>
      {rows1.name}
    </option>
  ))}
  </select>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell className="tableField">
                        <div className="text-start">
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content mx-1"
                          >
                            Non U.S. Individual
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                        <div className="d-flex align-items-center setting">
                         <Checkbox
                         name="nonUSIndividualW9"
        className="p-0"
        checked={setting?.nonUSIndividualW9 || false}
        onClick={(e) => handleToogleSetting(e)}
      />
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content"
                          >
                            W8
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                        <div className="d-flex align-items-center setting">
                        <Checkbox
        name="nonUSIndividualSelfCert"
        className="p-0"
        checked={setting?.nonUSIndividualSelfCert || false}
        onClick={(e) => handleToogleSetting(e)}
      />
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content"
                          >
                            Self Certification
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                      <select
    className="selectBox"
    style={{ textAlign: "center" }}
    value={setting?.nonUSIndividualSelfCert ? setting?.nonUSIndividualSelfCertFormType : "0"}
    fullWidth
    name="nonUSIndividualSelfCertFormType"
    onChange={handleChange}
    disabled={!setting?.nonUSIndividualSelfCert} 
  >
    <option value="1">---Select---</option>
    {SelfCert?.formsData?.records
  ?.filter(rows1 => rows1.isActive)
  .map((rows1, ind) => (
    <option key={ind} value={rows1.id}>
      {rows1.name}
    </option>
  ))}
  </select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="tableField">
                        <div className="text-start">
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content mx-1"
                          >
                           Non U.S. Entity
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                        <div className="d-flex align-items-center setting">
                         <Checkbox
                         name="nonUSEntityW9"
        className="p-0"
        checked={setting?.nonUSEntityW9  || false}
        onClick={(e) => handleToogleSetting(e)}
      />
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content"
                          >
                            W8
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField" >
                        <div className="d-flex align-items-center setting">
                        <Checkbox 
        name="nonUSEntitySelfCert"
        className="p-0"
        checked={setting?.nonUSEntitySelfCert || false}
        onClick={(e) => handleToogleSetting(e)}
      />
                          <div
                            style={{ minWidth: "max-content" }}
                            className="table_content"
                          >
                            Self Certification
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="tableField">
                      <select
    className="selectBox"
    style={{ textAlign: "center" }}
    value={setting?.nonUSEntitySelfCert ? setting?.nonUSEntitySelfCertFormType : "0"}
    fullWidth
    name="nonUSEntitySelfCertFormType"
    onChange={handleChange}
    disabled={!setting?.nonUSEntitySelfCert} 
  >
    <option value="1">---Select---</option>
    {SelfCert?.formsData?.records
  ?.filter(rows1 => rows1.isActive)
  .map((rows1, ind) => (
    <option key={ind} value={rows1.id}>
      {rows1.name}
    </option>
  ))}
  </select>
                      </TableCell>
                    </TableRow>
                   
                   
                  </TableBody>
                </table>
              </div>









              <div className="col-12 d-flex">
                <table class="table table-hover table-striped">
                  <TableHead>
                    <TableRow className="col-12">
                      <TableCell className="table_header col-12">
                        Functionality to show and hide selfcert and 8233 in Form
                        Selection page
                      </TableCell>
                      <TableCell scope="col-12" colSpan={9}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow className="tableField">
                      <TableCell>
                        {/* {console.log("dataa",nameData.selfCertificationById)} */}
                        <Checkbox
                        name="selfcertvisibilty"
                        onClick={(e) => handleToogle(e)}
                        checked={data?.selfcertvisibilty} className="p-0"  />
                        <div className="table_content align-items-center">
                          selfcert
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          className="p-0"
                          name="visibilty8233"
                          onClick={(e) => handleToogle(e)}
                          checked={data?.visibilty8233}
                        />
                        <div className="table_content align-items-center">
                          8233
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          className="p-0"
                          name="enableW9"
                          onClick={(e) => handleToogle(e)}
                          checked={data?.enableW9}
                        />
                        <div
                          className="table_content align-items-center"
                          style={{ width: "70px" }}
                        >
                          W9
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          className="p-0"
                          name="enableW8BEN"
                          onClick={(e) => handleToogle(e)}
                          checked={data?.enableW8BEN}
                        />
                        <div
                          className="table_content align-items-center"
                          style={{ width: "70px" }}
                        >
                          W-8BEN
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          className="p-0"
                          name="enableW8BENE"
                          onClick={(e) => handleToogle(e)}
                          checked={data?.enableW8BENE}
                        />
                        <div
                          className="table_content align-items-center"
                          style={{ width: "70px" }}
                        >
                          W-8BENE
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          className="p-0"
                          name="enableW8IMY"
                          onClick={(e) => handleToogle(e)}
                          checked={data?.enableW8IMY}
                        />
                        <div
                          className="table_content align-items-center"
                          style={{ width: "70px" }}
                        >
                          W-8IMY
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          className="p-0"
                          name="enableW8ECI"
                          onClick={(e) => handleToogle(e)}
                          checked={data?.enableW8ECI}
                        />
                        <div
                          className="table_content align-items-center"
                          style={{ width: "70px" }}
                        >
                          W-8ECI
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Checkbox
                          className="p-0"
                          name="enableW8EXP"
                          onClick={(e) => handleToogle(e)}
                          checked={data?.enableW8EXP}
                       
                        />
                        <div
                          className="table_content align-items-center"
                          style={{ width: "70px" }}
                        >
                          W-8EXP
                        </div>
                      </TableCell>
                     
                    </TableRow>
                  </TableBody>
                </table>
              </div>
            </div>

            <div
              className="actionBtn"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                size="small"
                className="btn-cstm mx-2 mt-1"
                style={{ float: "right" }}
                onClick={()=>{history.push("/agent")}}
              >
                Back
              </Button>
              <Button
                size="small"
                className="btn-cstm mt-1 "
                onClick={(e) => handleButtonClick(e)}
                style={{ float: "right", margin: "0px !important" }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default FormType;
