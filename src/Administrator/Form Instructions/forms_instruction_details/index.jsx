import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
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
import {
  createFormInstruction,
  getFormInstructionById,
  updateFormInstruction,
} from "../../../redux/Actions";
import "./index.scss";

export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();

  const formData = useSelector((state) => state.ParentDropDownReducer);

  const [data, setData] = useState({
   description:"",
   url:""
  });

  useEffect(() => {
    if(params.id){
      dispatch(getFormInstructionById(params.id,(data)=>{ setData(data)}));
    }
}, [params.id]); 

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    let createData={
      description:data.description,
      url:data.url
    }
    let updateData={
      description: data.description,
      id: params.id ,
      url: data.url,
    }
 
    if (params?.id) {
      dispatch(updateFormInstruction(updateData));
    } else {
      dispatch(createFormInstruction(createData));
    }
    history.push("/form_instruction");
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
          <form onSubmit={handleSubmit}>
            <div  >
            { <div className="row headingLabel complyColor">{params.id ?" Edit Form_Instruction" : "Add Form_Instruction"}</div>}
              <div className="row">
                <div className="col-3" >
                  <Typography
                    variant="body2"
                   className="table_content"
                  >
                    Description:
                  </Typography>
                </div>
                <div className="col-9">
                

                  <TextField
                    size="small"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-3">
                  <Typography
                    variant="body2"
                    
                    className="table_content"
                  >
                    URL:
                  </Typography>
                </div>
                <div className="col-9">
                  <TextField
                  size="small"
                    name="url"
                    value={data.url}
                    onChange={handleChange}
                    isRequired="true"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="actionBtn">
              <Button
              
                type="reset"
                size="small"
                onClick={()=>{history.push("/form_instruction")}}
                variant="outlined"
                sx={{ mr: 1 }}
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
