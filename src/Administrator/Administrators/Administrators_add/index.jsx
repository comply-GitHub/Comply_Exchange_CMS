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
  Divider,
  div,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Input,
} from "@mui/material";

import ThemeOptions from "../../../Layout/ThemeOptions";
import { Fragment } from "react";
import AppSidebar from "../../../Layout/AppSidebar";
import "./index.scss";
import {
  createCapacities,
  getUserById,
  signupAction,
  updateCapacities,
  updateUser,
} from "../../../redux/Actions";

export default function Countries_details() {
  const dispatch = useDispatch();
  let params = useParams();
  let history = useHistory();
  const formData = useSelector((state) => state.getUserByIdReducer);
  const [data, setData] = useState(
    params.id
      ? {
          id: 0,
          email: "",
          roleId: 1,
         
          enableMFA: false,
          enableMFA_SMS: false,
          mobileNumber: "",
        }
      : {
          email: "",
         
          roleId: 1,
          enableMFA: false,
          enableMFA_SMS: false,
          mobileNumber: "",
        }
  );
  useEffect(() => {
    setData(formData?.getUserByIdData);
  }, [formData]);

  useEffect(() => {
    if(params?.id)
    {
    dispatch(getUserById(params.id), (data) => {
      setData(data);
    });
  }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params.id) {
      let updateData = {
        id: params?.id,
        email: data?.email,
        countryCode: data?.countryCode,
        enableMFA: data?.enableMFA,
        enableMFA_SMS: data?.enableMFA_SMS,
        mobileNumber: data?.mobileNumber,
      };
      dispatch(updateUser(updateData));
    } else {
      dispatch(signupAction(data));
    }
    history.push("/administrators");
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
          <div className="app-main__outer" style={{ height: "1000px" }}>
            <div className="app-main__inner">
              <div className=" row mx-2">
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
                <form>
                  <div>
                    {
                      <div className="row headingLabel complyColor">
                        {params.id
                          ? " Edit Administrator"
                          : "Add Administrator"}
                      </div>
                    }
                    <div className="row">
                      <div className="col-2">
                        <div className="table_content">Email:</div>
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
                        />
                      </div>
                    </div>
                    <div className="row">
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
                            onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data?.enableMFA_SMS}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div className="table_content">Country Code:</div>
                      </div>
                      <div className="col-10">
                        <Select
                        required
                          align="center"
                          defaultValue={0}
                          type="Mobile"
                          name = "countryCode"
                          // value={}
                          className="selectBox text table_content"
                        >
                          <MenuItem value={0}> ---Select----</MenuItem>
                          <MenuItem value={1}>+91</MenuItem>
                          <MenuItem value={2}>+1</MenuItem>
                        </Select>
                    
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
                      onClick={handleSubmit}
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
