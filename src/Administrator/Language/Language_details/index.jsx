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
} from "@mui/material";

import ThemeOptions from "../../../Layout/ThemeOptions/";
import AppHeader from "../../../Layout/AppHeader/";
import { Fragment } from "react";
import AppSidebar from "../../../Layout/AppSidebar/";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./index.scss";
import { createLanguages, getLanguagesById, updateLanguage } from "../../../redux/Actions";

export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();

  const formData = useSelector((state) => state.getLanguageByIdReducer);

  const [data, setData] = useState(
    params.id
      ? {
          id: params.id,
          name: "",
          isoCode: "",
        }
      : {
          name: "",
          isoCode: "",
        }
  );

  useEffect(()=>{
  setData(formData?.LanguageById)
  if(params.id){
    dispatch(getLanguagesById(params.id),(item)=>{ setData(item)});
  }
},[])

useEffect(()=>{
// setData(formData.LanguageById)
if(params.id){
  dispatch(getLanguagesById(params.id),(data)=>{ setData(data)});
}
console.log(formData.LanguageById
,"LANG DATA")
},[params.id])

  

  const handleChange = (e) => {
    console.log(e.target.value)
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (params?.id) {
      dispatch(updateLanguage(data));
    } else {
      dispatch(createLanguages(data));
    }
    history.push("/languages");
  };


  return (
    <Card>
      <Fragment>
        <ThemeOptions />
        {/* <AppHeader /> */}

        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer" style={{ height: "1000px" }}>
            <div className="app-main__inner">
              <div className=" row m-1 border p-3 box_style">
                <form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
             { <div className="row headingLabel complyColor">{params.id ?" Edit Language" : "Add Language"}</div>}        
                  <div>
                    <div className="row">
                      <div className="col-3">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 100,
                            color: "black",
                            fontSize: "13px",
                          }}
                        >
                          Name:
                        </Typography>
                      </div>
                      <div className="col-9">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 100,
                            color: "black",
                            fontSize: "13px",
                          }}
                        ></Typography>

                        <TextField
                          size="small"
                          name="name"
                          value={data?.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-3">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 100,
                            color: "black",
                            fontSize: "13px",
                            marginTop: "10px",
                          }}
                        >
                          ISO Code:
                        </Typography>
                      </div>
                      <div className="col-9">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 100,
                            color: "black",
                            fontSize: "13px",
                          }}
                        ></Typography>

                        <TextField
                          size="small"
                          name="isoCode"
                          value={data?.isoCode}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="actionBtn">
                    <Button
                      type="reset"
                      size="small"
                      variant="outlined"
                      sx={{ mr: 2 }}
                    >
                      Cancel
                    </Button>

                    <Button
                      size="small"
                      type="submit"
                      sx={{ mr: 2}}
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
