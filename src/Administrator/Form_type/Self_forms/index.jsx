import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import Utils from "../../../Utils";
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

import './index.scss'
import { createFormTypes, getFormTypeById, updateFormTypes } from '../../../redux/Actions'

export default function Language_details () {
  const dispatch = useDispatch()
  let params = useParams()
   const history = useHistory();

  const parentDropDown = useSelector(state => state.ParentDropDownReducer)
  const idFormTypeData = useSelector(state => state.getFormTypeByIdReducer)

  const [imageFile, setImageFile] = useState(null)

  const handleImage = e => {
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
    setImageFile(imageFile)
  }
}


  const [data, setData] = useState(
    params.id
      ? {
          id: params.id,
          name: '',
          displayName: '',
          revision: '',
          isDisabled: false,
          eSubmitPDFTemplateId: null,
          printPDFTemplateId: null,
          logo: '',
          introductionText: '',
          tinPageText: '',
          certificationText: '',
          eSignatureText: '',
          eSignatureConfirmationText: ''
        }
      : {
          name: '',
          displayName: '',
          revision: '',
          isDisabled: false,
          eSubmitPDFTemplateId: null,
          printPDFTemplateId: null,
          logo: '',
          introductionText: '',
          tinPageText: '',
          certificationText: '',
          eSignatureText: '',
          eSignatureConfirmationText: ''
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

  useEffect(() => {
    if (params.id) {
      dispatch(
        getFormTypeById(params.id, data => {
          setData(data)
        })
      )
    }
  }, [params.id])

  useEffect(() => {
    const plainText = data?.pageContent
    // Component mounted, initialize the editor states
    setEditorState1(
      data?.introductionText
        ? () => {
            const blocksFromHTML = convertFromHTML(data?.introductionText)
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
      data?.tinPageText
        ? () => {
            const blocksFromHTML = convertFromHTML(data?.tinPageText)
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
      data?.certificationText
        ? () => {
            const blocksFromHTML = convertFromHTML(data?.certificationText)
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
      data?.eSignatureText
        ? () => {
            const blocksFromHTML = convertFromHTML(data?.eSignatureText)
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
      data?.eSignatureConfirmationText
        ? () => {
            const blocksFromHTML = convertFromHTML(
              data?.eSignatureConfirmationText
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
  }, [idFormTypeData])

  const [value, setValue] = useState('1')
  const handleSelect = event => {
    const selectedValue = event.target.value
    setValue(selectedValue)
  }
  const [submit, setSubmit] = useState('1')

  const handleSubmit = async event => {
    let currentDateTime = new Date().toISOString();
    event.preventDefault()
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('displayName', data.displayName)
    formData.append('revision', data.revision)
    formData.append('isDisabled', data.isDisabled)
    formData.append('eSubmitPDFTemplateId', data.eSubmitPDFTemplateId)
    formData.append('printPDFTemplateId', data.printPDFTemplateId)
    formData.append('introductionText', data.introductionText)
    formData.append('tinPageText',data.tinPageText)
    formData.append('certificationText', data.certificationText)
    formData.append('eSignatureText', data.eSignatureText)
    formData.append('eSignatureConfirmationText',data.eSignatureConfirmationText)
    formData.append('Logo',imageFile)
    formData.append('IsActive',true)
    formData.append('IsDeleted',false)
    formData.append('LogoPath',"www.google.com")
    formData.append('ModifiedOn',currentDateTime)

    console.log("Before updateFormTypes:", data);
    if (params?.id) {
       formData.append('id',params.id);
       console.log("Form data with ID:", formData);
       dispatch(updateFormTypes(formData));
    } else {
       console.log("Form data without ID:", formData);
       dispatch(createFormTypes(formData))
    }
    history.push(Utils.Pathname.formType);
  }

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

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleToogle = e => {
    setData({ ...data, [e.target.name]: e.target.checked })
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
                color="#0e548c"
                   underline="hover"
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
                 Self Form Details
                </p>
              </Breadcrumbs>
            </div>
              <div className=' row mx-2'>
                <form onSubmit={e => handleSubmit(e)}>
                  {
                    <div className='row headingLabel complyColor'>
                      {params.id ? ' Edit Self Form' : 'Add Self Form'}
                    </div>
                  }
                  <div style={{ marginTop: '20px' }}>
                    <div className='row'>
                      <div className='col-3'>
                        <div
                          variant='body2'
                         className="table_content"
                        >
                          Name:
                        </div>
                      </div>

                      <div className='col-9 tableField'>
                        

                        <TextField
                       
                          style={{ width: '50%' }}
                          name='name'
                          value={data?.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-3'>
                        <div
                          variant='body2'
                         className="table_content"
                        >
                          Display Name:
                        </div>
                      </div>
                      <div className='col-9 tableField'>
                        <div
                          variant='body2'
                         className="table_content"
                        ></div>
                        {console.log(data.displayName)}
                        <TextField
                        required
                          style={{ width: '50%' }}
                          name='displayName'
                          value={data?.displayName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-3'>
                        <div
                          variant='body2'
                         className="table_content"
                        >
                          Revision:
                        </div>
                      </div>
                      <div className='col-9 tableField'>
                        <div
                          variant='body2'
                         className="table_content"
                        ></div>

                        <TextField
                        required
                          style={{ width: '50%' }}
                          name='revision'
                          value={data?.revision}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-3'>
                        <div
                          variant='body2'
                         className="table_content"
                        >
                          Is disabled:
                        </div>
                      </div>
                      <div className='col-9'>
                        <Checkbox
                          name='isDisabled'
                          checked={data.isDisabled}
                          className='checkBox'
                          onChange={handleToogle}
                        />
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-3'>
                        <div
                          variant='body2'
                         className="table_content"
                        >
                          E-Submit PDF template:
                        </div>
                      </div>
                      <div className='col-9 '>
                        <select className='table_content'
                          name='eSubmitPDFTemplateId'
                          value={data?.eSubmitPDFTemplateId}
                          onChange={handleChange}
                          style={{
                            minWidth: '190px',
                            height: '30px',
                            marginRight: '10px'
                          }}
                        >
                           <option value='0'>--SELECT--</option>
                          <option value='1'>International Individual</option>
                          <option value='2'>International Entity</option>
                          <option value='3'>Custom</option>
                          <option value='4'>Generic Entity 1</option>
                          <option value='5'>Generic Entity 2</option>
                          <option value='6'>Generic Individual</option>
                        </select>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-3'>
                        <div
                          variant='body2'
                         className="table_content"
                        >
                          Print PDF template:
                        </div>
                      </div>
                      <div className='col-9'>
                        <select className='table_content'
                          name='printPDFTemplateId'
                          value={data?.printPDFTemplateId}
                          onChange={handleChange}
                          required
                          style={{
                            minWidth: '190px',
                            height: '30px',
                            marginRight: '10px'
                          }}
                        >
                           <option value='0'>--SELECT--</option>
                          <option value='1'>International Individual</option>
                          <option value='2'>International Entity</option>
                          <option value='3'>Custom</option>
                          <option value='4'>Generic Entity 1</option>
                          <option value='5'>Generic Entity 2</option>
                          <option value='6'>Generic Individual</option>
                        </select>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-3'>
                        <div
                          variant='body2'
                         className="table_content"
                        >
                          Logo
                        </div>
                      </div>
                      <div className='col-9 input-file'>
                        <Input className='fileInput' type='file' style={{fontSize:'12px'}} onChange={(e) => handleImage(e)} />
                      </div>
                    </div>

                    <div className='row'>
                      <div>
                        <div
                          variant='body2'
                         className="table_content"
                        >
                          Introduction text:
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
                            marginTop: '10px'
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
                         className="table_content"
                        >
                          TIN page text:
                        </div>
                      </div>
                      <div className='col-9 editor-div'>
                        <div>
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
                            marginTop: '10px'
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
                         className="table_content"
                        >
                          Certification text:
                        </div>
                      </div>
                      <div className='col-9 editor-div'>
                        <div>
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

                            marginTop: '10px'
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
                         className="table_content"
                        >
                          E-Signature text:
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

                            marginTop: '10px'
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
                         className="table_content"
                        >
                          E-Signature confirmation text:
                        </div>
                      </div>
                      <div className='col-9 editor-div'>
                        <div>
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
                            marginTop: '10px'
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

                    <Button
                      size='small'
                      type='submit'
                      sx={{ mr: 1 }}
                      variant='contained'
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
  )
}
