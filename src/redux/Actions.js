
import { useParams } from "react-router-dom";
import {
  SET_ENABLE_BACKGROUND_IMAGE,
  SET_ENABLE_MOBILE_MENU,
  SET_ENABLE_MOBILE_MENU_SMALL,
  SET_ENABLE_FIXED_HEADER,
  SET_ENABLE_HEADER_SHADOW,
  SET_ENABLE_SIDEBAR_SHADOW,
  SET_ENABLE_FIXED_SIDEBAR,
  SET_ENABLE_CLOSED_SIDEBAR,
  SET_ENABLE_FIXED_FOOTER,
  SET_ENABLE_PAGETITLE_ICON,
  SET_ENABLE_PAGETITLE_SUBHEADING,
  SET_ENABLE_PAGE_TABS_ALT,
  SET_BACKGROUND_IMAGE,
  SET_BACKGROUND_COLOR,
  SET_COLOR_SCHEME,
  SET_BACKGROUND_IMAGE_OPACITY,
  SET_HEADER_BACKGROUND_COLOR,
 
} from "./actionName";

import Utils from "../Utils";
import { ca } from "date-fns/locale";
import constants from "../Utils/constants";



export const signupAction = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.SIGNUP,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.SIGNUP,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "User Registered successfully");
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
//GET_COUNTRY_ARTICLE_ById
export const getUserById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_USER_BY_ID,
      `/${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_USER_BY_ID,
            payload: {
              getUserByIdData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getBulkTranslateDataById = (value,callback) => {
  console.log(value,"00")
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.BULK_TRANSLATE,
      `?languageId=${value}`,
      (resData) => {
       
        if (resData.status === 200) {
          
          if(callback){
            
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.BULK_TRANSLATE,
            payload: {
              getTranslateDataByIdData: resData.data,
            },
           
          });
          dispatch(getAllLanguages());
        } 
        
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getCountryArticleById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_COUNTRY_ARTICLE_ById,
      `?CountryId=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_COUNTRY_ARTICLE_ById,
            payload: {
              getCountryArticleByIdData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getEformsAgentById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_EFORMS_BY_ID,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_ALL_EFORMS_BY_ID,
            payload: {
              getEformUserByIdData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getCountryById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_COUNTRY_BY_ID,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_COUNTRY_BY_ID,
            payload: {
              getCountryByIdData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAgentEformSelection = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_E_FORM_SELECTION_WARNING,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_E_FORM_SELECTION_WARNING,
            payload: {
              getAgentEformSelectionData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const loginAction = (value,callback) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${ Utils.endPoints.LOGIN}`,

      value,
      (responseData) => {
      
        if(responseData.status == 200){
         
          localStorage.setItem('accessToken',responseData.data.token.accessToken)
          localStorage.setItem('userDetails',JSON.stringify(responseData.data))
          Utils.showAlert(1, "Logged in Succesfully");
        
          setTimeout(() => {
            callback();
          }, 1000); 
        
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.error);
      }
    );
  };
};


export const getLanguageList = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.LANG_BY_SEARCH,
      params,
      (resData) => {
       console.log(resData,"Are baap re")
        dispatch({
          type: Utils.ActionName.LANG_BY_SEARCH,
          payload: {
            langData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getAllUsers = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.ALL_USER,
      params,
      (resData) => {
        dispatch({
          type: Utils.ActionName.ALL_USER,
          payload: {
            allUsersData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllFormTypes = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_FORM_TYPES,
      params,
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_ALL_FORM_TYPES,
          payload: {
            formsData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllDocumentaions = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_DOCUMENTATION,
      params,
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_ALL_DOCUMENTATION,
          payload: {
            documentationData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message); 
      }
    );
  };
};

export const getSecurityKeys = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SECURITY_KEY,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_SECURITY_KEY,
          payload: {
            securityKeyData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getYears = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_YEARS,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_YEARS,
          payload: {
            yearData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const GetIncomeTypes = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_INCOME_CODE,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_INCOME_CODE,
          payload: {
            incTypeData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const getMaxNumber = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_MAXNUMBER,
      "",
      (resData) => {
        
        dispatch({
          type: Utils.ActionName.GET_MAXNUMBER,
          payload: {
            numberData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

//GET_COUNTERY_CODE
//GET_COUNTRY_ARTICLE
export const getCountryCodes = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_COUNTERY_CODE,
      "",
      (resData) => {
        
        dispatch({
          type: Utils.ActionName.GET_COUNTERY_CODE,
          payload: {
            countryCodeData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getCountryArticles = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_COUNTRY_ARTICLE,
      "",
      (resData) => {
        console.log(resData,"111111112233")
        dispatch({
          type: Utils.ActionName.GET_COUNTRY_ARTICLE,
          payload: {
            countryArticleData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
//UPSERT_REQUEST_HEADER//UPSERT_EFORMS



export const UpsertEFormsAgent = (value) => {
  return (dispatch) => {
    // const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.UPSERT_EFORMS,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPSERT_EFORMS,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Updated Successfully.");
          dispatch(getAllEformsDetails(1, 10, "", 1));
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const getRequestHeader = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_REQUEST_HEADER,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_REQUEST_HEADER,
          payload: {
            RequestHeaderData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const upsertSecurityKeys = (value) => {
  return (dispatch) => {
    // const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.UPSERT_SECURITY_KEY,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPSERT_SECURITY_KEY,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Keys updated successfully.");
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllLOB = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_LOB,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_ALL_LOB,
          payload: {
            lobData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const GetDocumentationTypes = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_DOCUMENTATION_TYPES,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_DOCUMENTATION_TYPES,
          payload: {
            docTypeData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllAgentDetails = (callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_AGENT_DETAILS,
      "",
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
        dispatch({
          type: Utils.ActionName.GET_ALL_AGENT_DETAILS,
          payload: {
            agentdetailsData: resData.data,
          },
        });
      }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

// export const getAllEformsDetails = (page,size,search) => {
//   let params= `?pageNumber=${page}&pageSize=${size}`
//   if(search){
//     params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
//   }
//   return (dispatch) => {
//     Utils.api.postApiCall(
//       Utils.endPoints.GET_ALL_EFORMS_DEATILS,
//       params,
//       (resData) => {
//         dispatch({
//           type: Utils.ActionName.GET_ALL_EFORMS_DEATILS,
//           payload: {
//             allUsersData: resData.data,
//           },
//         });
//       },
//       (error) => {
//         let { data } = error;
//         Utils.showAlert(2, data.message);
//       }
//     );
//   };
// };

export const getAllEformsDetails = (page,size,searchName,isActive,callback) => {
  return (dispatch) => {
    Utils.api.postApiCall(
      Utils.endPoints.GET_ALL_EFORMS_DEATILS+"?searchName="+searchName+`&IsActive=${isActive}` ,
      {
        "pageNumber": page,
        "pageSize": size,
        "sortColumn": "name",
        "sortDirection": "asc"
      },
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
        dispatch({
          type: Utils.ActionName.GET_ALL_EFORMS_DEATILS,
          payload: {
            agentEformsData: resData.data,
          },
        });
      }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const GetDocumentationCH3 = (callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CH3_DOC,
      "",
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
        dispatch({
          type: Utils.ActionName.GET_CH3_DOC,
          payload: {
            ch3Data: resData.data,
          },
        });
      }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const GetDocumentationCH4 = (callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CH4_DOC,
      "",
      (resData) => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
        dispatch({
          type: Utils.ActionName.GET_CH4_DOC,
          payload: {
            ch4Data: resData.data,
          },
        });
      }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const getch3ById = (value , callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CH3_DOC_BY_iD,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_CH3_DOC_BY_iD,
            payload: {
              ch3Data: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const getch4ById = (value , callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CH4_DOC_BY_iD,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_CH4_DOC_BY_iD,
            payload: {
              ch4Data: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};





export const getLOB = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_LOB,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_LOB,
          payload: {
            lobName: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllAgents = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_AGENTS,
      params,
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_ALL_AGENTS,
          payload: {
            agentData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};





export const upsertUSIncomeSource = (value,id,callback) => {
 
 
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.POST_SOURCED_INCOME_DATA,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_SOURCED_INCOME_DATA,
          payload: { data: data.data },
        });
         if (responseData) {
          console.log(id,"ppp")
          Utils.showAlert(1, responseData?.data);
           dispatch(getAllUSIncomeType(id))
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const POSTUSIncomeSourceType = (value,id) => {
  // let params= `?AgentId=${id}`
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.POST_INCOME_SOURCE_DATA_TYPE,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_INCOME_SOURCE_DATA_TYPE,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
          //  dispatch(getAllUSIncomeType(id))
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
//POST_INCOME_SOURCE_DATA_TYPE

export const upsertUSIncomeSourceOnboard = (value,id) => {
  let params= `?AgentId=${id}`
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.POST_SOURCED_INCOME_ONBOARDED,
      params,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_SOURCED_INCOME_ONBOARDED,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

// export const upsertCountries = (value) => {
//   return (dispatch) => {
//     const dataToSend = { message: value };
//     Utils.api.postApiCall(
//       Utils.endPoints.POST_UPSERT_COUNTRIES,
//       value,
//       (responseData) => {
//         let { data } = responseData;
//         dispatch({
//           type: Utils.ActionName.POST_UPSERT_COUNTRIES,
//           payload: { data: data.data },
//         });
//          if (responseData) {
//           Utils.showAlert(1, responseData?.data);
//         }
//       },
//       (error) => {
//         let { data } = error;
//         Utils.showAlert(2, data.message);
//       }
//     );
//   };
// };


export const getAllUSFormTypes = () => {
  
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_US_FORM_TYPES,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_ALL_US_FORM_TYPES,
          payload: {
            USformsData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};



export const getIgaDropDown= () => {

  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_IGA,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_IGA,
          payload: {
            igaDropDownData: resData.data,
          },
        });
        // } else {
        //   Utils.showAlert(2, data.message);
        // }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllPages = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_PAGES,
      params,
      (resData) => {
        // const { data } = resData;
        // if (resData.status === 200) {
        dispatch({
          type: Utils.ActionName.GET_ALL_PAGES,
          payload: {
            pageData: resData.data,
          },
        });
        // } else {
        //   Utils.showAlert(2, data.message);
        // }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const changePagesSequence = (Id,newOrderValue=0,direction,callback) => {  
  return (dispatch) => {
    Utils.api.postApiCall(
      Utils.endPoints.UPSERT_ORDER_ELEMENTS,
      {
        tableName: constants.tableNames.Pages,
        elementID: Id,
        newOrderValue: newOrderValue,
        direction: direction
      },
      (resData)=>{
        console.log(resData,'page order success');
        callback();
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllCountriesData = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_COUNTRIES,
      params,
      (resData) => {
        // const { data } = resData;
        // if (resData.status === 200) {
        dispatch({
          type: Utils.ActionName.GET_ALL_COUNTRIES,
          payload: {
            countryData: resData.data,
          },
        });
        // } else {
        //   Utils.showAlert(2, data.message);
        // }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};



export const GetAllCapacities = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_CAPACITIES,
      params,
      (resData) => {
        // const { data } = resData;
        // if (resData.status === 200) {
        dispatch({
          type: Utils.ActionName.GET_ALL_CAPACITIES,
          payload: {
          capacitiesData: resData.data,
          },
        });
        // } else {
        //   Utils.showAlert(2, data.message);
        // }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};



export const getDocById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_DOCUMENTAION_BY_ID,
      `?Id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_DOCUMENTAION_BY_ID,
            payload: {
              getDocById: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getSubPageById = (value) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SELF_CERTIFICATION,
      `?Id=${value}`,
      (resData) => {
        const { data } = resData;
          dispatch({
            type: Utils.ActionName.GET_SUBPAGE_NO,
            payload: {
              pageSubDataById: resData.data,
            },
          });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getSelfCertificationSettingById = (value , callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SELF_CERTIFICATION_SETTING,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          callback(resData.data)
          dispatch({
            type: Utils.ActionName.GET_SELF_CERTIFICATION_SETTING,
            payload: {
              selfCertificationSettingById: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const getSelfCertificationById = (value , callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SELF_CERTIFICATION,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          callback(resData.data)
          dispatch({
            type: Utils.ActionName.GET_SELF_CERTIFICATION,
            payload: {
              selfCertificationById: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllContentType = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_CONTENT,
      params,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.ActionName.GET_ALL_CONTENT,
            payload: {
              contentData: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const GetAllHelpVideos = (callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_HELP_VIDEOS,
      ``,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          console.log(resData.data,"xcvbnmasdfgh")
          callback(resData?.data)
          dispatch({
            type: Utils.ActionName.GET_ALL_HELP_VIDEOS,
            payload: {
              helpData: resData.data,
            },
          });
         
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllHelpVideosDetails = (callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_HELP_VIDEOS_DETAILS,
      ``,
      (resData) => {
        const { data } = resData;
      
        if (resData.status == 200) {
          console.log(resData.data,"xcvbnmasdfgh")
         if(callback

         ) {callback(resData?.data)
        }
          console.log(resData)
          dispatch({
            type: Utils.ActionName.GET_ALL_HELP_VIDEOS_DETAILS,
            payload: {
              helpDetailsData: resData.data,
            },
          });
         
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getPageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_PAGE_BY_ID,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_PAGE_BY_ID,
            payload: {
              pageDataById: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getCapacitiesById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CAPACITIES_BY_ID,
      `?id=${value}`,
      (resData) => {
        if(callback){
          callback(resData.data)
        }
        dispatch({
          type: Utils.ActionName.GET_CAPACITIES_BY_ID,
          payload: {
            capacityDataById: resData.data,
          },
        });
        if (resData.status === 200) {
        
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getFormTypeById = (value , callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_FORM_TYPES_BY_ID,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_FORM_TYPES_BY_ID,
            payload: {
              formsDataId: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

// export const createPost =
//   (postDatas, token, callback) => (dispatch, getState) => {
//     const { postData } = getState().dashboard;
//     return dashboardApi.createPost(postDatas, token).then(
//       (response) => {
//         {
//           postDatas.feed_status === "published"
//             ? dispatch({
//                 type: GET_POST_DETAILS,
//                 payload: {
//                   ...postData,
//                   data: [response.data, ...postData.data],
//                 },
//               })
//             : dispatch({
//                 type: CREATE_POST_SUCCESS,
//                 payload: postDatas,
//               });
//           if (callback) {
//             callback();
//           }
//         }
//         return Promise.resolve(response);
//       },
//       (error) => {
//         dispatch({
//           type: CREATE_POST_FAIL,
//         });
//         return Promise.reject(error);
//       }
//     );
//   };

export const getpageLanguageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_PAGE_LANGUAGES,
      `?pageId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.GET_PAGE_LANGUAGES,
            payload: {
              languagePageId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getContentLanguageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CONTENT_LANGUAGE,
      `?contentId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.GET_CONTENT_LANGUAGE,
            payload: {
              languageContentId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getQuestionLanguageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SETTING_LANGUAGE,
      `?questionId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.GET_SETTING_LANGUAGE,
            payload: {
              languageQuestionId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getHintLanguageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_QUESTION_LANGUAGE,
      `?questionHintId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.GET_QUESTION_LANGUAGE,
            payload: {
              languageHintId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};
//postEformSelectionWanring
//GET_AGENT_TIN_TYPE_BY_ID
//GET_AGENT_STATEMENT
//GET_HIDDEN_SECTION
//GET_AGENT_SKIPPED_STEPS


export const getAllAgentHiddenSection = (value , callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_HIDDEN_SECTION,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.ActionName.GET_HIDDEN_SECTION,
            payload: {
              hiddenSectionData: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, data.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const getAllAgentSkippedSteps = (value , callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_AGENT_SKIPPED_STEPS,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.ActionName.GET_AGENT_SKIPPED_STEPS,
            payload: {
              skippedStepsData: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, data.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAgentLanguageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_AGENT_LANGUAGE,
      `?agentId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.GET_AGENT_LANGUAGE,
            payload: {
              languageAgentId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};
export const getAgentTinTypeById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_AGENT_TIN_TYPE_BY_ID,
      `?agentId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.GET_AGENT_TIN_TYPE_BY_ID,
            payload: {
            AgentTinTypeId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAgentStatementById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_AGENT_STATEMENT,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.GET_AGENT_STATEMENT,
            payload: {
            AgentStatementTypeId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};
export const getEasyLanguageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.EASY_LANGUAGE,
      `?easyHelpId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.EASY_LANGUAGE,
            payload: {
              EasyPageId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getRulesLanguageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.RULE_LANGUAGES,
      `?ruleId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.RULE_LANGUAGES,
            payload: {
              languageRuleId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getUSFormLanguageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.US_FORM_LANGUAGES,
      `?usFormId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.US_FORM_LANGUAGES,
            payload: {
              languageUSFormId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getselfFormLanguageById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.SELF_FORM_LANGUAGES,
      `?scFormId=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          
          dispatch({
            type: Utils.ActionName.SELF_FORM_LANGUAGES,
            payload: {
              languageSelfFormId: resData.data,
            },
          });
          return Promise.resolve(resData.data);
        } else {
          // Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getFormUSTypeById = (value , callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_FORM_US_TYPES_BY_ID,
      `?id=${value}`,
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          if (callback) {
            callback(resData?.data)
          }
          dispatch({
            type: Utils.ActionName.GET_FORM_US_TYPES_BY_ID,
            payload: {
              formsUSDataId: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllContent = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_CONTENT,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.ActionName.GET_ALL_CONTENT,
            payload: {
              usTinData: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, data.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllSettingsQuestion = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SETTINGS_QUESTIONS,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.ActionName.GET_SETTINGS_QUESTIONS,
            payload: {
              settingsQuestionData: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, data.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllSettings = (callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SETTINGS,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
           if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_SETTINGS,
            payload: {
              settingsData: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, data.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const deleteAgents = (id) => {
  return (dispatch) => {
    Utils.api.deleteApiCall(
      `${Utils.endPoints.DELETE_AGENT}?id=${id}`,
      "",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.DELETE_AGENT,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Deleted Successfully");
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const deleteCapacities = (id) => {
  return (dispatch) => {
    Utils.api.deleteApiCall(
      `${Utils.endPoints.DELETE_CAPACITIES}?id=${id}`,
      "",
      (responseData) => {
        console.log(responseData,"ERRORR")
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.DELETE_CAPACITIES,
          payload: { data: data.data },
        });
         if (responseData) {
        
          Utils.showAlert(1, responseData?.data);
          dispatch(GetAllCapacities(1,10,""))
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const deletePAGES = (id) => {
  return (dispatch) => {
    // const dataToSend = { message: value };
    Utils.api.deleteApiCall(
      `${Utils.endPoints.DELETE_PAGE}?id=${id}`,
      "",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.DELETE_PAGE,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Deleted Successfully");
          dispatch(getAllPages(1, 10));
        }
      },
      (error) => {
        
        Utils.showAlert(2, error.error);
      }
    );
  };
};

export const deleteDocumentation = (id) => {
  return (dispatch) => {
    // const dataToSend = { message: value };
    Utils.api.deleteApiCall(
      `${Utils.endPoints.DELETE_DOCUMENTAION}?id=${id}`,"",     
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.DELETE_DOCUMENTAION,
          payload: { data: data.data },
        });
        if (responseData) {

          Utils.showAlert(1, "Deleted Successfully");
          dispatch (getAllDocumentaions(1,10));
        }
      },
      (error) => {
        if(error.status===200){
          Utils.showAlert(1, "Deleted Successfully");
          dispatch (getAllDocumentaions(1,10));
        }else
        Utils.showAlert(2, error.data);
      }
    );
  };
};






export const updateUser = (value) => {
  return (dispatch) => {
    // const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.UPDATE_USER,
      value,"",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_USER,
          payload: { data: data.data },
        });
        if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const changePassword = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.CHANGE_PASSWORD,
      value,"",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.CHANGE_PASSWORD,
          payload: { data: data.data },
        });
         if (responseData) {
          console.log(responseData,"res")
          Utils.showAlert(1, responseData?.data?.message);
          if(responseData?.data?.message !== ""){
            // callback();
          }
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const copyAgents = (value,callback) => {
  return (dispatch) => {
    Utils.api.postApiCall(
      Utils.endPoints.COPY_AGENT,
      value,"",
      (responseData) => {
        let { data } = responseData;     
        dispatch({
          type: Utils.ActionName.COPY_AGENT,
          payload: { data: data.data },
        });
         if (responseData) {
          console.log(responseData,"res")
          Utils.showAlert(1, responseData?.data?.message);
          if(responseData?.data?.message !== ""){
            // callback();
          }
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const createPAGES = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.CREATE_PAGE,
      value,"multi",
      (responseData) => {
        let { data } = responseData;     
        dispatch({
          type: Utils.ActionName.CREATE_PAGE,
          payload: { data: data.data },
        });
         if (responseData) {
          if(responseData.status==500){
            Utils.showAlert(2, "Subpage name already exist.Please choose another name."); 
          }else
          {Utils.showAlert(1, "Page created successfully.");}
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};
export const CountryUpsert = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.POST_UPSERT_COUNTRIES,
      value,"multi",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_UPSERT_COUNTRIES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Countries updated successfully.");
        }
        
      },
      (error) => {
        Utils.showAlert(2, error.statusText);

      }
    );
  };
};


export const CountriesUpsertArticle = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.POST_UPSERT_COUNTRY_ARTICLE,
      value,"multi",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_UPSERT_COUNTRY_ARTICLE,
          payload: { data: data.data },
        });
         if (responseData) {
          console.log(responseData,"success")
          Utils.showAlert(1, "Countries article updated successfully");
        }
      },
      (error) => {
        console.log(error,"error---")
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};


export const createDocType = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.CREATE_DOCUMENTATION,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.CREATE_DOCUMENTATION,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const createSubPAGES = (value,callback) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.ADD_SUB_PAGE,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.ADD_SUB_PAGE,
          payload: { data: data.data },
        });
         if (responseData.status==200) {
          Utils.showAlert(1, responseData?.data);
          callback()
        }
      },
      (error) => {
        let { data } = error;
        console.log(error,"ERRORRR")
        if(data.error==="Violation of UNIQUE KEY constraint \u0027UQ__Pages__737584F6DA83FBCC\u0027. Cannot insert duplicate key in object \u0027dbo.Pages\u0027. The duplicate key value is (a).\r\nThe statement has been terminated."){
          Utils.showAlert(2, "Subpage name already exist.Please choose another name.");
        } 
        else{
          Utils.showAlert(2, error.statusText);
        }
      }
    );
  };
};


export const createFormTypes = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.CREATE_FORM_TYPES,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.CREATE_FORM_TYPES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      },
      "multi"
    );
  };
};

export const getContentTranslation = (questionId, languageId, callback) => {
  return dispatch => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CONTENT_TRANSLATION,
      `?contentId=${questionId}&languageId=${languageId}`,
      resData => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_CONTENT_TRANSLATION,
            payload: {
              contentTranslationData: resData.data
            }
          })
        }
      },
      error => {
        let { data } = error
        Utils.showAlert(2, data.message)
      }
    )
  }
}

export const getSettingsTranslation = (questionId, languageId, callback) => {
  return dispatch => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SETTINGS_TRANSLATION,
      `?questionId=${questionId}&languageId=${languageId}`,
      resData => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_SETTINGS_TRANSLATION,
            payload: {
              settingsTranslationData: resData.data
            }
          })
        }
      },
      error => {
        let { data } = error
        Utils.showAlert(2, data.message)
      }
    )
  }
}

export const getHintTranslation = (questionId, languageId, callback) => {
  return dispatch => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_HINT_TRANSLATION,
      `?questionHintId=${questionId}&languageId=${languageId}`,
      resData => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_HINT_TRANSLATION,
            payload: {
              hintTranslationData: resData.data
            }
          })
        }
      },
      error => {
        let { data } = error
        Utils.showAlert(2, data.message)
      }
    )
  }
}

export const getFormTypesSelfTranslation = (formTypeId, languageId, callback) => {
  return dispatch => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_FORM_TYPES_SELF_TRANSLATION,
      `?formTypeId=${formTypeId}&languageId=${languageId}`,
      resData => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_FORM_TYPES_SELF_TRANSLATION,
            payload: {
              formTypeSelfTranslationData: resData.data
            }
          })
        }
      },
      error => {
        let { data } = error
        Utils.showAlert(2, data.message)
      }
    )
  }
}


export const getFormTypesUSTranslation = (formTypeId, languageId, callback) => {
  return dispatch => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_US_TRANSLATION,
      `?formTypeId=${formTypeId}&languageId=${languageId}`,
      resData => {
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_US_TRANSLATION,
            payload: {
              formTypeUSTranslationData: resData.data
            }
          })
        }
      },
      error => {
        let { data } = error
        Utils.showAlert(2, data.message)
      }
    )
  }
}

export const insertSettingsTranslation = value => {
  return dispatch => {
    const dataToSend = { message: value }
    Utils.api.postApiCall(
      Utils.endPoints.INSERT_SETTING_TRANSLATION,
      value,
      responseData => {
        let { data } = responseData
        dispatch({
          type: Utils.ActionName.INSERT_SETTING_TRANSLATION,
          payload: { data: data.data }
        })
        if (responseData) {
          Utils.showAlert(1, responseData?.data)
        }
      },
      error => {
        let { data } = error
        Utils.showAlert(2, data.message)
      }
    )
  }
}
      

export const insertFormTypesSelfTranslation = value => {
  return dispatch => {
    const dataToSend = { message: value }
    Utils.api.postApiCall(
      Utils.endPoints.CREATE_FORM_TYPES_SELF_TRANSLATION,
      value,
      responseData => {
        let { data } = responseData
        dispatch({
          type: Utils.ActionName.CREATE_FORM_TYPES_SELF_TRANSLATION,
          payload: { data: data.data }
        })
        if (responseData) {
          Utils.showAlert(1, responseData?.data)
        }
      },
      error => {
        let { data } = error
        Utils.showAlert(2, data.message)
      }
    )
  }
}

export const insertFormTypesUSTranslation = value => {
  return dispatch => {
    const dataToSend = { message: value }
    Utils.api.postApiCall(
      Utils.endPoints.POST_US_TRANSLATION,
      value,"",
      responseData => {
        let { data } = responseData
        dispatch({
          type: Utils.ActionName.POST_US_TRANSLATION,
          payload: { data: data.data }
        })
        if (responseData) {
          Utils.showAlert(1, responseData?.data)
        }
      },
      error => {
        let { data } = error
        Utils.showAlert(2, data.message)
      }
    )
  }
}



export const updateLOB = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.UPDATE_LOB,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_LOB,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
          getAllLOB();
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const updateDocType = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_DOCUMENTATION,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_DOCUMENTATION,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Documentation updated successfully.");
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const updateCapacities = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_FROM_CAPACITIES,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_FROM_CAPACITIES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};



export const updatePAGES = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_PAGE,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_PAGE,
          payload: { data: data.data },
        });
        if (responseData) {
          console.log(responseData,"kkk")
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const updateFormTypes = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_FORM_TYPES,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_FORM_TYPES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      },
      "multi"
    );
  };
};

export const importContent = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.IMPORT_CONTENT,
      value,
      (responseData) => {

        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.IMPORT_CONTENT,
          payload: { data: data.data },
        });
        if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data);
      },
      "multi"
    );
  };
};

export const importRule = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.IMPORT_RULES,
      value,
      (responseData) => {

        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.IMPORT_RULES,
          payload: { data: data.data },
        });
        if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data?.error);
      },
      "multi"
    );
  };
};


export const importEasy = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.IMPORT_EASY,
      value,
      (responseData) => {

        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.IMPORT_EASY,
          payload: { data: data.data },
        });
        if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data);
      },
      "multi"
    );
  };
};

export const importCountries = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.IMPORT_COUNTRIES,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.IMPORT_COUNTRIES,
          payload: { data: data.data },
        });
        if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data);
      },
      "multi"
    );
  };
};

export const upsertSettings = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.UPSERT_SETTINGS,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPSERT_SETTINGS,
          payload: { data: data.data },
        });
        if (responseData) {
          // Utils.showAlert(1, responseData?.data);
        }
        // Check if both requests are successful before showing the alert and saving to localStorage
        checkAndSaveToLocalStorage(dispatch);
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      },
      "multi"
    );
  };
};

export const UpsertRequestHeader = (value) => {
  return (dispatch) => {
    Utils.api.postApiCall(
      Utils.endPoints.UPSERT_REQUEST_HEADER,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPSERT_REQUEST_HEADER,
          payload: { data: data.data },
        });
        if (responseData) {
          // Utils.showAlert(1, "Request Header updated successfully.");
        }
        // Check if both requests are successful before showing the alert and saving to localStorage
        checkAndSaveToLocalStorage(dispatch);
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

let successfulRequests = 0;

const checkAndSaveToLocalStorage = (dispatch) => {
  successfulRequests++;
  
 
  if (successfulRequests === 2) {

    localStorage.setItem("response", "data saved successfully");
 
    Utils.showAlert(1, "Updated successfully.");
  
    successfulRequests = 0;
  }
};


export const updateUSFormTypes = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_US_FORM_TYPES,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_US_FORM_TYPES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      },
      "multi"
    );
  };
};

export const getAllCountries = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.COUNTRIES,`?pageNumber=${1}&pageSize=${300}`,
      "",
      (resData) => {
        const { data } = resData;
        if (resData.status === 200) {
          dispatch({
            type: Utils.ActionName.COUNTRIES,
            payload: {
              allCountriesData: resData.data,
            },
          });
        } else {
          // Utils.showAlert(2, data.message);
        }
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};
//COUNTRY_NAME
export const exportContent = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.EXPORT_CONTENT,
      "",
      (resData) => {
        const url = window.URL.createObjectURL(new Blob([resData.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Content-${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.error);
      }
      ,true
    );
  };
};

export const exportRule = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.EXPORT_RULES,
      "",
      (resData) => {
        const url = window.URL.createObjectURL(new Blob([resData.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Rule-${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.error);
      },
      true
    );
  };
};

export const exportCountries = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.EXPORT_COUNTRIES,
      "",
      (resData) => {
        const url = window.URL.createObjectURL(new Blob([resData.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Countries-${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.error);
      },
      true
    );
  };
};

export const exportEasy = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.EXPORT_EASY,
      "",
      (resData) => {
        console.log(resData);
        const url = window.URL.createObjectURL(new Blob([resData.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Easy_help-${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.error);
      },
      true
    );
  };
};



export const getAllLanguages = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.LANGUAGES,
      "",
      (resData) => {
        // if (resData.status === 200) {
          dispatch({
            type: Utils.ActionName.LANGUAGES,
            payload: {
              allLanguageData: resData.data,
            },
          });
        // } else {
        //   Utils.showAlert(2, data.message);
        // }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const UpdateLanguageSequence = (Id,newOrderValue=0,direction,callback) => {
  return (dispatch) => {
    Utils.api.postApiCall(
      Utils.endPoints.UPSERT_ORDER_ELEMENTS,
      {
        tableName: constants.tableNames.Languages,
        elementID: Id,
        newOrderValue: newOrderValue,
        direction: direction
      },
      (resData)=>{
        console.log(resData,'language order success');
        callback();
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );    
  };
};

//   POST_IMPORTANT_COUNTRIES:"POST_IMPORTANT_COUNTRIES",
//   POST_HIDDEN_COUNTRIES:"POST_HIDDEN_COUNTRIES",
//   POST_CHAPTER3_HIDDEN_ENTITY:"POST_CHAPTER3_HIDDEN_ENTITY",
//   POST_CHAPTER4_HIDDEN_ENTITY:"POST_CHAPTER4_HIDDEN_ENTITY",
//   POST_CHAPTER4_IMPORTANT_ENTITY:"POST_CHAPTER4_IMPORTANT_ENTITY",
//   POST_CAPACITY_HIDDEN:"POST_CAPACITY_HIDDEN",
//   POST_DOCUMENT_MANDATORY:"POST_DOCUMENT_MANDATORY",
//   POST_EXEMPTION_CODE_DISABLE:"POST_EXEMPTION_CODE_DISABLE",
//   POST_INCOME_CODE_HIDDEN:"POST_INCOME_CODE_HIDDEN",
//   GET_US_VISATYPE_HIDDEN:"GET_US_VISATYPE_HIDDEN",
//   POST_US_VISATYPE_HIDDEN:"POST_US_VISATYPE_HIDDEN",


export const getCapacityHidden = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CAPACITY_HIDDEN,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_CAPACITY_HIDDEN,
            payload: {
              getCapacityData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllCountriesName = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.COUNTRY_NAME,
      "",
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.COUNTRY_NAME,
            payload: {
              getCountryNameData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getDocMandatory = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_DOCUMENT_MANDATORY,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_DOCUMENT_MANDATORY,
            payload: {
              getDocMandatoryData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getExemptCodeDisable = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_EXEMPTION_CODE_DISABLE,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_EXEMPTION_CODE_DISABLE,
            payload: {
              getExemptCodeDisableData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getIncomeCodeHidden = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_INCOME_CODE_HIDDEN,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_INCOME_CODE_HIDDEN,
            payload: {
              getIncomeCodeHidden: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getUSVisaHidden = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_US_VISATYPE_HIDDEN,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_US_VISATYPE_HIDDEN,
            payload: {
              getusVisaHiddenData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getFATCAHidden = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_FATCA_HIDDEN,
      `?id=${value}`,
      (resData) => {
        
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_FATCA_HIDDEN,
            payload: {
              getFatcaHiddenData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getPaymentType = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_PAYMENT_TYPE,
      `?id=${value}`,
      (resData) => {
        
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_PAYMENT_TYPE,
            payload: {
              getPaymentTypeData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getFatcaGiinDisabled = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_FATCA_GIIN_DISABLED,
      `?id=${value}`,
      (resData) => {
        
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_FATCA_GIIN_DISABLED,
            payload: {
              getFatcaGiinDisabledData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getSpecialSptHidden = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_AGENT_SPT_HIDDEN,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_AGENT_SPT_HIDDEN,
            payload: {
              specualSptHiddenData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const postFatcaHidden = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
     `${ Utils.endPoints.POST_FATCA_HIDDEN}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_FATCA_HIDDEN,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postSelfCertificationHidden = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
     `${ Utils.endPoints.POST_SELF_CERTIFICATION}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_SELF_CERTIFICATION,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const postSelfCertificationSetting = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
     `${ Utils.endPoints.POST_SELF_CERTI_SETTINGS}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_SELF_CERTI_SETTINGS,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
//POST_SELF_CERTI_SETTINGS
export const postPaymentType = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${ Utils.endPoints.POST_PAYMENT_TYPE}?agentId=${id}`,

      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_PAYMENT_TYPE,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postFatcaGiinDisabled = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${ Utils.endPoints.FATCA_GIIN_DISABLED}?agentId=${id}`,

      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.FATCA_GIIN_DISABLED,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postAgentSptHidden = (value,id) => {
  console.log(id,"11")
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${ Utils.endPoints.POST_AGENT_SPT_HIDDEN}?agentId=${id}`,

      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_AGENT_SPT_HIDDEN,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
          dispatch(getSpecialSptHidden(id))
        }
       
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};









export const postImpAgentsCountries = (value,id) => {
  return (dispatch) => {
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_IMPORTANT_COUNTRIES}?agentId=${id}`,

      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_IMPORTANT_COUNTRIES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postHiddenAgentsCountry = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
     `${Utils.endPoints.POST_HIDDEN_COUNTRIES}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_HIDDEN_COUNTRIES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postCH3HiddenCountries = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_CHAPTER3_HIDDEN_ENTITY}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_CHAPTER3_HIDDEN_ENTITY,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postCH4HiddenCountries = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_CHAPTER4_HIDDEN_ENTITY}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_CHAPTER4_HIDDEN_ENTITY,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postCH4ImpCountries = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_CHAPTER4_IMPORTANT_ENTITY}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_CHAPTER4_IMPORTANT_ENTITY,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postCapacityHidden = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
     `${ Utils.endPoints.POST_CAPACITY_HIDDEN}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_CAPACITY_HIDDEN,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postDocMandatory = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_DOCUMENT_MANDATORY}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_DOCUMENT_MANDATORY,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postExemptCodeDisable = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_EXEMPTION_CODE_DISABLE}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_EXEMPTION_CODE_DISABLE,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postIncomeCodeHidden = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_INCOME_CODE_HIDDEN}?agentId=${id}`,

      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_INCOME_CODE_HIDDEN,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postUSVisaHidden = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_US_VISATYPE_HIDDEN}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_US_VISATYPE_HIDDEN,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getImpAgentsCountries = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_IMPORTANT_COUNTRIES,
      `?id=${value}`,
      (resData) => {
        
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_IMPORTANT_COUNTRIES,
            payload: {
              getImpAgentsCountries: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getHiddenAgentsCountry = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_HIDDEN_COUNTRIES,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_HIDDEN_COUNTRIES,
            payload: {
              getHiddenAgentsCountries: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getCH3HiddenCountries = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CHAPTER3_HIDDEN_ENTITY,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_CHAPTER3_HIDDEN_ENTITY,
            payload: {
              getCh3Hidden: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getCH4HiddenCountries = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CHAPTER4_HIDDEN_ENTITY,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_CHAPTER4_HIDDEN_ENTITY,
            payload: {
              getCh4Hidden: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getCH4ImpCountries = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CHAPTER4_IMPORTANT_ENTITY,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_CHAPTER4_IMPORTANT_ENTITY,
            payload: {
              getCh4Imp: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getContentById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_CONTENT_BY_ID,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_CONTENT_BY_ID,
            payload: {
              ContentById: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getLanguagesById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_LANGUAGE_BY_ID,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_LANGUAGE_BY_ID,
            payload: {
              LanguageById: resData.data,
            },
          });
        } else {
          Utils.showAlert(2, resData.message);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const createLanguages = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.CREATE_LANGUAGE,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.CREATE_LANGUAGE,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const updateContent = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_CONTENT,
      value,"",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_CONTENT,
          payload: { data: data.data },
        });
         if (responseData) {
           Utils.showAlert(1, "Content Updated Successfully");
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
    
  };
};

export const updateLanguage = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_LANGUAGE,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_LANGUAGE,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const deleteLanguage = (id) => {
  return (dispatch) => {
    // const dataToSend = { message: value };
    Utils.api.deleteApiCall(
      `${Utils.endPoints.DELETE_LANGUAGE}?id=${id}`,
      "",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.DELETE_LANGUAGE,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Deleted Successfully");
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const getParentDropDown = () => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.PARENT_DROPDOWN,
      "",
      (resData) => {
        dispatch({
          type: Utils.ActionName.PARENT_DROPDOWN,
          payload: {
            parentDropDown: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllFormInstructions = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_FORM_INSTRUCTIONS,
      params,
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_ALL_FORM_INSTRUCTIONS,
          payload: {
            formInstructionData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const changeFormInstructionSequence = (Id,newOrderValue=0,direction,callback) => {  
  return (dispatch) => {
    Utils.api.postApiCall(
      Utils.endPoints.UPSERT_ORDER_ELEMENTS,
      {
        tableName: constants.tableNames.FormInstructions,
        elementID: Id,
        newOrderValue: newOrderValue,
        direction: direction
      },
      (resData)=>{
        console.log(resData,'page order success');
        callback();
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getHiddenSourcedUS = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SOURCED_INCOME_HIDDEN,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_SOURCED_INCOME_HIDDEN,
            payload: {
              getHiddenSourceUS : resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getSourcedIncomeById = (id,usId,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SOURCED_INCOME_BY_ID,
      `?agentid=${id}&uSSourcedIncomeTypeId=${usId}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_SOURCED_INCOME_BY_ID,
            payload: {
              getSourceIncomeByIdData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        // Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postHiddenSourcedUS = (value,id) => {
   
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
     `${Utils.endPoints.POST_SOURCED_INCOME_HIDDEN}?agentId=${id}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_SOURCED_INCOME_HIDDEN,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllUSIncomeType = (id) => {
  let params= `?AgentId=${id}`
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SOURCED_INCOME_DATA,
      params,
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_SOURCED_INCOME_DATA,
          payload: {
            usIncomeTypeData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllUSIncomeOnboarded = (id) => {
  let params= `?id=${id}`
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_SOURCED_INCOME_ONBOARDED,
      params,
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_SOURCED_INCOME_ONBOARDED,
          payload: {
            usIncomeOnboardedData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getFormInstructionById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_FORM_INSTRUCTION_BY_ID,
      `?id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_FORM_INSTRUCTION_BY_ID,
            payload: {
              formInstructionById: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const createFormInstruction = (value,callback) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.INSERT_FORM_INSTRUCTIONS,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.INSERT_FORM_INSTRUCTIONS,
          payload: { data: data.data },
        });
         if (responseData) {
          callback();
          Utils.showAlert(1, responseData?.data);
          getAllFormInstructions(1,10,"")
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const createCapacities = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_INSERT_CAPACITIS}`,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_INSERT_CAPACITIS,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};
export const postHelpVideo = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_HELP_VIDEOS}`,
      value,"",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_HELP_VIDEOS,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Help video updated successfully.");
          // console.log(responseData,"dataa")
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const updateFormInstruction = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_FORM_INSTRUCTIONS,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_FORM_INSTRUCTIONS,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
          dispatch(getAllFormInstructions(1, 10));

        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const deleteFormInstruction = (id) => {
  return (dispatch) => {
    // const dataToSend = { message: value };
    Utils.api.deleteApiCall(
      `${Utils.endPoints.DELETE_FORM_INSTRUCTION}?id=${id}`,
      "",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.DELETE_FORM_INSTRUCTION,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Deleted Successfully");
         dispatch( getAllFormInstructions(1,10,""))
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllRules = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_RULES,
      params,
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_ALL_RULES,
          payload: {
            rulesData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const createRules = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.CREATE_RULES,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.CREATE_RULES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const updateRule = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_RULES,
      value,"",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_RULES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getRuleById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_RULES_BY_ID,
      `?Id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_RULES_BY_ID,
            payload: {
              getRuleById: resData.data,
            },
          });
        } 
        // else {
        //   Utils.showAlert(2, resData.message);
        // }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const deleteRule = (id) => {
  return (dispatch) => {
    Utils.api.deleteApiCall(
      `${Utils.endPoints.DELETE_RULES}?id=${id}`,
      "",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.DELETE_RULES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Deleted Successfully");
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getAllEasy = (page,size,search) => {
  let params= `?pageNumber=${page}&pageSize=${size}`
  if(search){
    params=`?searchTerm=${search}&pageNumber=${page}&pageSize=${size}`
  }
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_ALL_EASY,
      params,
      (resData) => {
        dispatch({
          type: Utils.ActionName.GET_ALL_EASY,
          payload: {
            easyData: resData.data,
          },
        });
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const updateEasy = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_EASY,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_EASY,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};


export const updateQuestion = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.UPDATE_QUESTION,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_QUESTION,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const updateAgents = value => {
  return dispatch => {
    const dataToSend = { message: value }
    Utils.api.putApiCall(
      Utils.endPoints.UPDATE_AGENT,
      value,
      responseData => {
        let { data } = responseData
        dispatch({
          type: Utils.ActionName.UPDATE_AGENT,
          payload: { data: data.data }
        })
        if (responseData) {
          Utils.showAlert(1, responseData?.data)
        }
      },
      error => {
        let { data } = error
        Utils.showAlert(2, data.message)
      },
      'multi'
    )
  }
}
//UPDATE_AGENT_TIN

export const updateAgentsTinType = (value,id) => {
  return (dispatch) => {
    // const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.UPDATE_AGENT_TIN,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPDATE_AGENT_TIN,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
          dispatch(getAgentTinTypeById(id));
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

// export const updateAgentsTinType = (value, id) =>
//  {
 
//   return dispatch => {
//     const dataToSend = { message: value };
//     Utils.api.postApiCall(
//       Utils.endPoints.UPDATE_AGENT_TIN,
//       dataToSend,
//       responseData => {
//         let { data } = responseData;
//         dispatch({
//           type: Utils.ActionName.UPDATE_AGENT_TIN,
//           payload: { data: data.data }
//         });
//         if (responseData) {
//           Utils.showAlert(1, responseData?.data);
//           dispatch(getAgentTinTypeById(id));
//         }
//       },
//       error => {
//         let { data } = error;
//         Utils.showAlert(2, data.message);
//       }
//     );
//   };
// };
export const createAgents = value => {
  return dispatch => {
    const dataToSend = { message: value }
    Utils.api.postApiCall(
      Utils.endPoints.CREATE_AGENT,
      value,
      responseData => {
        let { data } = responseData
        dispatch({
          type: Utils.ActionName.CREATE_AGENT,
          payload: { data: data.data }
        })
        if (responseData) {
          Utils.showAlert(1, responseData?.data)
        }
      },
      error => {
        Utils.showAlert(2, error.statusText)
      },
      'multi'
    )
  }
}

export const getAgentById = (value, callback) => {
  return dispatch => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_AGENT_BY_ID,
      `?id=${value}`,
      resData => {
        const { data } = resData
        if (resData.status === 200) {
          if (callback) {
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_AGENT_BY_ID,
            payload: {
              agentDataById: resData.data
            }
          })
        } else {
          // Utils.showAlert(2, resData.message)
        }
      },
      error => {
        let { data } = error
        // Utils.showAlert(2, data.message)
      }
    )
  }
}



export const deleteEasy = (id) => {
  return (dispatch) => {
    Utils.api.deleteApiCall(
      `${Utils.endPoints.DELETE_EASY}?id=${id}`,
      "",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.DELETE_EASY,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, "Deleted Successfully");
        }
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const getEasyById = (value,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_EASY_BY_ID,
      `?Id=${value}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_EASY_BY_ID,
            payload: {
              getEasyById: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const postEformSelectionWanring = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      `${Utils.endPoints.POST_E_FORM_SELECTION_WARNING}?agentId=${id}`,
      value,
      
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_E_FORM_SELECTION_WARNING,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
       dispatch(getAgentEformSelection(id))
        }


      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const postAgentUpdateList = (value,id) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.POST_AGENT_UPDATE_LIST,
      value,
      
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_AGENT_UPDATE_LIST,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        // dispatch(getAllAgents())
        }


      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};
export const createEasy = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.INSERT_EASY,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.INSERT_EASY,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};
   

   export const getRuleTranslation = (pageId,languageId,callback) => {
    return (dispatch) => {
      Utils.api.getApiCall(
        Utils.endPoints.GET_RULE_TRANSLATION,
        `?ruleId=${pageId}&languageId=${languageId}`,
        (resData) => {
          if (resData.status === 200) {
            if(callback){
              callback(resData.data)
            }
            dispatch({
              type: Utils.ActionName.GET_RULE_TRANSLATION,
              payload: {
                ruleTranslationData: resData.data,
              },
            });
          } 
        },
        (error) => {
          let { data } = error;
          Utils.showAlert(2, data.message);
        }
      );
    };
  };

  export const createContentTranslations = (value) => {
    return (dispatch) => {
      Utils.api.postApiCall(
        Utils.endPoints.POST_CONTENT_TRANSLATION,
        value,
        (responseData) => {
          let { data } = responseData;
          dispatch({
            type: Utils.ActionName.POST_CONTENT_TRANSLATION,
            payload: { data: data.data },
          });
           if (responseData) {
            Utils.showAlert(1, responseData?.data);
          }
        },
        (error) => {
          Utils.showAlert(2, error.statusText);
        }
      );
    };
  };
  
  export const createRuleTranslations = (value) => {
    return (dispatch) => {
      const dataToSend = { message: value };
      Utils.api.postApiCall(
        Utils.endPoints.INSERT_RULE_TRANSLATION,
        value,
        (responseData) => {
          let { data } = responseData;
          dispatch({
            type: Utils.ActionName.INSERT_RULE_TRANSLATION,
            payload: { data: data.data },
          });
           if (responseData) {
            Utils.showAlert(1, responseData?.data);
          }
        },
        (error) => {
          Utils.showAlert(2, error.statusText);
        }
      );
    };
  };

  export const getAgentTranslation = (pageId,languageId,callback) => {
    return (dispatch) => {
      Utils.api.getApiCall(
        Utils.endPoints.GET_AGENT_TRANSLATION,
        `?agentId=${pageId}&languageId=${languageId}`,
        (resData) => {
          if (resData.status === 200) {
            if(callback){
              callback(resData.data)
            }
            dispatch({
              type: Utils.ActionName.GET_AGENT_TRANSLATION,
              payload: {
                agentTranslationData: resData.data,
              },
            });
          } 
        },
        (error) => {
          let { data } = error;
          Utils.showAlert(2, data.message);
        }
      );
    };
  };

export const getPageTranslation = (pageId,languageId,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_PAGE_TRANSLATION,
      `?pageId=${pageId}&languageId=${languageId}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_PAGE_TRANSLATION,
            payload: {
              pageTranslationData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const createEasyTranslations = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.INSERT_EASY_TRANSLATION,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.INSERT_EASY_TRANSLATION,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};


export const getEasyTranslation = (pageId,languageId,callback) => {
  return (dispatch) => {
    Utils.api.getApiCall(
      Utils.endPoints.GET_EASY_TRANSLATION,
      `?easyHelpId=${pageId}&languageId=${languageId}`,
      (resData) => {
        if (resData.status === 200) {
          if(callback){
            callback(resData.data)
          }
          dispatch({
            type: Utils.ActionName.GET_EASY_TRANSLATION,
            payload: {
              easyTranslationData: resData.data,
            },
          });
        } 
      },
      (error) => {
        let { data } = error;
        Utils.showAlert(2, data.message);
      }
    );
  };
};

export const createPAGESTranslations = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.INSERT_PAGE_TRANSLATION,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.INSERT_PAGE_TRANSLATION,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const upsertQuestionTranslations = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.UPSERT_QUESTION_TRANSLATION,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPSERT_QUESTION_TRANSLATION,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const upsertCountries = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.POST_UPSERT_COUNTRIES,
      value,"",
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.POST_UPSERT_COUNTRIES,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const createAgentsTranslations = (value) => {
  return (dispatch) => {
    const dataToSend = { message: value };
    Utils.api.postApiCall(
      Utils.endPoints.UPSERT_AGENT_TRANSLATION,
      value,
      (responseData) => {
        let { data } = responseData;
        dispatch({
          type: Utils.ActionName.UPSERT_AGENT_TRANSLATION,
          payload: { data: data.data },
        });
         if (responseData) {
          Utils.showAlert(1, responseData?.data);
        }
      },
      (error) => {
        Utils.showAlert(2, error.statusText);
      }
    );
  };
};

export const setEnableBackgroundImage = (enableBackgroundImage) => ({
  type: SET_ENABLE_BACKGROUND_IMAGE,
  enableBackgroundImage,
});

export const setEnableFixedHeader = (enableFixedHeader) => ({
  type: SET_ENABLE_FIXED_HEADER,
  enableFixedHeader,
});

export const setEnableHeaderShadow = (enableHeaderShadow) => ({
  type: SET_ENABLE_HEADER_SHADOW,
  enableHeaderShadow,
});

export const setEnableSidebarShadow = (enableSidebarShadow) => ({
  type: SET_ENABLE_SIDEBAR_SHADOW,
  enableSidebarShadow,
});

export const setEnablePageTitleIcon = (enablePageTitleIcon) => ({
  type: SET_ENABLE_PAGETITLE_ICON,
  enablePageTitleIcon,
});

export const setEnablePageTitleSubheading = (enablePageTitleSubheading) => ({
  type: SET_ENABLE_PAGETITLE_SUBHEADING,
  enablePageTitleSubheading,
});

export const setEnablePageTabsAlt = (enablePageTabsAlt) => ({
  type: SET_ENABLE_PAGE_TABS_ALT,
  enablePageTabsAlt,
});

export const setEnableFixedSidebar = (enableFixedSidebar) => ({
  type: SET_ENABLE_FIXED_SIDEBAR,
  enableFixedSidebar,
});

export const setEnableClosedSidebar = (enableClosedSidebar) => ({
  type: SET_ENABLE_CLOSED_SIDEBAR,
  enableClosedSidebar,
});

export const setEnableMobileMenu = (enableMobileMenu) => ({
  type: SET_ENABLE_MOBILE_MENU,
  enableMobileMenu,
});

export const setEnableMobileMenuSmall = (enableMobileMenuSmall) => ({
  type: SET_ENABLE_MOBILE_MENU_SMALL,
  enableMobileMenuSmall,
});

export const setEnableFixedFooter = (enableFixedFooter) => ({
  type: SET_ENABLE_FIXED_FOOTER,
  enableFixedFooter,
});

export const setBackgroundColor = (backgroundColor) => ({
  type: SET_BACKGROUND_COLOR,
  backgroundColor,
});

export const setHeaderBackgroundColor = (headerBackgroundColor) => ({
  type: SET_HEADER_BACKGROUND_COLOR,
  headerBackgroundColor,
});

export const setColorScheme = (colorScheme) => ({
  type: SET_COLOR_SCHEME,
  colorScheme,
});

export const setBackgroundImageOpacity = (backgroundImageOpacity) => ({
  type: SET_BACKGROUND_IMAGE_OPACITY,
  backgroundImageOpacity,
});

export const setBackgroundImage = (backgroundImage) => ({
  type: SET_BACKGROUND_IMAGE,
  backgroundImage,
});
