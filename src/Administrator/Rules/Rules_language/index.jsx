import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
import {
  TextField,
  CardHeader,
  Typography,
  CardContent,
  CardActions,
  Breadcrumbs,Link,
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
import { CheckBox } from "@mui/icons-material";
import {getRuleTranslation,getAllLanguages,createRuleTranslations} from "../../../redux/Actions"

export default function Language_details() {
const dispatch = useDispatch();
let params = useParams();
const history=useHistory();
const idPageData = useSelector((state) => state.getRulesTranslationReducer);
const languageData = useSelector((state) => state.LanguagesReducer);

const [data, setData] = useState({
  warning: "",
  rulesId: params?.id,
  languageId: params?.langId,
  bulkTranslation: false,
});
const [editorState1, setEditorState1] = useState(EditorState.createEmpty());

useEffect(() => {
  if(params.id){
    dispatch(getRuleTranslation(params.id,params.langId,(data)=>{ setData(data)}));
  }
}, [params.id]);
useEffect(()=>{
  let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
  setData({...data,warning:html})
},[editorState1])




const handleToogle = (e) => {
  setData({ ...data, [e.target.name]: e.target.checked });
};

useEffect(() => {

  dispatch(getAllLanguages())
  // Component mounted, initialize the editor states
  setEditorState1(
    idPageData?.ruleTranslationData?.warning
      ? () =>  {
        const blocksFromHTML = convertFromHTML(idPageData?.ruleTranslationData?.warning)
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


useEffect(() => {
  if (params.id) {
    dispatch(
      getRuleTranslation(params.id,params.langId ,(data) => {
        setData(data);
        if(data?.warning){
        setEditorState1(() => {
          const blocksFromHTML = convertFromHTML(data?.warning);
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
const handleSubmit = async (e) => {
  e.preventDefault();
  let updateData={
    warning: data.warning,
    rulesId: params?.id,
    languageId: params?.langId,
    bulkTranslation: data.bulkTranslation,
  }
  dispatch(createRuleTranslations(updateData));
  history.push("/rules")
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
                    history.push("/rules")
                   }}
                 
                  
                >
                  Rules 
                </Link>
                <p
                   underline="hover"
                   color="#000000"
                   
                 
                  
                >
                  Rules Languages
                </p>
              </Breadcrumbs>
            </div>
              <div className=" row m-1 border p-3 box_style">
                <form onSubmit={(e) => handleSubmit(e)}>
                { <div className="row headingLabel complyColor">{params.id ?" Edit Languages" : "Add Languages"}</div>}
                  <div>
                    <div className="row">
                      <div className="col-2">
                        <Typography
                         
                          className="table_content"
                        >
                         Language:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Typography
                         
                          className="table_content"
                        >{getLangById(data?.languageId)}</Typography>

                        {/* <TextField
                          size="small"
                          name="Name"
                          value={data?.Name}
                          onChange={handleChange}
                        /> */}
                      </div>
                    </div>
                   

                    <div className="row">
                      <div className="col-2">
                        <Typography
                         
                          className="table_content"
                        >
                          Warning:
                        </Typography>
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
                        <Typography
                         
                          sx={{
                            fontWeight: 100,
                            color: "black",
                           fontSize: "13px",
                            marginTop: "10px",
                          }}
                        >
                         Prevent bulk translation:
                        </Typography>
                      </div>
                      <div className="col-10">
                        <Checkbox name="bulkTranslation" defaultChecked={idPageData?.ruleTranslationData?.bulkTranslation} onClick={handleToogle}/>
                      </div>
                    </div>
                  <div className="actionBtn">
                    <Button
                      type="reset"
                      size="small"
                      variant="outlined"
                      sx={{ mr: 1}}
                      onClick={()=>{
                        history.push("/rules")
                       }}
                    >
                      cancel
                    </Button>

                    <Button
                      size="small"
                      type="submit"
                      
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
