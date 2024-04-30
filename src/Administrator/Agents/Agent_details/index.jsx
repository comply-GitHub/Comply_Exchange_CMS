import React, { useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'
import Radio from '@mui/material/Radio'
import Tooltip from '@mui/material/Tooltip';
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FormLabel from '@mui/material/FormLabel'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { EditorState } from 'draft-js'
import { Fragment } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined'
import { Editor } from 'react-draft-wysiwyg'
import Utils from "../../../Utils";
import {
  TextField,
  div,
  Collapse,
  CardHeader,
  IconButton,
  CardContent,
  CardActions,
  Card,
  Divider,
  Grid,
  Breadcrumbs,Link,
  Select,
  MenuItem,
  Checkbox,
  Button,
  Input
} from '@mui/material'
import './index.scss'
import draftToHtml from 'draftjs-to-html'
import {
  convertToRaw,
  convertFromRaw,
  ContentState,
  convertFromHTML
} from 'draft-js'
import { createAgents, getAgentById, getAllCountries,getAllAgentHiddenSection, updateAgents ,getAllCountriesName,getAllLanguages,getAllAgentSkippedSteps} from '../../../redux/Actions'

// Layout

import AppHeader from '../../../Layout/AppHeader/'
import AppSidebar from '../../../Layout/AppSidebar/'
import AppFooter from '../../../Layout/AppFooter/'

// Theme Options

import ThemeOptions from '../../../Layout/ThemeOptions/'
import Info from '../../../assets/helpIcon.png';
import InfoIcon from '@mui/icons-material/Info';
import { toast } from 'react-toastify';

function UserManagement ({ match }) {
  let params = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const [checkedStatus, setCheckedStatus] = useState({});

  const [checkedStatusHidden,setCheckedStatusHidden] = useState({});
  const [selectedfile,setSelectedfile]=useState(null);

  const idAgentData = useSelector(state => state.getAgentByIdReducer)
  const countryList = useSelector(state => state?.getCountryNameReducer?.getCountryNameData)
  const language = useSelector(state => state?.getLangListReducer?.allLanguageData)
  const skippedSteps = useSelector(state => state?.getAgentSkippedReducer)
  const hiddensection = useSelector(state => state?.getAgentHiddenSectionReducer)
  
  
  console.log(hiddensection,"123")
  useEffect(() => {
   
    setEditorState1(EditorState.createEmpty())
    setEditorState2(EditorState.createEmpty())
    setEditorState3(EditorState.createEmpty())
    setEditorState4(EditorState.createEmpty())
    setEditorState5(EditorState.createEmpty())
    dispatch(getAllCountriesName());
    dispatch(getAllLanguages());
 
   
  }, [])

  useEffect(() => {
    if (params && params.id !== undefined && params.id !== null) {
      dispatch(getAllAgentSkippedSteps(params.id));
      dispatch(getAllAgentHiddenSection(params.id));
    } else {
     dispatch(getAllAgentSkippedSteps(0))
     dispatch(getAllAgentHiddenSection(0));
    }
  }, [params]);


  const [getSkippedSteps, setSkippedSteps] = useState([]);
  console.log(getSkippedSteps,"aws")
  const [getHiddenSection, setHiddenSection] = useState([]);
  console.log(getHiddenSection,"awsdcdh")

const CalculateData=()=>{
return(
  params.id
  ? {
      id: params.id,
       name:"",
       w9RequestorName:"",
       line1:"",
       line2:"",
       cityTown:"",
       stateProvince:"",
       zipPostalCode:"",
       countryId: 0,
       other:"",
       defaultSelection: "",
       defaultLanguageId: 0,
       includeDefaultEnglish: false,
       logoId: 1,
       logoNavigateURL:"",
       pdfWatermark:"",
       displayVersion: false,
       displayRenderTime: false,
       formFeedUsername:"",
       formFeedPassword:"",
       tinCheckUsername:"",
       tinCheckPassword:"",
       supportsTINValidation: "",
       continueAfterTINValidationFailure: "",
       termsAndConditions:"",
       tokenEmail:"",
       onboardingAPIActive: false,
       skipAHDPage: false,
       skipTCPage: false,
       storeCDFOnTheFly: false,
       storeCDFAndFormOnAfterFormSubmission: false,
       showUIDEntryFieldInTheEntityDetailsScreen: false,
       showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat:"",
       showUIDEntryFieldInTheEntityDetailsScreenIncludeUIDOnReferenceLine: false,
       updateCDFRecordOnTheFly: false,
       allowSecondSignatureSubmission: false,
       allowSecondSignatureSubmissionUseSameAgent: false,
       allowSecondSignatureSubmissionSecondSubmissionMandatory: false,
       includeAdditionalInformationOnESubmitPDF: false,
       showUSourcedIncomeDeclaration: false,
       showUSourcedIncomeDeclarationAndWhenNoUSSourcedIncomeHideChapter4AndDREPage: false,
       showRetroactiveStatementOnlyShowApplyForW8Forms: false,
       showRetroactiveStatementOnlyShowApplyForW8FormsRenderFullScreen: false,
       showRetroactiveStatementOnlyShowApplyForW8FormsMakeMandatory: false,
       enableSaveExitProcess: false,
       enableAllocationStatementCreation: false,
       consentToSendAnElectronic1042SOr1099: false,
       enableExemptFromBackupWithholdingPagePopUp: false,
       hideDownloadTemplateToCompleteWithholdingStatement: false,
       requestBankAccountInformation: false,
       requestBankAccountInformationAndWhenYesMakeMandatory: false,
       hideW8BENETreaty14C: false,
       forms: false,
       federalTax: false,
       singleUSOwnerDetails: false,
       taxpayerInformation_IndividualOnly: false,
       taxpayerInformation_EntityOnly: false,
       taxpayerInformation_NonUSEntityOnly: false,
       taxpayerInformation_GIIN: false,
       formSelection: false,
       w8IMYRelatedFiles: false,
       w8BENJuly2017PartIIWhenTreatyClaimNo: false,
       w8BENEPartIIIWhenTreatyClaimNo: false,
       penaltiesOfPerjuryCertification8233: false,
       electronicSignature8233: false,
       nameAndAddress: false,
       chapter3Status: false,
       usSourcedIncomeDeclarationOptional: false,
       incomeCode: false,
       unitedStatesCitizenshipStatus: false,
       unitedStatesSubstantialPresenceTestOptional: false,
       usfatcaClassification: false,
       chapter4Status: false,
       disregardedEntity: false,
       exemptionFromBackupWithholding: false,
       exemptionFromFATCAReporting: false,
       taxIdentificationNumber: false,
       specifiedUSPersonDetermination: false,
       eciIncomeReport: false,
       treatyClaim: false,
       specialRatesAndConditions: false,
       supportingDocumentationW9: false,
       supportingDocumentationBEN: false,
       supportingDocumentationBENE: false,
       supportingDocumentationIMY: false,
       supportingDocumentationEXP: false,
       penaltiesOfPerjuryCertificationW9: false,
       supportingDocumentationECI: false,
       electronicSignatureW9: false,
       penaltiesOfPerjuryCertifcationBENE: false,
       penaltiesOfPerjuryCertificationBEN: false,
       electronicSignatureBEN: false,
       penaltiesOfPerjuryCertificationIMY: false,
       electronicSignatureIMY: false,
       penaltiesOfPerjuryCertificationEXP: false,
       electronicSignatureEXP: false,
       penaltiesOfPerjuryCertificationECI: false,
       electronicSignatureECI: false,
       usTaxCertificationComplete: false,
       substantialUSPresenceTest: false,
       identificationOfBeneficialOwner: false,
       supportingDocumentation8233: false,
       penaltiesOfPerjuryCertificationSelfCertEntity: false,
       electronicSignatureSelfCertEntity: false,
       penaltiesOfPerjuryCertificationSelfCertIndividual: false,
       electronicSignatureSelfCertIndividual: false,
       w9ExemptFromBUWIndividualSolePs: false,
       residencyInformationForm: false,
       addressLine3Optional: false,
       capacitydonotshowforEntities: false,
       capacitydonotshowforIndividuals: false,
       formSelectionGuideDirectRequestQuestion: false,
       formSelectionGuideREITQuestion: false,
       generalClassification: false,
       languageDropdown: false,
       multipleTaxJurisdictions: false,
       retroactiveStatement:"",
       retroactiveEffectiveDate:"",
       doNotAcceptURL:"",
       finishURL:"",
       exitURL:"",
       saveAndExitURL:"",
       taxpayerInformation_NonUSIndividualOnly: false,
       isActive: false,
       isDeleted: false,
       smsFormat:"",
       sendSignatureProcess:"",
       byUsingEmailAndPassword: "",
       saveAndExit: "",
       description: "",
       nextAgentIntroductionText: "",
       welcomePopup: "",
       skippedSteps: getSkippedSteps,
       hiddenSections: getHiddenSection,
       hideW8ECILine12: false,
       showDownloadPDFoptiononThankYoupage: false,
       showMFormsMobileWalletFlowonThankYoupage: false,
       welcomeCodeforMFormsMobileWallet: "",
       showlandingpagewelcomepopup: false,
       includeAHDAPISimulator: false,
       makecontrollingpersonmandatory  : false,
       maximumnumberofIncomeTypesallowed: 0,
       enableVATNumberCollection : false,
       requestincometype : false,
       requestincometypeAndWhenYesMakeMandatory : false,
       byUsingEmailIDandpassword : "",
       sendforSignatureProcess  : false,
       igaProcess: false,
       nonTreatyCountry: false,
       treatyCountry: false,
       includeUIDonReferenceLine: false,
       emailTOKENURLdestination: ""
     }
   
  : {
    name:"",
    w9RequestorName:"",
    line1:"",
    line2:"",
    cityTown:"",
    stateProvince:"",
    zipPostalCode:"",
    countryId: 0,
    other:"",
    defaultSelection: "",
    defaultLanguageId: 0,
    includeDefaultEnglish: false,
    logoId: 1,
    logoNavigateURL:"",
    pdfWatermark:"",
    displayVersion: false,
    displayRenderTime: false,
    formFeedUsername:"",
    formFeedPassword:"",
    tinCheckUsername:"",
    tinCheckPassword:"",
    supportsTINValidation: "",
    continueAfterTINValidationFailure: "",
    termsAndConditions:"",
    tokenEmail:"",
    onboardingAPIActive: false,
    skipAHDPage: false,
    skipTCPage: false,
    storeCDFOnTheFly: false,
    storeCDFAndFormOnAfterFormSubmission: false,
    showUIDEntryFieldInTheEntityDetailsScreen: false,
    showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat:"",
    showUIDEntryFieldInTheEntityDetailsScreenIncludeUIDOnReferenceLine: false,
    updateCDFRecordOnTheFly: false,
    allowSecondSignatureSubmission: false,
    allowSecondSignatureSubmissionUseSameAgent: false,
    allowSecondSignatureSubmissionSecondSubmissionMandatory: false,
    includeAdditionalInformationOnESubmitPDF: false,
    showUSourcedIncomeDeclaration: false,
    showUSourcedIncomeDeclarationAndWhenNoUSSourcedIncomeHideChapter4AndDREPage: false,
    showRetroactiveStatementOnlyShowApplyForW8Forms: false,
    showRetroactiveStatementOnlyShowApplyForW8FormsRenderFullScreen: false,
    showRetroactiveStatementOnlyShowApplyForW8FormsMakeMandatory: false,
    enableSaveExitProcess: false,
    enableAllocationStatementCreation: false,
    consentToSendAnElectronic1042SOr1099: false,
    enableExemptFromBackupWithholdingPagePopUp: false,
    hideDownloadTemplateToCompleteWithholdingStatement: false,
    requestBankAccountInformation: false,
    requestBankAccountInformationAndWhenYesMakeMandatory: false,
    hideW8BENETreaty14C: false,
    forms: false,
    federalTax: false,
    singleUSOwnerDetails: false,
    taxpayerInformation_IndividualOnly: false,
    taxpayerInformation_EntityOnly: false,
    taxpayerInformation_NonUSEntityOnly: false,
    taxpayerInformation_GIIN: false,
    formSelection: false,
    w8IMYRelatedFiles: false,
    w8BENJuly2017PartIIWhenTreatyClaimNo: false,
    w8BENEPartIIIWhenTreatyClaimNo: false,
    penaltiesOfPerjuryCertification8233: false,
    electronicSignature8233: false,
    nameAndAddress: false,
    chapter3Status: false,
    usSourcedIncomeDeclarationOptional: false,
    incomeCode: false,
    unitedStatesCitizenshipStatus: false,
    unitedStatesSubstantialPresenceTestOptional: false,
    usfatcaClassification: false,
    chapter4Status: false,
    disregardedEntity: false,
    exemptionFromBackupWithholding: false,
    exemptionFromFATCAReporting: false,
    taxIdentificationNumber: false,
    specifiedUSPersonDetermination: false,
    eciIncomeReport: false,
    treatyClaim: false,
    specialRatesAndConditions: false,
    supportingDocumentationW9: false,
    supportingDocumentationBEN: false,
    supportingDocumentationBENE: false,
    supportingDocumentationIMY: false,
    supportingDocumentationEXP: false,
    penaltiesOfPerjuryCertificationW9: false,
    supportingDocumentationECI: false,
    electronicSignatureW9: false,
    penaltiesOfPerjuryCertifcationBENE: false,
    penaltiesOfPerjuryCertificationBEN: false,
    electronicSignatureBEN: false,
    penaltiesOfPerjuryCertificationIMY: false,
    electronicSignatureIMY: false,
    penaltiesOfPerjuryCertificationEXP: false,
    electronicSignatureEXP: false,
    penaltiesOfPerjuryCertificationECI: false,
    electronicSignatureECI: false,
    usTaxCertificationComplete: false,
    substantialUSPresenceTest: false,
    identificationOfBeneficialOwner: false,
    supportingDocumentation8233: false,
    penaltiesOfPerjuryCertificationSelfCertEntity: false,
    electronicSignatureSelfCertEntity: false,
    penaltiesOfPerjuryCertificationSelfCertIndividual: false,
    electronicSignatureSelfCertIndividual: false,
    w9ExemptFromBUWIndividualSolePs: false,
    residencyInformationForm: false,
    addressLine3Optional: false,
    capacitydonotshowforEntities: false,
    capacitydonotshowforIndividuals: false,
    formSelectionGuideDirectRequestQuestion: false,
    formSelectionGuideREITQuestion: false,
    generalClassification: false,
    languageDropdown: false,
    multipleTaxJurisdictions: false,
    retroactiveStatement:"",
    retroactiveEffectiveDate:"",
    doNotAcceptURL:"",
    finishURL:"",
    exitURL:"",
    saveAndExitURL:"",
    taxpayerInformation_NonUSIndividualOnly: false,
    isActive: false,
    isDeleted: false,
   
    smsFormat:"",
    sendSignatureProcess:"",
    byUsingEmailAndPassword: "",
    saveAndExit: "",
    description: "",
    nextAgentIntroductionText: "",
    welcomePopup: "",
    skippedSteps:  getSkippedSteps,
    hiddenSections: getHiddenSection,
    hideW8ECILine12: false,
    showDownloadPDFoptiononThankYoupage: false,
    showMFormsMobileWalletFlowonThankYoupage: false,
    welcomeCodeforMFormsMobileWallet: "",
    showlandingpagewelcomepopup: false,
    includeAHDAPISimulator: false,
    makecontrollingpersonmandatory  : false,
    maximumnumberofIncomeTypesallowed: 0,
    enableVATNumberCollection : false,
    requestincometype : false,
    requestincometypeAndWhenYesMakeMandatory : false,
    byUsingEmailIDandpassword : "",
    sendforSignatureProcess  : false,
    igaProcess: false,
    nonTreatyCountry: false,
    treatyCountry: false,
    includeUIDonReferenceLine: false,
    emailTOKENURLdestination: ""
    }
)
 }

  const [data, setData] = useState(CalculateData())

  useEffect(()=>{
    console.log(getSkippedSteps,getHiddenSection,"11111")
    // setData(CalculateData())
    
  },[getSkippedSteps,getHiddenSection])
  
  useEffect(()=>{
    console.log(data,"qwww")
  },[data])

  const [submit, setSubmit] = useState(1)
  

  const handleFile = event => {
    const selectedSubmit = event.target.value
    setSubmit(selectedSubmit)
  }

  const [open, setOpen] = useState('')
  const [editorState1, setEditorState1] = useState(EditorState.createEmpty())
  const [editorState2, setEditorState2] = useState(EditorState.createEmpty())
  const [editorState3, setEditorState3] = useState(EditorState.createEmpty())
  const [editorState4, setEditorState4] = useState(EditorState.createEmpty())
  const [editorState5, setEditorState5] = useState(EditorState.createEmpty())
  const [editorState6, setEditorState6] = useState(EditorState.createEmpty())
  const [editorState7, setEditorState7] = useState(EditorState.createEmpty())
 
 
  useEffect(() => {
    if (params.id) {
      dispatch(
        getAgentById(params.id, data => {
          setData({...data,logoId:data?.logoId==0?1:data?.logoId})
          console.log(data,"iio")
        })
      )
    }
  }, [params.id])


  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState1.getCurrentContent()));
    setData({ ...data, termsAndConditions: html });
  }, [editorState1]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState2.getCurrentContent()));
    setData({ ...data, tokenEmail: html });
  }, [editorState2]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState3.getCurrentContent()));
    setData({ ...data, sendSignatureProcess: html });
  }, [editorState3]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState4.getCurrentContent()));
    setData({ ...data, byUsingEmailAndPassword: html });
  }, [editorState4]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState5.getCurrentContent()));
    setData({ ...data, saveAndExit: html });
  }, [editorState5]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState6.getCurrentContent()));
    setData({ ...data, Description: html });
  }, [editorState6]);

  useEffect(() => {
    let html = draftToHtml(convertToRaw(editorState7.getCurrentContent()));
    setData({ ...data, SMSFormat : html });
  }, [editorState7]);

 
  useEffect(() => {
    const plainText = data?.pageContent
    // Component mounted, initialize the editor states
    setEditorState1(
      data?.termsAndConditions
        ? () => {
            const blocksFromHTML = convertFromHTML(
              data?.termsAndConditions
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
      data?.tokenEmail
        ? () => {
            const blocksFromHTML = convertFromHTML(
              data?.tokenEmail
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
      idAgentData?.agentDataById?.sendSignatureProcess
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idAgentData?.agentDataById?.sendSignatureProcess
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
      idAgentData?.agentDataById?.byUsingEmailAndPassword
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idAgentData?.agentDataById?.byUsingEmailAndPassword
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
      data.saveAndExit
        ? () => {
            const blocksFromHTML = convertFromHTML(
              data.saveAndExit
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
    setEditorState6(
      idAgentData?.agentDataById?.Description 
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idAgentData?.agentDataById?.Description 
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
    setEditorState7(
      idAgentData?.agentDataById?.SMSFormat 
        ? () => {
            const blocksFromHTML = convertFromHTML(
              idAgentData?.agentDataById?.SMSFormat 
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
  }, [idAgentData])

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
  const handleEditorStateChange6 = editorState => {
    setEditorState6(editorState)
  }

  const handleEditorStateChange7 = editorState => {
    setEditorState7(editorState)
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

  const convertToHtml7 = () => {
    const contentState = editorState7.getCurrentContent()
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
      editorState7,
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

  const handleOpen = val => {
    if (open === val) {
      setOpen('')
    } else setOpen(val)
  }

  const handleChange = e => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleToggle = (property) => {
    setData((data) => ({ ...data, [property]: !data[property] }));
  };
  



 

  function filterSkippedTypeId(objectsArray) {
    return objectsArray
      ?.filter((obj) => obj?.agentId !== 0)
      ?.map((obj) => obj.id);
  }
  useEffect(() => {
    setSkippedSteps(filterSkippedTypeId( skippedSteps?.skippedStepsData));
  }, [skippedSteps]);

  function filterHiddenTypeId(objectsArray) {
    return objectsArray
      ?.filter((obj) => obj?.agentId !== 0)
      ?.map((obj) => obj.id);
  }
  useEffect(() => {
    setHiddenSection(filterHiddenTypeId( hiddensection?.hiddenSectionData));
  }, [hiddensection]);


  function handleToggleIds(clientId, selectedData, setSelectedData) {
    let selectedClients = selectedData;
    const index = selectedClients?.indexOf(clientId);
    if (index >= 0) {
      selectedClients.splice(index, 1);
    } else {
      selectedClients.push(clientId);
    }
   
    setSelectedData(selectedClients);
  }


// const handleToggleDataIds = (clientId) => {
//   setCheckedStatusHidden ((prevCheckedStatus) => {
//     return {
//       ...prevCheckedStatus,
//       [clientId]: !prevCheckedStatus[clientId], 
//     };
//   });

//   setSkippedSteps((prevHiddenSection) => {
//     const index = prevHiddenSection.indexOf(clientId);
//     if (index >= 0) {
//       return prevHiddenSection.filter((id) => id !== clientId);
//     } else {
//       return [...prevHiddenSection, clientId];
//     }
//   });
// };

 const handleFileSelect=(e)=>{
  setSelectedfile(e.target.files[0]);
 }

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(data.tokenEmail)
    const checkedItems = skippedSteps?.skippedStepsData
    .filter((item) => checkedStatus?.[item.id] || item.agentId !== 0)
    .map((item) => item.id);
    const checkedHiddenItems =  hiddensection?.hiddenSectionData
    .filter((item) => checkedStatusHidden?.[item.id] || item.agentId !== 0)
    .map((item) => item.id);

    if(selectedfile!=null){
      if(selectedfile?.type!=="image/png"){
        toast.error("Please select png image")
        return
      }
    }
    console.log(data,"1111")
  
      const updateData= {
        id: params.id,
        name:data?.name,
        w9RequestorName:data?.w9RequestorName,
        line1:data?.line1,
        line2:data?.line2,
        cityTown:data?.cityTown,
        stateProvince:data?.stateProvince,
        zipPostalCode:data?.zipPostalCode,
        countryId: data?.countryId,
        other:data?.other,
        defaultSelection: data?.defaultSelection,
        defaultLanguageId: data?.defaultLanguageId,
        includeDefaultEnglish: data?.includeDefaultEnglish,
        logoId: data?.logoId,
        logo: selectedfile,
        logoNavigateURL:data?.logoNavigateURL,
        pdfWatermark:data?.pdfWatermark,
        displayVersion: data?.displayVersion,
        displayRenderTime: data?.displayRenderTime,
        formFeedUsername:data?.formFeedUsername,
        formFeedPassword:data?.formFeedPassword,
        tinCheckUsername:data?.tinCheckUsername,
        tinCheckPassword:data?.tinCheckPassword,
        supportsTINValidation: data?.supportsTINValidation,
        continueAfterTINValidationFailure: data?.continueAfterTINValidationFailure,
        termsAndConditions:data?.termsAndConditions,
        tokenEmail:data?.tokenEmail,
        onboardingAPIActive: data?.onboardingAPIActive,
        skipAHDPage: data?.skipAHDPage,
        skipTCPage: data?.skipTCPage,
        storeCDFOnTheFly: data?.storeCDFOnTheFly,
        storeCDFAndFormOnAfterFormSubmission: data?.storeCDFAndFormOnAfterFormSubmission,
        showUIDEntryFieldInTheEntityDetailsScreen: data?.showUIDEntryFieldInTheEntityDetailsScreen,
        showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat:data?.showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat,
        showUIDEntryFieldInTheEntityDetailsScreenIncludeUIDOnReferenceLine: data?.showUIDEntryFieldInTheEntityDetailsScreenIncludeUIDOnReferenceLine,
        updateCDFRecordOnTheFly: data?.updateCDFRecordOnTheFly,
        allowSecondSignatureSubmission: data?.allowSecondSignatureSubmission,
        allowSecondSignatureSubmissionUseSameAgent: data?.allowSecondSignatureSubmissionUseSameAgent,
        allowSecondSignatureSubmissionSecondSubmissionMandatory: data?.allowSecondSignatureSubmissionSecondSubmissionMandatory,
        includeAdditionalInformationOnESubmitPDF: data?.includeAdditionalInformationOnESubmitPDF,
        showUSourcedIncomeDeclaration: data?.showUSourcedIncomeDeclaration,
        showUSourcedIncomeDeclarationAndWhenNoUSSourcedIncomeHideChapter4AndDREPage: data?.showUSourcedIncomeDeclarationAndWhenNoUSSourcedIncomeHideChapter4AndDREPage,
        showRetroactiveStatementOnlyShowApplyForW8Forms: data?.showRetroactiveStatementOnlyShowApplyForW8Forms,
        showRetroactiveStatementOnlyShowApplyForW8FormsRenderFullScreen: data?.showRetroactiveStatementOnlyShowApplyForW8FormsRenderFullScreen,
        showRetroactiveStatementOnlyShowApplyForW8FormsMakeMandatory: data?.showRetroactiveStatementOnlyShowApplyForW8FormsMakeMandatory,
        enableSaveExitProcess: data?.enableSaveExitProcess,
        enableAllocationStatementCreation: data?.enableAllocationStatementCreation,
        consentToSendAnElectronic1042SOr1099: data?.consentToSendAnElectronic1042SOr1099,
        enableExemptFromBackupWithholdingPagePopUp: data?.enableExemptFromBackupWithholdingPagePopUp,
        hideDownloadTemplateToCompleteWithholdingStatement: data?.hideDownloadTemplateToCompleteWithholdingStatement,
        requestBankAccountInformation: data?.requestBankAccountInformation,
        requestBankAccountInformationAndWhenYesMakeMandatory: data?.requestBankAccountInformationAndWhenYesMakeMandatory,
        hideW8BENETreaty14C: data?.hideW8BENETreaty14C,
        forms: data?.forms,
        federalTax: data?.federalTax,
        singleUSOwnerDetails: data?.singleUSOwnerDetails,
        taxpayerInformation_IndividualOnly: data?.taxpayerInformation_IndividualOnly,
        taxpayerInformation_EntityOnly: data?.taxpayerInformation_EntityOnly,
        taxpayerInformation_NonUSEntityOnly: data?.taxpayerInformation_NonUSEntityOnly,
        taxpayerInformation_GIIN: data?.taxpayerInformation_GIIN,
        termsAndConditions:data?.termsAndConditions,
        formSelection: data?.formSelection,
        w8IMYRelatedFiles: data?.w8IMYRelatedFiles,
        w8BENJuly2017PartIIWhenTreatyClaimNo: data?.w8BENJuly2017PartIIWhenTreatyClaimNo,
        w8BENEPartIIIWhenTreatyClaimNo: data?.w8BENEPartIIIWhenTreatyClaimNo,
        penaltiesOfPerjuryCertification8233: data?.penaltiesOfPerjuryCertification8233,
        electronicSignature8233: data?.electronicSignature8233,
        nameAndAddress: data?.nameAndAddress,
        chapter3Status: data?.chapter3Status,
        usSourcedIncomeDeclarationOptional: data?.usSourcedIncomeDeclarationOptional,
        incomeCode: data?.incomeCode,
        unitedStatesCitizenshipStatus: data?.unitedStatesCitizenshipStatus,
        unitedStatesSubstantialPresenceTestOptional: data?.unitedStatesSubstantialPresenceTestOptional,
       
        retroactiveStatement:data?.retroactiveStatement,
        retroactiveEffectiveDate:data?.retroactiveEffectiveDate,
        doNotAcceptURL:data?.doNotAcceptURL,
        finishURL:data?.finishURL,
        exitURL:data?.exitURL,
        saveAndExitURL:data?.saveAndExitURL,
        taxpayerInformation_NonUSIndividualOnly: data?.taxpayerInformation_NonUSIndividualOnly,
        isActive: data?.isActive,
        isDeleted: data?.isDeleted,
        smsFormat:data?.smsFormat,
        sendSignatureProcess:data?.sendSignatureProcess,
        byUsingEmailAndPassword: data?.byUsingEmailAndPassword,
        saveAndExit: data?.saveAndExit,
        description: data?.description,
        nextAgentIntroductionText: data?.nextAgentIntroductionText,
      
        skippedSteps: getSkippedSteps,
        hiddenSections: getHiddenSection,
        hideW8ECILine12: data?.hideW8ECILine12,
        showDownloadPDFoptiononThankYoupage: data?.showDownloadPDFoptiononThankYoupage,
        showMFormsMobileWalletFlowonThankYoupage: data?.showMFormsMobileWalletFlowonThankYoupage,
        welcomeCodeforMFormsMobileWallet: data?.welcomeCodeforMFormsMobileWallet,
        showlandingpagewelcomepopup: data?.showlandingpagewelcomepopup,
        includeAHDAPISimulator: data?.includeAHDAPISimulator,
        makecontrollingpersonmandatory  : data?.makecontrollingpersonmandatory  ,
        maximumnumberofIncomeTypesallowed: data?.maximumnumberofIncomeTypesallowed,
        enableVATNumberCollection : data?.enableVATNumberCollection ,
        requestincometype : data?.requestincometype ,
        requestincometypeAndWhenYesMakeMandatory : data?.requestincometypeAndWhenYesMakeMandatory ,
        byUsingEmailIDandpassword : data?.byUsingEmailIDandpassword ,
        sendforSignatureProcess  : data?.sendforSignatureProcess  ,
        igaProcess: data?.igaProcess,
        nonTreatyCountry: data?.nonTreatyCountry,
        treatyCountry: data?.treatyCountry,
        includeUIDonReferenceLine: data?.includeUIDonReferenceLine,
        emailTOKENURLdestination: data?.emailTOKENURLdestination
      };
      setData(updateData);
     
      if (params.id) {
        dispatch(updateAgents(updateData));
      } else {
        dispatch(createAgents(updateData));
      }
  
      history.push(Utils.Pathname.agents);
    };
   
  return (
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
                  onClick={()=>{history.push("/agent")}}
                  
                >
                  Agents
                </Link>
                <p
                   underline="hover"
                  color="#000000"
                  
                  
                  
                >
                  Agent Details
                </p>
              </Breadcrumbs>
            </div>
            <form  onSubmit={e => handleSubmit(e)} className=' mx-3 my-2'>
              <div className='row flex-column  card p-4'>
                <div className=' col-10 expend-card'>
                  <CardHeader
                    className=''
                    title='Agent Detail & Domain Identification'
                    action={
                      <IconButton
                        onClick={() => handleOpen('testCollaple1')}
                        aria-label='expand'
                        size='small'
                      >
                        {open === 'testCollaple1' ? (
                          <RemoveCircleOutlineOutlinedIcon />
                        ) : (
                          <ControlPointOutlinedIcon />
                        )}
                      </IconButton>
                    }
                  ></CardHeader>
                  <Collapse
                    style={{ backgroundColor: 'white' }}
                    className='px-5'
                    in={open === 'testCollaple1'}
                    timeout='auto'
                    unmountOnExit
                  >
                    <div className='row mx-2 my-1 py-0 '>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                        
                        >
                          Name:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                        className='text textFieldClass'
                          fullWidth
                          name="name"
                          value={data?.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          W9 Requestor Name:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='w9RequestorName'
                          value={data?.w9RequestorName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Line 1:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='line1'
                          value={data?.line1}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Line 2:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='line2'
                          value={data?.line2}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          City / Town:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='cityTown'
                          value={data?.cityTown}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          State / Province:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='stateProvince'
                          onChange={handleChange}
                          value={data?.stateProvince}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Zip / Postal Code:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='zipPostalCode'
                          value={data?.zipPostalCode}
                         onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Country:
                        </div>
                      </div>
                      <div className='col-7 '>
                        <Select className='selectBox text' fullWidth name='countryId'  defaultValue={0}  onChange={(e) => {
                                handleChange(e);
                              }}
                              value={data.countryId}>
                        <MenuItem value={0}>-Select-</MenuItem>
                        {countryList?.map(
                                (ele) => (
                                  <MenuItem key={ele?.id} value={ele?.id}>
                                    {ele?.name}
                                  </MenuItem>
                                )
                              )}
                        </Select>
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Other:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField  className='text textFieldClass'fullWidth name='other' value={data?.other} onChange = { handleChange }
/>
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Default Selection:
                        </div>
                      </div>
                      <div className='col-7'>
                        <FormControl>
                          <RadioGroup
                            className='d-flex flex-row table_content'
                            aria-labelledby='demo-radio-buttons-group-label'
                           
                            id='defaultSelection'
                            name='defaultSelection'
                            value={data?.defaultSelection}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                            className='table_content'
                              value='entity'
                              control={<Radio />}
                              label='Entity'
                            />
                            <FormControlLabel
                              value='individual'
                              control={<Radio />}
                              label='Individual'
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  </Collapse>
                </div>
                <div className=' col-10 mt-1 expend-card '>
                  <CardHeader
                    className=''
                    title='Look & Feel'
                    action={
                      <IconButton
                        onClick={() => handleOpen('testCollaple2')}
                        aria-label='expand'
                        size='small'
                      >
                        {open === 'testCollaple2' ? (
                          <RemoveCircleOutlineOutlinedIcon />
                        ) : (
                          <ControlPointOutlinedIcon />
                        )}
                      </IconButton>
                    }
                  ></CardHeader>
                  <Collapse
                    style={{ backgroundColor: 'white' }}
                    className='px-5'
                    in={open === 'testCollaple2'}
                    timeout='auto'
                    unmountOnExit
                  >
                    <div className='row  mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Default Language:
                        </div>
                      </div>
                      <div className='col-7'>
                      <Select className='selectBox text' fullWidth name='defaultLanguageId'  defaultValue={0}  onChange={(e) => {
                                handleChange(e);
                              }}
                              value={data.defaultLanguageId}>
                        <MenuItem value={0}>-Select-</MenuItem>
                        {language?.map(
                                (ele) => (
                                  <MenuItem key={ele?.id} value={ele?.id}>
                                    {ele?.name}
                                  </MenuItem>
                                )
                              )}
                        </Select>
                       
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Include Default English:
                        </div>
                      </div>
                      <div className='col-7'>
                        <Checkbox
                        
                        name='includeDefaultEnglish'
                        value={data?.includeDefaultEnglish}
                        onClick={()=>handleToggle("includeDefaultEnglish")}
                        checked={data?.includeDefaultEnglish}
                        />
                        {/* <TextField
                           fullWidth
                         className='text textFieldClass'
                          name='includeDefaultEnglish'
                          value={data?.includeDefaultEnglish}
                          onChange={handleChange}
                        /> */}
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'    
                        >
                          Logo: <span >
    <Tooltip  title="Recommended dimensions: 200px X 43px" arrow>
<img src={Info} className='logo mx-1' />
</Tooltip>
</span>
                        </div>
                      </div>
                      <div className='col-7  justify-content-between d-flex input-file'>
                        <Select
                        defaultValue={0}
                        className='text'
                        name="logoId"
                        value={data?.logoId}

                          onChange={(e)=>{handleFile(e); handleChange(e)}}
                          style={{
                            minWidth: '140px',
                            height: '30px',
                            marginRight: '10px'
                          }}
                        >
                          <MenuItem value={0}>--Select--</MenuItem>
                          <MenuItem value={1}>Keep Existing</MenuItem>
                          <MenuItem value={2}>Upload</MenuItem>
                          <MenuItem value={3}>Remove</MenuItem>
                        </Select>

                        {submit === 2 && (
                          <Input name='logoFile' style={{ fontSize: '13px' }} type='file' onChange={(e)=>handleFileSelect(e)} />
                        )}
                        <span className='my-auto text mx-2'>
                          <a>View..</a>
                        </span>
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Logo Navigate URL:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='logoNavigateURL'
                          value={data?.logoNavigateURL}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          PDF watermark:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='pdfWatermark'
                          value={data?.pdfWatermark}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Custom stylesheet:
                        </div>
                      </div>
                      <div className='col-7'>
                        <Card className='card-box' >
                          <CardContent>
                            <div
                              gutterBottom
                              className='heading customUpload'
                            >
                              Uploaded files
                            </div>
                          </CardContent>
                          <CardActions className='input-file'>
                            <Input style={{ fontSize: '11px' }} type='file' />
                            <span>
                              <div className='d-flex justify-content-end'>
                                <Button className='my-auto text'>
                                  {' '}
                                  <DeleteIcon />
                                </Button>
                              </div>
                            </span>

                            <Button
                             variant='contained'
                              style={{ float: 'right', fontSize: '8px' }}
                            >
                              Add
                            </Button>
                          </CardActions>
                        </Card>
                      </div>
                    </div>
                    <div className='row mx-2 my-2'>
                      <div className='col-12 my-2 '>
                        <div className="text"  color='text.secondary'>
                          Add any custom CSS files to further customize the look
                          and feel.
                        </div>
                       
                          <li className="text">
                            Custom CSS files will be loaded after the default
                            stylesheets.
                          </li>
                          <li className="text">
                            When multiple custom CSS files are uploaded, they
                            will be loaded in alphabetical order.
                          </li>
                          <li className="text">
                            Any images or fonts uploaded here should be
                            referenced from the CSS file(s) using relative
                            paths.
                          </li>
                     
                      </div>
                    </div>
                    <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Display Version:
                        </div>
                      </div>
                      <div className='col-7'>
                        <Checkbox
                          name='displayVersion'
                          onClick={()=>handleToggle("displayVersion")}
                          checked={data?.displayVersion}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Display Render Time:
                        </div>
                      </div>
                      <div className='col-7'>
                        <Checkbox
                        id='displayRenderTime'
                          name='displayRenderTime'
                          onClick={()=>handleToggle("displayRenderTime")}
                          checked={data?.displayRenderTime}
                        />
                      </div>
                    </div>
                    {/* <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Display Quick Edit Icons on forms:
                        </div>
                      </div>
                      <div className='col-7'>
                        <Checkbox defaultChecked={true} />
                      </div>
                    </div> */}
                  </Collapse>
                </div>
                <div className='col-10 mt-1 expend-card'>
                  <CardHeader
                    className=''
                    title="User ID's & Passwords"
                    action={
                      <IconButton
                        onClick={() => handleOpen('testCollaple3')}
                        aria-label='expand'
                        size='small'
                      >
                        {open === 'testCollaple3' ? (
                          <RemoveCircleOutlineOutlinedIcon />
                        ) : (
                          <ControlPointOutlinedIcon />
                        )}
                      </IconButton>
                    }
                  ></CardHeader>
                  <Collapse
                    style={{ backgroundColor: 'white' }}
                    className='px-5'
                    in={open === 'testCollaple3'}
                    timeout='auto'
                    unmountOnExit
                  >
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Form feed username:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass' 
                          fullWidth
                          name='formFeedUsername'
                          value={data?.formFeedUsername}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Form feed password:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='formFeedPassword'
                          value={data?.formFeedPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          TIN check username:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                     className='text textFieldClass'
                          fullWidth
                          name='tinCheckUsername'
                          value={data?.tinCheckUsername}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          TIN check password:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField
                         className='text textFieldClass'
                          fullWidth
                          name='tinCheckPassword'
                          value={data?.tinCheckPassword}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Supports TIN validation:
                        </div>
                      </div>
                      <div className='col-7'>
                        <FormControl>
                          <RadioGroup
                          className='d-flex flex-row'
                          aria-labelledby='demo-radio-buttons-group-label'
                         id="supportsTINValidation"
                          name='supportsTINValidation'
                          onChange={handleChange}
                          value={data?.supportsTINValidation}
                        >
                          <FormControlLabel
                            value='yes'
                            control={<Radio />}
                            label='Yes'
                          />
                          <FormControlLabel
                            value='no'
                            control={<Radio />}
                            label='No'
                          />
                        </RadioGroup>
                         
                        </FormControl>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Continue after TIN validation failure:
                        </div>
                      </div>
                      <div className='col-7 d-flex'>
                        <FormControl className='w-75' >
                          <RadioGroup
                          id="continueAfterTINValidationFailure"
                          className='d-flex flex-row'
                         
                          aria-labelledby='demo-radio-buttons-group-label'
                          value={data?.continueAfterTINValidationFailure} 
                          name='continueAfterTINValidationFailure'
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value='yes'
                            control={<Radio />}
                            label='Yes'
                          />
                          <FormControlLabel
                            value='no'
                            control={<Radio />}
                            label='No'
                          />
                        </RadioGroup>
                          {/* <Checkbox
                            name='continueAfterTINValidationFailure'
                            onClick={e => handleToggle(e)}
                            checked={data?.continueAfterTINValidationFailure}
                          /> */}
                        </FormControl>
                        <p className='text' style={{width: '-webkit-fill-available' ,margin: "auto",}}>(Max 2 attempts allowed per TIN per 24 hours)</p>
                      </div>
                    </div>

                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Email "TOKEN" URL destination:
                        </div>
                      </div>
                      <div className='col-7'>
                        <TextField  className='text textFieldClass'fullWidth name='emailTOKENURLdestination' value={data?.emailTOKENURLdestination} onChange={handleChange} />
                      </div>
                    </div>
                  </Collapse>
                </div>

                <div className='row col-8 mt-2'>
                    <div className='col-12 editor-div headings'>
                      <lable>Description:</lable>
                      <div
                        style={{
                         
                          backgroundColor: '#ffff'
                        }}
                      >
                        <Editor
                          wrapperClassName='wrapper-class'
                          editorClassName='editor-class'
                          toolbarClassName='toolbar-class'
                          editorState={editorState6}
                          onEditorStateChange={handleEditorStateChange6}
                        />
                      <div
                        style={{
                          display: 'flex',
                          
                          marginTop: '5px'
                        }}
                      >
                        <div>
                          {' '}
                          <button type='button' onClick={convertToHtml6}>
                            HTML
                          </button>
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                          {' '}
                          <button type='button' onClick={convertToPlainText6}>
                            Text
                          </button>
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                          <button type='button' onClick={convertToPreview6}>
                            Preview
                          </button>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>
               
              
                  <div className='row col-8 mt-2'>
                    <div className='col-12 editor-div headings'>
                      <lable>Terms and conditions:</lable>
                      <div
                        style={{
                         
                          backgroundColor: '#ffff'
                        }}
                      >
                        <Editor
                          wrapperClassName='wrapper-class'
                          editorClassName='editor-class'
                          toolbarClassName='toolbar-class'
                          editorState={editorState1}
                          onEditorStateChange={handleEditorStateChange1}
                        />
                      <div
                        style={{
                          display: 'flex',
                          
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
                  </div>
               
              
                  <div className='row col-8 mt-2'>
                    <div className='col-12 editor-div headings'>
                      <lable>"TOKEN" Email:</lable>
                      <div
                        style={{
                          backgroundColor: '#ffff'
                        }}
                      >
                        <Editor
                          wrapperClassName='wrapper-class'
                          editorClassName='editor-class'
                          toolbarClassName='toolbar-class'
                          editorState={editorState2}
                          onEditorStateChange={handleEditorStateChange2}
                        />
                        {/* <lable>
                The TOKEN email must contain the placeholder ##TOKEN##. This will be replaced with the actual TOKEN when the confirmation email is sent</lable> */}
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
                          <button type='button' onClick={convertToHtml2}>
                            HTML
                          </button>
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                          {' '}
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
                             <lable className="label"> 
                The TOKEN email must contain the placeholder ##TOKEN##. This will be replaced with the actual TOKEN when the confirmation email is sent</lable> 
                    </div>
                  </div>
                  <div className='row col-8 mt-2'>
                    <div className='col-12 editor-div headings'>
                      <lable>"TOKEN" SMS:</lable>
                      <div
                        style={{
                          backgroundColor: '#ffff'
                        }}
                      >
                        <Editor
                          wrapperClassName='wrapper-class'
                          editorClassName='editor-class'
                          toolbarClassName='toolbar-class'
                          editorState={editorState7}
                          onEditorStateChange={handleEditorStateChange7}
                        />
                        {/* <lable>
                The TOKEN email must contain the placeholder ##TOKEN##. This will be replaced with the actual TOKEN when the confirmation email is sent</lable> */}
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
                          <button type='button' onClick={convertToHtml7}>
                            HTML
                          </button>
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                          {' '}
                          <button type='button' onClick={convertToPlainText7}>
                            Text
                          </button>
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                          <button type='button' onClick={convertToPreview7}>
                            Preview
                          </button>
                        </div>
                      </div>
                             <lable className="label"> 
                The TOKEN sms must contain the placeholder ##TOKEN##. This will be replaced with the actual TOKEN when the confirmation email is sent</lable> 
                    </div>
                  </div>
            
                  <div className='col-8 row mt-2'>
                    <div className='col-12 editor-div headings'>
                      <lable>Send for Signature Process(Continuation URL):
                </lable>
                      <div
                        style={{
                          backgroundColor: '#ffff'
                        }}
                      >
                        <Editor
                          wrapperClassName='wrapper-class'
                          editorClassName='editor-class'
                          toolbarClassName='toolbar-class'
                          editorState={editorState3}
                          onEditorStateChange={handleEditorStateChange3}
                        />
                        {/* <lable>The Send For Signatory email must contain the placeholder ##URL Link## , ##Name of signatory## , ##Name of the person who filled out the form## , ##Email address of the contact##. This will be replaced with the actual Continuation URL, Name of signatory ,Name of the person who filled out the form, Email address of the contact when the email is sent</lable> */}
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
                       <lable className="label">The Send For Signatory email must contain the placeholder ##URL Link## , ##Name of signatory## , ##Name of the person who filled out the form## , ##Email address of the contact##. This will be replaced with the actual Continuation URL, Name of signatory ,Name of the person who filled out the form, Email address of the contact when the email is sent</lable>
                    </div>
                  </div>
           
                  <div className='col-8 row mt-2'>
                    <div className='col-12 editor-div headings'>
                      <lable>By Using Email ID and password:</lable>
                      <div
                        style={{
                          backgroundColor: '#ffff'
                        }}
                      >
                        <Editor
                          wrapperClassName='wrapper-class'
                          editorClassName='editor-class'
                          toolbarClassName='toolbar-class'
                          editorState={editorState4}
                          onEditorStateChange={handleEditorStateChange4}
                        />
                        {/* <label>The Send For Signatory email must contain the placeholder ##URL Link## , ##Name of signatory## , ##Name of the person who filled out the form## , ##Email address of the contact##. This will be replaced with the actual Continuation URL, Name of signatory ,Name of the person who filled out the form, Email address of the contact when the email is sent</label> */}
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
                        <lable  className="label">The Send For Signatory email must contain the placeholder ##URL Link## , ##Name of signatory## , ##Name of the person who filled out the form## , ##Email address of the contact##. This will be replaced with the actual Continuation URL, Name of signatory ,Name of the person who filled out the form, Email address of the contact when the email is sent</lable> 
                    </div>
               
                </div>
                
                  <div className='row col-8 mt-2'>
                    <div className='col-12 editor-div headings'>
                      <lable>"SaveAndExit" Email:</lable>
                      <div
                        style={{
                          backgroundColor: '#ffff'
                        }}
                      >
                        <Editor
                          wrapperClassName='wrapper-class'
                          editorClassName='editor-class'
                          toolbarClassName='toolbar-class'
                          editorState={editorState5}
                          onEditorStateChange={handleEditorStateChange5}
                        />
                        {/* <lable>The SaveAndExit email must contain the placeholder ##URL Link## and ##URL Link1##. This will be replaced with the actual Continuation URL when the email is sent</lable> */}
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
                      <lable  className="label"> The SaveAndExit email must contain the placeholder ##URL Link## and ##URL Link1##. This will be replaced with the actual Continuation URL when the email is sent</lable>
                    </div>
                  </div>
            
                <div className=' col-10 expend-card mt-2'>
                  <CardHeader
                    className=''
                    title='Process Options'
                    action={
                      <IconButton
                        onClick={() => handleOpen('testCollaple4')}
                        aria-label='expand'
                        size='small'
                      >
                        {open === 'testCollaple4' ? (
                          <RemoveCircleOutlineOutlinedIcon />
                        ) : (
                          <ControlPointOutlinedIcon />
                        )}
                      </IconButton>
                    }
                  ></CardHeader>
                  <Collapse
                    className='px-5'
                    in={open === 'testCollaple4'}
                    timeout='auto'
                    unmountOnExit
                  >
                    <div className='row mx-2 my-1 py-0'>
                      <div className='col-4 d-flex'>
                        <div
                          className='my-auto text'
                          
                          sx={{ fontWeight: 200, opacity: '.8 !important' }}
                        >
                          Client Onboarding - Skip AHD Page:
                        </div>
                      </div>
                      <div className='col-7 mx-4 d-flex'>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            Onboarding API Active:
                          </div>
                          <Checkbox
                          id='onboardingAPIActive'
                            name='onboardingAPIActive'
                            onClick={()=>handleToggle("onboardingAPIActive")}
                            checked={data?.onboardingAPIActive}
                          />
                        </div>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            Skip AHD Page:
                          </div>
                          <Checkbox
                            id='skipAHDPage'

                            name='skipAHDPage'
                            onClick={()=>handleToggle("skipAHDPage")}
                            checked={data?.skipAHDPage}
                          />
                        </div>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            Skip T&C Page:
                          </div>
                          <Checkbox
                            name='skipTCPage'
                            onClick={()=>handleToggle("skipTCPage")}
                            value={data?.skipTCPage}
                            checked={data?.skipTCPage}
                          />
                           <span  >
                           <Tooltip  title="Note: The skip AHD page is only activated when used in conjunction with a client onboarding process. Checking the box here will modify the submission process so that information (Name/Address/Contact Details) captured in the client onboarding is used in place of capturing on the ADH information. Checking the skip T&C’s box will similarly remove the Comply T&C’s section from the submission process, relying on client T&C’s.”" arrow>
  
  <img src={Info} className='svg mx-1' />
  </Tooltip></span>

                        </div>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Store CDF on the fly:
                        </div>
                        <Checkbox
                          id="storeCDFOnTheFly"
                          name='storeCDFOnTheFly'
                          onClick={()=>handleToggle("storeCDFOnTheFly")}
                        
                          checked={data?.storeCDFOnTheFly}
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Store CDF and Form on after form Submission:
                        </div>
                        <Checkbox
                        id="storeCDFAndFormOnAfterFormSubmission"
                          name='storeCDFAndFormOnAfterFormSubmission'
                          onClick={()=>handleToggle("storeCDFAndFormOnAfterFormSubmission")}
                          checked={data?.storeCDFAndFormOnAfterFormSubmission}
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            Show UID entry field in the entity details screen:
                          </div>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            ** This function overwrites system generated UID **
                          </div>
                        </div>
                        <Checkbox
                        id='showUIDEntryFieldInTheEntityDetailsScreen'
                          name='showUIDEntryFieldInTheEntityDetailsScreen'
                          onClick={()=>handleToggle("showUIDEntryFieldInTheEntityDetailsScreen")}
                          checked={
                            data?.showUIDEntryFieldInTheEntityDetailsScreen
                          }
                        />
                      </div>
                      <div className='col-7 d-flex'>
                        <div className='d-flex formatClass'>
                          <div
                            className='my-auto text mx-1'
                            
                            
                          >
                            Required Format:
                          </div>
                         <div>
                         <TextField
                          className='mt-8 text textFieldClassName'
                            name='showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat'
                            value={
                              data?.showUIDEntryFieldInTheEntityDetailsScreenRequiredFormat
                            }
                           onChange={handleChange}
                          />
                   
                    <span>
  <Tooltip title={`Required Format is:
          9- Numeric value only
          A- Alphabetic character only
          *- Alphanumeric character only
          ?- Characters optional after this`}>
    <img src={Info} className='svg' />
  </Tooltip>
</span>
                         </div>
                        </div>
                        <div className='d-flex mx-3'>
                          <span
                            className='my-auto text mx-6'
                          
                            
                          >
                            Include UID on Reference Line:
                          </span>
                         <span>
                           <Checkbox id="includeUIDonReferenceLine" name="includeUIDonReferenceLine" 
                            onClick={()=>handleToggle("includeUIDonReferenceLine")}
                           
                           checked={data?.includeUIDonReferenceLine } 
                         
                         /></span>
                        </div>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Update CDF Record on the fly:
                        </div>
                        <Checkbox
                         id='updateCDFRecordOnTheFly'
                          name='updateCDFRecordOnTheFly'
                          onClick={()=>handleToggle("updateCDFRecordOnTheFly")}
                          checked={data?.updateCDFRecordOnTheFly}
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Allow second signature submission:
                        </div>
                        <Checkbox
                        id='allowSecondSignatureSubmission'
                          name='allowSecondSignatureSubmission'
                          onClick={()=>handleToggle("allowSecondSignatureSubmission")}
                          checked={data?.allowSecondSignatureSubmission}
                        />
                      </div>
                      <div className='col-7 d-flex'>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            Use same agent:
                          </div>
                          <Checkbox
                          id='allowSecondSignatureSubmissionUseSameAgent'
                            name='allowSecondSignatureSubmissionUseSameAgent'
                            onClick={()=>handleToggle("allowSecondSignatureSubmissionUseSameAgent")}
                            checked={
                              data?.allowSecondSignatureSubmissionUseSameAgent
                            }
                          />
                        </div>
                        <div className='d-flex '>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            Second submission mandatory:
                          </div>
                          <Checkbox
                          id='allowSecondSignatureSubmissionSecondSubmissionMandatory'
                            name='allowSecondSignatureSubmissionSecondSubmissionMandatory'
                            onClick={()=>handleToggle("allowSecondSignatureSubmissionSecondSubmissionMandatory")}
                            checked={
                              data?.allowSecondSignatureSubmissionSecondSubmissionMandatory
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Include Additional Information on E-Submit PDF:
                        </div>
                        <Checkbox
                        id='includeAdditionalInformationOnESubmitPDF'
                          name='includeAdditionalInformationOnESubmitPDF'
                          onClick={()=>handleToggle("includeAdditionalInformationOnESubmitPDF")}
                          checked={
                            data?.includeAdditionalInformationOnESubmitPDF
                          }
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                         Treaty Country (suppress warnings):
                        </div>
                        <Checkbox  id='treatyCountry'
                          name='treatyCountry'
                          onClick={()=>handleToggle("treatyCountry")}
                          checked={data?.treatyCountry}
                            
                           />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                         Non Treaty Country (suppress warnings):
                        </div>
                        <Checkbox  id='nonTreatyCountry'
                          name='nonTreatyCountry'
                          onClick={()=>handleToggle("nonTreatyCountry")}
                          checked={data?.nonTreatyCountry} />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          IGA Process (suprress warnings):
                        </div>
                        <Checkbox  id='igaProcess'
                          name='igaProcess'
                          onClick={()=>handleToggle("igaProcess")}
                          checked={data?.igaProcess} />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Show U.S. sourced income declaration:
                        </div>
                        <Checkbox
                        id='showUSourcedIncomeDeclaration'
                          name='showUSourcedIncomeDeclaration'
                          onClick={()=>handleToggle("showUSourcedIncomeDeclaration")}
                          checked={data?.showUSourcedIncomeDeclaration}
                        />
                      </div>
                      <div className='col-7 d-flex'>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            And When No U.S Sourced Income, Hide Chapter 4 and
                            DRE page:
                          </div>
                          <Checkbox
                          id='showUSourcedIncomeDeclarationAndWhenNoUSSourcedIncomeHideChapter4AndDREPage'
                            name='showUSourcedIncomeDeclarationAndWhenNoUSSourcedIncomeHideChapter4AndDREPage'
                            onClick={()=>handleToggle("showUSourcedIncomeDeclarationAndWhenNoUSSourcedIncomeHideChapter4AndDREPage")}
                            checked={
                              data?.showUSourcedIncomeDeclarationAndWhenNoUSSourcedIncomeHideChapter4AndDREPage
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Show Retroactive statement (only show/apply for W-8
                          Forms):
                        </div>
                        <Checkbox
                        id='showRetroactiveStatementOnlyShowApplyForW8Forms'
                          name='showRetroactiveStatementOnlyShowApplyForW8Forms'
                          onClick={()=>handleToggle("showRetroactiveStatementOnlyShowApplyForW8Forms")}
                          checked={
                            data?.showRetroactiveStatementOnlyShowApplyForW8Forms
                          }
                        />
                      </div>
                      <div className='col-7 d-flex'>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            Render full screen
                          </div>
                          <Checkbox
                           id='showRetroactiveStatementOnlyShowApplyForW8FormsRenderFullScreen'
                            name='showRetroactiveStatementOnlyShowApplyForW8FormsRenderFullScreen'
                            onClick={()=>handleToggle("showRetroactiveStatementOnlyShowApplyForW8FormsRenderFullScreen")}
                            checked={
                              data?.showRetroactiveStatementOnlyShowApplyForW8FormsRenderFullScreen
                            }
                          />
                        </div>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            Make mandatory
                          </div>
                          <Checkbox
                          id='showRetroactiveStatementOnlyShowApplyForW8FormsMakeMandatory'
                            name='showRetroactiveStatementOnlyShowApplyForW8FormsMakeMandatory'
                            onClick={()=>handleToggle("showRetroactiveStatementOnlyShowApplyForW8FormsMakeMandatory")}
                            checked={
                              data?.showRetroactiveStatementOnlyShowApplyForW8FormsMakeMandatory
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Enable Save & Exit Process:
                        </div>
                        <Checkbox
                        id="enableSaveExitProcess"
                          name='enableSaveExitProcess'
                          onClick={()=>handleToggle("enableSaveExitProcess")}
                          checked={data?.enableSaveExitProcess}
                        />
                      </div>
                      <div className='col-7 d-flex'>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            Send for Signature Process(Continuation URL):
                          </div>
                          <Checkbox id='sendforSignatureProcess'
                          name='sendforSignatureProcess'
                          onClick={()=>handleToggle("sendforSignatureProcess")}
                          checked={data?.sendforSignatureProcess} />
                        </div>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            
                          >
                            By Using Email ID and password:
                          </div>
                          <Checkbox id='byUsingEmailIDandpassword '
                          name='byUsingEmailIDandpassword '
                          onClick={()=>handleToggle("byUsingEmailIDandpassword ")}
                          checked={data?.byUsingEmailIDandpassword } />
                        </div>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 py-0'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Enable allocation statement creation:
                        </div>
                        <Checkbox
                        id='enableAllocationStatementCreation'
                          name='enableAllocationStatementCreation'
                          onClick={()=>handleToggle("enableAllocationStatementCreation")}
                          checked={data?.enableAllocationStatementCreation}
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Enable Electronic Recipient Statement consent:
                        </div>
                        <Checkbox
                        id='consentToSendAnElectronic1042SOr1099'
                          name='consentToSendAnElectronic1042SOr1099'
                          onClick={()=>handleToggle("consentToSendAnElectronic1042SOr1099")}
                          checked={data?.consentToSendAnElectronic1042SOr1099}
                        />
                      </div>
                      <div className='col-7 d-flex p-0'>
                        <div
                          className='my-auto text'
                          
                          sx={{ fontWeight: 200, opacity: '1 !important' }}
                        >
                          Consent to send an electronic 1042-S or 1099
                        </div>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Enable Exempt from Backup Withholding Page Pop-Up:
                        </div>
                        <Checkbox
                        id='enableExemptFromBackupWithholdingPagePopUp'
                          name='enableExemptFromBackupWithholdingPagePopUp'
                          onClick={()=>handleToggle("enableExemptFromBackupWithholdingPagePopUp")}
                          checked={
                            data?.enableExemptFromBackupWithholdingPagePopUp
                          }
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Hide Download template to complete withholding
                          statement :
                        </div>
                        <Checkbox
                        id='hideDownloadTemplateToCompleteWithholdingStatement'
                          name='hideDownloadTemplateToCompleteWithholdingStatement'
                          onClick={()=>handleToggle("hideDownloadTemplateToCompleteWithholdingStatement")}
                          checked={
                            data?.hideDownloadTemplateToCompleteWithholdingStatement
                          }
                        />
                      </div>
                    </div>
                    {/* <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Name Confirmation :
                        </div>
                        <Checkbox defaultChecked={false} />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Address Confirmation :
                        </div>
                        <Checkbox defaultChecked={false} />
                      </div>
                    </div> */}
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Request Bank/Account information :
                        </div>
                        <Checkbox
                        id='requestBankAccountInformation'
                          name='requestBankAccountInformation'
                          onClick={()=>handleToggle("requestBankAccountInformation")}
                          checked={data?.requestBankAccountInformation}
                        />
                      </div>
                      <div className='col-7 d-flex'>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            sx={{ fontWeight: 200, opacity: '1 !important' }}
                          >
                            and when 'Yes' make mandatory :
                          </div>
                          <Checkbox
                           id='requestBankAccountInformationAndWhenYesMakeMandatory'
                            name='requestBankAccountInformationAndWhenYesMakeMandatory'
                            onClick={()=>handleToggle("requestBankAccountInformationAndWhenYesMakeMandatory")}
                            checked={
                              data?.requestBankAccountInformationAndWhenYesMakeMandatory
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Request income type :
                        </div>
                        <Checkbox   id='requestincometype'
                          name='requestincometype'
                          onClick={()=>handleToggle("requestincometype")}
                          checked={data?.requestincometype} />
                      </div>
                      <div className='col-7 d-flex'>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            sx={{ fontWeight: 200, opacity: '1 !important' }}
                          >
                            and when 'Yes' make mandatory :
                          </div>
                          <Checkbox   id='requestincometypeAndWhenYesMakeMandatory'
                          name='requestincometypeAndWhenYesMakeMandatory'
                          onClick={()=>handleToggle("requestincometypeAndWhenYesMakeMandatory")}
                          checked={data?.requestincometypeAndWhenYesMakeMandatory} />
                        </div>
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-4 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Maximum number of Income Types allowed :
                        </div>
                      </div>
                      <div className='col-7 mx-4 d-flex'>
                        <TextField  className='text textFieldClass'fullWidth name='maximumnumberofIncomeTypesallowed' value={data?.maximumnumberofIncomeTypesallowed} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Enable VAT Number Collection: <span> <Tooltip title= {"Enable VAT Collection:\n"+"Checking the box enables the of VAT . This will add the VAT collection field on the AHD page for individuals and entities"} > 
                          <img src={Info}className='logo mx-1' />
                            </Tooltip>  
   
</span>

                        </div>
                        <Checkbox  id='enableVATNumberCollection'
                          name='enableVATNumberCollection'
                          onClick={()=>handleToggle("enableVATNumberCollection")}
                          checked={data?.enableVATNumberCollection} />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Hide W-8BEN-E Treaty 14c :
                        </div>
                        <Checkbox
                         id='hideW8BENETreaty14C'
                          name='hideW8BENETreaty14C'
                          onClick={()=>handleToggle("hideW8BENETreaty14C")}
                          checked={data?.hideW8BENETreaty14C}
                        />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Make controlling person mandatory :
                        </div>
                        <Checkbox   id='makecontrollingpersonmandatory'
                          name='makecontrollingpersonmandatory'
                          onClick={()=>handleToggle("makecontrollingpersonmandatory")}
                          checked={data?.makecontrollingpersonmandatory  } />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Hide W-8ECI Line 12:
<span> <Tooltip title= {"12. Check here to certify that: you are a dealer in securities (as defined in section 475(c)(1)); you are a transferor of an interest in a publicly traded partnership\n"+"(PTP) claiming an exception from withholding under Regulations section 1.1446(f)-4(b)(6); and any gain from the transfer of the PTP interest associated\n"+"with this form is effectively connected with the conduct of a trade or business within the United States without regard to section 864(c)(8)"} > 
                          <img src={Info}className='logo mx-1' />
                            </Tooltip>  
   
</span>


                        </div>
                        <Checkbox  id='hideW8ECILine12'
                          name='hideW8ECILine12'
                          onClick={()=>handleToggle("hideW8ECILine12")}
                          checked={data?.hideW8ECILine12} />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Show Download PDF option on Thank You page :
                        </div>
                        <Checkbox id='showDownloadPDFoptiononThankYoupage'
                          name='showDownloadPDFoptiononThankYoupage'
                          onClick={()=>handleToggle("showDownloadPDFoptiononThankYoupage")}
                          checked={data?.showDownloadPDFoptiononThankYoupage} />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Show MForms Mobile Wallet Flow on Thank You page :
                        </div>
                        <Checkbox id='showMFormsMobileWalletFlowonThankYoupage'
                          name='showMFormsMobileWalletFlowonThankYoupage'
                          onClick={()=>handleToggle("showMFormsMobileWalletFlowonThankYoupage")}
                          checked={data?.showMFormsMobileWalletFlowonThankYoupage}  />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-4 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                        Welcome Code for MForms Mobile Wallet :
                        </div>
                      </div>
                      <div className='col-5 mx-4 d-flex'>
                        <TextField className='text textFieldClass'fullWidth name='welcomeCodeforMFormsMobileWallet' value={data?.welcomeCodeforMFormsMobileWallet} onChange={handleChange} />
                      </div>
                    </div>
                    <div className='row my-1 mx-2 d-flex'>
                      <div className='col-4 mx-1 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Show landing page welcome popup:

<span> <Tooltip title= {"Onboarding or Returning customer page welcome popup. \n"+
     "Note: AHD API simulator (if visible) enables data be pulled from Admin. It MUST not be enabled for production sites."} > 
                          <img src={Info}className='logo mx-1' />
                            </Tooltip>  
   
</span>
                        </div>
                       
                      </div>
                      <div className='col-7 d-flex'>
                        <div className='d-flex'>
                        <Checkbox id='showlandingpagewelcomepopup'
                          name='showlandingpagewelcomepopup'
                          onClick={()=>handleToggle("showlandingpagewelcomepopup")}
                          checked={data?.showlandingpagewelcomepopup}  />
                          <div
                            className='my-auto text'
                            
                            
                          >
                           Include AHD API Simulator:
                          </div>
                          <Checkbox id='includeAHDAPISimulator'
                          name='includeAHDAPISimulator'
                          onClick={()=>handleToggle("includeAHDAPISimulator")}
                          checked={data?.includeAHDAPISimulator}  />
                        </div>
                        <div className='d-flex'>
                          <div
                            className='my-auto text'
                            
                            sx={{ fontWeight: 200, opacity: '1 !important' }}
                          >
                            Note: For Test & Demonstration Purpose Only
                          </div>
                         
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
                {/* <div className='col-8 my-2 expend-card'> */}
                  {/* <div className='row m-2'> */}
                    {/* <div className='col-12 editor-div headings'>
                      <lable>
                        Next Agent Introduction Text (Shown on Congratulations
                        Page)
                      </lable>
                      <div
                        style={{
                          backgroundColor: '#ffff'
                        }}
                      >
                        <Editor
                          wrapperClassName='wrapper-class'
                          editorClassName='editor-class'
                          toolbarClassName='toolbar-class'
                          editorState={editorState6}
                          onEditorStateChange={handleEditorStateChange6}
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
                          <button type='button' onClick={convertToHtml6}>
                            HTML
                          </button>
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                          {' '}
                          <button type='button' onClick={convertToPlainText6}>
                            Text
                          </button>
                        </div>
                        <div style={{ marginLeft: '5px' }}>
                          <button type='button' onClick={convertToPreview6}>
                            Preview
                          </button>
                        </div>
                      </div>
                    </div> */}
                  {/* </div> */}
                {/* </div> */}
                <div className=' col-8 my-2 expend-card'>
                  <div className='row m-2'>
                  <div className='col-6 headings' style={{ justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
  <div>
    <label>Skipped steps:</label>
    <span className='headings'>
      (Removed from the submission process)
    </span>
  </div>
 
    <div className='inner-scroll-div'>
  {skippedSteps?.skippedStepsData?.map((item, index) => (
  <div key={item.id} className='d-flex '>
    <Checkbox
      className='p-0 '
     
      defaultChecked={item.agentId == params.id}
      onClick={() => handleToggleIds(item.id, getSkippedSteps, setSkippedSteps)}
     
    />
    <div className='my-auto text'>
      {item.name}
    </div>
  </div>
))}
    </div>

</div>

                    <div className='col-6 headings' style={{ justifyContent: "space-between", display: "flex", flexDirection: "column" }}>
                    <div>
                      <lable>Hidden sections:</lable>
                      <span className='headings'>
                        (Not shown in the web page)
                      </span>
                      </div>
                      <div className='inner-scroll-div'>
                       { hiddensection?.hiddenSectionData?.map((item, index) => (
                       <div key={item.id} className='d-flex'>
               <Checkbox
            className='p-0'
           
            defaultChecked={item.agentId == params.id}
            onClick={() => handleToggleIds(item.id,getHiddenSection, setHiddenSection)}
           
          />
                          <div
                            className='my-auto text'
                            
                            
                          >
                           {item.name}
                          </div>
                        </div>
                         ))}
                      </div>
                    </div>
                    <div className='col-9 headings my-2'>
                      <lable>Retroactive statement:</lable>
                      <div className='retro'>
                      <TextField
                      
                     
                     
                      multiline
                     
                      name='retroactiveStatement'
                      value={data?.retroactiveStatement}
                    
                      fullWidth
                      onChange={handleChange}
                    />
                      </div>
                      <div className=' headings my-2'>
                        <lable>Retroactive Effective Date:</lable>
                        <br></br>
                        <TextField
                        className='text textFieldClass' 
                       
                        
                       
                        name='retroactiveEffectiveDate'
                        value={data?.retroactiveEffectiveDate}
                        // onChange={handleChange}
                        fullWidth
                        onChange={handleChange}
                      />
                      </div>

                    </div>
                  </div>
                </div>
                <div className='col-10 my-2 expend-card'>
                  <CardHeader
                    className=''
                    title='
          URL Options'
                    action={
                      <IconButton
                        onClick={() => handleOpen('testCollaple5')}
                        aria-label='expand'
                        size='small'
                      >
                        {open === 'testCollaple5' ? (
                          <RemoveCircleOutlineOutlinedIcon />
                        ) : (
                          <ControlPointOutlinedIcon />
                        )}
                      </IconButton>
                    }
                  ></CardHeader>
                  <Collapse
                    className='px-5'
                    in={open === 'testCollaple5'}
                    timeout='auto'
                    unmountOnExit
                  >
                    
                  
                
                    {/* <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                         Enable Finish/Exit/Save And Exit URL:
                        </div>
                      </div>
                      <div className='col-5'>
                      <Checkbox  className='col-1' defaultChecked={false} />
                      </div>
                    </div> */}
                   
                    <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Do Not Accept URL:
                        </div>
                      </div>
                      <div className='col-5'>
                        <TextField
                        className='textFieldClass text'
                          fullWidth
                          name='doNotAcceptURL'
                          value={data?.doNotAcceptURL}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Finish URL:
                        </div>
                      </div>
                      <div className='col-5'>
                        <TextField
                        className='textFieldClass text'
                          fullWidth
                          name='finishURL'
                          value={data?.finishURL}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Exit URL:
                        </div>
                      </div>
                      <div className='col-5'>
                        <TextField
                        className='textFieldClass text'
                          fullWidth
                          name='exitURL'
                          value={data?.exitURL}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          Save And Exit URL:
                        </div>
                      </div>
                      <div className='col-5'>
                        <TextField className='textFieldClass text'fullWidth  value={data?.saveAndExitURL}
                          onChange={handleChange} name='saveAndExitURL' />
                      </div>
                    </div>
                    {/* <div className='row mx-2 my-1'>
                      <div className='col-12 d-flex'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          For UUID API calls, entering URL settings here will
                          override the browser alert and close the tab process.
                        </div>
                      </div>
                    </div>
                    <div className='row mx-2 my-1'>
                      <div className='col-5 d-flex justify-content-between'>
                        <div
                          className='my-auto text'
                          
                          
                        >
                          GetUUID Service Exipration Time(Enable if greater than
                          0)
                        </div>
                      </div>
                      <div className='col-5'>
                        <TextField className='textFieldClass text' fullWidth name='name' />
                      </div>
                    </div> */}
                  </Collapse>
                </div>
                <div className='col-12 my-2 mx-auto'>
                  <div className='col-12 '>
                    <Button
                      size='small'
                      variant='contained'
                      type="submit"
                      style={{ float: 'right' }}
                    >
                      Save
                    </Button>
                    <Button
                     variant='outlined'
                      size='small'
                      className='mx-2'
                      style={{ float: 'right' }}
                      onClick={()=>{ history.push("/agent")}}     
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default UserManagement
