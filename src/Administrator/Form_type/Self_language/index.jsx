import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import {
  Breadcrumbs,Link,
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
  Button
} from '@mui/material'
import ThemeOptions from '../../../Layout/ThemeOptions/'
import AppHeader from '../../../Layout/AppHeader/'
import { Fragment } from 'react'
import AppSidebar from '../../../Layout/AppSidebar/'
import {
  EditorState,
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML
} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Utils from '../../../Utils'
import './index.scss'
import { CheckBox } from '@mui/icons-material'
import {
  getAllLanguages,
  getFormTypesSelfTranslation,
  insertFormTypesSelfTranslation
} from '../../../redux/Actions'

export default function Language_details () {
  const dispatch = useDispatch()
  let params = useParams()
  let history = useHistory()

  const parentDropDown = useSelector(state => state.ParentDropDownReducer)
  const editorData = useSelector(state => state.getSelfFormTypesTranslation)
  const languageData = useSelector(state => state.LanguagesReducer)

  const [editorState1, setEditorState1] = useState(EditorState.createEmpty())
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty())
  const [editorState3, setEditorState3] = useState(EditorState.createEmpty())
  const [editorState4, setEditorState4] = useState(EditorState.createEmpty())
  const [editorState5, setEditorState5] = useState(EditorState.createEmpty())
  const [editorState6, setEditorState6] = useState(EditorState.createEmpty())
  const [editorState7, setEditorState7] = useState(EditorState.createEmpty())
  const [editorState8, setEditorState8] = useState(EditorState.createEmpty())
 
  const [data, setData] = useState(
   
       {
          introductionText: '',
          formSCId: 0,
          languageId: 0,
          tinPageText: '',
          certificationText: '',
          eSignatureText: '',
          eSignatureConfirmationText: '',
          bulkTranslation: false
        }
   
  )

  useEffect(() => {
    if (params.id) {
      dispatch(
        getFormTypesSelfTranslation(params.id, params.langId, data => {
          // console.log(data,"dataa")
          if (data === '') {
            setData({ formSCId: parseInt(params.id), languageId: parseInt(params.langId) })
          } else {
            setData(data)
          }
        })
      )
    }
  }, [params.id])

  const getLangById = id => {
    const result = languageData?.allLanguageData?.filter(item => {
      if (item.id == params.langId) {
        return item
      }
    })
    if (result?.length) {
      return result[0]?.name
    }
  }

  useEffect(() => {
    dispatch(getAllLanguages())
    // Component mounted, initialize the editor states
    console.log(editorData)
    setEditorState1(
      editorData?.formTypeSelfTranslationData?.introductionText
        ? () => {
            const blocksFromHTML = convertFromHTML(
              editorData?.formTypeSelfTranslationData?.introductionText
            )
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )

    setEditorState2(
      editorData?.formTypeSelfTranslationData?.tinPageText
        ? () => {
            const blocksFromHTML = convertFromHTML(
              editorData?.formTypeSelfTranslationData?.tinPageText
            )
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )

    setEditorState3(
      editorData?.formTypeSelfTranslationData?.certificationText
        ? () => {
            const blocksFromHTML = convertFromHTML(
              editorData?.formTypeSelfTranslationData?.certificationText
            )
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )

    setEditorState4(
      editorData?.formTypeSelfTranslationData?.eSignatureText
        ? () => {
            const blocksFromHTML = convertFromHTML(
              editorData?.formTypeSelfTranslationData?.eSignatureText
            )
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )

    setEditorState5(
      editorData?.formTypeSelfTranslationData?.eSignatureConfirmationText
        ? () => {
            const blocksFromHTML = convertFromHTML(
              editorData?.formTypeSelfTranslationData
                ?.eSignatureConfirmationText
            )
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML.contentBlocks,
              blocksFromHTML.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )
  }, [editorData])

  const handleEditorStateChange1 = editorState => {
    console.log(editorState)
    setEditorState1(editorState)
  }

  const handleEditorStateChange2 = editorState => {
    setEditorState2(editorState)
  }
  const handleEditorStateChange3 = editorState => {
    setEditorState3(editorState)
  }

  const handleEditorStateChange4 = editorState => {
    setEditorState4(editorState)
  }

  const handleEditorStateChange5 = editorState => {
    setEditorState5(editorState)
  }

  const handleEditorStateChange6 = editorState => {
    setEditorState6(editorState)
  }

  const handleEditorStateChange7 = editorState => {
    setEditorState7(editorState)
  }

  const handleEditorStateChange8 = editorState => {
    setEditorState8(editorState)
  }

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()))
    setData({ ...data, introductionText: html })
  }, [editorState1])

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState2.getCurrentContent()))
    setData({ ...data, tinPageText: html })
  }, [editorState2])

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState3.getCurrentContent()))
    setData({ ...data, certificationText: html })
  }, [editorState3])

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState4.getCurrentContent()))
    setData({ ...data, eSignatureText: html })
  }, [editorState4])

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState5.getCurrentContent()))
    setData({ ...data, eSignatureConfirmationText: html })
  }, [editorState5])

  const convertToHtml1 = () => {
    const contentState = editorState1.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    const convertedContentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          key: 'converted',
          text: html,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    })
    const convertedEditorState = EditorState.push(
      editorState1,
      convertedContentState,
      'insert-characters'
    )
    setEditorState1(convertedEditorState)
  }
  const convertToPlainText1 = () => {
    const contentState = editorState1.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState1(plainTextEditorState)
  }

  const convertToPreview1 = () => {
    const contentState = editorState1.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState1(plainTextEditorState)
  }
  const convertToHtml2 = () => {
    const contentState = editorState2.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    const convertedContentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          key: 'converted',
          text: html,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    })
    const convertedEditorState = EditorState.push(
      editorState2,
      convertedContentState,
      'insert-characters'
    )
    setEditorState2(convertedEditorState)
  }

  const convertToPlainText2 = () => {
    const contentState = editorState2.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState2(plainTextEditorState)
  }

  const convertToPreview2 = () => {
    const contentState = editorState2.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState2(plainTextEditorState)
  }
  const convertToHtml3 = () => {
    const contentState = editorState3.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    const convertedContentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          key: 'converted',
          text: html,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    })
    const convertedEditorState = EditorState.push(
      editorState3,
      convertedContentState,
      'insert-characters'
    )
    setEditorState3(convertedEditorState)
  }

  const convertToPlainText3 = () => {
    const contentState = editorState3.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState3(plainTextEditorState)
  }

  const convertToPreview3 = () => {
    const contentState = editorState3.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState3(plainTextEditorState)
  }

  const convertToHtml4 = () => {
    const contentState = editorState4.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    const convertedContentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          key: 'converted',
          text: html,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    })
    const convertedEditorState = EditorState.push(
      editorState4,
      convertedContentState,
      'insert-characters'
    )
    setEditorState4(convertedEditorState)
  }

  const convertToPlainText4 = () => {
    const contentState = editorState4.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState4(plainTextEditorState)
  }

  const convertToPreview4 = () => {
    const contentState = editorState4.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState4(plainTextEditorState)
  }

  const convertToHtml5 = () => {
    const contentState = editorState5.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    const convertedContentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          key: 'converted',
          text: html,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    })
    const convertedEditorState = EditorState.push(
      editorState5,
      convertedContentState,
      'insert-characters'
    )
    setEditorState5(convertedEditorState)
  }

  const convertToPlainText5 = () => {
    const contentState = editorState5.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState5(plainTextEditorState)
  }

  const convertToPreview5 = () => {
    const contentState = editorState5.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState5(plainTextEditorState)
  }

  const convertToHtml6 = () => {
    const contentState = editorState6.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    const convertedContentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          key: 'converted',
          text: html,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    })
    const convertedEditorState = EditorState.push(
      editorState6,
      convertedContentState,
      'insert-characters'
    )
    setEditorState6(convertedEditorState)
  }

  const convertToPlainText6 = () => {
    const contentState = editorState6.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState6(plainTextEditorState)
  }

  const convertToPreview6 = () => {
    const contentState = editorState6.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState6(plainTextEditorState)
  }

  const convertToHtml7 = () => {
    const contentState = editorState7.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    const convertedContentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          key: 'converted',
          text: html,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    })
    const convertedEditorState = EditorState.push(
      editorState2,
      convertedContentState,
      'insert-characters'
    )
    setEditorState7(convertedEditorState)
  }

  const convertToPlainText7 = () => {
    const contentState = editorState7.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState7(plainTextEditorState)
  }

  const convertToPreview7 = () => {
    const contentState = editorState7.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState7(plainTextEditorState)
  }

  const convertToHtml8 = () => {
    const contentState = editorState8.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    const convertedContentState = convertFromRaw({
      entityMap: {},
      blocks: [
        {
          key: 'converted',
          text: html,
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {}
        }
      ]
    })
    const convertedEditorState = EditorState.push(
      editorState8,
      convertedContentState,
      'insert-characters'
    )
    setEditorState8(convertedEditorState)
  }

  const convertToPlainText8 = () => {
    const contentState = editorState8.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState8(plainTextEditorState)
  }

  const convertToPreview8 = () => {
    const contentState = editorState8.getCurrentContent()
    const plainText = convertToRaw(contentState)
      .blocks.map(block => block.text)
      .join('\n')
    const plainTextWithoutTags = plainText.replace(/<[^>]+>/g, '')
    const plainTextContentState =
      ContentState.createFromText(plainTextWithoutTags)
    const plainTextEditorState = EditorState.createWithContent(
      plainTextContentState
    )
    setEditorState8(plainTextEditorState)
  }

  const handleChange = e => {
    console.log(e.target.value, 'value')
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleToogle = e => {
    setData({ ...data, [e.target.name]: e.target.checked })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    dispatch(insertFormTypesSelfTranslation(data))
    history.push(Utils.Pathname.formType)
  }

  return (
    <Card>
      <Fragment>
        <ThemeOptions />
        {/* <AppHeader /> */}

        <div className='app-main'>
          <AppSidebar />
          <div className='app-main__outer'>
            <div className='app-main__inner'>
            <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                   underline="hover"
                   onClick={()=>{
                    history.push("/form_type")
                  }}
                  color="#0e548c"
                 
                  
                >
                  Forms
                </Link>
                <p
                   underline="hover"
                  color="#000000"
                  
                 
                  
                >
                 Self Form Languages
                </p>
              </Breadcrumbs>
            </div>
              <div className='row m-1 border p-3 box_style'>
                <form onSubmit={e => handleSubmit(e)}>
                  {
                    <div className='row headingLabel complyColor'>
                      {params.id ? ' Edit Language' : 'Add Language'}
                    </div>
                  }
                  <div>
                    <div className='row'>
                      <div className='col-2'>
                        <Typography
                          variant='body2'
                        className='table_content'
                        >
                          Language:
                        </Typography>
                      </div>
                      <div className='col-10 editor-div'>
                        <Typography
                          variant='body2'
                        className='table_content'
                        ></Typography>

                        {/* <TextField
                          size="small"
                          name="Name"
                          value={data?.Name}
                          onChange={handleChange}
                        /> */}
                        <Typography  className='table_content'>{getLangById(data?.languageId)}</Typography>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-2'>
                        <Typography
                          variant='body2'
                        className='table_content'
                        >
                          Introduction text:
                        </Typography>
                      </div>
                      <div className='col-10 editor-div'>
                        <div>
                          <Editor
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                            editorState={editorState1}
                            onEditorStateChange={handleEditorStateChange1}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            // justifyContent: "end",
                            marginTop: '3px'
                          }}
                        >
                          <div>
                            <button type='button' onClick={convertToHtml1}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPlainText1}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPreview1}>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-2'>
                        <Typography
                          variant='body2'
                        className='table_content'
                        >
                          TIN page text:
                        </Typography>
                      </div>
                      <div className='col-10 editor-div'>
                        <div>
                          <Editor
                            editorState={editorState2}
                            onEditorStateChange={value => {
                              handleEditorStateChange2(value)
                            }}
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            // justifyContent: "end",
                            marginTop: '3px'
                          }}
                        >
                          <div>
                            <button type='button' onClick={convertToHtml2}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPlainText2}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPreview2}>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-2'>
                        <Typography
                          variant='body2'
                        className='table_content'
                        >
                          Certification text:
                        </Typography>
                      </div>
                      <div className='col-10 editor-div'>
                        <div>
                          <Editor
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                            editorState={editorState3}
                            onEditorStateChange={value => {
                              handleEditorStateChange3(value)
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            // justifyContent: "end",
                            marginTop: '3px'
                          }}
                        >
                          <div>
                            <button type='button' onClick={convertToHtml3}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPlainText3}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPreview3}>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-2'>
                        <Typography
                          variant='body2'
                        className='table_content'
                        >
                          E-Signature text:
                        </Typography>
                      </div>
                      <div className='col-10 editor-div'>
                        <div>
                          <Editor
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                            editorState={editorState4}
                            onEditorStateChange={value => {
                              handleEditorStateChange4(value)
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            // justifyContent: "end",
                            marginTop: '3px'
                          }}
                        >
                          <div>
                            <button type='button' onClick={convertToHtml4}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPlainText4}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPreview4}>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-2'>
                        <Typography
                          variant='body2'
                        className='table_content'
                        >
                          E-Signature confirmation text:
                        </Typography>
                      </div>
                      <div className='col-10 editor-div'>
                        <div>
                          <Editor
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                            editorState={editorState5}
                            onEditorStateChange={value => {
                              handleEditorStateChange5(value)
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            // justifyContent: "end",
                            marginTop: '3px'
                          }}
                        >
                          <div>
                            <button type='button' onClick={convertToHtml5}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPlainText5}>
                              Text
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            <button type='button' onClick={convertToPreview5}>
                              Preview
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-2'>
                        <Typography
                          variant='body2'
                          sx={{
                            fontWeight: 100,
                            color: 'black',
                            fontSize: '13px',
                            marginTop: '10px'
                          }}
                        >
                          Prevent bulk translation:
                        </Typography>
                      </div>
                      <div className='col-10'>
                        <Checkbox
                          name='bulkTranslation'
                          onClick={e => handleToogle(e)}
                          checked={data?.bulkTranslation}
                        />
                      </div>
                    </div>
                    <div className='actionBtn'>
                      <Button
                        type='reset'
                        size='small'
                        variant='outlined'
                        sx={{ mr: 1 }}
                        onClick={() => {
                          history.push('/form_type')
                        }}
                      >
                        Cancel
                      </Button>

                      <Button size='small' type='submit' variant='contained'>
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
  )
}
