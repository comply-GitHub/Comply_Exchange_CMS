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
import ThemeOptions from "../../../Layout/ThemeOptions/";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DialogTransition from "../../../reusables/deleteDialog";
import {
  getAllFormInstructions,
  deleteFormInstruction,
  changeFormInstructionSequence
} from "../../../redux/Actions";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AppFooter from "../../../Layout/AppFooter/";
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
  MenuItem,
  Checkbox,
  Breadcrumbs,
  Button,
  Tooltip,
  Link,
} from "@mui/material";
import FormInstruction from "../../../reusables/FormInstruction";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import constants from "../../../Utils/constants";
function createData(agent, content, action) {
  return { agent, content, action };
}

export default function ContentManagement() {
  const history = useHistory();
  const row = [];
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.getAllFormInstructionReducer);

  useEffect(() => {
    dispatch(getAllFormInstructions(page, size));
  }, []);

  const setSubmit = (e) => {
    e.preventDefault();

    setPage(1);
    setSize(10);
    dispatch(getAllFormInstructions(page, size, search));
  };
  const deleteItems = async () => {
    dispatch(deleteFormInstruction(idData));
    dispatch(getAllFormInstructions(page, size));
  };

  useEffect(() => {
    dispatch(getAllFormInstructions(page, size));
  }, [page]);

  useEffect(() => {
    if (search === "") {
      setPage(1);
      setSize(10);
      dispatch(getAllFormInstructions(page, size, search));
    }
  }, [search]);

  const ChangeFormInstructionOrder=(Id,newOrderValue,direction)=>{
    dispatch(changeFormInstructionSequence(Id,newOrderValue,direction,refreshPageData));       
  }

  const refreshPageData=()=>{  
    dispatch(getAllFormInstructions(page, size));
  }

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
                <p underline="hover" color="#000000">
                  Form Instructions
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1  border p-3 box_style">
              <form
                onSubmit={(e) => {
                  setSubmit(e);
                }}
              >
                <div className="col-8 d-flex ">
                  <TextField
                    style={{ backgroundColor: "#fff" }}
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
                <div className="col-4">
                  <Button
                    size="small"
                    className="btn-cstm"
                    style={{ float: "right", display: "none" }}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
            <div className=" row m-1  card p-3" style={{ overflowX: "auto" }}>
              <Paper>
                {/* <h1 >Forms Instructions</h1> */}

                <div className="col-12 d-flex">
                  <table class="table table-hover table-striped">
                    <TableHead>
                      <TableRow>
                        <TableCell className="table_head">
                          Description
                        </TableCell>
                        <TableCell align="center" className="table_head">
                          URL
                        </TableCell>

                        <TableCell align="center" className="table_head">
                          Actions
                        </TableCell>
                         <TableCell align="right" className="table_head">
                          Order
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData?.formInstructionData?.records?.map((row, index) => (
                        <TableRow
                          key={row.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell
                            className="table_content"
                            component="th"
                            scope="row"
                          >
                            {row.description}
                          </TableCell>

                          <TableCell align="center" className="table_content">
                            <a href={row?.url} target="_blank">
                              {row?.url}
                            </a>
                          </TableCell>

                          <TableCell className="table_content" align="center">
                            <div className="actionRow">
                              <EditIcon
                                style={{ color: "green", fontSize: "20px" }}
                                onClick={() => {
                                  setOpen(true);
                                  setIdData(row.id);
                                }}
                              />

                              <DeleteIcon
                                style={{
                                  size: "small",
                                  color: "red",
                                  fontSize: "20px",
                                  marginLeft: "5px",
                                }}
                                onClick={() => {
                                  setOpen1(true);
                                  setIdData(row.id);
                                }}
                              />
                            </div>
                          </TableCell>
                          <TableCell
                              className="table_content actionRow tableRow"
                              align="right"
                            
                            >
                              {row.action}
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent:"flex-end",
                                  flexDirection:"row",
                                  flexWrap:"wrap-reverse"
                                 
                                }}
                              >
                                <KeyboardDoubleArrowUpRoundedIcon
                                  style={{  fontSize: "20px" ,color: index>0?"black":"gray"}}
                                  onClick={()=>{
                                    if(index>0)
                                    ChangeFormInstructionOrder(row.id,tableData?.formInstructionData?.records[index-1].order,constants.OrderDirection.Up);
                                  }}
                                />

                                <KeyboardDoubleArrowDownIcon
                                  style={{
                                   
                                    fontSize: "20px",
                                    marginLeft: "5px",
                                    color:index+1<tableData?.formInstructionData?.records?.length?"black":"gray"
                                  }}
                                  onClick={() => {
                                    //setOpen(true);
                                    //setIdData(row.id);
                                    if(index+1<tableData?.formInstructionData?.records?.length)
                                    ChangeFormInstructionOrder(row.id,
                                    tableData?.formInstructionData?.records[index+1].order,
                                    constants.OrderDirection.Down);
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
              <div style={{ display: "flex"  }}>
             
                <div className="table_content mt-2">Check to show Instructions tab in eForms:</div>
               
                 
                  <Checkbox type="checkbox" size="small" />
               
              </div>
              {tableData?.formInstructionData?.totalPages > 1 ? (
            <Stack style={{ marginTop: "10px" }} spacing={2}>
              <Pagination
               variant="outlined"
               shape="rounded"
               color="primary"
                count={tableData?.formInstructionData?.totalPages}
                onChange={(e, value) => setPage(value)}
              />
            </Stack>
          ) : (
            ""
          )}
            </div>
            <div className="actionBtn">
              <Button
                className="btn-cstm  my-2 mx-1"
                style={{ float: "right", marginLeft: "5px" }}
                size="small"
                onClick={() => {
                  setIdData(0);
                  if (idData === 0) {
                    setOpen(true);
                  }
                }}
              >
                Add Form Instruction
              </Button>
            
               
            </div>
      
          </div>
       
        </div>
      </div>

      <FormInstruction
        open={open}
        idData={idData}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        setIdData={setIdData}
        closeCallback={() => {
          dispatch(getAllFormInstructions(1, 10));
        }}
      />
      <DialogTransition
        open={open1}
        deleteItems={deleteItems}
        setOpen={setOpen1}
        handleClickOpen={handleClickOpen1}
        handleClose={handleClose1}
        deleteApi={deleteFormInstruction}
        getAllApi={getAllFormInstructions}
        closeCallback={() => {
          dispatch(getAllFormInstructions(1, 10));
        }}
      />
    </Fragment>
  );
}
