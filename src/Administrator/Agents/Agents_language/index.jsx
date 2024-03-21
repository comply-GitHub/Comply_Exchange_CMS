import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  TextField,
  CardHeader,
  CardContent,
  CardActions,
  Card,
  Divider,
  div,
  Select,
  Breadcrumbs,Link,
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
import {
  getAgentTranslation,
  createAgentsTranslations,
  getAllLanguages,
} from "../../../redux/Actions";
import "./index.scss";
import { CheckBox } from "@mui/icons-material";

export default function Language_details() {
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();
  const idPageData = useSelector((state) => state.getAgentTranslationReducer);
  const languageData = useSelector((state) => state.LanguagesReducer);

  const parentDropDown = useSelector((state) => state.ParentDropDownReducer);
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty());
  const [editorState3, setEditorState3] = useState(EditorState.createEmpty());
  const [editorState4, setEditorState4] = useState(EditorState.createEmpty());
  const [editorState5, setEditorState5] = useState(EditorState.createEmpty());
  const [editorState6, setEditorState6] = useState(EditorState.createEmpty());
  const [editorState7, setEditorState7] = useState(EditorState.createEmpty());
  const [editorState8, setEditorState8] = useState(EditorState.createEmpty());
  const [editorState9, setEditorState9] = useState(EditorState.createEmpty());
  const [data, setData] = useState({
    id: 0,
    agentId: 0,
    languageId: params?.id,
    description: "",
    termsCondition: "",
    tokenEmail: "",
    SMSFormat:"",
    sendForSignatoryEmail: "",
    sendForSignatoryEmailContinuationLink: "",
    saveAndExitEmail: "",
    nextAgentIntroductionText: "",
    welcomePopup: "",
    bulkTranslation: false,
  });

  useEffect(() => {
    dispatch(getAllLanguages());
    // Component mounted, initialize the editor states
    setEditorState1(
      idPageData?.agentTranslationData?.description
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.agentTranslationData?.description
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
    setEditorState2(
      idPageData?.agentTranslationData?.termsCondition
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.agentTranslationData?.termsCondition
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
    setEditorState3(
      idPageData?.agentTranslationData?.tokenEmail
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.agentTranslationData?.tokenEmail
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
    setEditorState4(
      idPageData?.agentTranslationData?.sendForSignatoryEmail
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.agentTranslationData?.sendForSignatoryEmail
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
    setEditorState5(
      idPageData?.agentTranslationData?.sendForSignatoryEmailContinuationLink
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.agentTranslationData?.sendForSignatoryEmailContinuationLink
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
    setEditorState6(
      idPageData?.agentTranslationData?.saveAndExitEmail
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.agentTranslationData?.saveAndExitEmail
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
    setEditorState7(
      idPageData?.agentTranslationData?.nextAgentIntroductionText
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.agentTranslationData?.nextAgentIntroductionText
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
    setEditorState8(
      idPageData?.agentTranslationData?.welcomePopup
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.agentTranslationData?.welcomePopup
            );
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            );
            return EditorState.createWithContent(contentState);
          }
        : () => EditorState.createEmpty()
    );
    setEditorState9(
      idPageData?.agentTranslationData?.SMSFormat
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idPageData?.agentTranslationData?.SMSFormat
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

  const handleToogle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
    setData({ ...data, description: html });
  }, [editorState1]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState2.getCurrentContent()));
    setData({ ...data, termsCondition: html });
  }, [editorState2]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState3.getCurrentContent()));
    setData({ ...data, tokenEmail: html });
  }, [editorState3]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState4.getCurrentContent()));
    setData({ ...data, sendForSignatoryEmail: html });
  }, [editorState4]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState5.getCurrentContent()));
    setData({ ...data, sendForSignatoryEmailContinuationLink: html });
  }, [editorState5]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState6.getCurrentContent()));
    setData({ ...data, saveAndExitEmail: html });
  }, [editorState6]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState7.getCurrentContent()));
    setData({ ...data, nextAgentIntroductionText: html });
  }, [editorState7]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState8.getCurrentContent()));
    setData({ ...data, welcomePopup: html });
  }, [editorState8]);


  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState9.getCurrentContent()));
    setData({ ...data, SMSFormat: html });
  }, [editorState9]);
  useEffect(() => {
    if (params.id) {
      dispatch(
        getAgentTranslation(params.id, params.langId, (data) => {
          setData(data);
        })
      );
    }
  }, [params.id]);

  useEffect(() => {
    // Component mounted, initialize the editor states
    setEditorState1(EditorState.createEmpty());
    setEditorState2(EditorState.createEmpty());
  }, []);

  const handleEditorStateChange1 = (editorState) => {
    setEditorState1(editorState);
  };

  const handleEditorStateChange2 = (editorState) => {
    setEditorState2(editorState);
  };
  const handleEditorStateChange3 = (editorState) => {
    setEditorState3(editorState);
  };

  const handleEditorStateChange4 = (editorState) => {
    setEditorState4(editorState);
  };

  const handleEditorStateChange5 = (editorState) => {
    setEditorState5(editorState);
  };

  const handleEditorStateChange6 = (editorState) => {
    setEditorState6(editorState);
  };

  const handleEditorStateChange7 = (editorState) => {
    setEditorState7(editorState);
  };

  const handleEditorStateChange8 = (editorState) => {
    setEditorState8(editorState);
  };
  const handleEditorStateChange9 = (editorState) => {
    setEditorState9(editorState);
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
  const convertToHtml3 = () => {
    const contentState = editorState3.getCurrentContent();
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
      editorState3,
      convertedContentState,
      "insert-characters"
    );
    setEditorState3(convertedEditorState);
  };

  const convertToPlainText3 = () => {
    const contentState = editorState3.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState3(plainTextEditorState);
  };

  const convertToPreview3 = () => {
    const contentState = editorState3.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState3(plainTextEditorState);
  };

  const convertToHtml4 = () => {
    const contentState = editorState4.getCurrentContent();
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
      editorState4,
      convertedContentState,
      "insert-characters"
    );
    setEditorState4(convertedEditorState);
  };

  const convertToPlainText4 = () => {
    const contentState = editorState4.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState4(plainTextEditorState);
  };

  const convertToPreview4 = () => {
    const contentState = editorState4.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState4(plainTextEditorState);
  };

  const convertToHtml5 = () => {
    const contentState = editorState5.getCurrentContent();
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
      editorState5,
      convertedContentState,
      "insert-characters"
    );
    setEditorState5(convertedEditorState);
  };

  const convertToPlainText5 = () => {
    const contentState = editorState5.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState5(plainTextEditorState);
  };

  const convertToPreview5 = () => {
    const contentState = editorState5.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState5(plainTextEditorState);
  };

  const convertToHtml6 = () => {
    const contentState = editorState6.getCurrentContent();
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
      editorState6,
      convertedContentState,
      "insert-characters"
    );
    setEditorState6(convertedEditorState);
  };

  const convertToPlainText6 = () => {
    const contentState = editorState6.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState6(plainTextEditorState);
  };

  const convertToPreview6 = () => {
    const contentState = editorState6.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState6(plainTextEditorState);
  };

  const convertToHtml7 = () => {
    const contentState = editorState7.getCurrentContent();
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
    setEditorState7(convertedEditorState);
  };

  const convertToPlainText7 = () => {
    const contentState = editorState7.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState7(plainTextEditorState);
  };

  const convertToPreview7 = () => {
    const contentState = editorState7.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState7(plainTextEditorState);
  };

  const convertToHtml8 = () => {
    const contentState = editorState8.getCurrentContent();
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
      editorState8,
      convertedContentState,
      "insert-characters"
    );
    setEditorState8(convertedEditorState);
  };

  const convertToPlainText8 = () => {
    const contentState = editorState8.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState8(plainTextEditorState);
  };

  const convertToPreview8 = () => {
    const contentState = editorState8.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState8(plainTextEditorState);
  };
  const convertToHtml9 = () => {
    const contentState = editorState9.getCurrentContent();
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
      editorState9,
      convertedContentState,
      "insert-characters"
    );
    setEditorState9(convertedEditorState);
  };
  const convertToPlainText9 = () => {
    const contentState = editorState9.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState9(plainTextEditorState);
  };

  const convertToPreview9 = () => {
    const contentState = editorState9.getCurrentContent();
    const plainText = convertToRaw(contentState)
      .blocks.map((block) => block.text)
      .join("\n");
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, "");
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags);
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    );
    setEditorState9(plainTextEditorState);
  };
  const handleChange = (e) => {
    console.log(e.target.value, "value");
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const getLangById = (id) => {
    console.log(params);
    const result = languageData?.allLanguageData?.filter((item) => {
      if (item.id == params.langId) {
        return item;
      }
    });
    if (result?.length) {
      return result[0]?.name;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedData={
      agentId: params?.id,
      languageId: params?.langId,
      description: data.description,
      termsCondition: data.termsCondition,
      tokenEmail: data.tokenEmail,
      SMSFormat:data.SMSFormat,
      sendForSignatoryEmail: data.sendForSignatoryEmail,
      sendForSignatoryEmailContinuationLink: data.sendForSignatoryEmailContinuationLink,
      saveAndExitEmail: data.saveAndExitEmail,
      nextAgentIntroductionText: data.nextAgentIntroductionText,
      welcomePopup: data.welcomePopup,
      bulkTranslation: data.bulkTranslation,
    }
    dispatch(createAgentsTranslations(updatedData));
    history.push("/agent")
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
                  onClick={()=>{history.push("/agent")}}
                  
                >
                  Agents
                </Link>
                <p
                   underline="hover"
                  color="#000000"
                  
                  
                  
                >
                  Agent Languages
                </p>
              </Breadcrumbs>
            </div>
              <div className=" row m-1 border p-3 box_style">
                <form onSubmit={(e) => handleSubmit(e)}>
                  {
                    <div className="row headingLabel complyColor">
                      {params.id ? " Edit Language" : "Add Language"}
                    </div>
                  }
                  <div>
                    <div className="d-flex">
                      <div className="col-2 table_content">
                       
                          Language:
                      
                     
                      </div>
                      <div className="col-10 table_content mt-2">
                        {getLangById(params?.langId)}
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-2">
                        <div variant="body2" className="table_content">
                          Description:
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
                        <div variant="body2" className="table_content">
                          Terms and conditions:
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
                        <div variant="body2" className="table_content">
                          "TOKEN" Email:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div>
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState3}
                            onEditorStateChange={(value) => {
                              handleEditorStateChange3(value);
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
                            <button type="button" onClick={convertToHtml3}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPlainText3}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPreview3}>
                              Preview
                            </button>
                          </div>
                        </div>
                        <lable className="label col-10">
                          The TOKEN email must contain the placeholder
                          ##TOKEN##. This will be replaced with the actual TOKEN
                          when the confirmation email is sent
                        </lable>
                      </div>
                    </div>


                    <div className="row">
                      <div className="col-2">
                        <div variant="body2" className="table_content">
                          "TOKEN" SMS:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div>
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState9}
                            onEditorStateChange={(value) => {
                              handleEditorStateChange9(value);
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
                            <button type="button" onClick={convertToHtml9}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPlainText9}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPreview9}>
                              Preview
                            </button>
                          </div>
                        </div>
                        <lable className="label col-10">
                          The TOKEN email must contain the placeholder
                          ##TOKEN##. This will be replaced with the actual TOKEN
                          when the confirmation email is sent
                        </lable>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div variant="body2" className="table_content">
                          Send for Signatory Email:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div>
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState4}
                            onEditorStateChange={(value) => {
                              handleEditorStateChange4(value);
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
                            <button type="button" onClick={convertToHtml4}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPlainText4}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPreview4}>
                              Preview
                            </button>
                          </div>
                        </div>
                        <div className="col-9">
                          <lable className="label ">
                            The Send For Signatory email must contain the
                            placeholder ##URL Link## , ##Name of signatory## ,
                            ##Name of the person who filled out the form## ,
                            ##Email address of the contact##. This will be
                            replaced with the actual Continuation URL, Name of
                            signatory ,Name of the person who filled out the
                            form, Email address of the contact when the email is
                            sent
                          </lable>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div variant="body2" className="table_content">
                          Send for Signatory Email for Continuation Link:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div>
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState5}
                            onEditorStateChange={(value) => {
                              handleEditorStateChange5(value);
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
                            <button type="button" onClick={convertToHtml5}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPlainText5}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPreview5}>
                              Preview
                            </button>
                          </div>
                        </div>
                        <div className="col-9">
                          <lable className="label">
                            The Send For Signatory email must contain the
                            placeholder ##URL Link## , ##Name of signatory## ,
                            ##Name of the person who filled out the form## ,
                            ##Email address of the contact##. This will be
                            replaced with the actual Continuation URL, Name of
                            signatory ,Name of the person who filled out the
                            form, Email address of the contact when the email is
                            sent
                          </lable>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div variant="body2" className="table_content">
                          "SaveAndExit" Email:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div>
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState6}
                            onEditorStateChange={(value) => {
                              handleEditorStateChange6(value);
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
                            <button type="button" onClick={convertToHtml6}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPlainText6}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPreview6}>
                              Preview
                            </button>
                          </div>
                        </div>
                        <lable className="label">
                          The SaveAndExit email must contain the placeholder
                          ##URL Link## and ##URL Link1##. This will be replaced
                          with the actual Continuation URL when the email is
                          sent
                        </lable>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div variant="body2" className="table_content">
                          Next Agent Introduction Text (Shown on Congratulations
                          Page):
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div>
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState7}
                            onEditorStateChange={(value) => {
                              handleEditorStateChange7(value);
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
                            <button type="button" onClick={convertToHtml7}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPlainText7}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPreview7}>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-2">
                        <div variant="body2" className="table_content">
                          Welcome Popup:
                        </div>
                      </div>
                      <div className="col-10 editor-div">
                        <div>
                          <Editor
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            editorState={editorState8}
                            onEditorStateChange={(value) => {
                              handleEditorStateChange8(value);
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
                            <button type="button" onClick={convertToHtml8}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPlainText8}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: "5px" }}>
                            <button type="button" onClick={convertToPreview8}>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-2">
                        <div className="table_content ">
                          Prevent bulk translation:
                        </div>
                      </div>
                      <span className="col-10 ">
                        <Checkbox
                          name="bulkTranslation"
                          defaultChecked={data.bulkTranslation}
                          onClick={handleToogle}
                        />
                      </span>
                    </div>
                    <div className="actionBtn">
                      <Button
                        type="reset"
                        size="small"
                        variant="outlined"
                        sx={{ mr: 1 }}
                        onClick={()=>{history.push("/agent")}}
                      >
                        cancel
                      </Button>

                      <Button size="small" type="submit" variant="contained">
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
