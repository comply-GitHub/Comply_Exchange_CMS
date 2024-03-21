import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import {
  TextField,
  CardHeader,
 
  CardContent,
  CardActions,
  Card,
  Breadcrumbs,Link,
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

import './index.scss'
import { getEasyById, updateEasy, createEasy } from '../../../redux/Actions'

export default function Language_details () {
  const dispatch = useDispatch()
  let params = useParams()
  const history = useHistory()
  const easyData = useSelector(state => state.getEasyByIdReducer)
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty())
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty())
  let TypeId = 2
  const [data, setData] = useState({
    id: params?.id,
    easykey: '',
    tooltip: '',
    text: '',
    moreText: ''
  })

  useEffect(() => {
    // Component mounted, initialize the editor states
    setEditorState1(
      easyData?.getEasyById?.text
        ? () => {
            const blocksFromHTML = convertFromHTML(easyData?.getEasyById?.text)
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
      easyData?.getEasyById?.moreText
        ? () => {
            const blocksFromHTML = convertFromHTML(
              easyData?.getEasyById?.moreText
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
  }, [])
  
   const handleEditorStateChange1 = editorState => {
  
    setEditorState1(editorState)
}
  

  
  

  const handleEditorStateChange2 = editorState => {
    setEditorState2(editorState)
  }

  const convertToHtml1 = () => {
    if (editorState1.getCurrentContent().hasText() && editorState1.getCurrentContent().getPlainText() !== ' ' ) {
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
    if (editorState2.getCurrentContent().hasText() && editorState2.getCurrentContent().getPlainText() !== ' ' ) {
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

  useEffect(() => {
    if (params?.id) {
      dispatch(getEasyById(params.id,(data)=>{
        setData(data);
        setEditorState1(() => {
          const blocksFromHTML = convertFromHTML(data?.text);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );

          return EditorState.createWithContent(contentState);
        });
        setEditorState2(() => {
          const blocksFromHTML = convertFromHTML(data?.moreText);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
          );
          return EditorState.createWithContent(contentState);
        });
      }))
    }else {
      setEditorState1(() => EditorState.createEmpty());
      setEditorState2(() => EditorState.createEmpty());
    }
  }, [])
  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()))
    setData({ ...data, text: html })
  }, [editorState1])

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState2.getCurrentContent()))
    console.log(html, 'html1')

    setData({ ...data, moreText: html })
  }, [editorState2])

  useEffect(() => {
    if (params.id) {
      dispatch(
        getEasyById(params.id, data => {
          setData(data)
        })
      )
    }
  }, [params.id])

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleToogle = e => {
    setData({ ...data, [e.target.name]: e.target.checked })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (params.id) {
      dispatch(updateEasy(data))
    } else dispatch(createEasy(data))
    history.push('/easy')
  }

  const handleCancel = async e => {
    e.preventDefault()
    history.push('/easy')
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
       Easy Help Details
                </p>
              </Breadcrumbs>
            </div>
              <div className='row m-1 border p-3 box_style' style={{height:"910px"}}>
                <form onSubmit={e => handleSubmit(e)}>
                  {
                    <div className='row headingLabel complyColor'>
                      {params.id ? ' Edit Easy Help' : 'Add Easy Help'}
                    </div>
                  }
                  <div>
                    <div className='row'>
                      <div className='col-1'>
                        <div
                          variant='body2'
                         className='table_content'
                        >
                          Key:
                        </div>
                      </div>
                      <div className='col-11'>
                        <div
                          variant='body2'
                         className='table_content'
                        ></div>

                        <TextField
                        className='table_content'
                        required
                          size='small'
                          name='easykey'
                          value={data?.easykey}
                          onChange={handleChange}
                          
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-1'>
                        <div
                          variant='body2'
                          className='table_content'
                        >
                          Tool Tip:
                        </div>
                      </div>
                      <div className='col-11'>
                        <div
                          variant='body2'
                         className='table_content'
                        ></div>

                        <TextField
                        className='table_content'
                        required
                          size='small'
                          name='tooltip'
                          value={data?.tooltip}
                          onChange={handleChange}
                        
                        />
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col-1'>
                        <div
                          variant='body2'
                         className='table_content'
                        >
                          Text:
                        </div>
                      </div>
                      <div className='col-11 editor-div'>
                        <div>
                          <Editor
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                            editorState={editorState1}
                            onEditorStateChange={value => {
                              handleEditorStateChange1(value)
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
                      <div className='col-1'>
                        <div
                          variant='body2'
                         className='table_content'
                        >
                          More Text:
                        </div>
                      </div>
                      <div className='col-11 editor-div'>
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
                    <div className='actionBtn'>
                      <Button
                        type='reset'
                        size='small'
                        variant='outlined'
                        sx={{ mr: 1 }}
                        onClick={()=>{
                          history.push("/easy")
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
