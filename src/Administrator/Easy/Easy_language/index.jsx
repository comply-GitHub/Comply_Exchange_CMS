import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory} from "react-router-dom";
import {
  TextField,
  CardHeader,
  Breadcrumbs,Link,
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

import {
  createEasyTranslations,
  getEasyTranslation,getAllLanguages
} from "../../../redux/Actions";

import "./index.scss";
import { CheckBox } from "@mui/icons-material";

export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  const history=useHistory();
  const idPageData = useSelector((state) => state.getTranslatedEasyReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);

  const [data, setData] = useState({
    toolTip: "",
  easyHelpId: params?.langId,
  languageId: params?.id,
  text: "",
  moreText: "",
  });
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
 
  useEffect(() => {
    if(params.id){
      dispatch(getEasyTranslation(params.id,params.langId,(data)=>{ setData(data)}));
    }
}, [params.id]);
  useEffect(()=>{
    let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
    setData({...data,text:html})
  },[editorState1])

  useEffect(()=>{
    let html = draftToHtml(convertToRaw(editorState2.getCurrentContent()));
    console.log(html,"html1")

    setData({...data,moreText:html})
  },[editorState2])


  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    if (params?.id) {
    dispatch(getAllLanguages())
    dispatch(getEasyTranslation(params.id,params.langId,(data)=>{ setData(data);
    // Component mounted, initialize the editor states
    setEditorState1(
      data?.text
        ? () =>  {
          const blocksFromHTML = convertFromHTML(data?.text)
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          )
          console.log(blocksFromHTML,"blocksFromHTML")
      
          return EditorState.createWithContent(contentState)
        }
        : () => EditorState.createEmpty());
    setEditorState2(data?.moreText
      ? () =>  {
        const blocksFromHTML = convertFromHTML(data?.moreText)
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        console.log(blocksFromHTML,"blocksFromHTML")
    
        return EditorState.createWithContent(contentState)
      }
      : () => EditorState.createEmpty());
    }))
    }else {
      setEditorState1(() => EditorState.createEmpty());
      setEditorState2(() => EditorState.createEmpty());
    }
  }, []);

  const handleEditorStateChange1 = (editorState) => {
    setEditorState1(editorState);
  };

  const handleEditorStateChange2 = (editorState) => {
    setEditorState2(editorState);
  };

  const convertToHtml1 = () => {
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
  const convertToHtml2 = () => {
    const contentState = editorState2.getCurrentContent();
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
      editorState2,
      convertedContentState,
      "insert-characters"
    );
    setEditorState2(convertedEditorState);
  };

  const convertToPlainText2 = () => {
    const contentState = editorState2.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState2(plainTextEditorState);
  };

  const convertToPreview2 = () => {
    const contentState = editorState2.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState2(plainTextEditorState);
  };

  const getLangById=(id)=>{
    
    const result = languageData?.allLanguageData?.filter((item) => {
      if (item.id == params.langId) {
        return item;
      }
    });
    console.log(result)
    if(result?.length){
      return result[0]?.name
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(params,"PARAMS")
    // if(params?.easyId && params?.id){
      const updateData ={
      toolTip: data.toolTip,
      easyHelpId: Number(params?.id),
      languageId:Number(params?.langId),
      text: data.text,
      moreText: data.moreText,
      }
      dispatch(createEasyTranslations(updateData));
      history.push("/easy")
    // }
    // else{
    //   dispatch(createEasyTranslations(data));
    // }
  };

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
                <Link
                   underline="hover"
                   color="#0c62a8"
                   onClick={()=>{
                    history.push("/easy")
                   }}
                  
                >
     Easy Help
                </Link>
                <p
                   underline="hover"
                   color="#000000"
                   
                  
                >
       Easy Help Languages
                </p>
              </Breadcrumbs>
            </div>
              <div className=" row m-1 border p-3 box_style" style={{height:"908px"}}>
                <form onSubmit={(e) => handleSubmit(e)}>
                { <div className="row headingLabel complyColor">{params.id ?" Edit Language" : "Add Language"}</div>}
                  <div>
                    <div className="row">
                      <div className="col-2">
                        <div
                          variant="body2"
                          className="table_content"
                        >
                         Language:
                        </div>
                      </div>
                      <div className="col-10 ">
                        <div
                          variant="body2"
                          className="table_content"
                        >
                          {getLangById(data?.languageId)}
                        </div>

                       
                       
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div
                          variant="body2"
                          className="table_content"
                        >
                         Tool Tip:
                        </div>
                      </div>
                      <div className="col-10">
                        <div
                          variant="body2"
                          className="table_content"
                        ></div>

                        <TextField
                        className="table_content"
                          size="small"
                          name="toolTip"
                          value={data?.toolTip}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-2">
                        <div
                          variant="body2"
                          className="table_content"
                        >
                          Text:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div
                          
                        >
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
                    <div className="row">
                      <div className="col-2">
                        <div
                          variant="body2"
                          className="table_content"
                        >
                          More Text:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div
                        
                        >
                          <Editor
                            editorState={editorState2}
                            onEditorStateChange={(value) => {
                              handleEditorStateChange2(value);
                            }}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
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
                            <button type="button" onClick={convertToHtml2}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPlainText2}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPreview2}>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-2 mt-2">
                        <span
                          variant="body2"
                          className="table_content mt-2"
                        >
                         Prevent bulk translation:
                        </span>
                       
                      </div>
                      <div className="col-10"> <Checkbox /></div>
                    
                  
                    </div>
                  <div className="actionBtn">
                    <Button
                      type="reset"
                      onClick={()=>{
                        history.push("/easy")
                       }}
                      
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1}}
                    >
                      cancel
                    </Button>

                    <Button
                      size="small"
                      type="submit"
                      sx={{ mr: 10}}
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
