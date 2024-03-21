import React, { useEffect, useState ,Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
import Utils from '../../../Utils'

import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import AppFooter from "../../../Layout/AppFooter/";
import ThemeOptions from "../../../Layout/ThemeOptions/";

import {
  TextField,
  CardHeader,
  div,
  CardContent,
  CardActions,
  Card,
  Divider,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {
  createSubPAGES,
  getParentDropDown,
  getPageById,
  updatePAGES,
  getSubPageById
} from "../../../redux/Actions";
import "./index.scss";

export default function Subpage_details() {
  const [formErrors, setFormErrors] = useState({
    name: false,
    redirectPageLabelToURL: false,
    menuBackgroundColor: false,
    content:false,
  });

  const dispatch = useDispatch();
  const history=useHistory();

  const dropDown = useSelector((state) => state.ParentDropDownReducer);
  const idPageData= useSelector((state) => state.pageDataByIdReducer);
  const {pageDataById} = idPageData
  let params = useParams();
  const [isError,setError]=useState({name:false,content:false});
  const [data, setData] = useState(
      {
          name: "",
          translations: "",
          parentId: 0,
          displayOnTopMenu: false,
          displayOnFooter: false,
          redirectPageLabelToURL: "",
          menuBackgroundColor: "",
          unselectedTextColor: "",
          selectedTextColor: "",
          displayOnLeftMenu: false,
          pageContent: "",
          summary: "",
        }
  );

  const[parent,setParent]=useState();

  useEffect(() => {
    if(params.id){
      setData({...data,parentId:params.id})
    }
    dispatch(getSubPageById(3))
    // Component mounted, initialize the editor states
    setEditorState1(EditorState.createEmpty());
    setEditorState2(EditorState.createEmpty());
  }, []);

  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());

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


  const [editorValue1, setEditorValue1] = useState(
    data?.summary
      ? () => {
          const blocksFromHTML = convertFromHTML(data?.summary);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );

          return EditorState.createWithContent(contentState);
        }
      : () => EditorState.createEmpty()
  );
  useEffect(() => {
    setParent(localStorage.getItem("parent"))
    let parents=localStorage.getItem("parent")
      dispatch(getPageById(params.id));
    dispatch(getParentDropDown());
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!convertToRaw(editorState1.getCurrentContent()).blocks.every(b => b.text.trim() === '') && data.name.trim()!==""){
      dispatch(createSubPAGES(data,()=>{history.push(Utils.Pathname.pages);setError({name:false,content:false});}));
    }
    else{
      if(data.name.trim()===""){
        setError({ ...isError, name: true });
      }else
     { setError({ ...isError, content: true });}
    }
  };

  return (
    <Fragment>
    <ThemeOptions />
    {/* <AppHeader /> */}
    <div className="app-main">
      <AppSidebar />
      <div className="app-main__outer">
        <div className="app-main__inner mx-2 my-2">
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
                  Sub Page Details
                </p>
              </Breadcrumbs>
            </div>
      <form onSubmit={(e) => handleSubmit(e)}>
      { <div className="row headingLabel complyColor">{params.id ?" Add Sub Page" : "Edit Sub Page"}</div>}
       
          <div className="row mt-3 mx-2">
            <div className="col-md-3  col-12 ">
              <div   className="table_content">
                Parent:
              </div>
            </div>
            <div className="col-md-9 col-12 selectDiv">
              <Select
               required
             className="input_Field input table_content"
                name={"parentId"}
                value={data?.parentId}
                onChange={handleChange}
              >
                <MenuItem >Select</MenuItem>
                {dropDown?.parentDropDown?.map((type, i) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Name:
              </div>
            </div>
            <div className="col-md-9 col-12 ">
              <div   className="table_content">
              </div>
              <TextField
              className="textFieldClass"
                fullWidth
                required
                name="name"
                value={data?.name}
                onChange={handleChange}
              />
            </div>
            {isError.name ? (<small className="errorClass">This field is mandatory.</small>) : ''}
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Display on top menu:
              </div>
            </div>
            <div className="col-md-9 col-12 ">
              <Checkbox
                name="displayOnTopMenu"
                required
                checked={data?.displayOnTopMenu}
                onClick={(e) => handleToogle(e)}
              />
            </div>
            {formErrors.displayOnTopMenu && (
              <p className="errorClass">displayOnTopMenu.</p>
              )}
            {/* {isError ? (<p className="errorClass">Please select</p>) : ""} */}
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Redirect page label to URL:
              </div>
            </div>
            <div className="col-md-9 col-12 ">
              {/* {isView ? ( */}
              <div   className="table_content">
                {/* {data.name} */}
              </div>
              {/* ) : ( */}
              <TextField
              className="textFieldClass"
                fullWidth
                required
                name="redirectPageLabelToURL"
                // placeholder='Enter Name'
                value={data?.redirectPageLabelToURL}
                onChange={handleChange}
              />
              {/* )} */}
            </div>
            {formErrors.redirectPageLabelToURL && (
              <p className="errorClass">URL is required.</p>
            )}
            {/* {isError ? (<p className="errorClass">Please type2</p>) : ""} */}
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Menu background color:
              </div>
            </div>
            <div className="col-md-9 col-12 ">
              <TextField
              className="textFieldClass"
                fullWidth
                required
                name="menuBackgroundColor"
                // placeholder='Enter Name'
                value={data?.menuBackgroundColor}
                onChange={handleChange}
              />
            </div>
            {formErrors.menuBackgroundColor && (
              <p className="errorClass">Menu background color is required.</p>
              )}
            {/* {isError ? (<p className="errorClass">Please type</p>) : ""} */}
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Unselected text color:
              </div>
            </div>
            <div className="col-md-9 col-12 ">
              <TextField
              className="textFieldClass"
                fullWidth
                name="unselectedTextColor"
                value={data?.unselectedTextColor}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Selected text color:
              </div>
            </div>
            <div className="col-md-9 col-12 ">
              <TextField
              className="textFieldClass"
                fullWidth
                name="selectedTextColor"
                // placeholder='Enter Name'
                value={data?.selectedTextColor}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Display on footer:
              </div>
            </div>
            <div className="col-md-9 col-12 ">
              <Checkbox
                name="displayOnFooter"
                checked={data?.displayOnFooter}
                
                onClick={(e) => handleToogle(e)}

              />
            </div>
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Display on left menu:
              </div>
            </div>
            <div className="col-md-9 col-12 ">
              <Checkbox
                name="displayOnLeftMenu"
                checked={data?.displayOnLeftMenu}
                onClick={(e) => handleToogle(e)}

              />
            </div>
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Content:
              </div>
            </div>
            <div className="col-md-9 col-12 editor-div">
            <div
                        
                        >
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState1}
                            onEditorStateChange={handleEditorStateChange1}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                          
                            marginTop: "3px",
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
                          {isError.content ? (<small className="errorClass">This field is mandatory.</small>) : ''}
            </div>
            {formErrors.content && (
              <p className="errorClass">content is required.</p>
              )}
            {/* {isError ? (<p className="errorClass">Please type</p>) : ""} */}
          </div>
          <div className="row mx-2">
            <div className="col-md-3 col-12 ">
              <div   className="table_content">
                Summary:
              </div>
            </div>
            <div className="col-md-9 col-12 editor-div">
            <div

                        >
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState2}
                            onEditorStateChange={handleEditorStateChange2}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                         
                            marginTop: "3px",
                          }}
                        >
                          <div>
                            {" "}
                            <button type="button" onClick={convertToHtml2}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            {" "}
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
        <div className="actionBtn">
          <Button
            type="reset"
            size="small"
            variant="outlined"
            sx={{ mr:1,my:3 }}
            onClick={()=>{history.push("/pages")}}
          >
            Cancel
          </Button>
          {!params?.id ? (
          <Button
            size="small"
            type="submit"
            sx={{ mr: 2 ,my:3 }}
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>
           )  
           : (
              <Button   size="small"
              type="submit"
              sx={{ mr: 2 ,my:3 }}
              variant="contained"
              >
                Add
              </Button>
            )} 
        </div>
      </form>
      </div>
      
      </div>
    </div>
  </Fragment>
  );
}
