import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Utils from "../../../Utils";

import AppHeader from "../../../Layout/AppHeader/";
import AppSidebar from "../../../Layout/AppSidebar/";
import AppFooter from "../../../Layout/AppFooter/";
import ThemeOptions from "../../../Layout/ThemeOptions/";

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
  createPAGES,
  getParentDropDown,
  getPageById,
  updatePAGES,
  getSubPageById,
} from "../../../redux/Actions";
import "./index.scss";
import { error } from "jquery";

export default function Pages_details() {
  const dispatch = useDispatch();
  const history = useHistory();

  const dropDown = useSelector((state) => state.ParentDropDownReducer);
  const idPageData = useSelector((state) => state.pageDataByIdReducer);
  let params = useParams();
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [isError,setError]=useState({name:false,content:false});
  const [data, setData] = useState(
    params.id
      ? {
          id: params.id,
          name: "",
          parent: null,
          // displayOnTopMenu: false,
          displayOnFooter: false,
          redirectPageLabelToURL: "",
          // menuBackgroundColor: "",
          // unselectedTextColor: "",
          // selectedTextColor: "",
          // displayOnLeftMenu: false,
          pageContent: "",
          summary: "",
        }
      : {
          name: "",
          parentId: 0,
          // displayOnTopMenu: false,
          displayOnFooter: false,
          redirectPageLabelToURL: "",
          // menuBackgroundColor: "",
          // unselectedTextColor: "",
          // selectedTextColor: "",
          // displayOnLeftMenu: false,
          pageContent: "",
          summary: "",
        }
  );
  const [parent, setParent] = useState();

  useEffect(() => {
    const plainText = data?.pageContent;
    // Component mounted, initialize the editor states
    setEditorState1(
      idPageData?.pageDataById?.pageContent
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.pageDataById?.pageContent
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            console.log(blocksFromHTML, "blocksFromHTML");

            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );

    setEditorState2(
      idPageData?.pageDataById?.summary
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.pageDataById?.summary
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            console.log(blocksFromHTML, "blocksFromHTML");

            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
  }, [idPageData]);

  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());

  const handleEditorStateChange1 = (editorState) => {
    setEditorState1(editorState);
  };

  const handleEditorStateChange2 = (editorState) => {
    setEditorState2(editorState);
  };

  const handleHtml1 = () => {
    let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
    setData({ ...data, pageContent: html });
    setClick(!click);
  };
  const handleHtml2 = () => {
    setClick1(!click1);
  };

  useEffect(() => {
    if (click === true) {
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
  }, [click]);

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

  useEffect(() => {
    if (click1 === true) {
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
    }
  }, [click1]);
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
    setParent(localStorage.getItem("parent"));
    let parents = localStorage.getItem("parent");
    dispatch(getParentDropDown());
  }, []);
  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
    setData({ ...data, pageContent: html });
  }, [editorState1]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState2.getCurrentContent()));
    console.log(html, "html1");

    setData({ ...data, summary: html });
  }, [editorState2]);

//GET By ID UseEffect

  useEffect(() => {
    if (params.id) {
      dispatch(
        getPageById(params.id, (data) => {
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!convertToRaw(editorState1.getCurrentContent()).blocks.every(b => b.text.trim() === '') && data.name.trim()!==""){
      let createData = {
        name: data.name,
        // translations: "",
        parentId: data.parentId,
        // displayOnTopMenu: data.displayOnTopMenu,
        displayOnFooter: data.displayOnFooter,
        redirectPageLabelToURL: data.redirectPageLabelToURL,
        // menuBackgroundColor: data.menuBackgroundColor,
        // unselectedTextColor: data.unselectedTextColor,
        // selectedTextColor: data.selectedTextColor,
        // displayOnLeftMenu: data.displayOnLeftMenu,
        pageContent: data.pageContent,
        summary: data.summary,
      };
     
  
      if (params?.id) {
        let updateData = {
          name: data.name,
          // translations: "",
          id: params.id,
          // parentId: data.parentId,
          // displayOnTopMenu: data.displayOnTopMenu,
          displayOnFooter: data.displayOnFooter,
          redirectPageLabelToURL: data.redirectPageLabelToURL,
          // menuBackgroundColor: data.menuBackgroundColor,
          // unselectedTextColor: data.unselectedTextColor,
          // selectedTextColor: data.selectedTextColor,
          // displayOnLeftMenu: data.displayOnLeftMenu,
          pageContent: data.pageContent,
          summary: data.summary,
        };
        dispatch(updatePAGES(updateData));
      } else {
        dispatch(createPAGES(createData));
      }
      setError({name:false,content:false});
      history.push(Utils.Pathname.pages);
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
                <Link underline="hover" color="#0e548c"  onClick={() => history.push("/pages")}>
                  Pages
                </Link>
                <p  color="#000000">
                  Page Details
                </p>
              </Breadcrumbs>
            </div>
            <form className="pb-3" onSubmit={(e) => handleSubmit(e)}>
              {
                <div className="row headingLabel complyColor">
                  {params.id ? " Edit Page" : "Add Page"}
                </div>
              }

              <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">Name<span className="errorClass">*</span>:</div>
                </div>
                <div className="col-10">
                  <TextField
                    className="textFieldClass"
                    fullWidth
                    
                    name="name"
                    value={data?.name}
                    onChange={handleChange}
                  />
                {isError.name ? (<small className="errorClass">This field is mandatory.</small>) : ''}
                </div>
              </div>
              {/* <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">Display on top menu:</div>
                </div>
                <div className="col-10">
                  <Checkbox
                    className="complyColor"
                    name="displayOnTopMenu"
                    checked={data?.displayOnTopMenu}
                    onClick={(e) => handleToogle(e)}
                  />
                </div>
              </div> */}
              <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">
                    Redirect page label to URL:
                  </div>
                </div>
                <div className="col-10">
                  <div className="table_content"></div>

                  <TextField
                    className="textFieldClass"
                    fullWidth
                    name="redirectPageLabelToURL"
                    value={data?.redirectPageLabelToURL}
                    onChange={handleChange}
                  />
                  {/* )} */}
                </div>
              </div>
              {/* <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">Menu background color:</div>
                </div>
                <div className="col-10">
                  <TextField
                    className="textFieldClass"
                    fullWidth
                    name="menuBackgroundColor"
                    // placeholder='Enter Name'
                    value={data?.menuBackgroundColor}
                    onChange={handleChange}
                  />
                </div>
              </div> */}
              {/* <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">Unselected text color:</div>
                </div>
                <div className="col-10">
                  <TextField
                    className="textFieldClass"
                    fullWidth
                    name="unselectedTextColor"
                    value={data?.unselectedTextColor}
                    onChange={handleChange}
                  />
                </div>
              </div> */}
              {/* <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">Selected text color:</div>
                </div>
                <div className="col-10">
                  <TextField
                    className="textFieldClass"
                    fullWidth
                    name="selectedTextColor"
                    // placeholder='Enter Name'
                    value={data?.selectedTextColor}
                    onChange={handleChange}
                  />
                </div>
              </div> */}
              <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">Display on footer:</div>
                </div>
                <div className="col-10">
                  <Checkbox
                    className="complyColor"
                    name="displayOnFooter"
                    checked={data?.displayOnFooter}
                    onClick={(e) => handleToogle(e)}
                  />
                </div>
              </div>
              {/* <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">Display on left menu:</div>
                </div>
                <div className="col-10">
                  <Checkbox
                    className="complyColor"
                    name="displayOnLeftMenu"
                    checked={data?.displayOnLeftMenu}
                    onClick={(e) => handleToogle(e)}
                  />
                </div>
              </div> */}
              <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">Content<span className="errorClass">*</span>:</div>
                </div>
                <div className="col-10 editor-div">
                  <div>
                    <Editor
                      
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      editorState={editorState1}
                      onEditorStateChange={handleEditorStateChange1}
                    />
                    <div
                      style={{
                        width: "85%",
                        display: "flex",

                        marginTop: "3px",
                      }}
                    >
                      <div>
                        {" "}
                        <button type="button" onClick={handleHtml1}>
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
               {isError.content ? (<small className="errorClass">This field is mandatory.</small>) : ''}
                </div>
              </div>
              <div className="row mx-2">
                <div className="col-2">
                  <div className="table_content">Summary:</div>
                </div>
                <div className="col-10 editor-div">
                  <div>
                    <Editor
                      
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="toolbar-class"
                      editorState={editorState2}
                      onEditorStateChange={handleEditorStateChange2}
                    />
                    <div
                      style={{
                        width: "85%",
                        display: "flex",
                        // justifyContent: "end",
                        marginTop: "3px",
                      }}
                    >
                      <div>
                        {" "}
                        <button type="button" onClick={handleHtml2}>
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
                  <div className="actionBtn">
                    {/* <Button
                      type="reset"
                      size="small"
                      variant="outlined"
                    
                      className="mx-1"
                      onClick={() => history.push("/pages")}
                    >
                      Cancel
                    </Button> */}
                            <Button
                             onClick={() => history.push("/pages")}
                            className="Cancel"
                        type='reset'
                        size='small'
                        variant='outlined'
                        sx={{ mr: 1 }}
                      >
                        Cancel
                      </Button>
                    {!params?.id ? (
                      <Button
                        className="mx-1"
                        size="small"
                        type="submit"
                        variant="contained"
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        className="mx-1"
                        sx={{ mx: 1 }}
                        size="small"
                        type="submit"
                        variant="contained"
                      >
                        Update
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
