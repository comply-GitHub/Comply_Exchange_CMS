import React, { Fragment, useState, useEffect } from "react";
import { Route } from "react-router-dom";

// Charts
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
// import ChartsSparklines1 from "./Sparklines1/";
// import ChartsSparklines2 from "./Sparklines2/";
// import ChartsChartJs from "./ChartJs/";
// import ChartsGauges from "./Gauges/";
// import ApexCharts from "./ApexCharts/";
import DoneIcon from '@mui/icons-material/Done';

// Layout
import TableRow from "@mui/material/TableRow";

import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
// import AppFooter from "../../../Layout/AppFooter/";

// Theme Options
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
  Breadcrumbs,
  Link,
  Select,
  MenuItem,
  Checkbox,
  Button,
} from "@mui/material";
import ThemeOptions from "../../../Layout/ThemeOptions/";
import { useDispatch, useSelector } from "react-redux";
import { CheckBox } from "@mui/icons-material";
import "./index.scss";
import Pagination from "@mui/material/Pagination";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import Stack from "@mui/material/Stack";
import { getAllLOB, getLOB } from "../../../redux/Actions";
const LOBManagement = ({ match }) => {
  const lobData = useSelector((state) => state.getAllLobReducer);
  const nameData = useSelector((state) => state.getLobReducer);

  const [data, setData] = useState({
    chapter3StatusId: 0,
    isCorporation: false,
    isDisregardedEntity: false,
    isPartnership: false,
    isSimpleTrust: false,
    isGrantorTrust: false,
    isComplexTrust: false,
    isEstate: false,
    isGovernment: false,
    isCentralBankofIssue: false,
    isTaxExemptOrganization: false,
    isPrivateFoundation: false,
    isInternationalOrganization: false,
  });

  const dispatch = useDispatch();
  useState(() => {
    dispatch(getLOB());
    dispatch(getAllLOB());
  }, []);

  const idName = (id) => {
    const result = nameData?.lobName?.filter((item) => {
      if (item.id == id) {
        return item;
      }
    });
    if(result?.length){
      return result[0]?.name;
    }
  };
const row=[]
  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };
const history = useHistory();
const handleSubmit=(e)=>{
e.preventDefault();
}

  return (
    <Fragment>
      <ThemeOptions />
    
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner">
          <div role="presentation" className="bread_crumbs mt-3">
              <Breadcrumbs aria-label="breadcrumb">
                <p
                   underline="hover"
                  color="#000000"
                  
                  
                >
           LOB
                </p>
              </Breadcrumbs>
            </div>
            <form className="m-md-3 " onSubmit={handleSubmit}>
            <div className=" row  card p-2  " style={{overflowX:"auto"}}>
              <div className="col-12 p-0 " style={{ overflow: "auto" }}>
                <table class="table table-hover table-sTableRowiped">
                  <TableHead>
                    <TableRow>
                      <TableCell  className='table_head'  scope="col">LOB Type / Chapter 3 statuses</TableCell>
                      <TableCell   className='table_head'scope="col">Corporation</TableCell>
                      <TableCell  className='table_head' scope="col">Disregarded Entity</TableCell>
                      <TableCell  className='table_head'scope="col">Partnership</TableCell>
                      <TableCell  className='table_head'scope="col">Simple Trust</TableCell>
                      <TableCell  className='table_head'scope="col">Grantor Trust</TableCell>
                      <TableCell  className='table_head'scope="col">Complex Trust</TableCell>
                      <TableCell className='table_head' scope="col">Estate</TableCell>
                      <TableCell  className='table_head' scope="col">Government</TableCell>
                      <TableCell  className='table_head'scope="col">Central Bank of Issue</TableCell>
                      <TableCell  className='table_head'scope="col">Tax Exempt Organization</TableCell>
                      <TableCell  className='table_head'scope="col">Private Foundation</TableCell>
                      <TableCell  className='table_head' scope="col">International Organization</TableCell>
                      <TableCell   className='table_head'scope="col">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <tbody>
                    {lobData?.lobData?.map((i, ind) => {
                      return (
                        <TableRow key={i.id}>
                          <TableCell style={{fontWeight:'450'}}  className="table_content" >{idName(i.chapter3StatusId)}</TableCell>
                          <TableCell>
                            {i?.isCorporation ? (<DoneIcon
                            style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              
                             
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isCorporation
                              //     i.isCorporation
                              //     // : data.isCorporation
                              // }
                             
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isDisregardedEntity ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isDisregardedEntity"
                              onClick={(e) => handleToogle(e)}
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isDisregardedEntity
                              //     i.isDisregardedEntity
                              //     // : data.isDisregardedEntity
                              // }
                             
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isPartnership ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isPartnership"
                             
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isPartnership
                              //     i.isPartnership
                              //     // : data.isPartnership
                              // }
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isSimpleTrust ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isSimpleTrust"
                             
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isSimpleTableRowust
                              //     i.isSimpleTableRowust
                              //     // : data.isSimpleTableRowust
                              // }
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isGrantorTrust ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isGrantorTrust"
                            
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isGrantorTableRowust
                              //     i.isGrantorTableRowust
                              //     // : data.isGrantorTableRowust
                              // }
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isComplexTrust ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isComplexTrust"
                             
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isComplexTableRowust
                              //     i.isComplexTableRowust
                              //     // : data.isComplexTableRowust
                              // }
                            
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isEstate ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isEstate"
                           
                              className="p-0 checkBox"
                              // checked={i.isEstate }
                                // i.isEstate : data.isEstate}
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isGovernment ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isGovernment"
                              
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isGovernment
                              //     i.isGovernment
                              //     // : data.isGovernment
                              // }
                           
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isCentralBankofIssue ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isCentralBankofIssue"
                              
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isCenTableRowalBankofIssue
                              //     i.isCenTableRowalBankofIssue
                              //     // : data.isCenTableRowalBankofIssue
                              // }
                            
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isTaxExemptOrganization ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isTaxExemptOrganization"
                            
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isTaxExemptOrganization
                              //     i.isTaxExemptOrganization
                              //     // : data.isTaxExemptOrganization
                              // }
                            
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isPrivateFoundation ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isPrivateFoundation"
                             
                              className="p-0 checkBox"
                              // checked={
                              //   // i.isPrivateFoundation
                              //     i.isPrivateFoundation
                              //     // : data.isPrivateFoundation
                              // }
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell>
                          {i?.isInternationalOrganization ? (<DoneIcon
                          style={{fontSize:"28px",fontWeight:"bold",color:"green"}}
                              name="isInternationalOrganization"
                              
                              className="p-0 checkBox"
                              
                            />):<Checkbox
                            disabled/>}
                          </TableCell>
                          <TableCell className="actionRow">
                         
                                  <EditIcon style={{ color: "green",fontSize:"20px" }}
                                  onClick={() => {
                                    history.push(
                                      `/lob_details/${i.chapter3StatusId}`
                                    );
                                  }} />
                              
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            </form>
            <div className="actionBtnclass">
              <Button
                size="small"
                className=" btn-cstm mb-1 mx-1"
                style={{ float: "right" }} 
                onClick={() => {
                  history.push(
                    "/lob_add"
                  );
                }}
           
               
              >
                Add Lob
              </Button>
            </div>
          </div>
      
        </div>
      </div>
    </Fragment>
  );
};

export default LOBManagement;
