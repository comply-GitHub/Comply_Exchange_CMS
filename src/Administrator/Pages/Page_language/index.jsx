import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams ,useHistory} from "react-router-dom";
import {
  TextField,
  CardHeader,
  CardContent,
  CardActions,
  Card,
  Divider,
  div,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Breadcrumbs,
  Link,
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
  getPageTranslation,
  createPAGESTranslations,getAllLanguages
} from "../../../redux/Actions";

import "./index.scss";
import { CheckBox } from "@mui/icons-material";

export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  const history=useHistory();
  const idPageData = useSelector((state) => state.getTranslatedPageReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);

  const [data, setData] = useState({
    name: "",
    pageId: params?.id,
    languageId: params?.langId,
    pageContent: "",
    summary: "",
  });
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
 
  useEffect(() => {
    if(params.id){
      dispatch(getPageTranslation(params.id,params.langId,(data)=>{ setData(data)}));
    }
     if (params.id) {
      dispatch(
        getPageTranslation(params.id,params.langId, (data) => {
          setData(data);
          setEditorState1(() => {
            const blocksFromHTML = convertFromHTML(data?.pageContent);
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );

            return EditorState.createWithContent(contentState);
          });
          setEditorState2(() => {
            const blocksFromHTML = convertFromHTML(data?.summary);
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          });
        })
      );
    } else {
      setEditorState1(() => EditorState.createEmpty());
      setEditorState2(() => EditorState.createEmpty());
    }
}, [params.id]);

useEffect(() => {
  let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
  setData({ ...data, pageContent: html });
}, [editorState1]);

  useEffect(()=>{
    let html = draftToHtml(convertToRaw(editorState2.getCurrentContent()));
    console.log(html,"html1")

    setData({...data,summary:html})
  },[editorState2])


  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  useEffect(() => {

    dispatch(getAllLanguages())
    // Component mounted, initialize the editor states
    setEditorState1(
      idPageData?.pageTranslationData?.pageContent
        ? () =>  {
          const blocksFromHTML = convertFromHTML(idPageData?.pageTranslationData?.pageContent)
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          )
          console.log(blocksFromHTML,"blocksFromHTML")
      
          return EditorState.createWithContent(contentState)
        }
        : () => EditorState.createEmpty());
    setEditorState2(idPageData?.pageTranslationData?.summary
      ? () =>  {
        const blocksFromHTML = convertFromHTML(idPageData?.pageTranslationData?.summary)
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
        console.log(blocksFromHTML,"blocksFromHTML")
    
        return EditorState.createWithContent(contentState)
      }
      : () => EditorState.createEmpty());
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
    if(result?.length){
      return result[0]?.name
    }
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedData={
    name: data.name,
    pageId: params?.id,
    languageId: params?.langId,
    pageContent: data.pageContent,
    summary: data.summary,
    }
    if(data.name !==""){
      dispatch(createPAGESTranslations(updatedData));
      history.push("/pages")
    }
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
                  color="#0e548c"

                
                  onClick={() => history.push("/pages")}
                >
                  Pages
                </Link>
                <p
                  underline="hover"
                  color="#000000"

                 
                >
                   Page Languages
                </p>
              </Breadcrumbs>
            </div>
              <div className=" row  card mx-2 my-2" style={{height:'900px'}}>
                <form onSubmit={(e) => handleSubmit(e)}>
                  {
                    <div className="row headingLabel complyColor">
                      {params.id ? " Edit Language" : "Add Language"}
                    </div>
                  }
                  <div>
                    <div className="row">
                      <div className="col-2">
                        <div
                      
                        className="table_content"
                        >
                          Language:
                        </div>
                      </div>
                      <div className="col-10 table_content">
                      
                       {getLangById(data?.languageId)}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2 d-flex">
                        <div
                        
                      
                          className="table_content my-auto"
                        >
                          Name:
                        </div>
                      </div>
                      <div className="col-10 table_content">
                     

                        <TextField
                        required
                        className=""
                          size="small"
                          name="name"
                          value={data?.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row ">
                      <div className="col-2">
                        <div
                      
                        className="table_content"
                        >
                          Content:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
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
                    <div className="row">
                      <div className="col-2">
                        <div
                      
                        className="table_content"
                        >
                          Summary:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div>
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
                      <div className="col-2">
                        <div
                      
                          className="table_content mt-2"
                        >
                          Prevent bulk translation:
                        </div>
                      </div>
                       <div className="col-10" >
                       <Checkbox />
                       </div>
                     
                    </div>
                    <div className="actionBtnclass">
                      <Button
                        type="reset"
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1 }}
                        onClick={()=>{ history.push("/pages")}}
                      >
                        Cancel
                      </Button>

                      <Button  sx={{ mr: 5 }}size="small" type="submit" variant="contained">
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
