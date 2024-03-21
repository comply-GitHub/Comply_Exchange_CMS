import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  TextField,
  CardHeader,
  Breadcrumbs,
  Link,
  CardContent,
  CardActions,
  Card,
  FormHelperText,
  Select,
  MenuItem,
  Checkbox,
  Button,
} from "@mui/material";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import ThemeOptions from "../../../Layout/ThemeOptions/";
import { Fragment } from "react";
import AppSidebar from "../../../Layout/AppSidebar/";
import "./index.scss";
import {
  getAllAgents,
    getEformsAgentById,
  signupAction,
  UpsertEFormsAgent,
  getCountryCodes
} from "../../../redux/Actions";


export default function Countries_details() {
  const dispatch = useDispatch();
  let params = useParams();
  let history = useHistory();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
const [isActive , setIsActive] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const formData = useSelector((state) => state.getEformsByIdReducer
  );
  const tableData = useSelector((state) => state.getAllAgentsReducer);
console.log(tableData,"00")
  const CountryCodeDataValue = useSelector((state) => state?.getCountryCodesReducer?.countryCodeData);
  console.log("123",CountryCodeDataValue)
  const [data, setData] = useState({
   
    
    id: 0,
    userName: "",
    password: "",
    agentId: "",
    emailId: "",
    isActive: false,
    isDeleted: false,
    numberofWrongPasswordAttempts: 0,
    createdOn: "",
    createdBy: "",
    updatedOn: "",
    updatedBy: ""
  });
 
  useEffect(() => {
    setData(formData?.getEformUserByIdData);
  }, [formData]);
  
  useEffect(() => {
   
    dispatch(getAllAgents(page, size));
  }, []);
  useEffect(() => {
   
    if (params?.id) {
      dispatch(getEformsAgentById(params?.id), (data) => {
        setData(data);
      });
    } else {
      setData({
       
        userName:"",
        password: "",
        agentId: "",
        emailId: "",
        isActive: false,
        isDeleted: false,
        numberofWrongPasswordAttempts: 0,
        createdOn: "",
        createdBy: "",
        updatedOn: "",
        updatedBy: ""
      });
    }
  }, []);

  const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    const hasMinLength = password.length >= 2;

    return hasCapitalLetter && hasNumber && hasSpecialCharacter && hasMinLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   

if (!params?.id){
  if (!data.userName) {
    setEmailError("This field is required");
    return;
  }
  if (!data.password) {
    setPasswordError("This field is required");
    return;
  }

  if (!data.confirmPassword) {
    setConfirmPasswordError("This field is required");
    return;
  }

  if (data.password !== data.confirmPassword) {
    setConfirmPasswordError("Passwords don't match");
    return;
  } else {
    setConfirmPasswordError("");
  }

  if (!validatePassword(data.password)) {
    setPasswordError("Password must have one capital, one number, one special character, and be at least 2 characters long");
    return;
  } else {
    setPasswordError("");
  }
}



    if (params?.id) {
      console.log(params.id,"ll")
      let currentDateTime = new Date().toISOString();
      let updateData = {
       
        id: params?.id ||0,
        userName: data?.userName,
        password: data?.password,
        agentId: data?.agentId,
        emailId: data?.emailId,
        isActive: data?.isActive,
        isDeleted: data?.isDeleted,
        numberofWrongPasswordAttempts: data?.numberofWrongPasswordAttempts,
        createdOn: currentDateTime,
        createdBy: 0,
        updatedOn: currentDateTime,
        updatedBy: 0
       
      };
      console.log(updateData,"lll")
      dispatch(UpsertEFormsAgent(updateData));
     
    } else {
        let currentDateTime = new Date().toISOString();
        let updateData = {
       
            id: params?.id ||0,
            userName: data?.userName,
            password: data?.password,
            agentId: data?.agentId,
            emailId: data?.emailId,
            isActive: data?.isActive,
            isDeleted: data?.isDeleted,
            userType: data?.userType,
            numberofWrongPasswordAttempts: data?.numberofWrongPasswordAttempts,
            createdOn: currentDateTime,
            createdBy: 0,
            updatedOn: currentDateTime,
            updatedBy: 0
           
          };
      
      dispatch(UpsertEFormsAgent(updateData));
    }

    history.push("/eForms_Users");
  };

  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    if (e.target.name === "userName" && e.target.value === "") {
      setEmailError("This field is required");
    } else {
      setEmailError("");
    }

  //   if (e.target.name === "password" && e.target.value === "") {
  //     setPasswordError("This field is required");
  //   } else {
  //     setPasswordError("");
  //   }

  //   if (e.target.name === "confirmPassword" && e.target.value === "") {
  //     setConfirmPasswordError("This field is required");
  //   } else {
  //     setConfirmPasswordError("");
  //   }
   };

  return (
    <Card>
      <Fragment>
        <ThemeOptions />
        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer" style={{ height: "1000px" }}>
            <div className="app-main__inner">
              <div className="row mx-2">
                <div role="presentation" className="bread_crumbs">
                  <Breadcrumbs aria-label="breadcrumb">
                    <Link
                      underline="hover"
                      color="#0c62a8"
                      onClick={() => {
                        history.push("/administrators");
                      }}
                    >
                      User
                    </Link>
                    <p underline="hover" color="#000000">
                      User Details
                    </p>
                  </Breadcrumbs>
                </div>
                <form  onSubmit={(e) => {
                  handleSubmit(e);
                }}>
                  <div>
                    <div className="row headingLabel complyColor">
                      {params.id ? " Edit User" : "Add User"}
                    </div>
                   {params?.id?( <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                          Agent Id:<span style={{ color: "red" }}>*</span>
                        </div>
                      </div>
                      <div className="col-10">
                      <select
                      
                          align="center"
                          onChange={handleChange}
                          value={data?.agentId}
                          defaultValue={0}
                          name="agentId"
                     
                          className="selectBox text table_content"
                        >
                          <option value={0}>---Select----</option>
                          {tableData?.agentData?.records?.map((item, ind) => {

  return (
    <option key={ind} value={item.id}>
      {item.name}
    </option>
  );
})}
                        </select>
                      
                      </div>
                    </div>):<div className="row">
                      <div className="col-2">
                        <div className="table_content">
                          Agent Id:<span style={{ color: "red" }}>*</span>
                        </div>
                      </div>
                      <div className="col-10">
                        <div className="table_content"></div>
                        <select
                          align="center"
                          onChange={handleChange}
                          value={data?.agentId}
                         defaultValue={0}
                          name="agentId"
                     
                          className="selectBox text table_content"
                        >
                          <option value={0}>---Select----</option>
                          {tableData?.agentData?.records?.map((item, ind) => {

  return (
    <option key={ind} value={item.id}>
      {item.name}
    </option>
  );
})}
                        </select>
                       
                      </div>
                    </div>
                    }
                    <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                          Name:<span style={{ color: "red" }}>*</span>
                        </div>
                      </div>
                      <div className="col-10">
                        <div className="table_content"></div>
                        <TextField
                          className="table_content"
                          size="small"
                          name="userName"
                          value={data?.userName}
                          onChange={handleChange}
                          required
                          error={!!emailError}
                        />
                        <FormHelperText error={!!emailError}>
                          {emailError}
                        </FormHelperText>
                      </div>
                    </div>

                     <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                         User Type:
                        </div>
                      </div>
                      <div className="col-10">
                      <select
                          align="center"
                          onChange={handleChange}
                          value={data?.userType}
                          defaultValue={0}
                          name="userType"
                     
                          className="selectBox text table_content"
                        >
                          <option value={0}>---Select----</option>
                          <option value="GEN">Generic User</option>
                          <option value="SC">Self Cert User </option>
                          <option value="DC">Dual Cert User </option>
                         
    
 
                        </select>
                      </div>
                    </div> 
                    <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                          Email Id:<span style={{ color: "red" }}>*</span>
                        </div>
                      </div>
                      <div className="col-10">
                        <div className="table_content"></div>
                        <TextField
                          className="table_content"
                          size="small"
                          name="emailId"
                          value={data?.emailId}
                          onChange={handleChange}
                          required
                         
                        />
                       
                      </div>
                    </div>
                  
                      <div className="row">
                        <div className="col-2">
                          <div className="table_content">
                            Password:<span style={{ color: "red" }}>*</span>
                          </div>
                        </div>
                        <div className="col-10">
                         <div style={{position:"relative",width:"fit-content"}}>

                          <TextField
                       
                         type={showPassword ? "text" : "password"}
                            className="table_content textfieldsss"
                            size="small"
                            name="password"
                            value={data?.password}
                            onChange={handleChange}
                            
                        
                          />
                           <div
                          className="position-absolute d-flex icon"
                          style={{ cursor: "pointer" }}
                        >
                          {showPassword ? (
                            <AiOutlineEye
                              onClick={() => setShowPassword(false)}
                              aria-hidden="true"
                            />
                          ) : (
                            <AiOutlineEyeInvisible
                              onClick={() => setShowPassword(true)}
                              aria-hidden="true"
                            />
                          )}
                        </div>
                         </div>
                          <FormHelperText error={!!passwordError}>
                            {passwordError}
                          </FormHelperText>
                        </div>
                      </div>
                  
                      <div className="row">
                        <div className="col-2">
                          <div className="table_content">
                            Confirm Password:
                            <span style={{ color: "red" }}>*</span>
                          </div>
                        </div>
                        <div className="col-10">
                          <div className="table_content"></div>
                          <TextField
                            type="password"
                            className="table_content"
                            size="small"
                            name="confirmPassword"
                            value={data?.confirmPassword}
                            onChange={handleChange}
                          
                           
                          />
                          <FormHelperText error={!!confirmPasswordError}>
                            {confirmPasswordError}
                          </FormHelperText>
                        </div>
                      </div>
                      <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                        No. Of Wrong Password Attempts
                        </div>
                      </div>
                      <div className="col-10">
                        <TextField
                          name="numberofWrongPasswordAttempts"
                          onChange={handleChange}
                          value={data?.numberofWrongPasswordAttempts}
                          className="table_content"
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                          Is Active:
                        </div>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isActive"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox "
                          checked={data?.isActive}
                        />
                      </div>
                    </div>
                    {/* <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                         Is Deleted:
                        </div>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isDeleted"
                        
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.isDeleted}
                        />
                      </div>
                    </div> */}
                   
                    </div>
                

                 

                  <div className="actionBtn">
                    <Button

                      type="reset"
                      size="small"
                      onClick={() => {
                        history.push("/eForms_Users");
                      }}
                      variant="outlined"
                      sx={{ mr: 1 }}
                    >
                      cancel
                    </Button>

                    <Button
                      size="small"
                      type="submit"
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
