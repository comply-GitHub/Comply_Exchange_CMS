import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
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
import { Route, useHistory } from 'react-router-dom'
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
import { CheckBox } from "@mui/icons-material";
import {updateContent} from "../../../redux/Actions";
export default function Language_details(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location  =  useLocation();
  let params = useParams();
 
  const parentDropDown = useSelector((state) => state.ParentDropDownReducer);
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
  let TypeId = 2;
  const [data, setData] = useState({
    id: location.state?.id,
    name: location.state?.name,
    text: "",
  });

  useEffect(() => {
    setEditorState1(EditorState.createEmpty());
    setEditorState2(EditorState.createEmpty());
  }, []);

  const handleEditorStateChange1 = (editorState) => {
    setEditorState1(editorState);
  };
  useEffect(()=>{
   const name =location.state?.name
  },5000[location.state?.name])

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
    let contentData = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
    e.preventDefault();
    let updateData={
      id:location.state?.id,
      name: location.state?.name,
      text: contentData,
    }
    dispatch(updateContent(updateData));
    
  };

  return (
    <Card>
      <Fragment>
        <ThemeOptions />
   

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
                  onClick={()=>{history.Linkush("/agent_edit_list/:id")}}
                  
                  
                >
                  Agent Edit List
                </Link>
                <p
                   underline="hover"
                  color="#000000"
                 
                  
                  
                >
                  Agent Content Edit Form
                </p>
              </Breadcrumbs>
            </div>
              <div className=" row m-1 border p-3 box_style" style={{height:"900px"}}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  {
                    <div className="row headingLabel complyColor">
                     
Content Block
                    </div>
                  }
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
                       

                        <Typography  className="table_content">{location.state?.name}</Typography>
                     
                     
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
