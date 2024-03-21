import React, { Fragment, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import AppFooter from "../../../Layout/AppFooter/";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

// Theme Options
import {
  TextField,
  Typography,
  Collapse,
  CardHeader,
  Breadcrumbs,
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
  Link,
} from "@mui/material";
import ThemeOptions from "../../../Layout/ThemeOptions/";
// import { useHistory } from "react-router-dom";
import { CheckBox } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import SearchIcon from "@material-ui/icons/Search";
import DialogTransition from "../../../reusables/deleteDialog";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./index.scss";
import {
  deleteDocumentation,
  getAllDocumentaions,
  getDocById,
  GetDocumentationTypes,
} from "../../../redux/Actions";
const DocumentaionList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const tableData = useSelector((state) => state.getAllDocumentaionReducer);
  const nameData = useSelector((state) => state.getdocTypeReducer);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getAllDocumentaions(page, size, search));
  };

  const deleteItems = async () => {
    dispatch(deleteDocumentation(idData));
    dispatch(getAllDocumentaions(page, size));
  };


  useEffect(()=>{
    
  })

  const getDocName = (id) => {
    const result = nameData?.docTypeData?.filter((item) => {
      if (item.id == id) {
        return item;
      }
    });
    if (result?.length) {
      return result[0]?.name;
    }
  };
  useEffect(()=>{
    if(search===""){
      setPage(1);
      setSize(10);
      dispatch(getAllDocumentaions(page, size, search));
    }
  },[search])

  useEffect(() => {
    dispatch(GetDocumentationTypes());
    dispatch(getAllDocumentaions(page, size));
  }, []);

  useEffect(() => {
    dispatch(getAllDocumentaions(page, size));
  }, [page]);

  console.log(nameData?.docTypeData, "tableDatatableData");

  return (
    <Fragment>
      <ThemeOptions />
      {/* <AppHeader /> */}
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
            <div className=" row mx-4">
              <div className="col-12">
                <h3 className="row headingLabel complyColor">
                  List of Mandatory Documentation
                </h3>
              </div>
            </div>
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <p
                   underline="hover"
                   color="#000000"
                 
                  
                >
                Documentation
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1  border p-3 box_style">
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
                  style={{ float: "right" ,display:"none"}}
                  onClick={(e) => {
                    setSubmit(e);
                  }}
                >
                  Search
                </Button>
              </div>
              </form>
            </div>
            <div className=" row m-1  card p-3" style={{ overflowX: "auto" }}>
              <div className="col-12 d-flex">
                <table class="table table-hover table-striped">
                <Paper  style={{
                     
                     width: "100%",
                     overflowX: "auto",
                     overflow: "auto",
                 }}>
                     <Table class="table table-hover table-striped">
                     <TableHead>
                          <TableRow>
                            <TableCell
                       className="table_head">Document Name</TableCell>
                      <TableCell scope="col" className="table_head" >
                        Type
                      </TableCell>
                      <TableCell scope="col" className="table_head" >
                       Proxy
                      </TableCell>
                      <TableCell scope="col" className="table_head" >
                      Address Info Page
                      </TableCell>
                      <TableCell scope="col" className="table_head" >
                      KYC
                      </TableCell>
             
                      <TableCell scope="col" className="table_head text-end" >
                     
                        Actions
                      </TableCell>
                      </TableRow>
                        </TableHead>
                        <TableBody>
                    {tableData?.documentationData?.records?.map((row, ind) => (
                   
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
                          align="left">
                          
                        
                          {row.name}
                        </TableCell>
                        <TableCell  className="table_content">{getDocName(row.documentTypeId)}</TableCell>
                        <TableCell  className="table_content">
                        <Checkbox size="medium" type="checkbox"  checked={row.proxy}/>
                         </TableCell>
                        <TableCell  className="table_content"><Checkbox size="medium" type="checkbox"  checked={row.addressInfoPage} /></TableCell>
                        <TableCell  className="table_content"><Checkbox size="medium" type="checkbox"  checked={row.kyc}/></TableCell>
                       
                        <TableCell>
                     
                            <div className="d-flex justify-content-end actionRow">
                            
                              <EditIcon
                                onClick={() => {
                                  history.push(`documentation_edit/${row.id}`);
                                }}
                                style={{
                                  color: "green",
                                  fontSize: "20px",
                                  marginLeft: "30px",
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
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                  </Paper>
                </table>
              </div>
            </div>

            <div className="col-12 mb-2">
              <Button
                size="small"
                className="btn-cstm mt-2 "
                style={{ float: "right", marginRight: "3px" }}
                onClick={() => {
                  history.push("documentation_details");
                }}
              >
                Add Document
              </Button>
            </div>

            <div className="row m-1 m-md-4">
              <div className="col-12 p-0">
                {tableData?.documentationData?.totalPages > 1 ? (
                  <Stack spacing={2}>
                    <Pagination
                      count={tableData?.documentationData?.totalPages}
                      onChange={(e, value) => setPage(value)}
                    />
                  </Stack>
                ) : (
                  ""
                )}
              </div>
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
        deleteApi={deleteDocumentation}
        getAllApi={getAllDocumentaions}
      />
    </Fragment>
  );
};

export default DocumentaionList;
