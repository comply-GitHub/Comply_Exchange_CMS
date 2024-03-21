import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  TextField,
  CardHeader,
  div,
  CardContent,
  CardActions,
  Card,
  Divider,
  Breadcrumbs,Link,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Typography,
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
import { Route, useHistory } from 'react-router-dom'

import "./index.scss";
import { CheckBox } from "@mui/icons-material";

export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory()

  const parentDropDown = useSelector((state) => state.ParentDropDownReducer);
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
  let TypeId = 2;
  const [data, setData] = useState(
    TypeId === 2
      ? {
          Name: "",
          Text: JSON.stringify(editorState1),
          MoreText: JSON.stringify(editorState2),

          ToolTip: "",
          TypeId: 2,
        }
      : {
          Language: "",
          Translation: "",
        }
  );

  useEffect(() => {
    setEditorState1(EditorState.createEmpty());
    setEditorState2(EditorState.createEmpty());
  }, []);

  const handleEditorStateChange1 = (editorState) => {
    setEditorState1(editorState);
  };

  const convertToHtml1 = () => {
    if (editorState1.getCurrentContent().hasText() && editorState1.getCurrentContent().getPlainText() !== ' ') {
      const contentState = editorState1.getCurrentContent();
      const html = draftToHtml(convertToRaw(contentState));
      const convertedContentState = convertFromRaw({
        entityMap: {},
        blocks: [
          {
            key: "converted",
            text: html,
            type: "unstyled",
            depth: 0,
            inlineStyleRanges: [],
            entityRanges: [],
            data: {},
          },
        ],
      });
      const convertedEditorState = EditorState.push(
        editorState1,
        convertedContentState,
        "insert-characters"
      );
      setEditorState1(convertedEditorState);
    }
  };
  const convertToPlainText1 = () => {
    const contentState = editorState1.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState1(plainTextEditorState);
  };

  const convertToPreview1 = () => {
    const contentState = editorState1.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState1(plainTextEditorState);
  };

  const handleChange = (e) => {
    console.log(e.target.value, "value");
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Card>
      <Fragment>
        <ThemeOptions />
        {/* <AppHeader /> */}

        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
            <div className="app-main__inner" >
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                   underline="hover"
                  color="#0e548c"
                  onClick={()=>{history.push("/agent")}}
                  
                >
                  Agents 
                </Link>
                <Link
                   underline="hover"
                  color="#0e548c"
                  onClick={()=>{history.push("/agent_edit_list/:id")}}
                  
                  
                >
                  Agent Edit List
                </Link>
                <p
                   underline="hover"
                  color="#000000"
                 
                  
                  
                >
                  Agent Content Block Form
                </p>
              </Breadcrumbs>
            </div>
              <div className=" row m-1 border p-3 box_style" style={{height:"900px"}}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  {/* {
                    <div className="row headingLabel complyColor">
                     
content block
                    </div>
                  } */}
                  <div>
                    <div className="row">
                      <div className="col-1">
                        <div
                          variant="body2"
                         className="table_content"
                        >
                         Name:
                        </div>
                      </div>
                      <div className="col-11 px-4">
                       

                      <TextField
                   className="table_content"
                   size="small"
                    name="name"
                   
                  />
                     
                     
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-1">
                        <div
                          variant="body2"
                         className="table_content"
                        >
                          Content:
                        </div>
                      </div>
                      <div className="col-11 px-4 editor-div">
                        <div>
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState1}
                            onEditorStateChange={(value) => {
                              handleEditorStateChange1(value);
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            // justifyContent: "end",
                            marginTop: "3px",
                          }}
                        >
                          <div>
                            <button type="button" onClick={convertToHtml1}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPlainText1}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPreview1}>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                    <div className="actionBtn">
                      <Button
                       onClick={()=>{history.push("/agent")}}
                        type="reset"
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1 }}
                      >
                        cancel
                      </Button>

                      <Button  sx={{ mr:10 }} size="small" type="submit" variant="contained">
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
