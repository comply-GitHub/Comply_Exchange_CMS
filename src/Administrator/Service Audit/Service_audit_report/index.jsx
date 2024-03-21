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
import ThemeOptions from "../../../Layout/ThemeOptions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AppHeader from "../../../Layout/AppHeader";
import AppSidebar from "../../../Layout/AppSidebar";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import DialogTransition from "../../../reusables/deleteDialog";
// import { getAllFormInstructions, deleteFormInstruction} from "../../../redux/Actions";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
// import AppFooter from "../../Layout/AppFooter/";
import ViewLog from "../../../reusables/viewLog";
import ViewError from "../../../reusables/viewError";
import ViewLogg from "../../../reusables/view";
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

} from "@mui/material";
// import FormInstruction from "../../../reusables/FormInstruction"
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
function createData(agent, content, action) {
  return { agent, content, action };
}


export default function ContentManagement() {
  const history = useHistory();
const row=[]
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1= () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);


  const [open2, setOpen2] = useState(false);
  const handleClickOpen2= () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
//   const tableData = useSelector((state) => state.getAllFormInstructionReducer);

//   useEffect(() => {
//     dispatch(getAllFormInstructions(page, size));
//   }, []);

//   const setSubmit = (e) => {
//     e.preventDefault();
//     setPage(1);
//     setSize(10);
//     dispatch(getAllFormInstructions(page, size, search));
//   };
//   const deleteItems = async () => {
//     dispatch(deleteFormInstruction(idData));
//     dispatch(getAllFormInstructions(page, size));
//   };

//   useEffect(() => {
//     dispatch(getAllFormInstructions(page, size));
//   }, [page]);

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
                
                 
                   color="#000000"
                   aria-current="page"
                  onClick={() => history.push("/pages")}
                >
                  Service Audit
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1  border p-3 box_style">
            <div className="col-8 d-flex ">
                  
                  <TextField
                    style={{ backgroundColor: "#fff", }}
                    name="search"
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
              {/* <div className="col-4">
                <Button
                 size="small"
                //   onClick={(e) => {
                //     setSubmit(e);
                //   }}
                  className="btn-cstm"
                  style={{ float: "right" }}
                >
                  Search
                </Button>
              </div> */}
            </div>
            <div
              className=" row m-1  card p-3"
              style={{ overflowX: "auto" }}
            >
              <Paper>

             
                {/* <h1 >Forms Instructions</h1> */}
            
                  <div className="col-12 d-flex">
                    <table class="table table-hover table-striped">
                      <TableHead>
                        <TableRow>
                          <TableCell
                           className='table_head'
                          >
                        Date
                          </TableCell>
                          <TableCell
                            align="center"
                           className='table_head'
                          >
                          UUID
                          </TableCell>
                          <TableCell
                            align="center"
                           className='table_head'
                          >
                          Log
                          </TableCell>
                          <TableCell
                            align="center"
                           className='table_head'
                          >Error Log
                          </TableCell>
                          <TableCell
                            align="center"
                           className='table_head'
                          >
                            Response Data
                          </TableCell>
                          <TableCell
                            align="center"
                           className='table_head'
                          >
                            Headers
                          </TableCell>
                    
                    
                       
                        </TableRow>
                      </TableHead>
                      {/* {console.log(tableData,"tableData?.formInstructionData?.records")} */}
                      <TableBody>
                        {/* {tableData?.formInstructionData?.records?.map((row) => ( */}
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell className="table_content" component="th" scope="row">
                            5/24/2023 5:36:46 PM
                            </TableCell>

                            <TableCell className="table_content" align="center">
                            
                            	21D610B9-20E0-4C39-A060-E75F6CAFBCC2
                                </TableCell>
                          
                            <TableCell onClick={()=>{
                              setOpen1(true);
                            }} className="table_content" align="center"> <Link>View Log</Link></TableCell>
                            <TableCell onClick={()=>{
                              setOpen2(true);
                            }}  className="table_content" align="center">	<Link> View Error</Link> </TableCell>
                            <TableCell onClick={()=>{
                              setOpen(true);
                            }}  className="table_content" align="center"><Link>
                            View</Link></TableCell>
                            <TableCell className="table_content" align="center">SharedSecret:
InstructorId:
EmailId:</TableCell>

                          
                          </TableRow>
                        {/* ))} */}
                      </TableBody>
                    </table>
                  </div>
              
              </Paper>
         
            </div>
           
          </div>
          {/* {tableData?.formInstructionData?.totalPages > 1 ? ( */}
            {/* <Stack style={{ marginTop: "10px" }} spacing={2}>
              <Pagination
                count={tableData?.formInstructionData?.totalPages}
                onChange={(e, value) => setPage(value)}
              />
            </Stack> */}
          {/* ) : (
            ""
          )} */}
        </div>
      </div>

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
       <ViewError
        open={open2}
       
        setOpen={setOpen2}
        
        handleClickOpen={handleClickOpen2}
        handleClose={handleClose2}
        
      />

<ViewLogg
        open={open}
       
        setOpen={setOpen}
        
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        
      />
   <ViewLog
        open={open1}
       
        setOpen={setOpen1}
        
        handleClickOpen={handleClickOpen1}
        handleClose={handleClose1}
        
      />

    </Fragment>


  );
}
