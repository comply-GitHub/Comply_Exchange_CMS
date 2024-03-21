import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import Utils from "../../../Utils";
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
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Input from '@mui/material/Input'
import {
  createFormTypes,
  getFormTypeById,
  getFormUSTypeById,
  updateFormTypes,
  updateUSFormTypes
} from '../../../redux/Actions'

import './index.scss'

export default function Language_details () {
  const dispatch = useDispatch()
  let params = useParams()
  const history= useHistory()
  const [editorError, setEditorError] = useState(false);

  const parentDropDown = useSelector(state => state.ParentDropDownReducer)
  const idUSFormTypeData = useSelector(state => state.getUSFormTypeByIdReducer)

  const [imageFile1, setImageFile1] = useState(null)
  const [imageFile2, setImageFile2] = useState(null)


  const [data, setData] = useState(
    params.id
      ? {
          id: params.id,
          name: '',
          isDisabled: '',
          fullHeader: '',
          summaryHeader: '',
          description:'',
          substituteFormStatement: '',
          printTemplatePDF: null,
          eSubmitTemplatePDF: null,
          useOnboardingURL: false,
          specifyURL:"",
         
                }
      : {
          name: '',
          isDisabled: '',
          fullHeader: '',
          summaryHeader: '',
          description:'',
          substituteFormStatement: '',
          printTemplatePDF: null,
          eSubmitTemplatePDF: null,
          useOnboardingURL: false,
          specifyURL:"",
         
                }
  )

  useEffect(() => {
    // Component mounted, initialize the editor states
    setEditorState1(EditorState.createEmpty())
    setEditorState2(EditorState.createEmpty())
    setEditorState3(EditorState.createEmpty())
    setEditorState4(EditorState.createEmpty())
    setEditorState5(EditorState.createEmpty())
  }, [])

  const [value, setValue] = useState('1')
  const handleSelect = event => {
    const selectedValue = event.target.value
    setValue(selectedValue)
  }
  const [submit, setSubmit] = useState('1')
  const handleFile = event => {
    const selectedSubmit = event.target.value
    setSubmit(selectedSubmit)
  }

  useEffect(() => {
    if (params.id) {
      dispatch(
        getFormUSTypeById(params.id, data => {
          console.log(data)
          setData(data)
        })
      )
    }
  }, [params.id])

  useEffect(() => {
    // console.log(data)
    const plainText = data?.pageContent
    // Component mounted, initialize the editor states
    setEditorState1(
      data?.fullHeader
        ? () => {
            const blocksFromHTML = convertFromHTML(data?.fullHeader)
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML?.contentBlocks,
              blocksFromHTML?.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )

    setEditorState2(
      data?.summaryHeader
        ? () => {
            const blocksFromHTML = convertFromHTML(data?.summaryHeader)
            const contentState = ContentState?.createFromBlockArray(
              blocksFromHTML?.contentBlocks,
              blocksFromHTML?.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )

    setEditorState3(
      data?.description
        ? () => {
            const blocksFromHTML = convertFromHTML(data?.description)
            const contentState = ContentState?.createFromBlockArray(
              blocksFromHTML?.contentBlocks,
              blocksFromHTML?.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )

    setEditorState4(
      data?.substituteFormStatement
        ? () => {
            const blocksFromHTML = convertFromHTML(data?.substituteFormStatement)
            const contentState = ContentState?.createFromBlockArray(
              blocksFromHTML?.contentBlocks,
              blocksFromHTML?.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )

    setEditorState5(
      data?.eSubmitStatement
        ? () => {
            const blocksFromHTML = convertFromHTML(
              data?.eSubmitStatement
            )
            const contentState = ContentState.createFromBlockArray(
              blocksFromHTML?.contentBlocks,
              blocksFromHTML?.entityMap
            )
            console.log(blocksFromHTML, 'blocksFromHTML')

            return EditorState.createWithContent(contentState)
          }
        : () => EditorState.createEmpty()
    )
  }, [idUSFormTypeData])

  const [editorState1, setEditorState1] = useState(EditorState.createEmpty())
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty())
  const [editorState3, setEditorState3] = useState(EditorState.createEmpty())
  const [editorState4, setEditorState4] = useState(EditorState.createEmpty())
  const [editorState5, setEditorState5] = useState(EditorState.createEmpty())

  const handleEditorStateChange1 = editorState => {
    setEditorState1(editorState)
  }

  const handleEditorStateChange2 = editorState => {
    setEditorState2(editorState)
    setEditorError(false);
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
  const convertToHtml1 = () => {
    const contentState = editorState1.getCurrentContent()
    const html = draftToHtml(convertToRaw(contentState))
    console.log(html, 'html')
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

  useEffect(() => {
  let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()))
  setData({ ...data, fullHeader: html })
}, [editorState1])

useEffect(() => {
  let html = draftToHtml(convertToRaw(editorState2.getCurrentContent()))

  setData({ ...data, summaryHeader: html })
}, [editorState2])

useEffect(() => {
  let html = draftToHtml(convertToRaw(editorState3.getCurrentContent()))
  setData({ ...data, description: html })
}, [editorState3])

useEffect(() => {
  let html = draftToHtml(convertToRaw(editorState4.getCurrentContent()))
  setData({ ...data, substituteFormStatement: html })
}, [editorState4])

useEffect(() => {
  let html = draftToHtml(convertToRaw(editorState5.getCurrentContent()))
  setData({ ...data, eSubmitStatement: html })
}, [editorState5])




//GET By ID UseEffect

// useEffect(() => {
//   if (params.id) {
//     dispatch(
//       getFormUSTypeById(params.id, (data) => {
//         setData(data);
//         console.log("datata",data)
//         setEditorState1(() => {
//           const blocksFromHTML = convertFromHTML(data?.fullHeader);
//           const contentState = ContentState.createFromBlockArray(
//             blocksFromHTML.contentBlocks,
//             blocksFromHTML.entityMap
//           );

//           return EditorState.createWithContent(contentState);
//         });
//         setEditorState2(() => {
//           const blocksFromHTML = convertFromHTML(data?.summaryHeader);
//           const contentState = ContentState.createFromBlockArray(
//             blocksFromHTML.contentBlocks,
//             blocksFromHTML.entityMap
//           );
//           return EditorState.createWithContent(contentState);
//         });
//         setEditorState3(() => {
//           const blocksFromHTML = convertFromHTML(data?.description);
//           const contentState = ContentState.createFromBlockArray(
//             blocksFromHTML.contentBlocks,
//             blocksFromHTML.entityMap
//           );
//           return EditorState.createWithContent(contentState);
//         });
//         setEditorState4(() => {
//           const blocksFromHTML = convertFromHTML(data?.substituteFormStatement);
//           const contentState = ContentState.createFromBlockArray(
//             blocksFromHTML.contentBlocks,
//             blocksFromHTML.entityMap
//           );
//           return EditorState.createWithContent(contentState);
//         });
//         setEditorState5(() => {
//           const blocksFromHTML = convertFromHTML(data?.eSubmitStatement);
//           const contentState = ContentState.createFromBlockArray(
//             blocksFromHTML.contentBlocks,
//             blocksFromHTML.entityMap
//           );
//           return EditorState.createWithContent(contentState);
//         });
//       })
//     );
//   } else {
//     setEditorState1(() => EditorState.createEmpty());
//     setEditorState2(() => EditorState.createEmpty());
//     setEditorState3(() => EditorState.createEmpty());
//     setEditorState4(() => EditorState.createEmpty());
//     setEditorState5(() => EditorState.createEmpty());
//   }
// }, [params.id]);

  const handleChange = e => {
    console.log(e.target)
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleToogle = e => {
    setData({ ...data, [e.target.name]: e.target.checked })
  }

  const handleImage1 = e => {
  var binaryData = []
  binaryData.push(e.target.files[0])
  // let image_as_base64 = URL.createObjectURL(
  //   new Blob(binaryData, { type: 'application/zip' })
  // )
  let imageFile = e.target.files[0]
  console.log(e.target.files[0], 'test')
  if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    alert('Please select a valid image.')
  } else {
    setImageFile1(imageFile)
  }
}

const handleImage2 = e => {
  var binaryData = []
  binaryData.push(e.target.files[0])
  // let image_as_base64 = URL.createObjectURL(
  //   new Blob(binaryData, { type: 'application/zip' })
  // )
  let imageFile = e.target.files[0]
  console.log(e.target.files[0], 'test')
  if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
    alert('Please select a valid image.')
  } else {
    setImageFile2(imageFile)
  }
}

const handleSubmit = async event => {
  if (!editorState2.getCurrentContent().hasText()) {
    setEditorError(true);
    return; // Don't proceed with submission
  }
  console.log("dataa",data)
  event.preventDefault()
  const formData = new FormData()
  formData.append('id', params.id)
  formData.append('name', data.name)
  formData.append('isDisabled', data.isDisabled)
  formData.append('fullHeader', data.fullHeader)
  formData.append('summaryHeader', data.summaryHeader)
  formData.append('description', data.description)
  formData.append('substituteFormStatement', data.substituteFormStatement)
  formData.append('eSubmitStatement', data.eSubmitStatement)
  formData.append('eSubmitTemplatePDF', imageFile1)       
  formData.append('printTemplatePDF', imageFile2)  
  formData.append('useOnboardingURL', data.useOnboardingURL)
  formData.append('specifyURL', data.specifyURL)


  // if (params?.id) {
  //   formData.append('id', params.id)
    dispatch(updateUSFormTypes(formData))
  // } else {
  //   dispatch(updateUSFormTypes(formData))
  // }
  history.push(Utils.Pathname.formType)
}

const [selectedValue, setSelectedValue] = React.useState('a')

const handleRadioChange = (e) => {
  if(e.target.value==='useOnboardingURL'){
    setSelectedValue(e.target.value)
    setData({ ...data, [e.target.value]: e.target.checked })
  }
  else{
     setSelectedValue(e.target.value)
     setData({ ...data, useOnboardingURL: false })
  }
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
                  color="#0e548c"
                  onClick={()=>{
                    history.push("/form_type")
                  }}
                 
                  
                >
                  Forms
                </Link>
                <p
                   underline="hover"
                  color="#000000"
                  
                 
                  
                >
                  Forms Details
                </p>
              </Breadcrumbs>
            </div>
              <div className='row m-1 border p-3 box_style'>
                <form onSubmit={e => handleSubmit(e)}>
                  {
                    <div className='row headingLabel complyColor'>
                      {params.id ? ' Edit Forms' : 'Add Forms'}
                    </div>
                  }
                  <div>
                    <div className='row d-flex'>
                    
                        <div
                         
                          className='table_content col-4 mt-3'
                        >
                          Is Disabled:
                          <span>
                        <Checkbox
                          name='isDisabled'
                          onClick={e => handleToogle(e)}
                          checked={data?.isDisabled}
                          className='checkBox'
                        />
                      </span>
                        </div>
                      
                    
                     
                    </div>
                    {data.isDisabled ? (
                      <div className='row '>
                        <RadioGroup
                       
                          aria-labelledby='demo-controlled-radio-buttons-group'
                          name='controlled-radio-buttons-group'
                          // value={value}
                        >
                          <FormControlLabel
                           className='table_content'
                            value='useOnboardingURL'
                            control={<Radio />}
                            label='use onboarding URL'         
                            onChange={handleRadioChange}
                            checked={selectedValue==='useOnboardingURL'}
                          />
                          <div style={{ display: 'flex' }}>
                            <span  className='table_content'>
                              <FormControlLabel
                              className='table_content'
                                value='specifyURL'
                                control={<Radio />}
                                label='Specify URL'
                                onChange={handleRadioChange}
                                checked={selectedValue==='specifyURL'}
                              />
                            </span>
                            <span  className='table_content'>
                              <TextField
                              className='table_content'
                                size='small'
                                name='specifyURL'
                                onChange={handleChange}
                                value={data?.specifyURL}
                                disabled={selectedValue==='useOnboardingURL'}
                              />
                            </span>
                          </div>
                        </RadioGroup>
                      </div>
                    ) : (
                      ''
                    )}

                    <div className='row'>
                      <div>
                        <div
                          variant='body2'
                          className='table_content'
                        >
                          Full header:
                        </div>
                      </div>
                      <div className='col-9 editor-div'>
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
                            marginTop: '5px'
                          }}
                        >
                          <div>
                            {' '}
                            <button type='button' onClick={convertToHtml1}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            {' '}
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
                      <div>
                        <div
                          variant='body2'
                        className='table_content'
                        >
                          Summary Header:<span style={{color:"red"}}>*</span>
                        </div>
                      </div>
                      {editorError && <div className='error'>Summary Header is required.</div>}
                      <div className='col-9 editor-div'>
                      
   

                        <div >
                          <Editor
                            
                            editorState={editorState2}
                            onEditorStateChange={handleEditorStateChange2}
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            marginTop: '5px'
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
                      <div>
                        <div
                          variant='body2'
                        className='table_content'
                        >
                          Description:
                        </div>
                      </div>
                      <div className='col-9 editor-div'>
                        <div
                        // style={{
                        //   border: "1px solid grey",
                        //   width: "100%",
                        //   height: "450px",
                        // }}
                        >
                          <Editor
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                            editorState={editorState3}
                            onEditorStateChange={handleEditorStateChange3}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            marginTop: '5px'
                          }}
                        >
                          <div>
                            {' '}
                            <button type='button' onClick={convertToHtml3}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            {' '}
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
                      <div>
                        <div
                          variant='body2'
                        className='table_content'
                        >
                          Substitute form statement:
                        </div>
                      </div>
                      <div className='col-9 editor-div'>
                        <div>
                          <Editor
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                            editorState={editorState4}
                            onEditorStateChange={handleEditorStateChange4}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            // justifyContent: "end",
                            marginTop: '5px'
                          }}
                        >
                          <div>
                            {' '}
                            <button type='button' onClick={convertToHtml4}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            {' '}
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
                      <div>
                        <div
                          variant='body2'
                        className='table_content'
                        >
                          E-submit statement:
                        </div>
                      </div>
                      <div className='col-9 editor-div'>
                        <div
                      
                        >
                          <Editor
                            wrapperClassName='wrapper-class'
                            editorClassName='editor-class'
                            toolbarClassName='toolbar-class'
                            editorState={editorState5}
                            onEditorStateChange={handleEditorStateChange5}
                          />
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            // justifyContent: "end",
                            marginTop: '5px'
                          }}
                        >
                          <div>
                            {' '}
                            <button type='button' onClick={convertToHtml5}>
                              HTML
                            </button>
                          </div>
                          <div style={{ marginLeft: '5px' }}>
                            {' '}
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
                      <div className='col-3'>
                        <div variant='body2'  className='table_content'>
                          Print PDF template:
                        </div>
                      </div>
                      <div className='col-9 input-file'>
                        <select  className='table_content'
                         name='printTemplatePDF'
                         value={data?.printTemplatePDF}
                          onChange={handleSelect}
                          style={{
                            minWidth: '120px',
                            height: '30px',
                            marginRight: '10px'
                          }}
                        >
                          <option value='1'>Keep Existing</option>
                          <option value='2'>Upload</option>
                          <option value='3'>Remove</option>
                        </select>

                        {value === '2' && <Input style={{fontSize:'12px'}}  type='file' onChange={(e) => handleImage1(e)} />}
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-3'>
                        <div variant='body2' className='table_content'>
                          E-Submit PDF template:
                        </div>
                      </div>
                      <div className='col-9 input-file'>
                        <select
                         className='table_content'
                         name='eSubmitTemplatePDF'
                         value={data?.eSubmitTemplatePDF}
                          onChange={handleFile}
                          style={{
                            minWidth: '120px',
                            height: '30px',
                            marginRight: '10px'
                          }}
                        >
                          <option value='1'>Keep Existing</option>
                          <option value='2'>Upload</option>
                          <option value='3'>Remove</option>
                        </select>

                        {submit === '2' && <Input style={{fontSize:'12px'}} type='file' onChange={(e) => handleImage2(e)} />}
                      </div>
                    </div>

                    <div className='actionBtn'>
                      <Button
                       onClick={()=>{
                        history.push("/form_type")
                      }}
                        type='reset'
                        size='small'
                        variant='outlined'
                        sx={{ mr: 1 }}
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
