import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, useHistory } from "react-router-dom";
import Paper from "@mui/material/Paper";
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
import EditIcon from "@mui/icons-material/Edit";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AppFooter from "../../../Layout/AppFooter/";
import {
  getAllFormTypes,
  getAllLanguages,
  getAllUSFormTypes,
  getUSFormLanguageById,
  getselfFormLanguageById,
} from "../../../redux/Actions";
import Transition from "../../../reusables/languagesModal";
import {
  getAllFormTypesReducer,
  getAllUSFormTypesReducer,
} from "../../../redux/Reducers";
import "./index.scss";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {
  TextField,
  Typography,
  Breadcrumbs,
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
} from "@mui/material";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Check } from "@mui/icons-material";
import DoneIcon from '@mui/icons-material/Done';
export default function FormTypeTable() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [rowId, setRowId] = useState({});
  const [rowId1, setRowId1] = useState({});
  const [dropDownData, setDropDownData] = useState([]);
  const [dropDownData1, setDropDownData1] = useState([]);
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
    setRowId1({});
  };

  const data = useSelector((state) => state.getAllFormTypesReducer);
  const usData = useSelector((state) => state.getAllUSFormTypesReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);
  useEffect(() => {
    dispatch(getAllLanguages());
    dispatch(getAllFormTypes(page, size, search));
    dispatch(getAllUSFormTypes());
  }, []);

  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getAllFormTypes(page, size, search));
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
                  Forms
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

            <h2 className="row headingLabel complyColor">
              Form types (United States Certificates)
            </h2>
            <div className=" row m-1 card p-3">
              <div className="col-12 d-flex">
                <table className="table table-hover table-striped">
                  <Paper>
                    <TableContainer sx={{}}>
                      <Table
                        sx={{ minWidth: 650 }}
                        className="table table-hover table-striped"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell className="table_head">Name</TableCell>

                            <TableCell align="left" className="table_head">
                              Is disabled
                            </TableCell>
                            <TableCell align="center" className="table_head">
                              Translations
                            </TableCell>

                            <TableCell
                              align="right"
                              colSpan={2}
                              className="table_head"
                            >
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        {usData?.USformsData?.length ? (
                          <TableBody>
                            {usData?.USformsData?.map((row) => (
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
                                <TableCell>
                                 {row?.isDisabled ?(<DoneIcon style={{fontSize:"35px",color:"green",fontWeight:"bold"}}/> ): ("")

                                  }
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className="table_content"
                                  // onClick={() => getLangById(row.id)}
                                >
                                  <span
                                    className="addSubpage"
                                    onClick={() => {
                                      setOpen1(true);
                                      setDropDownData(row?.id);
                                      dispatch(
                                        getUSFormLanguageById(row?.id, (item) =>
                                          setRowId(item)
                                        )
                                      );
                                    }}
                                  >
                                    Select Languages
                                  </span>
                                </TableCell>

                                <TableCell align="right" className="actionRow">
                                  {row.action}

                                  <EditIcon
                                    style={{ color: "green", fontSize: "20px" }}
                                    onClick={() => {
                                      history.push(
                                        `form_type_details/${row.id}`
                                      );
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        ) : (
                          <div className="notDataDiv">No Data Available</div>
                        )}
                      </Table>
                    </TableContainer>
                  </Paper>
                </table>
              </div>
            </div>

            <h2 className="row headingLabel complyColor">
              Self Certifications
            </h2>
            <div className=" row m-1  card p-3" style={{ overflowX: "auto" }}>
              <div className="col-12 d-flex">
                <table className="table table-hover table-striped">
                  <Paper>
                    <TableContainer sx={{}}>
                      <Table
                        sx={{ minWidth: 650 }}
                        className="table table-hover table-striped"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell className="table_head">Name</TableCell>
                            <TableCell className="table_head">
                              Display Name
                            </TableCell>

                            <TableCell align="left" className="table_head">
                              Is disabled
                            </TableCell>
                            <TableCell align="center" className="table_head">
                              Translations
                            </TableCell>

                            <TableCell
                              colSpan={2}
                              align="right"
                              className="table_head"
                            >
                              Action
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        {data?.formsData?.records?.length ? (
                          <TableBody>
                            {data?.formsData?.records?.map((rows1) => (
                              <TableRow
                                key={rows1.name}
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
                                  {rows1.name}
                                </TableCell>
                                <TableCell
                                  className="table_content"
                                  align="left"
                                >
                                  {rows1.displayName}
                                </TableCell>
                                <TableCell className="table_content">
                                {rows1?.isDisabled ?(<DoneIcon style={{fontSize:"35px",color:"green",fontWeight:"bold"}}/> ): ("")}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  className="table_content"
                                  // onClick={() => getLangById(row.id)}
                                >
                                  <span
                                    className="addSubpage"
                                    onClick={() => {
                                      setOpen2(true);
                                      setDropDownData1(rows1?.id);
                                      dispatch(
                                        getselfFormLanguageById(
                                          rows1?.id,
                                          (item) => setRowId1(item)
                                        )
                                      );
                                    }}
                                  >
                                    Select Languages
                                  </span>
                                </TableCell>

                                <TableCell
                                  className="table_content actionRow"
                                  align="right"
                                >
                                  {rows1.action}

                                  <EditIcon
                                    style={{ color: "green", fontSize: "20px" }}
                                    onClick={() => {
                                      history.push(`self_forms_id/${rows1.id}`);
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        ) : (
                          <div className="notDataDiv">No Data Available</div>
                        )}
                      </Table>
                    </TableContainer>
                  </Paper>
                </table>
              </div>
            </div>
            <div className="actionBtn">
              <Button
                size="small"
                className="btn-cstm mx-1 mt-1 mb-2"
                style={{ float: "right" }}
                onClick={() => {
                  // history.push("/form_type_details");
                  history.push("/self_forms");
                }}
              >
                Add Self Certification
              </Button>
            </div>
            {data?.formsData?.totalPages > 1 ? (
              <Stack spacing={2}>
                <Pagination
                  count={data?.formsData?.totalPages}
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
          history.push(`/form_language/${langId}/${i?.id}`);
        }}
        langId={dropDownData}
        setOpen={setOpen1}
        handleClickOpen={handleClickOpen1}
        handleClose={handleClose1}
      />
      <Transition
        open={open2}
        rowId={rowId1}
        redirectFunc={(langId, i) => {
          history.push(`/self_language/${langId}/${i?.id}`);
        }}
        langId={dropDownData1}
        setOpen={setOpen2}
        handleClickOpen={handleClickOpen2}
        handleClose={handleClose2}
      />
    </Fragment>
  );
}
