import * as React from "react";
import { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Utils from "../../../Utils";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ThemeOptions from "../../../Layout/ThemeOptions/";
import { Fragment } from "react";
import { Delete, ContentCopy, Edit } from "@mui/icons-material";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AppFooter from "../../../Layout/AppFooter/";
import "./index.scss";
import { inherit } from "hammerjs";

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
  Breadcrumbs,
} from "@mui/material";
import Link from "@mui/material/Link";
import Pagination from "@mui/material/Pagination";
import AgentLogo from "../../../comply.png";
import Stack from "@mui/material/Stack";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import DialogTransition from "../../../reusables/deleteDialog";
import Transition from "../../../reusables/languagesModal";
import AgentCopyDialog from "../../../reusables/copyAgent";

import {
  getAllAgents,
  deleteAgents,
  getAllLanguages,
  getAgentLanguageById,
} from "../../../redux/Actions";

function AgentsTable() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState(0);
  const [idData2, setIdData2] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [copyData, setCopyData] = useState({
    name: "",
    formfeedusername: "",
    formFeedpassword: "",
    clientId: "",
    clientCode: "",
    selectionCode: "",
  });

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
    setRowId2({});
  };
  const [dropDownData, setDropDownData] = useState([]);
  const [rowId, setRowId] = useState({});
  const [rowId2, setRowId2] = useState({});

  const tableData = useSelector((state) => state.getAllAgentsReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);

  useEffect(() => {
    dispatch(getAllLanguages());
    dispatch(getAllAgents(page, size));
  }, []);

  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getAllAgents(page, size, search));
  };

  const deleteItems = async () => {
    dispatch(deleteAgents(idData));
    dispatch(getAllAgents(page, size));
  };

  useEffect(() => {
    dispatch(getAllAgents(page, size));
  }, [page]);

  return (
    <Fragment>
      <ThemeOptions />
      {/* <AppHeader /> */}
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <p underline="hover" color="#000000">
                  Agents
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1 border p-3 box_style">
              <form onSubmit={setSubmit}>
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
                    className="btn-cstm"
                    style={{ float: "right", display: "none" }}
                  >
                    Search
                  </Button>
                </div>
              </form>
            </div>

            <div className=" row m-1 card p-3" style={{ overflowX: "auto" }}>
              <div className="col-12 d-flex">
                <table class="table table-hover table-striped">
                  <Paper
                    style={{
                      width: "100%",
                      overflowX: "auto",
                      overflow: "auto",
                    }}
                  >
                    <Table
                      stickyHeader
                      class="table table-hover table-striped"
                      sx={{ minWidth: 650 }}
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell className="table_head">Name</TableCell>

                          <TableCell align="center" className="table_head">
                            Logo
                          </TableCell>

                          <TableCell align="center" className="table_head">
                            Translations
                          </TableCell>

                          <TableCell align="center" className="table_head">
                            Configure Agents
                          </TableCell>
                          {/* <TableCell align="center" className="table_head">
                            <div style={{ minWidth: "6rem" }}>
                              Store CDF on the fly
                            </div>
                          </TableCell> */}
                          <TableCell align="right" className="table_head">
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {console.log(
                          tableData?.agentData?.records,
                          "tableData?.AgentsData?.records"
                        )}
                        {tableData?.agentData?.records?.map((row) => {
                          return (
                            <TableRow
                              key={row.name}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              {console.log(row, "rows")}
                              <TableCell
                                className="table_content"
                                component="th"
                                scope="row"
                              >
                                {row.name}
                              </TableCell>

                              <TableCell
                                className="table_content"
                                align="center"
                              >
                                <img
                                  src={AgentLogo}
                                  alt="logo"
                                  className="logoImg"
                                />
                                {/* <img src={row.logoNavigateURL ? row.logoNavigateURL : "https://png.pngtree.com/png-vector/20230222/ourmid/pngtree-modern-demo-logo-vector-file-png-image_6614023.png"} alt="logo" className="logoImg"/> */}
                              </TableCell>
                              <TableCell
                                className="table_content"
                                align="center"
                              >
                                <span
                                  className="addSubpage"
                                  onClick={() => {
                                    setOpen1(true);
                                    setDropDownData(row?.id);
                                    dispatch(
                                      getAgentLanguageById(row?.id, (item) =>
                                        setRowId(item)
                                      )
                                    );
                                  }}
                                >
                                  Select Languages
                                </span>
                              </TableCell>

                              <TableCell width={150} align="center">
                                <div className="tableContentList ">
                                  <Link
                                    onClick={() => {
                                      history.push({
                                        pathname: `/agent_edit_list/${row?.id}`,
                                        state: { name: row?.name },
                                
                                      });
                                    }
                                  }
                                  >
                                    Edit List
                                  </Link>
                                </div>
                                <div className="tableContentList ">
                                  <Link
                                    onClick={() => {
                                     
                                      history.push({
                                        pathname: `/agent_income/${row?.id}`,
                                        state: { name: row?.name },
                                
                                      });
                                    }}
                                  >
                                    U.S. Sourced Income
                                  </Link>
                                </div>
                                <div className="tableContentList">
                                  <Link
                                    onClick={() => {
                                    
                                      history.push({
                                        pathname: `/agent_form_type/${row?.id}`,
                                        state: { name: row?.name },
                                
                                      });
                                    }}
                                  >
                                    Form Type
                                  </Link>
                                </div>
                              </TableCell>

                              {/* <TableCell align="center">
                                <span>
                                  <Checkbox type="checkbox" />
                                </span>
                              </TableCell> */}
                              <TableCell align="right" colSpan={2}>
                                <div
                                  className="actionRow"
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <ContentCopy
                                    style={{
                                      color: "black",
                                      fontSize: "17px",
                                    }}
                                    onClick={() => {
                                      setOpen2(true);
                                      setIdData2(row.id);
                                      setCopyData({
                                        name: "",
                                        formfeedusername: "",
                                        formFeedpassword: "",
                                        clientId: "",
                                        clientCode: "",
                                        selectionCode: "",
                                      });
                                    }}
                                  />
                                  <Edit
                                    style={{
                                      color: "green",
                                      fontSize: "20px",
                                      marginLeft: "5px",
                                    }}
                                    onClick={() => {
                                      history.push(`agent_details/${row.id}`);
                                    }}
                                  />

                                  <Delete
                                    onClick={() => {
                                      setOpen(true);
                                      setIdData(row.id);
                                    }}
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                      marginLeft: "5px",
                                    }}
                                  />
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </Paper>
                </table>
              </div>
            </div>
            <div className="col-12 mt-2">
              <Button
                size="small"
                className="btn-cstm mx-1 mb-3"
                style={{ float: "right" }}
                onClick={() => {
                  history.push("/agent_add");
                 
                }}
              >
                Add Agent
              </Button>
            </div>
            {tableData?.AgentsData?.totalPages > 1 ? (
              <Stack style={{ marginTop: "10px" }} spacing={2}>
                <Pagination
                  count={tableData?.AgentsData?.totalPages}
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
          history.push(`/agent_language/${langId}/${i?.id}`);
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
        deleteApi={deleteAgents}
        getAllApi={getAllAgents}
      />
      <AgentCopyDialog
        data={copyData}
        setData={setCopyData}
        open={open2}
        rowId={rowId2}
        idData={idData2}
        setOpen={setOpen2}
        handleClickOpen={handleClickOpen2}
        handleClose={handleClose2}
      />
    </Fragment>
  );
}

export default AgentsTable;
