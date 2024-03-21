import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
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
import { getContentById ,updateContent} from "../../../redux/Actions";

export default function Content_details() {
  const dispatch = useDispatch();
  let params = useParams();
  let history= useHistory();

  const formData = useSelector((state) => state.getContentByIdReducer);

  const [data, setData] = useState({
    name: "",
    text: "",
  });
  
  useEffect(() => {
    dispatch(getContentById(params.id,(data)=>{ setData(data)}));
    // Component mounted, initialize the editor states
    setEditorState1( formData?.ContentById?.text
      ? () =>  {
        const blocksFromHTML = convertFromHTML(formData?.ContentById?.text)
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        console.log(blocksFromHTML,"blocksFromHTML")
    
        return EditorState.createWithContent(contentState)
      }
      : () => EditorState.createEmpty());
  }, []);

  useEffect(() => {
    if (params?.id) {
      dispatch(
        getContentById(params?.id, (data) => {
          setData(data);
          if(data?.text){
          setEditorState1(() => {
            const blocksFromHTML = convertFromHTML(data?.text);
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );

            return EditorState.createWithContent(contentState);
          });
        }
        })
      );
    } else {
      setEditorState1(() => EditorState.createEmpty());
    }
  }, [params.id]);

  useEffect(()=>{
    let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
    setData({...data,text:html})
  },[editorState1])

  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());

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
    setEditorState1(convertedEditorState);}
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
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    let contentData = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
    let updateData={
      id: params.id,
      name: data.name,
      text: contentData,
    }
    dispatch(updateContent(updateData));
    history.push("/content")
}



  return (
    <Card>
      <Fragment>
        <ThemeOptions />


        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer">
          <div className="app-main__inner">
          <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                   underline="hover"
                   color="#0c62a8"
                   onClick={()=>{ history.push("/content")}}
                
                  
                  
                >
      Content Block
                </Link>
                <p
                   underline="hover"
                   color="#000000"
                 
                  
                  
                >
      Content Management Details
                </p>
              </Breadcrumbs>
            </div>
          <div className="row m-1 border p-3 box_style"style={{height:"912px"}}>
          <form>
          <div className="row headingLabel complyColor">
                    {params.id ? " Edit Content" : "Add Content"}
                  </div>
            <div  >
              <div className="row">
                <div className="col-1" >
                  <div
                    
                    className="table_content"
                  >
                    Name:
                  </div>
                </div>
                <div className="col-11 table_content">
                

                  <TextField
                   className="table_content"
                   size="small"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-1">
                  <div
                    
                    className="table_content"
                  >
                    Content:
                  </div>
                </div>
                <div className="col-11 editor-div">
                  <div  className="table_content"
                   
                  >
                    <Editor
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      editorState={editorState1}
                      onEditorStateChange={handleEditorStateChange1}
                    />
                <div
                  style={{
                    display: "flex",
                  
                    marginTop: "5px",
                  }}
                >
                  <div>
                    {" "}
                    <button type="button" onClick={convertToHtml1}>
                      HTML
                    </button>
                  </div>
                  <div style={{ marginLeft: "5px" }}>
                    {" "}
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
         
            </div>

            <div className="actionBtn ">
              <Button
                type="reset"
                size="small"
               
                variant="outlined"
                onClick={()=>{history.push("/content")}}
                sx={{ mr: 1 }}
              >
                cancel
              </Button>

              <Button
                size="small"
                type="submit"
               
                sx={{ mr:10 }}
                variant="contained"
                onClick={handleSubmit}
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

