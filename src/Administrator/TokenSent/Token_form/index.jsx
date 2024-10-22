
import React, { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import DoneIcon from '@mui/icons-material/Done';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ThemeOptions from "../../../Layout/ThemeOptions/";
import { Fragment } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {getTokenSent,exportTokenSent} from '../../../redux/Actions';
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
  Breadcrumbs,
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
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import { CheckBox } from '@mui/icons-material';
import {getTokenSentReducer} from '../../../redux/Reducers';


export default function ContentManagement() {
  const dispatch=useDispatch();
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");
 
  useEffect(() => {
    dispatch(getTokenSent(page, size,search));
  }, [page]);
 
  // useEffect(() => {
  //   dispatch(getTokenSent((page, size, search)));
  
  // }, []);



  const tableData = useSelector((state) => state.getTokenSentReducer);
  console.log(tableData,"tableData")
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
  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10);
    dispatch(getTokenSent(page, size, search));
  };
  return (
    <Fragment>
    <ThemeOptions />
    {/* <AppHeader /> */}
    <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
          <div className=" row mx-4">
          <h3 className="row headingLabel complyColor">List of Tokens sent</h3>
            </div>
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <p
                   underline="hover"
                   color="#000000"
                   aria-current="page"
                
                >
                  Token Sent
                </p>
              </Breadcrumbs>
            </div>
          <form onSubmit={setSubmit}>

          <div className=" row m-1 border p-3 box_style">
                  <div className="col-8 d-flex">
                   
                    <TextField
                    style={{backgroundColor:"#fff"}}
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
            )}}/>
                  </div>
                <div className="col-4">
                  <Button  size="small"className="btn-cstm" style={{ float: "right", display:"none" }}>
                    Search
                  </Button>
                </div>
            </div>
            <div className=" row m-1 card p-3" style={{overflowX:"auto"}}>
                  <div className="col-12 d-flex">
                  <table class="table table-hover table-striped">
                  <Paper >
              
            <Table sx={{ minWidth: 650 }}class="table table-hover table-striped">
                <TableHead>
                    <TableRow >
                        <TableCell className='table_head'>
                        Agent
                        </TableCell>
                        <TableCell align="center" className='table_head'>
                     FormType
                        </TableCell>
                       
                        <TableCell align="center" className='table_head'>
                         Name
                        </TableCell>
                      
                        <TableCell align="center" className='table_head'>
                         Email
                        </TableCell>
                        <TableCell align="center" className='table_head'>
                        Last page visited
                        </TableCell>
                     
                        <TableCell align="center" className='table_head'>
                        Token sent at
                        </TableCell>
                        <TableCell align="center" className='table_head'>
                        Token
                        </TableCell>
                        <TableCell align="center" className='table_head'>
                       Save & Exit (Last continued)
                        </TableCell>
                        <TableCell align="right" className='table_head'>
                        Expired	
                        </TableCell>
                      
                       
                       
                      
            
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData?.TokenSentData?.records.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th':
                                { border: 0 } }}
                        >
                            <TableCell className="table_content" component="th" scope="row" >
                                {row.agentId}
                            </TableCell>

                            <TableCell className="table_content"  align="center">
                              
                            {getFormName(row.formTypeId)}
                            </TableCell>
                            <TableCell className="table_content"align="center">
                                {row.agentName}
                            </TableCell>
                          
                            <TableCell className="table_content"align="center">
                                {row.email}
                            </TableCell>
                            <TableCell className="table_content"align="center">
                                {row.stepName}
                            </TableCell>
                           
                            <TableCell className="table_content"align="center">
                            {convertToUTC (row.createdOn)}
                            </TableCell>
                            <TableCell className="table_content"align="center">
                              {row.token}
                               
                            </TableCell>
                           
                            <TableCell className="table_content" align="center">
                               
                            </TableCell>
                            <TableCell align="right">
                            <DoneIcon style={{width:"80%",height:"20px",color:"green"}}/>
                            </TableCell>
                            {/* <TableCell align="right" >
                               
                                   
                                   
                                 
                               
                                <div className="actionRow" >
                                 
                                 
                                 
                                    <DeleteIcon  style={{ color: "red" , fontSize:'20px',marginLeft:'15px'}}/>
                                
                                </div>
                               
                               

                            </TableCell> */}
                           
                          
                   
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
       
      </Paper>
      <div className='table_content'>
        <span>TimeZone:</span>
        <span> (UTC) Coordinated Universal Time</span>
      </div>
            </table>
 
                  </div>
                  {tableData?.TokenSentData?.totalPages > 1 ? (
                  <Stack  spacing={2}>
     
     <Pagination count={tableData?.TokenSentData?.totalPages}
                    onChange={(e, value) => setPage(value)} variant="outlined" shape="rounded" color='primary' />
   </Stack>
    ) : (
      ""
    )}
            </div>
          </form>
                <div className="col-12" style={{marginTop:'5px'}}>
                <Button 
                
              onClick={()=>{dispatch(exportTokenSent())}}
                size="small"className="btn-cstm mx-1 mt-1 mb-3" style={{float:"right"}}>Export</Button>
               
            
                </div>
         
          </div>
        </div>

    </div>
    </Fragment>
  );
}