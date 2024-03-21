import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  TextField,
  CardHeader,
  div,
  CardContent,
  CardActions,
  Card,
  Divider,
  Breadcrumbs,
  Link,
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
import {
  createContentTranslations,
  getAllLanguages,
  getContentTranslation,
} from "../../../redux/Actions";

export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  let history = useHistory();
  const languageData = useSelector((state) => state.LanguagesReducer);
  const idPageData = useSelector((state) => state.getContentTranslationReducer);
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
  const [data, setData] = useState({
    languageId: params?.langId,
    contentBlockId: params?.id,
    content: "",
    bulkTranslation: false,
  });

  const getLangById = (id) => {
    const result = languageData?.allLanguageData?.filter((item) => {
      if (item.id == params.langId) {
        return item;
      }
    });
    console.log(result, "RESUT", params.langId);
    if (result?.length) {
      return result[0]?.name;
    }
  };

  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    if (params?.id) {
      getContentTranslation(params?.id, params.langId, (data) => setData(data));
    }
    dispatch(getAllLanguages());
    // Component mounted, initialize the editor states
    setEditorState1(
      idPageData?.contentTranslationData?.content
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.contentTranslationData?.content
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
  }, []);

  const handleEditorStateChange1 = (editorState) => {
    setEditorState1(editorState);
  };
  useEffect(() => {
    if (params?.id) {
      dispatch(
        getContentTranslation(params.id, params.langId, (data) => {
          setData(data);
          if (data?.content) {
            setEditorState1(() => {
              const blocksFromHTML = convertFromHTML(data?.content);
              const contentState = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
              );
              return EditorState.createWithContent(contentState);
            });
          } else setEditorState1(() => EditorState.createEmpty());
        })
      );
    } else {
      setEditorState1(() => EditorState.createEmpty());
    }
  }, [params?.id]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
    setData({ ...data, content: html });
  }, [editorState1]);

  const convertToHtml1 = () => {
    if (
      editorState1.getCurrentContent().hasText() &&
      editorState1.getCurrentContent().getPlainText() !== " "
    ) {
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
    let updatedData = {
      languageId: params?.langId,
      contentBlockId: params?.id,
      content: data.content,
      bulkTranslation: data.bulkTranslation,
    };
    dispatch(createContentTranslations(updatedData));
    history.push("/content");
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
                    onClick={() => {
                      history.push("/content");
                    }}
                  >
                    Content Block
                  </Link>
                  <p underline="hover" color="#000000">
                    Content Management Languages
                  </p>
                </Breadcrumbs>
              </div>
              <div
                className=" row m-1 border p-3 box_style"
                style={{ height: "900px" }}
              >
                <form onSubmit={(e) => handleSubmit(e)}>
                  {
                    <div className="row headingLabel complyColor">
                      {params.id ? " Edit Language" : "Add Language"}
                    </div>
                  }
                  <div>
                    <div className="row">
                      <div className="col-2">
                        <div variant="body2" className="table_content">
                          Language:
                        </div>
                      </div>

                      <div className="col-10 table_content ">
                        {getLangById(params?.langId)}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-2">
                        <div variant="body2" className="table_content">
                          Content:
                        </div>
                      </div>
                      <div className="col-10  editor-div">
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
                      <div className="col-2 mt-2">
                        <span variant="body2" className="table_content mt-2">
                          Prevent bulk translation:
                        </span>
                      </div>
                      <div className="col-10">
                        {" "}
                        <Checkbox
                          name="bulkTranslation"
                         
                          defaultChecked={
                            idPageData?.contentTranslationData?.bulkTranslation
                          }
                          onChange={handleToogle}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="actionBtn">
                    <Button
                      type="reset"
                      size="small"
                      onClick={() => {
                        history.push("/content");
                      }}
                      variant="outlined"
                      sx={{ mr: 1 }}
                    >
                      cancel
                    </Button>

                    <Button
                      sx={{ mr: 10 }}
                      size="small"
                      type="submit"
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
