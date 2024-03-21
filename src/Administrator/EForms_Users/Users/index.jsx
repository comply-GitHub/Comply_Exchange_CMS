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
import ThemeOptions from "../../../Layout/ThemeOptions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
// import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import ChangePass from "../../"
import DialogTransition from "../../../reusables/DeleteUser";
// import { getAllUsers, deleteFormInstruction} from "../../../redux/Actions";


import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import AppFooter from "../../Layout/AppFooter/";
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
import SearchIcon from "@material-ui/icons/Search";
import Switch from '@mui/material/Switch';
import InputAdornment from "@material-ui/core/InputAdornment";
import { getAllEformsDetails, getEformsAgentById } from "../../../redux/Actions";
function createData(agent, content, action) {
  return { agent, content, action };
}


export default function ContentManagement() {
  const history = useHistory();
  const row = []
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [isActive, setIsActive] = useState(1);
  const [code, setCode] = useState("")
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState("");
  const [deleted, setDeleted] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.getAllEFormsDetails);

  // useEffect(() => {

  //   dispatch(getAllEformsDetails(page, size, search ?? "", isActive));
  // }, []);
  
  useEffect(() => {

    dispatch(getAllEformsDetails(page, size, search ?? "", isActive));
  }, [isActive]);

  const setSubmit = (e) => {
    console.log(search, "search")
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getAllEformsDetails(page, size, search ?? ""));
  };
  const handleToggle = () => {

    setIsActive(isActive == 1 ? 0 : 1)
    console.log(isActive, "99")
    // setTimeout(() => {
    //   dispatch(getAllEformsDetails(page, size, search ?? '', isActive == 1 ? 0 : 1));
    // }, 2000);
  };

  const deleteItems = async () => {
    dispatch(getEformsAgentById(idData));
    dispatch(getAllEformsDetails(page, size, search ?? ""));
  };

  //   useEffect(() => {
  //     dispatch(getAllEformsDetails(page, size));
  //   }, [page]);

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
                <p
                  underline="hover"
                  color="#000000"


                >
                  Administrators
                </p>
              </Breadcrumbs>
            </div>
            <div className="row headingLabel complyColor">List of Administrators</div>
            <div className=" row m-1  border p-3 box_style">
              <form onSubmit={(e) => {
                setSubmit(e);
              }}>
                <div className="d-flex" style={{ justifyContent: "space-between" }}>
                  <div className="col-8 d-flex ">

                    <TextField
                      style={{ backgroundColor: "#fff", }}
                      name="search"
                      className="mx-md-3 mx-auto w-50 rounded-Input"
                      placeholder="Search"
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                  <div style={{ width: "120px" }} className="col-4 d-flex">

                    <Switch
                      checked={isActive}
                      onChange={()=>handleToggle()}

                    />

                    <span> <div style={{ marginTop: "7px", fontSize: "17px", fontWeight: "bold" }}>{isActive === 1 ? 'Active' : 'Inactive'}</div></span>

                  </div>
                </div>
                <div className="col-4">
                  <Button
                    size="small"
                    //   onClick={(e) => {
                    //     setSubmit(e);
                    //   }}
                    type="submit"
                    className="btn-cstm"
                    style={{ float: "right", display: "none" }}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
            <div
              className=" row m-1  card p-3"
              style={{ overflowX: "auto" }}
            >
              <Paper>


                {/* <h1 >Forms Instructions</h1> */}

                <div className="col-12 d-flex">
                  <table class="table table-hover table-striped">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className='table_head'
                        >
                          Name
                        </TableCell>
                        <TableCell
                          className='table_head'
                        >
                          User Type
                        </TableCell>
                        <TableCell
                          align="center"
                          className='table_head'
                        >
                          Agent
                        </TableCell>
                        <TableCell
                          align="center"
                          className='table_head'
                        >
                          Email Id
                        </TableCell>

                         <TableCell
                            align="center"
                           className='table_head'
                          >
                          Is Active
                          </TableCell>
                          {/* <TableCell
                            align="center"
                           className='table_head'
                          >
                          Is Deleted
                          </TableCell>  */}
                        <TableCell
                          align="center"
                          className='table_head'
                        >
                          No. Of Wrong Password Attempts
                        </TableCell>

                        <TableCell
                          align="right"
                          className='table_head'
                        >
                          Actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {/* {console.log(tableData,"tableData?.formInstructionData?.records")} */}
                    <TableBody>
                      {tableData?.agentEformsData?.map((row) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell className="table_content" component="th" scope="row">
                            {row.userName}
                          </TableCell>
                          <TableCell className="table_content" component="th" scope="row">
                          {row.userType === "GEN"
        ? "Generic User"
        : row.userType === "SC"
        ? "Self Cert User"
        : row.userType === "DC"
        ? "Dual Cert User"
        : row.userType}
                          </TableCell>

                          <TableCell align="center" className="table_content" component="th" scope="row">
                            {row.agent}
                          </TableCell>
                          <TableCell align="center" className="table_content" component="th" scope="row">
                            {row.emailId}
                          </TableCell>

                         <TableCell className="table_content" align="center">
                            <Checkbox
                              name="isActive"
                              
                              className="p-0 checkBox"
                              checked={
                               
                                  row.isActive
                                 
                              }
                            
                            />
                            </TableCell>
                        
                            {/* <TableCell className="table_content" align="center">
                            <Checkbox
                              name="isDeleted"
                              
                              className="p-0 checkBox"
                              checked={
                                
                                  row.isDeleted
                                 
                              }
                            
                            />
                            </TableCell>  */}
                          <TableCell align="center" className="table_content" component="th" scope="row">
                            {row.numberofWrongPasswordAttempts}
                          </TableCell>


                          <TableCell className="table_content" align="right">
                            <div className="actionRow">

                              <EditIcon style={{ color: "green", fontSize: "20px" }}
                                onClick={() => {

                                  history.push(`/eForms_Users_edit/${row?.id}`)

                                }} />


                              <DeleteIcon style={{ size: "small", color: "red", fontSize: "20px", marginLeft: "5px" }}
                                onClick={() => {
                                  setOpen(true);
                                  setIdData(row?.id);
                                  setDeleted(row.isDeleted)
                                  setCode(row)

                                }}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </table>
                </div>

              </Paper>

            </div>
            <div className="actionBtn">
              <Button
                className="btn-cstm  mt-1 mx-1"
                style={{ float: "right", marginLeft: "5px" }}
                size="small"
                onClick={() => {
                  history.push("/eForms_Users_add")
                }}
              >
                Add Users
              </Button>

            </div>
          </div>
          {tableData?.allUsersData?.totalPages > 1 ? (
            <Stack className="px-3 col-12 mb-2" spacing={2}>
              <Pagination
                variant="outlined"
                shape="rounded"
                color="primary"
                count={tableData?.allUsersData?.totalPages}
                onChange={(e, value) => setPage(value)}
              />
            </Stack>
          ) : (
            ""
          )}
        </div>
      </div>


      <DialogTransition
        idData={idData}
        open={open}
        deleteItems={deleted}
        setOpen={setOpen}
        data={code}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        // deleteApi={deleteAgents}
        getAllApi={getEformsAgentById}
      />
    </Fragment>


  );
}
