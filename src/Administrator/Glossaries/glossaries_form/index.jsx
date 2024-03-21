import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import { Route, useHistory } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ThemeOptions from "../../../Layout/ThemeOptions/";
import { Fragment } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AppFooter from "../../../Layout/AppFooter/";
// import { useEffectOnce } from "../../../../src/Translator/UseEffectOne.tsx";
import { deleteLanguage, getAllLanguages } from "../../../redux/Actions";

import "./index.scss";
import Utils from "../../../Utils";
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
  Breadcrumbs,
  MenuItem,
  Checkbox,
  Button,
  Tooltip,
  Link,
} from "@mui/material";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import DialogTransition from "../../../reusables/deleteDialog";
import Language from "../../../reusables/language"


  

export default function PhraseTable() {

  const history = useHistory();
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state.LanguagesReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);

  const [idData, setIdData] = useState(0);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [rowData,setRowData]=useState({});
  const [idData1, setIdData1] = useState(0);
  const [open1, setOpen1] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  
  const [data, setData] = useState(
   {
          name: "",
          isoCode: "",
        }
  );
  

 
      const deleteItems = async () => {
        dispatch(deleteLanguage(idData));
        dispatch(getAllLanguages());
      };
    
   

 

  useEffect(() => {
    dispatch(getAllLanguages());
  }, []);
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
              <Link underline="hover" color="#0c62a8" onClick={()=>{
                history.push("/glossaries")
              }}>
        Glossaries
        </Link>
                <p
                   underline="hover"
                   color="#000000"
                   
                  
                  
                >
       Glossaries Forms
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1  border p-3 box_style" >
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
                <div className="col-4">
                  <Button className="btn-cstm" style={{ float: "right", display:"none" }}>
                    Search
                  </Button>
                </div>
            </div>
            <div className="row headingLabel complyColor">Glossary entries for US English</div>
            <div className=" row m-1  card p-3" style={{ overflowX: "auto" }}>
              <div className="col-12 d-flex">
                <table class="table table-hover table-striped">

                  <Paper>
                   
                    <TableContainer sx={{}}>
                      <Table sx={{ minWidth: 650 }}class="table table-hover table-striped">
                        <TableHead>
                          <TableRow>
                            <TableCell
                              className='table_head'
                            >
                              Term
                            </TableCell>
                           

                            <TableCell align="center"
                              
                              className='table_head'
                            >
                              Definition
                            </TableCell>
                          

                            <TableCell align="right"
                              colSpan={2}
                             
                              className='table_head'
                            >
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData?.allLanguageData?.map((row) => (
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

                             
                              <TableCell width={"600px"} className="table_content"
                              align='center'>
                                {"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                              {/* {languageData?.allLanguageData?.map((i,ind)=>{
                                  return(<button key={i.id} style={{backgroundColor:"inherit", border:"none"}} className="addSubpage">
                                    {i.name}{" "}
                                  </button>)
                                })} */}
                              </TableCell>
                           

                              <TableCell >
                                {row.action}
                                <div style={{display:"flex",justifyContent:"flex-end"}}>
                             
                               
                                  

                              
                                  <EditIcon style={{ color: "green",fontSize:"20px",cursor:"pointer" }}
                                  onClick={() => {
                                    history.push("/glossaries_edit")
                                    
                                  }} />
                              
                             
                                  <DeleteIcon style={{ color: "red" ,fontSize:"20px",marginLeft:'5px',cursor:"pointer"}}   onClick={() => {
                                    setOpen(true);
                                    setIdData(row.id);
                                  }} />
                           
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Paper>
                </table>
              </div>
              <div style={{fontSize:"12px"}}>
                <span> Enable Asian Character Set:</span>
                <Checkbox type="checkbox" />
                <span>
                  (Note: this character set considerably increases the PDF size)
                </span>
              </div>
            </div>
              
            <div className="actionBtn">
                  <Button  size="small"className="btn-cstm  mt-2 mb-3" style={{ float: "right" }} onClick={() => {
                                    setOpen1(true);
                                    // setIdData1(row.id);
                                    setData({})
                                  }}>
                    Add Glossary Entry
                  </Button>
                  <Button  size="small"className="btn-cstm  mt-2 mb-3 mx-1" style={{ float: "right" }} >
                    Import
                  </Button>
                  <Button  size="small"className="btn-cstm  mt-2 mb-3 " style={{ float: "right" }} >
                    Export
                  </Button>
                  <Button  size="small"className="btn-cstm  mt-2 mb-3 mx-1" style={{ float: "right" }} onClick={()=>{
                history.push("/glossaries")
              }}>
                    Back
                  </Button>
                {/* </Button> */}
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
        deleteApi={deleteLanguage}
        getAllApi={getAllLanguages}
      />
   
    </Fragment>
  );
}
