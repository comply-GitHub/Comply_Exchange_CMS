import * as React from "react";
import { useEffect, useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import Loader from "react-loaders";
import { Route, useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ThemeOptions from "../../../Layout/ThemeOptions/";
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AppFooter from "../../../Layout/AppFooter/";
// import { useEffectOnce } from "../../../Translator/useEffectOnce.jsx";
import { getLanguageList, deleteLanguage, getAllLanguages, getBulkTranslateDataById,UpdateLanguageSequence } from "../../../redux/Actions";

import "./index.scss";
import Utils from "../../../Utils";
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
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DialogTransition from "../../../reusables/deleteDialog";
import Language from "../../../reusables/language";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import constants from "../../../Utils/constants";

const PhraseTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.getLangListReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);

  const [idData, setIdData] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowData, setRowData] = useState({});
  const [idData1, setIdData1] = useState(0);
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [loadingRows, setLoadingRows] = useState({});


  const [data, setData] = useState({
    name: "",
    isoCode: "",
    bulkTranslatedOn: ""
  });


  const deleteItems = async () => {
    dispatch(deleteLanguage(idData));
    dispatch(getAllLanguages());

  };

  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getLanguageList(page, size, search));
  };

  useEffect(() => {
    dispatch(getLanguageList(page, size, search))
    dispatch(getAllLanguages());
    // dispatch(getLanguageDataById());
    // googleTranslateElementInit()
  }, []);
  console.log("pppp", getBulkTranslateDataById)

  useEffect(() => {
    dispatch(getLanguageList(page, size, search))
  }, [page]);

  const ChangeLanuageOrder=(Id,newOrderValue,direction)=>{
    dispatch(UpdateLanguageSequence(Id,newOrderValue,direction,refreshLanguageData));       
  }

  const refreshLanguageData=()=>{    
    dispatch(getLanguageList(page, size, search));
    dispatch(getAllLanguages());
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
                <p
                  underline="hover"
                  color="#000000"


                >
                  Languages
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
                <div className="col-4">
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
            <div className=" row m-1  card p-3" style={{ overflowX: "auto" }}>
              <div className="col-12 d-flex">
                <table class="table table-hover table-striped">
                  <Paper>
                    <TableContainer sx={{}}>
                      <Table
                        sx={{ minWidth: 650 }}
                        class="table table-hover table-striped"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell className="table_head">Name</TableCell>
                            <TableCell className="table_head">
                              ISO code
                            </TableCell>

                            <TableCell align="center" className="table_head">
                              Google Translation
                            </TableCell>
                            <TableCell className="table_head">Status</TableCell>

                            <TableCell
                              align="right"
                              className="table_head"
                            >
                              Actions
                            </TableCell>
                            <TableCell
                              align="right"

                              className="table_head"
                            >
                              Order
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        {console.log(languageData?.allLanguageData, "edsgfasfd")}
                        {languageData?.allLanguageData && languageData?.allLanguageData?.length ? (
                          <TableBody>
                            {languageData?.allLanguageData?.map((row,index) => (
                              <TableRow
                                key={row.name}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell
                                  className="table_content"
                                  component="th"
                                  scope="row"
                                >
                                  {row.name}
                                </TableCell>

                                <TableCell className="table_content">
                                  {row.isoCode}
                                </TableCell>
                                <TableCell className="table_content" align="center">
                                  <Link
                                    onClick={() => {
                                      setLoadingRows((prevLoadingRows) => ({
                                        ...prevLoadingRows,
                                        [row.id]: true,
                                      }));
                                      dispatch(getBulkTranslateDataById(row.id, () => {
                                        setLoadingRows((prevLoadingRows) => ({
                                          ...prevLoadingRows,
                                          [row.id]: false,
                                        }));
                                      }));
                                    }}
                                  >
                                    Bulk Translate
                                  </Link>
                                  {loadingRows[row.id] && (
                                    <div className="loader-container-inner">
                                      <div className="text-center">
                                        <Loader type="line-scale" />
                                      </div>
                                      <h6 className="mt-3">Please wait while we Translate All Content</h6>
                                    </div>
                                  )}
                                </TableCell>
                                {/* <TableCell className="table_content" align="center">
                        <Button
                          onClick={() => {
                            setLoadingBulkTranslate(true);
                            dispatch(getBulkTranslateDataById(row.id, () => setLoadingBulkTranslate(false)));
                          }}
                        >
                          Bulk Translate
                        </Button>
                        {loadingBulkTranslate &&  
                       
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Languages
              </h6>
            </div>
        
          }
                      </TableCell> */}
                                <TableCell className="table_content">
                                  {row.bulkTranslatedOn}
                                </TableCell>

                                <TableCell align="right" className="table_content actionRow">
                                  {row.action}
                                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <EditIcon
                                      style={{ color: "green", fontSize: "20px" }}
                                      onClick={() => {
                                        setOpen1(true);
                                        setIdData1(row.id);
                                        setData(row);
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
                                <TableCell align="right" className="table_content actionRow">
                                  {row.action}
                                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <KeyboardDoubleArrowDownIcon
                                      style={{ fontSize: "20px",
                                      color:index+1<languageData?.allLanguageData?.length?"black":"gray"
                                     }}
                                      onClick={()=>{ 
                                        if(index+1<languageData?.allLanguageData?.length)
                                        ChangeLanuageOrder(row.id,languageData?.allLanguageData[index+1].order,constants.OrderDirection.Down); 
                                      }}
                                    />
                                    <KeyboardDoubleArrowUpRoundedIcon
                                    style={{
                                      fontSize: "20px",
                                      marginLeft: "5px",
                                      color:index>0?"black":"gray"
                                    }}
                                    // onClick={() => {
                                    //   setOpen(true);
                                    //   setIdData(row.id);
                                    // }}
                                    onClick={()=>{
                                        if(index>0)
                                       ChangeLanuageOrder(row.id,languageData?.allLanguageData[index-1].order,constants.OrderDirection.Up); 
                                      }}
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        ) : <div className="notDataDiv">No Data Available</div>}
                      </Table>
                    </TableContainer>
                  </Paper>
                </table>
              </div>
              {languageData?.allLanguageData?.totalPages > 1 ? (
                <Stack className="px-3 col-12 mb-2" spacing={2}>
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    count={languageData?.allLanguageData?.totalPages}
                    onChange={(e, value) => setPage(value)}
                  />
                </Stack>
              ) : (
                ""
              )}
              <div className='table_content'>
                <span> Enable Asian Character Set:</span>
                <Checkbox type="checkbox" />
                <span>
                  (Note: this character set considerably increases the PDF size)
                </span>
              </div>

            </div>
            <div className="actionBtnclass">

              <Button
                size="small"
                className="btn-cstm mx-1 mt-2"
                style={{ float: "right" }}
                onClick={() => {
                  setOpen1(true);

                  setData({
                    name: "",
                    isoCode: "",
                  });
                }}
              >
                Add Language
              </Button>
              {/* </Button> */}
            </div>



          </div>
        </div>
      </div>
      <DialogTransition
        open={open}
        deleteItems={deleteItems}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        deleteApi={deleteLanguage}
        getAllApi={getAllLanguages}
      />
      <Language
        open={open1}
        idData={idData1}
        setOpen={setOpen1}
        rowData={rowData}
        handleClickOpen={handleClickOpen1}
        handleClose={handleClose1}
        setData={setData}
        data={data}
      />
    </Fragment>
  );
}
export default PhraseTable
