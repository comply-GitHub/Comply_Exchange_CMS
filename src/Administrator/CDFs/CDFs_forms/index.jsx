import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ThemeOptions from "../../../Layout/ThemeOptions";
import { Fragment } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AppHeader from "../../../Layout/AppHeader";
import AppSidebar from "../../../Layout/AppSidebar";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AppFooter from "../../../Layout/AppFooter";
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
  Breadcrumbs,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Tooltip,
  Link,
} from "@mui/material";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
// import {  } from '@mui/icons-material';
function createData(agent, name,mail,date,admin,) {
  return { agent, name,mail,date,admin, };
}

const rows = [
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent'),
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent'),
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent'),
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent' ),
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent' ),
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent'),
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent'),
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent' ),
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent'  ),
  createData('Group Tax','test','test@gmail.com','06-13-2023 13:11','Set as not Sent' ),
];

export default function ContentManagement() {
 

  return (
    <Fragment>
    <ThemeOptions />
    {/* <AppHeader /> */}
    <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
          <div className=" row mx-4">
             
            </div>
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <p
                   underline="hover"
                   color="#000000"
                   aria-current="page"
                  
                >
          CDFs
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1  border p-3 box_style">
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
            <div className=" row m-1  card p-3" style={{overflowX:"auto"}}>
                  <div className="col-12 d-flex">
                  <table class="table table-hover table-striped">
                  <Paper >
               
            <Table sx={{ minWidth: 650 }}class="table table-hover table-striped">
                <TableHead>
                    <TableRow >
                        <TableCell className='table_head'>
                        Agent
                        </TableCell>
                      
                       
                        <TableCell align='center' className='table_head'>
                         Name
                        </TableCell>
                      
                        <TableCell  align='center' className='table_head'>
                         Email
                        </TableCell>
                    
                        <TableCell  align='center' className='table_head'>
                         Date
                        </TableCell>
                        <TableCell  align='center' className='table_head'>
                        Is sent
                        </TableCell>
                        <TableCell  align='center' className='table_head'>
                        Is sent by feed
                        </TableCell>
                       
                        <TableCell className='table_head'  align='center'>
                        Actions
                        </TableCell>
                       
                      
            
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.agent}
                            sx={{ '&:last-child td, &:last-child th':
                                { border: 0 } }}
                        >
                            <TableCell   className="table_content" >
                                {row.agent}
                            </TableCell>

                         
                            <TableCell  align='center' className="table_content">
                                {row.name}
                            </TableCell>
                           
                            <TableCell  align='center' className="table_content">
                                {row.mail}
                            </TableCell>
                           
                            <TableCell  align='center' className="table_content" >
                                {row.date}
                            </TableCell>
                          
                            <TableCell  align='center'className="table_content">
                               <Checkbox
                                    className="complyColor"/>
                            </TableCell>
                            <TableCell  align='center' className="table_content">
                            <Checkbox  style={{marginLeft:"25px"}}
                                    className="complyColor"/>
                            </TableCell >
                           
                           
                            <TableCell  align='center' >

                            <div className="table_content addSubpage actionRow " style={{display:"flex",justifyContent:"center",fontSize:"12px" }}>
                                   
                                   {row.admin}
                                
                              
                                   <DeleteIcon style={{ color: "red", fontSize:"20px", marginLeft:'25px'}}/>
                              
                               </div>

                              
                               

                            </TableCell>
                           
                          
                   
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
   
      </Paper>
      <div className='table_content'>
        <span>TimeZone:</span>
        <span>(UTC) Coordinated Universal Time</span>
      </div>
            </table>
                  </div>
                  <div style={{marginTop:"15px"}}>
                  <Stack style={{fontSize:"10px"}}spacing={2}>
     
     <Pagination count={10} variant="outlined" shape="rounded"  color="primary"/>
   </Stack>
                  </div>
   
            </div>
             
        
          </div>
         
        </div>

    </div>
    </Fragment>
  );
}