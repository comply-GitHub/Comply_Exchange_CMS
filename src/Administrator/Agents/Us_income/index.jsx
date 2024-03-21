import React, { Fragment, useState, useEffect } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
// import "bootstrap/dist/css/bootstrap.css";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "../../../reusables/USincome";

import { Select, MenuItem, Checkbox, Button, Link, Input ,Breadcrumbs} from "@mui/material";
import "./index.scss";
// Charts
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import table from "@mui/material/table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
// import ChartsSparklines1 from "./Sparklines1/";
// import ChartsSparklines2 from "./Sparklines2/";
// import ChartsChartJs from "./ChartJs/";
// import ChartsGauges from "./Gauges/";
// import ApexCharts from "./ApexCharts/";

// Layout

import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import AppFooter from "../../../Layout/AppFooter/";
// import EditIcon from '@mui/icons-material/HistoryEdu';
// Theme Options

import ThemeOptions from "../../../Layout/ThemeOptions/";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {
  upsertUSIncomeSource,
  POSTUSIncomeSourceType,
  upsertUSIncomeSourceOnboard,
  postHiddenSourcedUS,
  getAllUSIncomeType,
  getHiddenSourcedUS,
  getAllUSIncomeOnboarded,
} from "../../../redux/Actions";
import { Route, useHistory, useParams ,useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function USIncome({ match }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const [name, setName] = useState('');
  useEffect(() => {
   
    const newName = location.state?.name;

    if (newName) {
      setName(newName);
      localStorage.setItem('name', newName);
    } else {
     
      const storedName = localStorage.getItem('name');
      if (storedName) {
        setName(storedName);
      }
    }
  }, [location.state]);
  const params = useParams();
  const [open, setOpen] = useState("");
  const [open1, setOpen1] = useState(false);
  const [idData, setIdData] = useState(false);
  const handleClickOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [fileData, setFileData] = useState();
  const [agentId, setAgentId] = useState("");


 

  const [getIncomeSteps, setIncomeSteps] = useState([]);
  console.log(getIncomeSteps,"aws")


  const [getHiddenSection, setHiddenSection] = useState([]);
  console.log(getHiddenSection,"awsdcdh")
  const [checkedStatus, setCheckedStatus] = useState({});

  const [checkedStatusHidden,setCheckedStatusHidden] = useState({});

  const tableData = useSelector((state) => state.getSourcedIncomeDataReducer);
  const hiddenIncomeData = useSelector((state) => state.getSourcedIncomeHiddenReducer);
  const onboaredIncomeData = useSelector((state) => state.getSourcedIncomeOnboardedReducer);
  const [data, setData] = useState({
    IncomeCodes:getIncomeSteps,
    HiddenCodes:getHiddenSection

 })
  useEffect(() => {
    dispatch(getAllUSIncomeType(params?.id));
    dispatch(getHiddenSourcedUS(params?.id));
    dispatch(getAllUSIncomeOnboarded(params?.id));

  }, []);



  useEffect(() => {
    setHiddenSection(
      filterHiddenId(hiddenIncomeData?.getHiddenSourceUS)
    );
  }, [hiddenIncomeData]);

  function filterHiddenId(objectsArray) {
    return objectsArray
      ?.filter((obj) => obj?.agentId !== 0)
      ?.map((obj) => obj.incomeTypeId);
  }

  useEffect(() => {
    setIncomeSteps(
      filtercapacityId(onboaredIncomeData?.usIncomeOnboardedData)
    );
  }, [onboaredIncomeData]);

  function filtercapacityId(objectsArray) {
    return objectsArray
      ?.filter((obj) => obj?.agentId !== 0)
      ?.map((obj) => obj.incomeCodeId);
  }

  function handleToggle(clientId, selectedData, setSelectedData) {
    let selectedClients = selectedData;
    const index = selectedClients?.indexOf(clientId);
    if (index >= 0) {
      selectedClients.splice(index, 1);
    } else {
      selectedClients.push(clientId);
    }
   
    setSelectedData(selectedClients);
  }






  const handleSubmit = async (e) => {
    e.preventDefault();


    console.log(data, "1111");

    const updateData = {
      agentId:params?.id,
      existingAgentIncomeCodeIds: getIncomeSteps,
      existingAgentIncomeTypeIds: getHiddenSection,
    };

    setData(updateData);

 
dispatch(POSTUSIncomeSourceType(updateData));


     
   history.push("/agent");
 
  };
      
   
     
  return (
    <Fragment>
      <ThemeOptions />
      {/* <AppHeader /> */}
      <div className="app-main">
        <AppSidebar />
        <div className="app-main__outer">
          <div className="app-main__inner  ">
            <div className=" row ">
              
            </div>

            <form  onSubmit={e => handleSubmit(e)} className=' mx-3 my-2'>
            <div  >


            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                   underline="hover"
                  color="#0e548c"
                  onClick={()=>{history.push("/agent")}}
                >
                  Agents
                </Link>
                <p
                   underline="hover"
                  color="#000000"
                >
                  Agent US Income
                </p>
              </Breadcrumbs>
            </div>
              <div className=" row m-1 border p-3 box_style">
              <div
                className="row headingLabel complyColor"
                
              >
                {name}
              </div>
                <div className="col-12 d-flex overflow-x-auto p-0 ">
                  <table class="table table-hover table-striped">
                    <TableHead>
                      <TableRow>
                        <TableCell  className="table_head">
                          <div>U.S. Sourced Income Question</div>
                        </TableCell>
                        <TableCell  className="table_head">
                          <div>Question Text</div>
                        </TableCell>
                        <TableCell  className="table_head ">
                          <div>State</div>
                        </TableCell>
                        <TableCell  className="table_head">
                          <div>
                            U.S. Sourced Income Question Display Alias
                          </div>
                        </TableCell>
                        <TableCell  className="table_head">
                          <div>Question Text Display Alias</div>
                        </TableCell>
                        {/* <TableCell align="right" className="table_head">
                          <div>Action</div>
                        </TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {tableData?.usIncomeTypeData?.map((row) => {
                        return (
                          <TableRow>
                            <TableCell>
                              <div>
                                <div className="table_content">
                                  {row?.usSourcedIncomeQuestion}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="d-flex">
                                <div className="table_content">
                                  {row.questionText}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell align="left">
                              <div className="d-flex ">
                                <span className="table_content d-flex">
                                <EditIcon
                                  style={{
                                    color: "green",
                                    fontSize: "19px",
                                    cursor:"pointer"
                                  }}
                                  onClick={() => {
                                    setOpen1(true);
                                    setIdData(row)
                                    setAgentId(params?.id)
                                  }}
                                />
                                    
                                   {row?.state ? "Normal" : "Hidden"}
                                  
                                 
                               
                                 
                                </span>
                              </div>
                            </TableCell>
                            <TableCell align="center">
                              <div className="d-flex mx-4">
                                <div className="table_content">
                                  {row?.usSourcedIncomeQuestionAlias}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="d-flex">
                                <div className="table_content">
                                  {row?.questionTextAlias}
                                </div>
                              </div>
                            </TableCell>
                            {/* <TableCell>
                        {console.log(row,"hiddenIncomeData?.getHiddenSourceUS")}

                              <div className="d-flex">
                                <EditIcon
                                  style={{
                                    color: "green",
                                    fontSize: "19px",
                                  }}
                                  onClick={() => {
                                    setOpen1(true);
                                    setIdData(row?.usSourcedIncomeTypeId ? row?.usSourcedIncomeTypeId : 0)
                                    setAgentId(params?.id)
                                  }}
                                />
                              </div>
                            </TableCell> */}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </table>
                </div>

                <div className="col-12 p-0 ">
                  <div
                    className="row headingLabel complyColor"
                    
                  >
                 Hidden Income Codes (check to remove from drop down selections):
                  </div> 
                  <div className="maxdiv mt-2" style={{ height: "300px" }}>
                    <table class="table table-hover table-striped">
                      <TableBody>
                      {onboaredIncomeData?.usIncomeOnboardedData?.map((i,index) => {
                        return (
                        <TableRow  key={i.incomeCodeId}>
                        
                          <TableCell className="d-flex">
                          <span>
                          <Checkbox

                                    className="mx-1"
                                    defaultChecked={i.agentId == params.id}
                                    onClick={() => handleToggle(i.incomeCodeId, getIncomeSteps, setIncomeSteps)}
                                 
                                  />
                            <span className="mx-1 table_content">
                              {i.name}
                            </span>
                            </span>
                           
                          </TableCell>
                        </TableRow>
                        )})}
                      </TableBody>
                    </table>
                  </div>
                </div>
                <div className="col-12 mt-3 p-0">
                  <div
                    className="row headingLabel complyColor"
                    
                  >
                 Hidden Income Type (check to remove from drop down selections):
                  </div>
                  <div className="maxdiv mt-2" style={{ height: "300px" }}>
                    <table class="table table-hover table-striped tableField">
                      <TableBody className="tableField">
                      {hiddenIncomeData?.getHiddenSourceUS?.map((i, ind) => {
                            return (
                        <TableRow key={i.incomeTypeId}>
                          <TableCell className="d-flex ">
                            <span>
                          <Checkbox
                         
                         className="mx-1"
                         onClick={() =>handleToggle(i.incomeTypeId,getHiddenSection, setHiddenSection)}
                         defaultChecked={i.agentId == params.id}
                                  />
                            <span className="mx-1 table_content">
                              {i.name}
                            </span>
                            </span>
                          </TableCell>
                        </TableRow>
                         )})}
                      </TableBody>
                    </table>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  className="btn-cstm  mt-2 mb-3"
                  style={{ float: "right" }}
                  onClick={()=>{history.push("/agent")}}
                >
                  Back
                </Button>
                <Button
                  size="small"
                  type="submit"
                  className="btn-cstm mt-2 mb-3 mx-3"
                  style={{ float: "right" }}
                >
                  Save Hidden Income Code / Income Type
                </Button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        open={open1}
        idData={idData}
        agentId={params?.id}
        setOpen={setOpen1}
        handleClickOpen={handleClickOpen1}
        handleClose={handleClose1}
      />
    </Fragment>
  );
}

export default USIncome;
