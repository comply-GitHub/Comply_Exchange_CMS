import * as React from "react";
import { TextField, div, Card, Checkbox, Button,Breadcrumbs,Link } from "@mui/material";
import { Fragment } from "react";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import ThemeOptions from "../../../Layout/ThemeOptions/";
import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import { Editor } from "react-draft-wysiwyg";
import Input from "@mui/material/Input";
import "./index.scss";
import { useParams,useHistory } from "react-router-dom";

export default function Edit() {
  let history= useHistory();
  return (
    <Card>
      <Fragment>
        <ThemeOptions />
        {/* <AppHeader /> */}

        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
            <div className="app-main__inner">
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
              <Link underline="hover" color="#0c62a8" onClick={()=>{
                history.push("/glossaries")
              }}>
        Glossaries
        </Link>
                <Link
                   underline="hover"
                   color="#0c62a8"   onClick={()=>{
                    history.push("/glossaries_form")
                  }}
                  
                  
                >
       Glossaries Forms
                </Link>
                <p
                   underline="hover"
                 
                   color="#000000"
                   
                   
                  
                >
       Glossaries Details
                </p>
              </Breadcrumbs>
            </div>
              <div className="row m-1 border p-3 box_style">
                <form>
                  <div className="row headingLabel complyColor">
                    Glossary entry
                  </div>
                  <div>
                  <div className="row ">
                      <div className="col-2">
                        <div
                         className="table_content"
                        >
                          Term:
                        </div>
                      </div>
                      <div className="col-10">
                        <div
                         className="table_content"
                        ></div>

                        <TextField
                          size="small"
                          name="code"
                
                        />
                      </div>
                    </div>

                    <div className="row mt-2 ">
                      <div className="col-2">
                        <div
                          className="table_content"
                        >
                          Definition:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div>
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                          />
                        <div
                          style={{
                            display: "flex",
                            // justifyContent: "end",
                            marginTop: "5px",
                          }}
                        >
                          <div>
                            {" "}
                            <button type="button">HTML</button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            {" "}
                            <button type="button">Text</button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button">Preview</button>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  
                        <div className="row ">
                      <div className="col-2 mt-3">
                        <div
                         className="table_content"
                        >
                          Prevent bulk translation:
                        </div>
                      </div>
                      <div className="col-10">
                        <div
                         className="table_content"
                        ></div>

<Checkbox name="IsDisabled"/>
                      </div>
                    </div>
                       
                  

                    <div className="actionBtn">
                    <Button
                      type="reset"
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1}}
                      onClick={()=>{
                        history.push("/glossaries")
                      }}
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
