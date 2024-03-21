import React, { Fragment, useEffect, useState } from "react";
import { Route, useHistory,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ThemeOptions from "../../Layout/ThemeOptions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppHeader from "../../Layout/AppHeader/";
import AppSidebar from "../../Layout/AppSidebar/";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import DialogTransition from "../../../reusables/deleteDialog";
import { getAllCountriesData, getAllCountries,importCountries,exportCountries,getIgaDropDown,getYears} from "../../redux/Actions";

import DialogModal from "../../reusables/Countries";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AppFooter from "../../Layout/AppFooter/";
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
import Modal from "../../reusables/htmlDialog"
// import FormInstruction from "../../../reusables/FormInstruction"
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
function createData(agent, content, action) {
  return { agent, content, action };
}


export default function ContentManagement() {
  const history = useHistory();
// const row=[]
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1= () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);


  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
  const [fileData,setFileData] =useState();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.getAllCountriesDataReducer);
//   const tableData = useSelector((state) => state.getAllFormInstructionReducer);
const igaDropDownData = useSelector(
  (state) => state?.getIgaDropDownReducer?.igaDropDownData
);
const formData = useSelector((state) => state?.getYearsReducer?.yearData);
  useEffect(() => {
    dispatch(getIgaDropDown())
    dispatch(getYears());
    dispatch(getAllCountriesData(page, size));
  }, []);
  


  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getAllCountriesData(page, size, search));
  };
//   const deleteItems = async () => {
//     dispatch(deleteFormInstruction(idData));
//     dispatch(getAllFormInstructions(page, size));
//   };

  useEffect(() => {
    dispatch(getAllCountriesData(page, size));
  }, [page]);

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
            Countries
                </p>
              </Breadcrumbs>
            </div>
            <div className="row headingLabel complyColor">List of Countries (Treaty Country, Applicable Articles, Withholding Rates & Income Code selection)</div>
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
            <div
              className=" row m-1  card p-3"
              style={{ overflowX: "auto" }}
            >
              <Paper>

              <div className="col-12 d-flex">
                    <table class="table table-hover table-striped">
                      <TableHead>
                        <TableRow>
                          <TableCell
                           className='table_head'
                          >
                         Pre-set Treaty Rates: Auto populate all Treaty Countries
                          </TableCell>
                       
                    
                          <TableCell
                          align="right"
                         style={{justifyContent:'flex-end',marginLeft:'20px'}}
                           className='table_head'
                          >
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                     
                      <TableBody>
                        {/* {tableData?.formInstructionData?.records?.map((row) => ( */}
                          <TableRow
                            // key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell className="table_content" component="th" scope="row">
                            0, 7.5, 10, 15
                            </TableCell>

                          

                            <TableCell className="table_content" align="right">
                              <div className="actionRow">
                              
                                  <EditIcon style={{ color: "green",fontSize:"20px" }}
                                  onClick={() => {
                                    setOpen(true);
                            
                                  }} />
                             
                              
                                  {/* <DeleteIcon style={{ size:"small", color: "red",fontSize:"20px" ,marginLeft:"5px"}} 
                                  onClick={()=>{
                                    setOpen1(true);
                                    setIdData(row.id)
                                  }}   /> */}
                               
                            
                              </div>
                            </TableCell>
                          </TableRow>
                        {/* ))} */}
                      </TableBody>
                     
                    </table>
                  </div>
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
                            align="center"
                           className='table_head'
                          >
                           IGA Established
                          </TableCell>
                          <TableCell
                            align="center"
                           className='table_head'
                          >
                            Is tax treaty country
                          </TableCell>
                          <TableCell
                            align="center"
                           className='table_head'
                          >
                          	Treaty effective year
                          </TableCell>
                          <TableCell
                            align="center"
                           className='table_head'
                          >
               CRS Exchange In
                          </TableCell>

                          <TableCell
                            align="center"
                           className='table_head'
                          >
                   Articles List Set
                          </TableCell>
                          <TableCell
                            align="center"
                           className='table_head'
                          >
                 LOB
                          </TableCell>
                    
                          <TableCell
                            align="right"
                           className='table_head'
                          >
                            Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {tableData?.countryData && tableData?.countryData.records?.length ? (
                      <TableBody>
                        {console.log("dataa", tableData)}
                    {tableData?.countryData?.records?.map((row, ind) =>
                    { console.log("roww1",row);
                   return  (
                     
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell className="table_content">
                           {row.name}
                            </TableCell>

                            <TableCell className="table_content" align="center"> {igaDropDownData?.find(item => item.id === row?.igaModelId)?.name}</TableCell>
                            <TableCell className="table_content" align="center">{row.url}</TableCell>
                            <TableCell className="table_content" align="center">{row.treatyEffectiveYear}</TableCell>
                            <TableCell className="table_content" align="center">{row.crsExchangeIn}</TableCell>
                            <TableCell className="table_content" align="center">{row.url}</TableCell>
                            <TableCell className="table_content" align="center">{row.lob}</TableCell>

                            <TableCell className="table_content" align="right">
                              <div className="actionRow">
                              
                                  <EditIcon style={{ color: "green",fontSize:"20px" }}
                                  onClick={() => {
                                   
          history.push({
pathname:`/countries_edit/${row.id}`,
state: { id: row?.id },
                                   })
                                
                                 
                                  }}
                                  />
                              </div>
                            </TableCell>
                          </TableRow>
                        )})}
                      </TableBody>
                         ) : <div className="notDataDiv">No Data Available</div>} 
                    </table>
                  </div>
              
              </Paper>
         
            </div>
            <div className="col-12">
              <Button
                className="btn-cstm  mt-2 mx-1"
                style={{ float: "right",marginLeft:"5px" }}
                size="small"
                onClick={() => {
                  setOpen1(true);
                }} 
              >
               import 
              </Button>
              <Button size="small"className="btn-cstm mt-2 " style={{ float: "right" }} onClick={()=>{dispatch(exportCountries())}}>
                Export
              </Button>
            </div>
          </div>
          {tableData?.countryData?.totalPages > 1 ? (
                <Stack className="px-3 col-12" spacing={2}>
                  <Pagination
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    count={tableData?.countryData?.totalPages}
                    onChange={(e, value) => setPage(value)}
                  />
                </Stack>
              ) : (
                ""
              )}
        </div>
      </div>
    <DialogModal
        open={open}

        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
 
      />
      {/* <FormInstruction
        open={open}
        idData={idData}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
       <DialogTransition
        open={open1}
        deleteItems={deleteItems}
        setOpen={setOpen1}
        handleClickOpen={handleClickOpen1}
        handleClose={handleClose1}
        deleteApi={deleteFormInstruction}
        getAllApi={getAllFormInstructions}
      /> */}
      <Modal
       open={open1}
       // deleteItems={deleteItems}
       fileData={fileData}
       setFileData={setFileData}
       dispatch={dispatch}
       setOpen={setOpen1}
       handleClickOpen={handleClickOpen1}
       handleClose={handleClose1}
       Heading="Import Countries Data"
       apiCall={(formData)=>{
    dispatch(importCountries(formData))
       }}
      />
    </Fragment>


  );
}
