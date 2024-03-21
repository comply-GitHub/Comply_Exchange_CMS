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
// import { useEffectOnce } from "../../../../src/Translator/UseEffectOne.jsx";


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
          <div className=" row mx-2">
          <form>
            <div  >
              <div className="row">
                <div className="col-3" >
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800, color: "black",fontSize:"17px" , }}
                  >
                    Phrase:
                  </Typography>
                </div>
                <div className="col-9">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800, color: "black",fontSize:"17px" }}
                  ></Typography>

                  <TextField
                  style={{width:'90%'}}
                   
                   
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
              <div className="row">
                <div className="col-3">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800, color: "black",fontSize:"17px",marginTop:'10px' }}
                  >
                   Language:
                  </Typography>
                </div>
                <div className="col-9">
                <Button style={{ border:"1px solid lightgrey"}}size='medium' height="10px" id="google_translate_element" ></Button>
                </div>
              </div>
             
              </div>
              <div className="row">
                <div className="col-3">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800, color: "black",fontSize:"17px",marginTop:'10px' }}
                  >
                   Translation:
                  </Typography>
                </div>
                <div className="col-9">
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 800, color: "black",fontSize:"17px" }}
                  ></Typography>

                  <TextField
                   style={{width:'90%'}}
                 
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
           
            </div>

            <div className="container actionBtn">
              <Button
                type="reset"
                size="medium"
               
                variant="outlined"
                sx={{ mr: 2 }}
              >
                cancel
              </Button>

              <Button
                size="medium"
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
