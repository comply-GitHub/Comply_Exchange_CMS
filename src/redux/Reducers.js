import Utils from "../Utils";

const {
  GET_ALL_COUNTRIES,
  GET_ALL_PAGES,
  COUNTRIES,
  COUNTRY_NAME,
  GET_AGENT_TIN_TYPE_BY_ID,
  UPDATE_AGENT_TIN_TYPE_BY_ID,
  GET_AGENT_STATEMENT,
  UPDATE_AGENT_STATEMENT,
  LANGUAGES,
  GET_AGENT_SKIPPED_STEPS,
  GET_HIDDEN_SECTION,
  CREATE_PAGE,
  GET_ALL_HELP_VIDEOS,
  GET_ALL_HELP_VIDEOS_DETAILS,
  ADD_SUB_PAGE,
  PARENT_DROPDOWN,
  GET_ALL_CONTENT,
  GET_CONTENT_BY_ID,
  GET_PAGE_BY_ID,
  EXPORT_EASY,
  IMPORT_RULES,
  EXPORT_RULES,
  UPDATE_PAGE,
  GET_AGENT_BY_ID,
  UPDATE_CONTENT,
  GET_FORM_TYPES_SELF_TRANSLATION,
  GET_ALL_AGENTS,
  GET_ALL_FORM_TYPES,
  GET_FORM_US_TYPES_BY_ID,
  GET_ALL_US_FORM_TYPES,
  GET_FORM_TYPES_BY_ID,
  GET_LANGUAGE_BY_ID,
  GET_ALL_LOB,
  GET_LOB,
  BULK_TRANSLATE,
  GET_INCOME_CODE,
  UPDATE_LOB,
  GET_ALL_FORM_INSTRUCTIONS,
  GET_FORM_INSTRUCTION_BY_ID,
  GET_CAPACITIES_BY_ID,
  GET_ALL_CAPACITIES,
  POST_INSERT_CAPACITIS,
  GET_SUBPAGE_NO,
  GET_ALL_DOCUMENTATION,
  GET_DOCUMENTATION_TYPES,
  GET_CH3_DOC,
  GET_CH3_DOC_BY_iD,
  GET_CH4_DOC,
  GET_CH4_DOC_BY_iD,
  GET_DOCUMENTAION_BY_ID,
  GET_IMPORTANT_COUNTRIES,
  GET_ALL_RULES,
  GET_RULES_BY_ID,
  GET_HIDDEN_COUNTRIES,
  GET_CHAPTER3_HIDDEN_ENTITY,
  GET_CHAPTER4_HIDDEN_ENTITY,
  GET_CHAPTER4_IMPORTANT_ENTITY,
  GET_ALL_EASY,
  GET_REQUEST_HEADER,
  GET_COUNTRY_BY_ID,
  GET_EASY_BY_ID,
  GET_PAGE_TRANSLATION,
  GET_EASY_TRANSLATION,
  GET_CAPACITY_HIDDEN,
  GET_DOCUMENT_MANDATORY,
  GET_EXEMPTION_CODE_DISABLE,
  GET_INCOME_CODE_HIDDEN,
  GET_US_VISATYPE_HIDDEN,
  GET_RULE_TRANSLATION,
  GET_FATCA_HIDDEN,
  GET_PAYMENT_TYPE,
  GET_FATCA_GIIN_DISABLED,
  GET_AGENT_SPT_HIDDEN,
  GET_PAGE_LANGUAGES,
  GET_SOURCED_INCOME_DATA,
  
  GET_SOURCED_INCOME_BY_ID,
  GET_SOURCED_INCOME_HIDDEN,
  UPSERT_SETTINGS,
  GET_SETTINGS,
   GET_SETTINGS_QUESTIONS,
  GET_SETTINGS_TRANSLATION,
  INSERT_SETTING_TRANSLATION,
  EXPORT_CONTENT,
  GET_AGENT_LANGUAGE,
  EASY_LANGUAGE,
  US_FORM_LANGUAGES,
  SELF_FORM_LANGUAGES,
  RULE_LANGUAGES,
  GET_AGENT_TRANSLATION,
  GET_SETTING_LANGUAGE,
  GET_HINT_TRANSLATION,
  GET_QUESTION_LANGUAGE,
  LANG_BY_SEARCH,
  GET_ALL_AGENT_DETAILS,
  GET_ALL_EFORMS_DEATILS,
  GET_CONTENT_LANGUAGE,
  GET_CONTENT_TRANSLATION,
  POST_CONTENT_TRANSLATION,
  GET_SOURCED_INCOME_ONBOARDED,
  GET_SELF_CERTIFICATION,
  GET_SELF_CERTIFICATION_SETTING,
  GET_SECURITY_KEY,
  GET_USER_BY_ID,
  GET_ALL_EFORMS_BY_ID,
  ALL_USER,
  GET_COUNTRY_ARTICLE_ById,
  GET_YEARS,
  GET_MAXNUMBER,
  GET_COUNTERY_CODE,
  GET_COUNTRY_ARTICLE,
  GET_IGA,
  GET_E_FORM_SELECTION_WARNING,
} = Utils.ActionName;

let initialState = [];

export const getEformsByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EFORMS_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getUserByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getCountryArticleByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY_ARTICLE_ById:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getAllUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
//getRequestHeader
export const getLangReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANG_BY_SEARCH:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getRequestHeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUEST_HEADER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getCountryByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getLangListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
//COUNTRY_NAME


export const getSecurityKeysReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SECURITY_KEY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAgentStatementTypeIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_STATEMENT:
      return { ...state, ...action.payload };
      case UPDATE_AGENT_STATEMENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getAgentTinTypeIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_TIN_TYPE_BY_ID:
      return { ...state, ...action.payload };
    case UPDATE_AGENT_TIN_TYPE_BY_ID:
        return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getCountryNameReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRY_NAME:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getYearsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_YEARS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getNumbersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAXNUMBER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
//GET_COUNTERY_CODE
export const getCountryCodesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTERY_CODE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
//GET_COUNTRY_ARTICLE



export const getCountryArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COUNTRY_ARTICLE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getSelfCertificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELF_CERTIFICATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getSelfCertificationSettingReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELF_CERTIFICATION_SETTING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
//
export const getSourcedIncomeOnboardedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SOURCED_INCOME_ONBOARDED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getContentLanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTENT_LANGUAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getContentTranslationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTENT_TRANSLATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSettingQuestionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTING_LANGUAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSettingHintReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTION_LANGUAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getHintTranslationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HINT_TRANSLATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getAgentTranslationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_TRANSLATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const ExportContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPORT_CONTENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const ExportEasyReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPORT_EASY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const ExportRuleReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXPORT_RULES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const AgentLanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_LANGUAGE :
      return { ...state, ...action.payload };
    default:
      return state;
  }
};export const EasyLanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case EASY_LANGUAGE :
      return { ...state, ...action.payload };
    default:
      return state;
  }
};export const rulesLanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case RULE_LANGUAGES :
      return { ...state, ...action.payload };
    default:
      return state;
  }
};export const usFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case US_FORM_LANGUAGES :
      return { ...state, ...action.payload };
    default:
      return state;
  }
};export const selfFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELF_FORM_LANGUAGES :
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSourcedIncomeDataIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SOURCED_INCOME_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


export const getSourcedIncomeHiddenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SOURCED_INCOME_HIDDEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSettingsQuestionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS_QUESTIONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSettingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSettingsTranslationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SETTINGS_TRANSLATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSourcedIncomeDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SOURCED_INCOME_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};



export const getPageLanguageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGE_LANGUAGES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getCapacityHiddenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAPACITY_HIDDEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getFatcaHiddenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FATCA_HIDDEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getPaymentTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAYMENT_TYPE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getFatcaGiinDiabledReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FATCA_GIIN_DISABLED:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAgentSptHiddenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_SPT_HIDDEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getRulesTranslationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RULE_TRANSLATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getDocumentMandatoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENT_MANDATORY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getExemptCodeDisableReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EXEMPTION_CODE_DISABLE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getIncomeCodeHiddenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INCOME_CODE_HIDDEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getUSVisaTypeHiddenReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_US_VISATYPE_HIDDEN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllRulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RULES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllEasyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EASY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getEasyByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EASY_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};



export const getRulesByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_RULES_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};



export const getAllPagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PAGES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllCountriesDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


export const getdocCH3Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CH3_DOC:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


export const getAllAgentDetails = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AGENT_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
//GET_ALL_EFORMS_DEATILS
export const getAllEFormsDetails = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_EFORMS_DEATILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getdocch3ReducerById = (state = initialState, action) => {
  switch (action.type) {
    case GET_CH3_DOC_BY_iD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getdocCH4Reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CH4_DOC:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getdocCH4ReducerById = (state = initialState, action) => {
  switch (action.type) {
    case GET_CH4_DOC_BY_iD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getdocTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENTATION_TYPES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};











export const getIncomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INCOME_CODE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getdocByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOCUMENTAION_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllCapacitiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CAPACITIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllAgentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AGENTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllDocumentaionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DOCUMENTATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllFormInstructionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FORM_INSTRUCTIONS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getFormInstructionByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORM_INSTRUCTION_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSubPageIDReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUBPAGE_NO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllLobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_LOB:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getLobReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LOB:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllFormTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_FORM_TYPES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const agentDataByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_BY_ID:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export const getLanguageDataByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case BULK_TRANSLATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}



export const getAllUSFormTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_US_FORM_TYPES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getFormTypeByIdReducer = (state = initialState, action) => {
  // console.log(action.payload,"action")
  switch (action.type) {
    case GET_FORM_TYPES_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllContentTypeByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CONTENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

//GET_AGENT_SKIPPED_STEPS
//GET_HIDDEN_SECTION

export const getAgentHiddenSectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HIDDEN_SECTION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getAgentSkippedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_SKIPPED_STEPS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


export const getTranslatedPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGE_TRANSLATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getSelfFormTypesTranslation = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORM_TYPES_SELF_TRANSLATION:
      return { ...state, ...action.payload }
    default:
      return state
  }
}


export const getTranslatedEasyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EASY_TRANSLATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};



export const getUSFormTypeByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FORM_US_TYPES_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAgentByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getCapacitiesById = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAPACITIES_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getContentByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CONTENT_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAgentsImpCountiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IMPORTANT_COUNTRIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};




export const getAgentsHiddenCountiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HIDDEN_COUNTRIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getCh3HiddenCountiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAPTER3_HIDDEN_ENTITY:
      console.log("state", state,action)
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getCh4HiddenCountiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAPTER4_HIDDEN_ENTITY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getCh4ImpCountiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHAPTER4_IMPORTANT_ENTITY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};



export const pageDataByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PAGE_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CONTENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getAllHelpVideoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_HELP_VIDEOS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


export const getAllHelpVideoDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_HELP_VIDEOS_DETAILS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getAllAgentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_AGENTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const createPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const createSubPageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SUB_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const updatePageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const updateContentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_AGENT_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const CountriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case COUNTRIES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getEformSelectionWarningReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_E_FORM_SELECTION_WARNING:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export const getIgaDropDownReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_IGA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};


export const LanguagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LANGUAGES:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const ParentDropDownReducer = (state = initialState, action) => {
  switch (action.type) {
    case PARENT_DROPDOWN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export const getLanguageByIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LANGUAGE_BY_ID:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
