import * as React from 'react';
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
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import { CheckBox } from '@mui/icons-material';
function createData(agent,content, name,mail,page,date,admin,action) {
  return { agent,content, name,mail,page,date,admin,action };
}

const rows = [
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',		'test@gmail.com', "/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	'),
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',		'test@gmail.com',"/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	'),
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',		'test@gmail.com',"/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	'),
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',		'test@gmail.com',"/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	' ),
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',	'test@gmail.com',"/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	' ),
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',		'test@gmail.com',"/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	'),
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',		'test@gmail.com',"/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	'),
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',	'test@gmail.com',"/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	' ),
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',		'test@gmail.com',"/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	'  ),
  createData('Group Tax','W-8BEN-E (Oct 2021)','test',		'test@gmail.com',"/Pages/USEntityTaxpayer-information_OBFX.aspx",'06/13/2023 13:11','88KD6W	' ),
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
                    {rows.map((row) => (
                        <TableRow
                            key={row.agent}
                            sx={{ '&:last-child td, &:last-child th':
                                { border: 0 } }}
                        >
                            <TableCell className="table_content" component="th" scope="row" >
                                {row.agent}
                            </TableCell>

                            <TableCell className="table_content"  align="center">
                              
                              {row.content}
                            </TableCell>
                            <TableCell className="table_content"align="center">
                                {row.name}
                            </TableCell>
                          
                            <TableCell className="table_content"align="center">
                                {row.mail}
                            </TableCell>
                            <TableCell className="table_content"align="center">
                                {row.page}
                            </TableCell>
                           
                            <TableCell className="table_content"align="center">
                                {row.date}
                            </TableCell>
                            <TableCell className="table_content"align="center">
                              {row.admin}
                               
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
                  <Stack  spacing={2}>
     
     <Pagination count={10} variant="outlined" shape="rounded" color='primary' />
   </Stack>
            </div>
                <div className="col-12" style={{marginTop:'5px'}}>
                <Button  size="small"className="btn-cstm mx-1 mt-1 mb-3" style={{float:"right"}}>Export</Button>
               
            
                </div>
         
          </div>
        </div>

    </div>
    </Fragment>
  );
}