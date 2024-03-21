import React, { Fragment, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ThemeOptions from "../../Layout/ThemeOptions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import DialogTransition from "../../../reusables/deleteDialog";
// import { getAllFormInstructions, deleteFormInstruction} from "../../../redux/Actions";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AppFooter from "../../Layout/AppFooter/";
import "./index.scss";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  TextField,
  Typography,
  Collapse,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
  Card,
  Divider,
  Grid,
  Select,
  Breadcrumbs,
  MenuItem,
  Checkbox,
  Button,
  Tooltip,
  Link,
} from "@mui/material";
// import FormInstruction from "../../../reusables/FormInstruction"
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { getSecurityKeys, upsertSecurityKeys } from "../../redux/Actions";
import moment from "moment/moment";
function createData(agent, content, action) {
  return { agent, content, action };
}

export default function ContentManagement() {
  const history = useHistory();
  const row = [];
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [data, setData] = useState({
    id: 0,
    key: "",
    keyId: 0,
    keyType: "",
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [textFieldsData, setTextFieldsData] = useState([]);

  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.getSecurityKeysReducer);
  console.log("form", tableData);
  useEffect(() => {
    dispatch(getSecurityKeys());
  }, []);
  console.log("textFieldsData", textFieldsData);

  useEffect(() => {
    if (tableData?.securityKeyData) {
      const initialValues = tableData?.securityKeyData.map((i) => ({
        id: i?.id,
        key: i?.key,
        keyId: i?.keyId,
        keyType: i?.keyType,
      }));
      setTextFieldsData(initialValues);
    }
  }, [tableData?.securityKeyData]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleChangeTextField = (id, newValue) => {
    setTextFieldsData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, key: newValue } : item
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedKeys = textFieldsData.map((item) => ({
      id: item?.id,
      key: item?.key,
      keyId:
        item?.keyType === "Outgoing Request Key"
          ? 2
          : item.keyType === "Incoming Request Key"
          ? 1
          : "",
      keyType: item?.keyType,
    }));
    const validKeys = updatedKeys.filter((keyItem) => (
      keyItem.keyType === "Outgoing Request Key" || keyItem.keyType === "Incoming Request Key"
    ));
  
    if (validKeys.length > 0) {
      dispatch(upsertSecurityKeys(validKeys));
    }
  
    history.push("/security_keys");
  };
   
  
  

  return (
    <Fragment>
      <ThemeOptions />
      {/* <AppHeader /> */}
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className=" row mx-4"></div>
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <p color="#000000" aria-current="page">
                  Security
                </p>
              </Breadcrumbs>
            </div>

            <div className=" row m-1  card p-0">
              <Paper>
                <div className="headerText custom_my_2 mx-4 ">Security Keys</div>

                <div className=" custom_my_2  d-flex">
                  <div
                    className="col-5 borderbox maxdiv mx-4"
                    style={{ height: "320px" }}
                  >
                    <table class="table table-hover">
                      <thead>
                        <TableRow>
                          <TableCell
                            align="center"
                            style={{ fontSize: "20px" }}
                          ></TableCell>
                          <TableCell className="table_head">
                            Incoming Request Key
                          </TableCell>
                          <TableCell className="table_head">
                            Last Updated On
                          </TableCell>
                        </TableRow>
                      </thead>
                      <tbody>
                        {tableData?.securityKeyData?.map((i, ind) => {
                          if (i.keyType === "Incoming Request Key") {
                            return (
                              <TableRow key={ind}>
                                <TableCell className="text">
                                  {ind + 1}
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    className="w-100 textFieldClass"
                                    defaultValue={i.key}
                                    name="key"
                                    onChange={(e) =>
                                      handleChangeTextField(
                                        i.id,
                                        e.target.value
                                      )
                                    }
                                  />
                                </TableCell>
                                <TableCell>
                                  <div className="text">
                                    
                                    {/* For time add  HH:mm:ss */}
                                    {moment(i?.modifiedOn).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )
                                      ? moment(i?.modifiedOn).format(
                                          "YYYY-MM-DD HH:mm:ss"
                                        )
                                      : moment(i?.createdOn).format(
                                          "YYYY-MM-DD HH:mm:ss"
                                        )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div
                    className="col-5 borderbox  maxdiv mx-4"
                    style={{ height: "320px" }}
                  >
                    <div></div>

                    <table class="table table-hover">
                      <thead>
                        <TableRow>
                          <TableCell
                            align="middle"
                            scope="col"
                            style={{ fontSize: "20px" }}
                          ></TableCell>
                          <TableCell className="table_head" scope="col">
                            Outgoing Request Key
                          </TableCell>
                          <TableCell scope="col" className="table_head">
                            Last Updated On
                          </TableCell>
                        </TableRow>
                      </thead>
                      <tbody>
                        {tableData?.securityKeyData?.map((i, ind) => {
                          if (i.keyType === "Outgoing Request Key") {
                            return (
                              <TableRow key={ind}>
                                <TableCell className="text">
                                  {ind + 1}
                                </TableCell>
                                <TableCell>
                                  <TextField
                                    className="w-100 textFieldClass"
                                    defaultValue={i.key}
                                    name="key"
                                    onChange={(e) =>
                                      handleChangeTextField(
                                        i.id,
                                        e.target.value
                                      )
                                    }
                                    // onChange={handleChange}
                                  />
                                </TableCell>
                                <TableCell>
                                  <div className="text">
                                    
                                    {moment(i?.modifiedOn).format(
                                      "YYYY-MM-DD HH:mm:ss"
                                    )
                                      ? moment(i?.modifiedOn).format(
                                          "YYYY-MM-DD HH:mm:ss"
                                        )
                                      : moment(i?.createdOn).format(
                                          "YYYY-MM-DD HH:mm:ss"
                                        )}
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          }
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Paper>
            </div>
            <div className="actionBtn">
              <Button
                className="btn-cstm  mx-1 my-1"
                style={{ float: "right", marginLeft: "5px" }}
                size="small"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Save
              </Button>
            </div>
          </div>
          {/* {tableData?.formInstructionData?.totalPages > 1 ? ( */}
          {/* <Stack style={{ marginTop: "10px" }} spacing={2}>
              <Pagination
                count={tableData?.formInstructionData?.totalPages}
                onChange={(e, value) => setPage(value)}
              />
            </Stack> */}
          {/* ) : (
            ""
          )} */}
        </div>
      </div>
    </Fragment>
  );
}
