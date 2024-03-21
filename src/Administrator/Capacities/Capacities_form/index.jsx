import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import { Fragment } from "react";
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
  Breadcrumbs, Link,
  Grid,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Paper
} from "@mui/material";
import Table from '@mui/material/Table';
import { useHistory } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ThemeOptions from "../../../Layout/ThemeOptions/";
import { CheckBox } from "@mui/icons-material";
import "./index.scss";
import Pagination from '@mui/material/Pagination';
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Stack from "@mui/material/Stack";
import DoneIcon from '@mui/icons-material/Done';
import DialogTransition from "../../../reusables/deleteDialog";
import { GetAllCapacities, getCapacitiesById, deleteCapacities } from "../../../redux/Actions"

export default function ContentManagement() {

  const CapacitiesData = useSelector((state) => state.getAllCapacitiesReducer)

  const nameData = useSelector((state) => state.getCapacitiesById);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [search, setSearch] = useState("");


  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [idData, setIdData] = useState(0);

  const [data, setData] = useState({
    id: 2,
    name: "Capacity",
    isProxyMandatory: true,
    isCountryOfResidenceRequired: true,
    isImportant: true,
    isUSIndividual: true,
    isNonUSIndividual: true,
    isUSBusiness: true,
    isNonUSBusiness: true,
    isIntermediary: true,
    isNonUSGovernment: true,

  })
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllCapacities(page, size));
  }, [page]);

  const setSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSize(10)
    dispatch(GetAllCapacities(page, size, search));
  };
  useState(() => {
    dispatch(GetAllCapacities(page, size))
  }, [])
  const idName = (id) => {
    const result = nameData?.capacityName?.filter((item) => {
      if (item.id == id) {
        return item;
      }
    });
    if (result.length) {
      return result[0]?.name;
    }
  };

  const deleteItems = async () => {
    dispatch(deleteCapacities(idData));
    dispatch(GetAllCapacities(page, size));
  };

  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const history = useHistory();
  const row = []
  console.log(CapacitiesData, "CapacitiesData")
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
                  Capacities
                </p>
              </Breadcrumbs>
            </div>
            <div className=" row m-1  border p-3 box_style">
              <form onSubmit={setSubmit}>
                <div className="col-8 d-flex ">
                  <TextField

                    style={{ backgroundColor: "#fff" }}
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
              </form>

              <div className="col-4">
                <Button size="small" className="btn-cstm" style={{ float: "right", display: "none" }} onClick={setSubmit}>
                  Search
                </Button>
              </div>

            </div>
            <form className="m-1 " onSubmit={handleSubmit}>

              <div className="  card p-3" style={{ overflowX: "auto" }}>

                <table class="table table-hover table-striped">



                  <TableHead>
                    <TableRow className='table_head'>
                      <TableCell className='table_head'>Name</TableCell>
                      <TableCell className='table_head'>Is proxy mandatory</TableCell>
                      <TableCell className='table_head'>Residence country required</TableCell>
                      <TableCell className='table_head'>Important	</TableCell>
                      <TableCell className='table_head'>U.S. Individual	</TableCell>
                      <TableCell className='table_head'>Non U.S. Individual	</TableCell>
                      <TableCell className='table_head'>U.S. Business	</TableCell>
                      <TableCell className='table_head' >Non U.S. Business</TableCell>
                      <TableCell className='table_head'>Intermediary</TableCell>
                      <TableCell className='table_head'>Non US Government	</TableCell>
                      <TableCell className='table_head'>Actions</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {CapacitiesData?.capacitiesData?.records?.map((i, ind) => {
                      return (
                        <TableRow>
                          <TableCell style={{ fontWeight: '500' }} className="table_content" scope="row">{i.name}</TableCell>
                          <TableCell>
                            
                          {  i?.isProxyMandatory ?( <DoneIcon style={{fontSize:"28px",fontWeight:"bold",color:"green"}}className="p-0 checkBox"
                           
                          />):""}</TableCell>
                          <TableCell>{ i?.isCountryOfResidenceRequired ?(<DoneIcon style={{fontSize:"28px",fontWeight:"bold",color:"green"}}className="p-0 checkBox" name="isCountryOfResidenceRequired"
                            />):""}</TableCell>


                          <TableCell>
                            
                         { i?.isImportant? ( <DoneIcon style={{fontSize:"28px",fontWeight:"bold",color:"green"}}className="p-0 checkBox" name="isImportant" />):""}
                         
                         </TableCell>


                          <TableCell>
                            
                          {  i?.isUSIndividual ?( <DoneIcon style={{fontSize:"28px",fontWeight:"bold",color:"green"}}className="p-0 checkBox" name="isUSIndividual"
                           />):""}
                           
                           </TableCell>
                          <TableCell>
                           { i?.isNonUSIndividual ?( <DoneIcon style={{fontSize:"28px",fontWeight:"bold",color:"green"}}className="p-0 checkBox" name="isNonUSIndividual"
                           />):""}
                           </TableCell>
                          <TableCell>
                           { i?.isUSBusiness ? (<DoneIcon style={{fontSize:"28px",fontWeight:"bold",color:"green"}}className="p-0 checkBox" name="isUSBusiness"/>):""}
                          </TableCell>
                          <TableCell>
                           { i?.isNonUSBusiness ? (<DoneIcon style={{fontSize:"28px",fontWeight:"bold",color:"green"}} className="p-0 checkBox" name="isNonUSBusiness"
                           
                             />):""}
                             
                             </TableCell>
                          <TableCell>
                          {i?.isIntermediary ? ( <DoneIcon style={{fontSize:"28px",fontWeight:"bold",color:"green"}}className="p-0 checkBox" />):"" }
                           

                           </TableCell>
                          <TableCell>
                            {i?.isNonUSGovernment ? (<DoneIcon style={{fontSize:"28px",fontWeight:"bold",color:"green"}} className="p-0 checkBox" />) : ""}
                          </TableCell>
                          <TableCell>
                            <div className="actionRow" style={{ display: 'flex' }}>
                              <EditIcon style={{ color: "green", fontSize: '20px' }} onClick={() => {
                                history.push(`/capacities_edit/${i.id}`)
                              }} />
                              <DeleteIcon style={{ color: "red", fontSize: '20px', marginLeft: '5px' }} onClick={() => {
                                setOpen(true);
                                setIdData(i.id);
                              }} />
                            </div>
                          </TableCell>

                        </TableRow>
                      )
                    })}


                  </TableBody>
                  {/* </Table> */}

                </table>
                <div style={{ marginTop: '5px' }}>
                  <h5 className='table_content'>Note: Capacities entered here MUST be entered in Administration. If not capacity will appear blank on import.</h5>
                </div>
              </div>


            </form>

            <div className="col-12 my-2">
              <Button size="small" className="btn-cstm mx-1" style={{ float: "right", marginLeft: '5px' }}>Export</Button>
              <Button size="small" onClick={() => {
                history.push("/capacities_info")
              }} className="btn-cstm " style={{ float: "right", }}>Add Capacity</Button>


            </div>
            <Stack spacing={2}>

              {CapacitiesData?.CapacitiesData?.totalPages > 1 ? (
                <Stack style={{ marginTop: "10px" }} spacing={2}>
                  <Pagination
                    count={CapacitiesData?.CapacitiesData?.totalPages}
                    onChange={(e, value) => setPage(value)}
                  />
                </Stack>
              ) : ""}
            </Stack>

          </div>

        </div>
      </div>

      <DialogTransition
        open={open}
        deleteItems={deleteItems}
        setOpen={setOpen}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        deleteApi={deleteCapacities}
        getAllApi={GetAllCapacities}
        closeCallback={() => {
          dispatch(GetAllCapacities(1, 10));
        }}
      />
    </Fragment>
  );
}
