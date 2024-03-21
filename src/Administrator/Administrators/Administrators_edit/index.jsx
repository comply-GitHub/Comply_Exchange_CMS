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

import ThemeOptions from "../../../Layout/ThemeOptions/";
import { Fragment } from "react";
import AppSidebar from "../../../Layout/AppSidebar/";
import "./index.scss";
import {
  getUserById,
  signupAction,
  updateUser,
  getCountryCodes
} from "../../../redux/Actions";

export default function Countries_details() {
  const dispatch = useDispatch();
  let params = useParams();
  let history = useHistory();
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const formData = useSelector((state) => state.getUserByIdReducer);

  const CountryCodeDataValue = useSelector((state) => state?.getCountryCodesReducer?.countryCodeData);
  console.log("123",CountryCodeDataValue)
  const [data, setData] = useState({
    email: "",
    enableMFA: false,
    enableMFA_SMS: false,
    id: 0,
    mobileNumber: "",
    countryCode: "",
    password: "",
    confirmPassword: "",
    roleId: 1,
    roleName: "",
  });

  useEffect(() => {
    setData(formData?.getUserByIdData);
  }, [formData]);
  
  useEffect(() => {
    dispatch(getCountryCodes());
  }, []);
  useEffect(() => {
   
    if (params?.id) {
      dispatch(getUserById(params?.id), (data) => {
        setData(data);
      });
    } else {
      setData({
        email: "",
        enableMFA: false,
        enableMFA_SMS: false,
        id: 0,
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        countryCode: "",
        roleId: 1,
        roleName: "",
      });
    }
  }, []);

  const validatePassword = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    const hasMinLength = password.length >= 12;

    return hasCapitalLetter && hasNumber && hasSpecialCharacter && hasMinLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   

if (!params?.id){
  if (!data.email) {
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
    setPasswordError("Password must have one capital, one number, one special character, and be at least 12 characters long");
    return;
  } else {
    setPasswordError("");
  }
}


    // setEmailError("");

    if (params?.id) {
      console.log(params.id,"ll")
      let updateData = {
       
        id: params?.id,
        email: data?.email,
        countryCode: data?.countryCode,
        // enableMFA: data?.enableMFA,
        // enableMFA_SMS: data?.enableMFA_SMS,
        mobileNumber: data?.mobileNumber,
      };
      console.log(updateData,"lll")
      dispatch(updateUser(updateData));
     
    } else {
      


      dispatch(signupAction(data));
    }

    history.push("/administrators");
  };

  const handleToggle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });

    if (e.target.name === "email" && e.target.value === "") {
      setEmailError("This field is required");
    } else {
      setEmailError("");
    }

    if (e.target.name === "password" && e.target.value === "") {
      setPasswordError("This field is required");
    } else {
      setPasswordError("");
    }

    if (e.target.name === "confirmPassword" && e.target.value === "") {
      setConfirmPasswordError("This field is required");
    } else {
      setConfirmPasswordError("");
    }
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
                      Administrators
                    </Link>
                    <p underline="hover" color="#000000">
                      Administrator Details
                    </p>
                  </Breadcrumbs>
                </div>
                <form  onSubmit={(e) => {
                  handleSubmit(e);
                }}>
                  <div>
                    <div className="row headingLabel complyColor">
                      {params.id ? " Edit Administrator" : "Add Administrator"}
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                          Email:<span style={{ color: "red" }}>*</span>
                        </div>
                      </div>
                      <div className="col-10">
                        <div className="table_content"></div>
                        <TextField
                          className="table_content"
                          size="small"
                          name="email"
                          value={data?.email}
                          onChange={handleChange}
                          required
                          error={!!emailError}
                        />
                        <FormHelperText error={!!emailError}>
                          {emailError}
                        </FormHelperText>
                      </div>
                    </div>
                    {!params.id ? (
                      <div className="row">
                        <div className="col-2">
                          <div className="table_content">
                            Password:<span style={{ color: "red" }}>*</span>
                          </div>
                        </div>
                        <div className="col-10">
                          <div className="table_content"></div>
                          <TextField
                            type="password"
                            className="table_content"
                            size="small"
                            name="password"
                            value={data?.password}
                            onChange={handleChange}
                            required
                            error={!!passwordError}
                          />
                          <FormHelperText error={!!passwordError}>
                            {passwordError}
                          </FormHelperText>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {!params.id ? (
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
                            required
                            error={!!confirmPasswordError}
                          />
                          <FormHelperText error={!!confirmPasswordError}>
                            {confirmPasswordError}
                          </FormHelperText>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                    {/* <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                          Enable MFA (Multi Factor Authentication) - Email:
                        </div>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="enableMFA"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox "
                          checked={data?.enableMFA}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div className="table_content">
                          Enable MFA (Multi Factor Authentication) - Message:
                        </div>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="enableMFA_SMS"
                          value={data?.enableMFA_SMS}
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.enableMFA_SMS}
                        />
                      </div>
                    </div> */}
                    <div className="row">
                      <div className="col-2">
                        <div className="table_content">Country Code:</div>
                      </div>
                      <div className="col-10">
                        <select
                          align="center"
                          onChange={handleChange}
                          value={data?.countryCode}
                         defaultValue={0}
                          name="countryCode"
                     
                          className="selectBox text table_content"
                        >
                          <option value={0}>---Select----</option>
                          {CountryCodeDataValue && Object.values(CountryCodeDataValue).map((item, ind) => {

  return (
    <option key={ind} value={item.id}>
      {item.name}
    </option>
  );
})}
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div className="table_content">Mobile Number:</div>
                      </div>
                      <div className="col-10">
                        <TextField
                          className="table_content"
                          size="small"
                          name="mobileNumber"
                          value={data?.mobileNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div></div>

                  <div className="actionBtn">
                    <Button

                      type="reset"
                      size="small"
                      onClick={() => {
                        history.push("/administrators");
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
