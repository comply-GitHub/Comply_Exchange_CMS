import React, { Fragment, useEffect, useState } from "react";
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
import { Route, useHistory } from "react-router-dom";
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
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useDispatch,useSelector } from "react-redux";
import { exportEasy,importEasy,getAllLanguages,getAllEasy ,deleteEasy,getEasyLanguageById} from "../../../redux/Actions";
import DialogTransition from "../../../reusables/deleteDialog";
import Transition from "../../../reusables/languagesModal";
import Modal from "../../../reusables/htmlDialog"



export default function PhraseTable() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [fileData,setFileData] =useState();
  const [search, setSearch] = useState("");
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => {
    setOpen1(false);
    setRowId({});
  };
  const [open2, setOpen2] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => {
    setOpen2(false);
    setRowId({});
  };
  const [dropDownData, setDropDownData] = useState([]);
  const [rowId, setRowId] = useState({});
  const dispatch = useDispatch();
  
  const exportData = useSelector((state) => state.ExportEasyReducer);
  const tableData = useSelector((state) => state.getAllEasyReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);
  useEffect(() => {
    dispatch(getAllLanguages())
    dispatch(getAllEasy(page, size));
  }, []);

  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getAllEasy(page, size,search));
  };

  useEffect(() => {
    dispatch(getAllEasy(page, size));
  }, [page]);

  const deleteItems = async () => {
    dispatch(deleteEasy(idData));
    dispatch(getAllEasy(page, size));
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
                <p
                   underline="hover"
                  color="#000000"
                
                  
                >
                  Easy Help
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1  card p-3 box_style">
              <form
                className="row"
                onSubmit={(e) => {
                  setSubmit(e);
                }}
              >
                <div className="col-8 d-flex">
                  <TextField
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ backgroundColor: "#fff" }}
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
                    className="btn-cstm"
                    style={{ float: "right", display: "none" }}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>
            {/* <h2 className="row headingLabel complyColor">Form types (United States Certificates)</h2> */}
            <div className=" row m-1  card p-3" style={{ overflowX: "auto" }}>
              <div className="col-12 d-flex">
                <table class="table table-hover table-striped">
                  <Paper>
                 
                      <Table
                        sx={{ minWidth: 650 }}
                        className="table table-hover table-striped"
                      >
                        <TableHead >
                          <TableRow >
                            <TableCell className="table_head tableRow">Key</TableCell>
                            <TableCell align="center" className="table_head min-width tableRoww">
                              Content preview
                            </TableCell>

                            <TableCell align="center" className="table_head tableRoww">
                              Translations
                            </TableCell>

                            <TableCell
                              colSpan={2}
                              align="right"
                              className="table_head tableRoww"
                            >
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody >
                          {tableData?.easyData?.records?.map((row) => (
                            <TableRow
                            className="tableRoww"
                              key={row.id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell
                               
                                className="add_Rules "
                               
                                onClick={() => {
                                  history.push(`/easy_details/${row.id}`);
                                }}
                              >
                                {row.easykey}
                              </TableCell>

                              <TableCell
                             
                                className="table_content previewClass"
                                align="center"
                                
                                dangerouslySetInnerHTML={{__html: row.text}}
                              >
                                
                              </TableCell>
                              <TableCell
                                className="table_content "
                                align="center"
                              >
                                <span
                                  className="addSubpage"
                                  onClick={() => {
                                    setOpen1(true);
                                    setDropDownData(row?.id);
                                    dispatch(
                                      getEasyLanguageById(row?.id, (item) =>
                                        setRowId(item)
                                      )
                                    );
                                  }}
                                >
                                  Select Languages
                                </span>
                              </TableCell>

                              <TableCell className="actionRow" align="right">
                                {/* <Button style={{color:"green"}}> <EditIcon /></Button> */}
                                <DeleteIcon
                                  style={{ color: "red", fontSize: "20px" }} onClick={() => {
                                    setOpen(true);
                                    setIdData(row.id);
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                 
                  </Paper>
                </table>
              </div>
              {tableData?.easyData?.totalPages > 1 ? (
              <Stack className="px-3 col-12" style={{marginTop:"5px"}} spacing={2}>
                <Pagination
                 variant="outlined"
                 shape="rounded"
                 color="primary"
                  count={tableData?.easyData?.totalPages}
                  onChange={(e, value) => setPage(value)}
                />
              </Stack>
               ) : ""}
            </div>
            <div className="actionBtn">
              <Button
                onClick={() => {
                  history.push("/easy_add");
                }}
                size="small"
                className="btn-cstm mx-1 my-1 mb-4 "
                style={{ float: "right" }}
              >
                Add Easy Help
              </Button>
              <Button
                size="small"
                className="btn-cstm mx-1 my-1 mb-4"
                style={{ float: "right" }}
                onClick={()=>{
                  setOpen2(true)
               }}
              >
                Import<span className="mx-1" style={{textTransform:"lowercase"}}>as </span> HTML
              </Button>
             
              <Button
                size="small"
                className="btn-cstm mx-1 my-1 mb-4"
                style={{ float: "right" }}
                onClick={()=>{dispatch(exportEasy())}}
              >
                Export <span className="mx-1" style={{textTransform:"lowercase"}}>as </span> HTML
              </Button>
            </div>
           
          </div>
        </div>
      </div>
      <Transition
        open={open1}
        rowId={rowId}
        redirectFunc={(langId, i) => {
          history.push(`/easy_language/${langId}/${i?.id}`);
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
        deleteApi={deleteEasy}
        getAllApi={getAllEasy}
      />
        <Modal
       open={open2}
       // deleteItems={deleteItems}
       fileData={fileData}
       setFileData={setFileData}
       dispatch={dispatch}
       setOpen={setOpen2}
       handleClickOpen={handleClickOpen2}
       handleClose={handleClose2}
       Heading="Import Easy Help Data"
       apiCall={(formData)=>{
        dispatch(importEasy(formData))
           }}
      />
    </Fragment>
  );
}
