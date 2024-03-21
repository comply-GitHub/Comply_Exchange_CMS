import * as React from 'react';
import Paper from '@mui/material/Paper';
import { useEffect, useRef, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
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
import Pagination from '@mui/material/Pagination';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import Stack from '@mui/material/Stack';
// import { useEffectOnce } from "../../../../src/Translator/UseEffectOne.jsx";

function createData(name, color, action) {
  return { name, color, action };
}

const rows = [
  createData('TATA HARRIER', 'BLACK'),
  createData('MAHINDRA THAR', 'RED'),
  createData('MARUTI SWIFT', 'WHITE',),
  createData('MG HECTOR', 'BLACK', ),
  createData('MERCEDES GLS', 'WHITE', ),
  createData('TATA HARRIER', 'BLACK'),
  createData('MAHINDRA THAR', 'RED',),
  createData('MARUTI SWIFT', 'WHITE', ),
  createData('MG HECTOR', 'BLACK',  ),
  createData('MERCEDES GLS', 'WHITE', ),
];

export default function PhraseTable() {

  // const [translate , setTranslate]= useState(false)
  // const googleTranslateElementInit = () => {
  //     new window.google.translate.TranslateElement(
  //       {
  //         pageLanguage: "en",
  //         autoDisplay: false
  //       },
  //       "google_translate_element"
  //     );
  //   };
  
  //   const translator = ()=>{
  //     var addScript = document.createElement("script");
  //     addScript.setAttribute(
  //       "src",
  //       "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  //     );
  //     document.body.appendChild(addScript);
  //     window.googleTranslateElementInit = googleTranslateElementInit;
  
  //   }
  
  // useEffectOnce(() => {
  //     if (translate == false ){
  //         translator()
  //         setTranslate(true)
  //     }
     
  
  //   }, []);

 

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
            <div className=" row m-1 m-md-4 border p-3 box_style">
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
            ),
         }}
 />
                  </div>
                  
                  <div className="col-8 d-flex" style={{marginTop:"10px"}}>
                    <Typography
                      className="my-auto"
                      variant="body2"
                      sx={{ fontWeight: 600 }}
                    >
                      Language:
                    </Typography>
                   <div style={{marginTop:'18px'}}> <Button size='medium' height="10px"></Button></div>
                  </div>


                  <div className="col-8 d-flex" >
          
              <Typography variant="body2" sx={{ fontWeight: 600 ,marginTop:"12px"}}>
              Include By Google:
              </Typography>
          
              <Checkbox 
                name="displayOnTopMenu"
                
                
                
              />
         
          </div>
                <div className="col-4">
                  <Button className="btn-cstm" style={{ float: "right" }}>
                    Search
                  </Button>
                </div>
            </div>
            <div style={{overflowX:"auto"}}>
                  <div className="col-12 d-flex">
                  <table class="table table-hover table-striped">
                  <Paper >
                  <TableContainer sx={{}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell className='table_head'>
                          Phrase
                        </TableCell>
                       
                        <TableCell align="center" className='table_head'>
                         Translation
                        </TableCell>
                       
                        <TableCell colSpan={2} align="right" className='table_head'>
                           Language
                        </TableCell>
            
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th':
                                { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                {row.color}
                            </TableCell>
                          
                            <TableCell align="right" >
                                    {row.action}
                                   
                        <Button style={{color:"green"}}> <EditIcon/>
            </Button>
                        <Button style={{color:"red"}}> <DeleteIcon /></Button>
                         </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
      </Paper>
            </table>
                  </div>
                <div className="col-12">
                <Button className="btn-cstm mx-2" style={{float:"right"}}>Add Phrase</Button>
                <Button className="btn-cstm mx-2" style={{float:"right"}}>Import HTML</Button>
                <Button className="btn-cstm mx-2" style={{float:"right"}}>Import Plain</Button>
                <Button className="btn-cstm mx-2" style={{float:"right"}}>Export HTML</Button>
            
                </div>
  
            </div>
            <Stack spacing={2}>
     
     <Pagination count={10} variant="outlined" shape="rounded" />
   </Stack>
          </div>
         
        </div>

    </div>
    </Fragment>
  );
}