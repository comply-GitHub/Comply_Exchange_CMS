import React, { Fragment, useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { useParams } from "react-router-dom";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ThemeOptions from "../../../Layout/ThemeOptions/";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from "@mui/icons-material/Edit";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AppFooter from "../../../Layout/AppFooter/";
import "./index.scss";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  TextField,
  Typography,
  Collapse,
  Breadcrumbs,
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
  Input,
} from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import { Route, useHistory } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useDispatch, useSelector } from "react-redux";
import {getRulesLanguageById , deleteRule, getAllRules,getAllLanguages,importRule,exportRule } from "../../../redux/Actions";
import DialogTransition from "../../../reusables/deleteDialog";
import Modal from "../../../reusables/htmlDialog"
import Transition from "../../../reusables/languagesModal";

export default function PhraseTable() {
  let params = useParams();
  let dispatch = useDispatch();
  const history = useHistory();
  const [dropDownData, setDropDownData] = useState([]);
  const [rowId, setRowId] = useState({});
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  const tableData = useSelector((state) => state.getAllRulesReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);
  useEffect(() => {
    dispatch(getAllRules(page, size, search));
    dispatch(getAllLanguages())
  }, []);

  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getAllRules(page, size, search));
  };

  const deleteItems = async () => {
    dispatch(deleteRule(idData));
    dispatch(getAllRules(page, size));
  };
  const [fileData,setFileData] =useState();
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

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
                   aria-current="page"
                  
                >
                  Rules 
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1 border p-3 box_style">
              <form onSubmit={setSubmit}>
              <div className="col-8 d-flex">
                <TextField
                  style={{ backgroundColor: "#fff" }}
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
              <div className="col-4">
                <Button
                  size="small"
                  className="btn-cstm"
                  style={{ float: "right" ,display:"none" }}
                  onClick={setSubmit}
                >
                  Search
                </Button>
              </div>
              </form>
            </div>
            <div
              className=" row m-1 card p-3"
              style={{ overflowX: "auto" }}
            >
              <div className="col-12 d-flex">
                <table class="table table-hover table-striped">
                  <Paper>
                    <TableContainer sx={{}}>
                      <Table
                        sx={{ minWidth: 650 }}
                        class="table table-hover table-striped"
                      >
                        <TableHead>
                          <TableRow className="tableWidth">
                            <TableCell  className="table_head tableWidth">
                              Code
                            </TableCell>
                            <TableCell
                              
                              align="center"
                              className="table_head tableWidth"
                            >
                              Class
                            </TableCell>

                            <TableCell
                              
                              align="center"
                              className="table_head tableWidth"
                            >
                              Warning
                            </TableCell>
                            <TableCell
                              
                              align="center"
                              className="table_head tableWidth"
                            >
                             Opt Out Disabled
                            </TableCell>
                            <TableCell
                              
                              align="center"
                              className="table_head tableWidth"
                            >
                              Disable Continue
                            </TableCell>
                            <TableCell
                              
                              align="center"
                              className="table_head tableWidth"
                            >
                             Suppress Rule Treaty Country
                            </TableCell>
                            <TableCell
                              
                              align="center"
                              className="table_head tableWidth"
                            >
                              Suppress Rule Non Treaty Country
                            </TableCell>
                            <TableCell
                              
                              align="center"
                              className="table_head tableWidth"
                            >
                              Suppress Rule IGA in Place
                            </TableCell>
                           

                            <TableCell
                              
                              align="center"
                              className="table_head tableWidth"
                            >
                              Disable Rule
                            </TableCell>
                            <TableCell
                              
                              align="center"
                              className="table_head tableWidth"
                            >
                              Translations
                            </TableCell>
                            <TableCell
                              align="right"
                              className="table_head tableWidth"
                            >
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData?.rulesData?.records.map((row) => (
                            <TableRow
                            className="tableWidth"
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                               style={{width:'150px'}}
                                className="table_content tableWidth"
                                
                              >
                                {row.code}
                              </TableCell>

                              <TableCell
                              style={{width:'150px'}}
                                className="table_content tableWidth"
                                
                                align="center"
                              >
                                {row.ruleClass}
                              </TableCell>
                              <TableCell
                                className="table_content tableWidth"
                                
                                align="center"
                              >
                                {row.warning}
                              </TableCell>

                              <TableCell  align="center">
                               {row?.optOutDisabled ?(<DoneIcon style={{fontSize:"40px"}}
                                  
                                  className="checkBox tableWidth"
                                />): ("")}
                              </TableCell>

                              <TableCell
                               style={{width:'130px'}}
                                className="table_content tableWidth"
                                align="center"
                              >
                              {row?.disableContinue ?(<DoneIcon style={{fontSize:"40px"}}
                                  
                                  className="checkBox tableWidth"
                                />): ("")}
                              </TableCell>
                              <TableCell
                               style={{width:'130px'}}
                                className="table_content tableWidth"
                                align="center"
                              >
                              {row?.suppressRuleTreatyCountry ?(<DoneIcon style={{fontSize:"40px"}}
                                  
                              className="checkBox tableWidth"
                            />): ("")}
                              </TableCell>
                              <TableCell
                               style={{width:'130px'}}
                                className="table_content tableWidth"
                                align="center"
                              >
                              {row?.suppressRuleNonTreatyCountry ?(<DoneIcon style={{fontSize:"40px"}}
                                  
                                  className="checkBox tableWidth"
                                />): ("")}
                              </TableCell>
                              <TableCell
                               style={{width:'130px'}}
                                className="table_content tableWidth"
                                align="center"
                              >
                              {row?.suppressRuleIGAinPlace ?(<DoneIcon style={{fontSize:"40px"}}
                                  
                                  className="checkBox tableWidth"
                                />): ("")}
                              </TableCell>

                              <TableCell
                               style={{width:'130px'}}
                                className="table_content tableWidth"
                                align="center"
                              >
                              {row?.disableRule ?(<DoneIcon style={{fontSize:"40px"}}
                                  
                                  className="checkBox tableWidth"
                                />): ("")}
                              </TableCell>

                              
                              <TableCell
                               style={{width:'130px'}}
                                className="table_content tableWidth"
                                align="center"
                              >
                                <span
                                  className="addSubpage"
                                  
                                >
                                  Select Languages
                                </span>
                              </TableCell>

                              <TableCell colSpan={2} align="right" className="actionRow tableWidth">
                                <EditIcon
                                  onClick={() => {
                                    history.push(`/rules_details/${row.id}`);
                                  }}
                                  style={{ color: "green", fontSize: "20px" }}
                                />

                               
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </table>
              </div>
            </div>
            <div className="col-12" >
              <Button
                size="small"
                className="btn-cstm mx-1 my-1 mb-2"
                style={{
                  float: "right",
                 
                  marginLeft: "5px",
                }}
                onClick={()=>{
                  setOpen2(true)
               }}
              >
                Import
              </Button>
             
              <Button
                size="small"
                className="btn-cstm mt-1"
                style={{ float: "right" }}
                onClick={()=>{dispatch(exportRule())}}
              >
                Export
              </Button>
            </div>
              {tableData?.rulesData?.totalPages > 1 ? (
                <Stack
                  className="px-3 col-12"
                  style={{ marginTop: "10px" }}
                  spacing={2}
                >
                  <Pagination
                    count={tableData?.rulesData?.totalPages}
                    onChange={(e, value) => setPage(value)}
                  />
                </Stack>
              ) : (
                ""
              )}
          </div>
        </div>
      </div>
      <Transition
        open={open1}
        rowId={rowId}
        redirectFunc={(langId, i) => {
          history.push(`/rules_language/${langId}/${i?.id}`);
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
        deleteApi={deleteRule}
        getAllApi={getAllRules}
      />
         <Modal
       open={open2}
       // deleteItems={deleteItems}
       fileData={fileData}
       setFileData={setFileData}
       setOpen={setOpen2}
       handleClickOpen={handleClickOpen2}
       handleClose={handleClose2}
       Heading="Import Rules Data"
       apiCall={(formData)=>{
    dispatch(importRule(formData))
       }}
      
      />
    </Fragment>
  );
}
