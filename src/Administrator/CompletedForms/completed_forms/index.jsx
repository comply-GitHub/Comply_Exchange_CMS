import React, { useEffect, useState } from "react";
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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import DoneIcon from '@mui/icons-material/Done';
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
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import { CheckBox } from "@mui/icons-material";
import {getCompletedForms,PostCompleteForms,deleteCompleteForms,exportCompleteForms,GetW9Pdf,GetEciPdf,GetBenPdf,GetBenEPdf,GetExpPdf,GetImyPdf,GetForm8233Pdf} from '../../../redux/Actions';




export default function ContentManagement() {


  const dispatch=useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getCompletedForms(page, size,search));
  }, [page]);
  // useEffect(()=>{
  //   dispatch(GetW9Pdf())
  //   dispatch(GetForm8233Pdf())
  //   dispatch(GetBenPdf())
  //   dispatch(GetImyPdf())
  //   dispatch(GetEciPdf())
  //   dispatch(GetBenEPdf())
  //   dispatch(GetExpPdf())
  // },[])

  useEffect(()=>{
    if(search===""){
      setPage(1);
      setSize(10);
      dispatch(getCompletedForms(page, size, search));
    }
  },[search])
  useEffect(() => {
    dispatch(getCompletedForms(page, size,search));
  }, [page]);

  // useEffect(() => {
  //   dispatch(getCompletedForms(page, size,search));
  // }, [dispatch(PostCompleteForms())]);
  const tableData = useSelector((state) => state.getCompletedFormsReducer);
  const handleDownloadForm = (row) => {
    switch (row.formTypeId) {
      case 1:
        dispatch(GetW9Pdf(row.accountHolderDetailsId));
        break;
      case 2:
        dispatch(GetBenPdf(row.accountHolderDetailsId));
        break;
      case 3:
        dispatch(GetBenEPdf(row.accountHolderDetailsId));
        break;
      case 4:
        dispatch(GetEciPdf(row.accountHolderDetailsId));
        break;
      case 6:
        dispatch(GetExpPdf(row.accountHolderDetailsId));
        break;
      case 7:
        dispatch(GetImyPdf(row.accountHolderDetailsId));
        break;
      case 8:
        dispatch(GetForm8233Pdf(row.accountHolderDetailsId));
        break;
      default:
        console.error("Invalid formTypeId");
    }
  };

  const convertToUTC = (dateString) => {
    
    if (dateString === "0001-01-01T00:00:00") {
        return ""; 
    }


    const date = new Date(dateString);
    return date.toUTCString();
};
  const getFormName = (formTypeId) => {
    switch(formTypeId) {
        case 1:
            return 'W-9';
        case 2:
            return 'W-8BEN';
        case 3:
            return 'W-8BEN-E';
        case 4:
            return 'W-8ECI';
        case 6:
            return 'W-8EXP';
        case 7:
              return 'W-8IMY';
        case 8:
                return 'Form 8233';
    }
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
                <p underline="hover" color="#000000" aria-current="page">
                  Completed Forms
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1  border p-3 box_style">
              <div className="col-8 d-flex">
                <TextField
                  style={{ backgroundColor: "#fff" }}
                  className="mx-md-3 mx-auto w-50 rounded-Input"
                  placeholder="Search"
                  type="search"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
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
            </div>
            <div className=" row m-1  card p-2">
              <div className="col-12 d-flex">
                <table class="table table-hover table-striped">
                  <Paper>
                    <Table className="table table-hover table-striped">
                      <TableHead>
                        <TableRow>
                          <TableCell className="table_head">Agent</TableCell>
                          <TableCell align="center" className="table_head">
                            FormType
                          </TableCell>

                          <TableCell align="center" className="table_head">
                            Name
                          </TableCell>
                          <TableCell align="center" className="table_head">
                            Unique Identifier-Form
                          </TableCell>
                          <TableCell align="center" className="table_head">
                            Email
                          </TableCell>
                          <TableCell align="center" className="table_head">
                            Signatory e-mail
                          </TableCell>
                          <TableCell align="center" className="table_head">
                            Date
                          </TableCell>
                          <TableCell align="center" className="table_head">
                            Comply admin downloaded
                          </TableCell>
                          <TableCell align="center" className="table_head">
                            Downloaded into Wallet
                          </TableCell>
                          {/* <TableCell align="center" className='table_head'>
                        Is verified
                        </TableCell> */}
                          <TableCell align="center" className="table_head">
                            Form Uploaded In Admin
                          </TableCell>
                          <TableCell align="center" className="table_head">
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {tableData?.CompletedFormsData?.records.map((row) => (
                          <TableRow
                            key={row.agent}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell align="left" className="table_content">
                              {row.agentId}
                            </TableCell>

                            <TableCell className="table_content" align="center">
                            {getFormName(row.formTypeId)}
                            </TableCell>
                            <TableCell className="table_content" align="center">
                              {row.agentName}
                            </TableCell>
                            <TableCell className="table_content" align="center">
                              {row.uniqueIdentifier}
                            </TableCell>
                            <TableCell className="table_content" align="center">
                              {row.email}
                            </TableCell>
                            <TableCell
                              className="table_content"
                              align="center"
                            ></TableCell>
                            <TableCell
                              style={{ width: "40px" }}
                              className="table_content"
                              align="center"
                            >
                              {convertToUTC (row.createdOn)}
                            </TableCell>
                            <TableCell className="table_content" align="center">
                            {row.isComplyAdminDownload ?( <DoneIcon style={{color:"green"}} />):""}
                            
                            </TableCell>
                          
                            <TableCell
                              className="table_content"
                              align="center"
                            ></TableCell>
                            <TableCell align="center">
                            <DoneIcon style={{color:"green"}}/>
                            </TableCell>
                            <TableCell align="center" colSpan={2}>
                              <div
                                className="actionRow"
                                style={{
                                  display: "flex",
                                  width: "max-content",
                                  fontSize: "12px",
                                }}
                              >
                               <span 
  className="addForms" 
  onClick={()=>{
    dispatch(PostCompleteForms(row.accountHolderDetailsId,row.agentId,row.formTypeId))
    dispatch(getCompletedForms(page,size,search))
  }}
  style={{cursor:"pointer"}}
>
  set as not sent
</span>

                                <span onClick={() => handleDownloadForm(row)} className="addForms">download pdf</span>{" "}
                                <span className="mt-2">
                                  <DeleteIcon
                                   onClick={()=>{dispatch(deleteCompleteForms(row.accountHolderDetailsId,row.agentId,row.formTypeId))
                                                 dispatch(getCompletedForms(page,size,search))
                         }}
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                      marginTop:"4px"
                                      
                                    }}
                                  />
                                </span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                  <div className="table_content">
                    <span>TimeZone:</span>
                    <span> (UTC) Coordinated Universal Time</span>
                  </div>
                </table>
              </div>
              {tableData?.CompletedFormsData?.totalPages>1 ?(<Stack spacing={2}>
                <Pagination

                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  count={tableData?.CompletedFormsData?.totalPages}
                  onChange={(e, value) => setPage(value)}
                />
              </Stack>):""}
            </div>
            <div className="col-12" style={{ marginTop: "10px" }}>
              <Button
                size="small"
                onClick={()=>{dispatch(exportCompleteForms())}}
                className="btn-cstm mx-1 mb-3"
                style={{ float: "right" }}
              >
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
