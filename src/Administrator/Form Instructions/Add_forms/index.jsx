import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();

  const parentDropDown = useSelector((state) => state.ParentDropDownReducer);

  const [data, setData] = useState({
    name: "",
    translations: "",
    parentId: null,
    displayOnTopMenu: false,
    displayOnFooter: false,
    redirectPageLabelToURL: "",
    menuBackgroundColor: "",
    unselectedTextColor: "",
    selectedTextColor: "",
    displayOnLeftMenu: false,
    pageContent: "",
    summary: "",
  });

 

  const handleChange = (e) => {
    console.log(e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Card>
      <Fragment>
        <ThemeOptions />
        {/* <AppHeader /> */}

        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer" style={{height:'1000px'}}>
          <div className="app-main__inner">
          <div className="row m-1 border p-3 box_style">
          <form>
            <div  >
              <div className="row">
                <div className="col-3" >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 100, color: "black", fontSize: "13px" }}
                  >
                    Description:
                  </Typography>
                </div>
                <div className="col-9">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 100, color: "black", fontSize: "13px" }}
                  ></Typography>

                  <TextField
                    size="small"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <Typography
                    variant="body2"
                    
                    sx={{ fontWeight: 100, color: "black", fontSize: "13px",marginTop:'10px' }}
                  >
                    URL:

                  </Typography>
                </div>
                <div className="col-9">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 100, color: "black", fontSize: "13px" }}
                  ></Typography>

                  <TextField
                 
                  size="small"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    isRequired="true"
                    required
                   
                  />
                </div>
              </div>
           
            </div>

            <div className="container actionBtn">
              <Button
                type="reset"
                size="small"
               
                variant="outlined"
                sx={{ mr: 2 }}
              >
                cancel
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
