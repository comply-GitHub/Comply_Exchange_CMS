import * as React from 'react';
import Paper from '@mui/material/Paper';
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
import Pagination from '@mui/material/Pagination';
import { Route, useHistory } from "react-router-dom";
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
    CardContent,
    CardActions,
    Card,
    Breadcrumbs,
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
function createData(agent, content, action) {
    return { agent, content, action };
}

const rows = [
    createData('US English', '	211 entries'),
    createData('US English', '	211 entries'),
    createData('US English', '	211 entries'),
    createData('US English', '	211 entries'),
    createData('US English', 	'211 entries'),
    createData('US English', 	'211 entries'),
    createData('US English', '	211 entries'),
    createData('US English', '	211 entries'),
    createData('US English', '	211 entries'),
    createData('US English', '	211 entries'),
];

export default function ContentManagement() {
    const history=useHistory();

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
                <p
                   underline="hover"
                   color="#000000"
                   aria-current="page"
                  
                >
       Glossaries
                </p>
              </Breadcrumbs>
            </div>
            <div className="row headingLabel complyColor">Glossaries</div>
             
                        <div className=" row m-1 border p-3 box_style">
                            <div className="col-8 d-flex">
                               
                                <TextField
                                    style={{ backgroundColor: "#fff" }}
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
                                <Button  size="small"className="btn-cstm" style={{ float: "right", display:"none" }}>
                                    Search
                                </Button>
                            </div>
                        </div>
                        <div  className=" row m-1 card p-2" style={{ overflowX: "auto" }}>
                           
                              
                                    <Paper >
                                        {/* <h1 >Forms Instructions</h1> */}
                                    
                                        <div className="col-12 d-flex">
                                        <table class="table table-hover table-striped">
                                                <TableHead>
                                                    <TableRow >
                                                        <TableCell className='table_head'>
                                                          
                                                        Languages
                                                        </TableCell>
                                                        <TableCell align="center" className='table_head'>
                                                       Entries
                                                        </TableCell>


                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {rows.map((row) => (
                                                        <TableRow
                                                            key={row.agent}
                                                            sx={{
                                                                '&:last-child td, &:last-child th':
                                                                    { border: 0 }
                                                            }}
                                                        >
                                                            <TableCell className='table_content' component="th" scope="row" >
                                                                {row.agent}
                                                            </TableCell>

                                                            <TableCell onClick={()=> {
                                                                history.push("/glossaries_form")
                                                            }} className="addSubpage"align="center">

                                                                {row.content}
                                                            </TableCell>

                                                          

                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                                </table>
                                                </div>
                                    
                                    </Paper>


                        <Stack className=" mt-3"spacing={2}>

                            <Pagination count={10} variant="outlined" shape="rounded" color='primary'/>
                        </Stack>
                            </div>
                                    
                        
                        </div>

                    </div>

                </div>

          
        </Fragment>
    );
}