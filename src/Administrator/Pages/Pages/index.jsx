import React, { Fragment, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Transition from "../../../reusables/languagesModal";
// Layout
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppSidebar from "../../../Layout/AppSidebar/";
import AppHeader from "../../../Layout/AppHeader/";
import AppFooter from "../../../Layout/AppFooter/";
import Utils from "../../../Utils";
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
  Button,
  Tooltip,
  Link,
  Breadcrumbs,
  Pagination,
} from "@mui/material";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import Stack from "@mui/material/Stack";
import DialogTransition from "../../../reusables/deleteDialog";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import ThemeOptions from "../../../Layout/ThemeOptions/";

import {
  getAllPages,
  deletePAGES,
  getAllLanguages,
  getSubPageById,
  getpageLanguageById,
  changePagesSequence
} from "../../../redux/Actions";
import { inherit } from "hammerjs";
import { border } from "@mui/system";
import constants from "../../../Utils/constants";

const originalList = ["Home"];

const Pages = ({ match }) => {
  const history = useHistory();

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState(0);
  const [page, setPage] = useState(1);
  const [dropDownData, setDropDownData] = useState([]);
  const [rowId, setRowId] = useState({});
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  // ** Hooks
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setRowId({});
  };
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.getAllPagesReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);
  useEffect(() => {
    dispatch(getAllLanguages());
    dispatch(getAllPages(page, size));
  }, []);

  useEffect(()=>{
    if(search===""){
      setPage(1);
      setSize(10);
      dispatch(getAllPages(page, size, search));
    }
  },[search])

  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getAllPages(page, size, search));
  };

  const deleteItems = async () => {
    dispatch(deletePAGES(idData));
    // dispatch(getAllPages(page, size));
  };

  useEffect(() => {
    dispatch(getAllPages(page, size));
  }, [page]);

  const ChangePageOrder=(Id,newOrderValue,direction)=>{
    dispatch(changePagesSequence(Id,newOrderValue,direction,refreshPageData));       
  }

  const refreshPageData=()=>{  
    dispatch(getAllLanguages());
    dispatch(getAllPages(page, size));  
  }

  return (
    <Fragment>
      <ThemeOptions />

      <div className="app-main ">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <p
                   underline="hover"
                  color="#000000"
                   aria-current="page"
                  
                >
                  Pages
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1 card p-3 box_style">
              <form
                className="row"
                onSubmit={(e) => {
                  setSubmit(e);
                }}
              >
                <div className="col-8 d-flex ">
                  <TextField
                    style={{ backgroundColor: "#fff", borderRadius: "10px" }}
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="mx-md-3 mx-auto w-50 rounded-Input"
                    placeholder="Search"
                    type="search"
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
                <div className="col-4 ">
                  <Button
                    size="small"
                    type="submit"
                    className="btn-cstm"
                    style={{ float: "right", display: "none" }}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
            <div className=" row m-1  card p-3">
              <div className="col-12 d-flex">
                <table class="table table-hover table-striped">
                  <Paper
                    style={{
                      width: "100%",
                      overflowX: "auto",
                      overflow: "auto",
                    }}
                  >
                    <Table class="table table-hover table-striped">
                      <TableHead>
                        <TableRow>
                          <TableCell className="table_head">Name</TableCell>
                          {/* <TableCell align="center" className="table_head">
                            Sub Pages
                          </TableCell> */}

                          <TableCell align="center" className="table_head">
                            Translations
                          </TableCell>
                          <TableCell align="right" className="table_head justifyContent-center">
                          
                            Actions
                           
                            
                          </TableCell>
                          <TableCell align="right" className="table_head" >
                           Order
                          </TableCell>
                          
                        </TableRow>
                      </TableHead>
                      <TableBody className="tableRow">
                        {tableData?.pageData?.records?.map((row, index) => (
                          <TableRow
                            key={row.name}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell  className="table_content tableRow" >
                              {row.name}
                            </TableCell>

                            {/* <TableCell align="center" className="table_content tableRow">
                              {row?.subpageCount ? row?.subpageCount : "No"} sub
                              page{" "}
                              <span
                                className="addSubpage"
                                onClick={() => {
                                  history.push(
                                    `${Utils.Pathname.subpage_details}/${row.id}/true`
                                  );
                                }}
                              >
                                Add Sub Page
                              </span>
                            </TableCell> */}
                            <TableCell
                              align="center"
                              className="table_content tableRow"
                              // onClick={() => getLangById(row.id)}
                            >
                              <span
                                className="addSubpage"
                                onClick={() => {
                                  setOpen1(true);
                                  setDropDownData(row?.id);
                                  dispatch(
                                    getpageLanguageById(row?.id, (item) =>
                                      setRowId(item)
                                    )
                                  );
                                }}
                              >
                                Select Languages
                              </span>

                        
                            </TableCell>

                            <TableCell
                              className="table_content actionRow tableRow"
                              align="center"
                            
                            >
                              {row.action}
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent:"flex-end"
                                 
                                }}
                              >
                                <EditIcon
                                  style={{ color: "green", fontSize: "20px" }}
                                  onClick={() => {
                                    history.push(
                                      `${Utils.Pathname.pageInfoId}/${row.id}`
                                    );
                                  }}
                                />

                                <DeleteIcon
                                  style={{
                                    color: "red",
                                    fontSize: "20px",
                                    marginLeft: "5px",
                                  }}
                                  onClick={() => {
                                    setOpen(true);
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
                                  flexDirection:"column",
                                  flexWrap:"wrap-reverse"
                                 
                                }}
                              >
                                <KeyboardDoubleArrowUpRoundedIcon
                                  style={{  
                                    fontSize: "20px",
                                    color:index>0?"black":"gray"
                                 }}                                  
                                  onClick={()=>{
                                    if(index>0)
                                    ChangePageOrder(row.id,tableData?.pageData?.records[index-1].order,constants.OrderDirection.Up);
                                  }}
                                  // onClick={() => {
                                  //   history.push(
                                  //     `${Utils.Pathname.pageInfoId}/${row.id}`
                                  //   );
                                  // }}
                                />
                                
                                <KeyboardDoubleArrowDownIcon
                                  style={{                                   
                                    fontSize: "20px",
                                    marginLeft: "5px",
                                    color:index+1<tableData?.pageData?.records?.length?"black":"gray"
                                  }}
                                  onClick={()=>{
                                    if(index+1<tableData?.pageData?.records?.length)
                                    ChangePageOrder(row.id,tableData?.pageData?.records[index+1].order,constants.OrderDirection.Down);
                                  }}
                                  // onClick={() => {
                                  //   setOpen(true);
                                  //   setIdData(row.id);
                                  // }}
                                />
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                </table>
              </div>
              {tableData?.pageData?.totalPages > 1 ? (
                <Stack className="px-3 col-12" spacing={2}>
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    count={tableData?.pageData?.totalPages}
                    onChange={(e, value) => setPage(value)}
                  />
                </Stack>
              ) : (
                ""
              )}
            </div>

            <div className="actionBtnclass">
              <Button
                size="small"
                className=" btn-cstm mb-1 mx-1 mt-1"
                style={{ float: "right" }}
                onClick={() => {
                  history.push(`${Utils.Pathname.pageInfo}`);
                }}
              >
                Add Page
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Transition
        open={open1}
        rowId={rowId}
        redirectFunc={(langId,i) => {
          history.push(`/page_language/${langId}/${i?.id}`);
        }}
        langId={dropDownData}
        setOpen={setOpen1}
        handleClickOpen={handleClickOpen1}
        handleClose={handleClose1}
      />
      <DialogTransition
        open={open}
        deleteItems={deleteItems}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        deleteApi={deletePAGES}
        getAllApi={getAllPages}
      />
    </Fragment>
  );
};

export default Pages;
