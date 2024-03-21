import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  TextField,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  Card,
  Divider,
  div,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Breadcrumbs,Link,
  FormControl,
} from "@mui/material";
import ThemeOptions from "../../../Layout/ThemeOptions/";
import AppHeader from "../../../Layout/AppHeader/";
import { Fragment } from "react";
import AppSidebar from "../../../Layout/AppSidebar/";
import "./index.scss";
import { getAllLOB, getLOB, updateLOB } from "../../../redux/Actions";


export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();

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

  useEffect(() => {
    idName();
    dispatch(getLOB());
    dispatch(getAllLOB());
    getLOBData();
  }, []);

  useEffect(() => {
    idName();
  }, [lobData]);

  const idName = () => {
    const result = lobData?.lobData?.filter((item) => {
      if (item.chapter3StatusId == params.id) {
        return item;
      }
    });

    if (result?.length) {
      setData(result[0]);
    }

  };

  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getLOBData = () => {
    const result = lobData?.lobData?.filter((item) => {
      if (item.id == params.id) {
        setData(item);
        return item;
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      chapter3StatusId: data.chapter3StatusId,
      isCentralBankofIssue: data.isCentralBankofIssue,
      isComplexTrust: data.isComplexTrust,
      isCorporation: data.isCorporation,
      isDisregardedEntity: data.isDisregardedEntity,
      isEstate: data.isEstate,
      isGovernment: data.isGovernment,
      isGrantorTrust: data.isGrantorTrust,
      isInternationalOrganization: data.isInternationalOrganization,
      isPartnership: data.isPartnership,
      isPrivateFoundation: data.isPrivateFoundation,
      isSimpleTrust: data.isSimpleTrust,
      isTaxExemptOrganization: data.isTaxExemptOrganization,
    };
    dispatch(updateLOB(payload));
    history.push("/lob");
  };

  return (
    <Card>
      <Fragment>
        <ThemeOptions />
      

        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer" >
            <div className="app-main__inner">
            <div role="presentation" className="bread_crumbs mt-3">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                   underline="hover"
                  color="#0e548c"
                   onClick={()=>{
                    history.push("/lob")
                   }}
                  
                >
           LOB
                </Link>
                <p
                   underline="hover"
                  color="#000000"
                  
                 
                  
                >
           LOB Details
                </p>
              </Breadcrumbs>
            </div>
               
              <div className=" row m-1 border p-3 box_style"style={{ height: "800px" }}>
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                   {
                  <div className="row headingLabel complyColor">
                    {params.id ? " Edit LOB" : "Add LOB"}
                  </div>
                }
                  <div>
                    <div className="row">
                      <div className="col-2">
                        <Typography className="table_content">Document Type:</Typography>
                      </div>
                      <div className="col-10">
                        <FormControl
                          className="w-50"
                          sx={{ minWidth: 120 }}
                          size="small"
                        >
                         {params.id ? ( <Select
                            className="bg-white table_content selectBox"
                            name="chapter3StatusId"
                            value={data.chapter3StatusId}
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            // onChange={handleChange}
                          >
                            <MenuItem value={0} disabled>
                             --Select--
                            </MenuItem>
                            {nameData?.lobName?.map((i, ind) => {
                              return (
                                <MenuItem key={i.id} value={i.id}>
                                  {i.name}
                                </MenuItem>
                              );
                            })}
                          </Select>):
                           <Select
                           className="bg-white table_content selectBox"
                           name="chapter3StatusId"
                           value={data.chapter3StatusId}
                           labelId="demo-select-small-label"
                           id="demo-select-small"
                           onChange={handleChange}
                         >
                           <MenuItem value={0} disabled>
                           ---Select---
                           </MenuItem>
                           {nameData?.lobName?.map((i, ind) => {
                             return (
                               <MenuItem key={i.id} value={i.id}>
                                 {i.name}
                               </MenuItem>
                             );
                           })}
                         </Select>
                          }
                        </FormControl>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Corporation:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isCorporation"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isCorporation}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Disregarded Entity:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isDisregardedEntity"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isDisregardedEntity}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Partnership:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isPartnership"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isPartnership}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Simple Trust:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isSimpleTrust"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isSimpleTrust}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Grantor Trust:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isGrantorTrust"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isGrantorTrust}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Complex Trust:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isComplexTrust"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isComplexTrust}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Estate:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isEstate"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isEstate}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Government:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isGovernment"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isGovernment}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Central Bank of Issue:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isCentralBankofIssue"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isCentralBankofIssue}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          Tax Exempt Organization:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isTaxExemptOrganization"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isTaxExemptOrganization}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                       
                        >
                          Private Foundation:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isPrivateFoundation"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isPrivateFoundation}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                          variant="body2"
                          className="table_content"
                        >
                          International Organization:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox
                          name="isInternationalOrganization"
                          onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          checked={data.isInternationalOrganization}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="actionBtn">
                    <Button
                      type="reset"
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => {
                        history.push(`/lob`);
                      }}
                    >
                      Cancel
                    </Button>

                    <Button
                      size="small"
                      type="submit"
                      sx={{ mr: 2 }}
                      variant="contained"
                     
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </Card>
  );
}
