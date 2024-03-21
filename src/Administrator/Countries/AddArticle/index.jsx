import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,useHistory } from "react-router-dom";
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
  Button,
  Input,
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
import { getCountryById, CountryUpsert, CountriesUpsertArticle,getMaxNumber,GetIncomeTypes,getCountryArticleById } from "../../../redux/Actions";

const Countries_details = ({ location }) => {
 
  const [articleId, setArticleId] = useState(localStorage.getItem('articleId') || (location.state && location.state.articleId) || '');
  const [perticularId, setPerticularId] = useState(localStorage.getItem('perticularId') || (location.state && location.state.perticularId) || '');
  const [name, setName] = useState('');
  useEffect(() => {
   
    const newName = location.state?.name;

    if (newName) {
      setName(newName);
      localStorage.setItem('name', newName);
    } else {
     
      const storedName = localStorage.getItem('name');
      if (storedName) {
        setName(storedName);
      }
    }
  }, [location.state]);
  console.log(name,"0089")
 
  useEffect(() => {
  
    localStorage.setItem('articleId', articleId);
    localStorage.setItem('perticularId', perticularId);
  }, [articleId, perticularId]);

  const clearLocalStorage = () => {
     localStorage.removeItem("perticularId");
  };

  useEffect(() => {
    window.addEventListener('popstate', clearLocalStorage);

   
    return () => {
      window.removeEventListener('popstate', clearLocalStorage);
    };
  }, []);
  useEffect(() => {
    
    console.log(articleId, "222");
    console.log(perticularId, "123");
  }, [articleId, perticularId]);

  useEffect(() => {
    console.log(params?.id);
    if (params?.id) {
      dispatch(getCountryArticleById(params.id));
      dispatch(getCountryById(params.id), (item) => {
        setData(item);
      });
    }
    else{
      dispatch(getCountryById(articleId), (item) => {
        setData(item);
      });
    }
  }, []);
  const dispatch = useDispatch();
  let params = useParams();
  let history= useHistory();
  const formData = useSelector((state) => state?.getNumbersReducer?.numberData);

  const namedata = useSelector((state)=>state.getIncomeReducer);
  const Articledata = useSelector((state) => state.getCountryArticleByIdReducer?.getCountryArticleByIdData);
  const filteredData = Articledata?.filter(item => item.id == perticularId);
  console.log(filteredData,"po")

  const countryData = useSelector(
    (state) => state?.getCountryByIdReducer?.getCountryByIdData
  );
  
  const defaultData = {
    id: 0,
    countryId: articleId,
    number: '',
    description: '',
    treatyRates: '',
    maxNoOfParagraph: 0,
    includeSubParagraph: false,
    showInDropDown: false,
    articlesIncomeCodes: "",
  };
  const [selectedIncomeCodes, setSelectedIncomeCodes] = useState([]);
  const [formData1, setFormData1] = useState(defaultData);
  const [data, setData] = useState({});
  const [selectAll, setSelectAll] = useState(false);
  const [selectArray, setSelectArray] = useState([]);
  const [checkedStatusHidden,setCheckedStatusHidden] = useState({});
  useEffect(() => {
    if (filteredData) {
      // Use setFormData1 function to update the state
      setFormData1(filteredData?.[0]); // Assuming you want the first element of filteredData
    } 
  }, [filteredData!==undefined]);

  // useEffect(() => {
  //   // This effect will run when formData1 changes
  //   console.log('formData1 changed:', formData1);
  // }, [formData1]);

  
  // const handleToggleCheck = (id) => {
  //   const currentIncomeCodes = formData1.articlesIncomeCodes || [];
  //   const isSelected = currentIncomeCodes.includes(id);
  //   const updatedSelectedIncomeCodeIds = isSelected
  //     ? currentIncomeCodes?.filter((selectedId) => selectedId !== id)
  //     : [...currentIncomeCodes, id];
  
  //   // Check if the value has changed
  //   const isValueChanged = JSON.stringify(updatedSelectedIncomeCodeIds) !== JSON.stringify(currentIncomeCodes);
  
  //   setFormData1({
  //     ...formData1,
  //     articlesIncomeCodes: updatedSelectedIncomeCodeIds,
  //     isIncomeCodeValueChanged: isValueChanged, // Add a flag to indicate whether the value has changed
  //   });
  // };


  const handleToggleCheck = (id) => {
    setFormData1((prevFormData) => {
      const currentIncomeCodes = prevFormData.articlesIncomeCodes
        ? prevFormData.articlesIncomeCodes
        : "";
      const isCurrentlyChecked = currentIncomeCodes.includes(id);
  
      // Exclude 0 from the list of income codes
      const updatedSelectedIncomeCodeIds = currentIncomeCodes
        .split(',')
        .filter((number) => Number(number.trim()) !== 0);
  
      // Toggle the state of the specific checkbox
      if (!isCurrentlyChecked && id !== 0) {
        updatedSelectedIncomeCodeIds.push(id);
      }
  
      return {
        ...prevFormData,
        articlesIncomeCodes: updatedSelectedIncomeCodeIds.join(','),
        isIncomeCodeValueChanged: true,
      };
    });
  };
  
  
  console.log(formData1,"2222");
  const handleSelectAll = () => {
    namedata?.incTypeData?.forEach((item) => {
      setSelectArray((prevArray) => [...prevArray, item.id]);
    });
    setSelectAll(true);
  };
  
  const handleUnselectAll = () => {
    setSelectArray([]);
    setSelectAll(false);
  };
  
  useEffect(() => {
    dispatch(getMaxNumber());
  }, []);
  
useEffect(() => {
  // Initialize selectedIncomeCodes with IDs from the API data
  const initialSelectedCodes = formData1?.articlesIncomeCodes
    ? formData1.articlesIncomeCodes.split(',').map(id => Number(id))
    : [];
  setSelectedIncomeCodes(initialSelectedCodes);
}, [formData1?.articlesIncomeCodes, params?.id]);

  
 const handleChangeToggle = (incomeCodeId) => {
    // Update selectedIncomeCodes based on incomeCodeId
    const updatedSelectedIncomeCodes = selectedIncomeCodes.includes(incomeCodeId)
      ? selectedIncomeCodes.filter((id) => id !== incomeCodeId)
      : [...selectedIncomeCodes, incomeCodeId];
    
    // Update formData1.articlesIncomeCodes based on updatedSelectedIncomeCodes
    const updatedArticlesIncomeCodes = updatedSelectedIncomeCodes.join(',');

    // Update state
    setSelectedIncomeCodes(updatedSelectedIncomeCodes);
    setFormData1({
      ...formData1,
      articlesIncomeCodes: updatedArticlesIncomeCodes,
    });
  };

  // const handleChangeToggle = (id) => {
  //   setSelectedIncomeCodes((prevSelected) => {
  //     const isSelected = prevSelected.includes(id);
  //     if (isSelected) {
  //       return prevSelected.filter(codeId => codeId !== id);
  //     } else {
  //       return [...prevSelected, id];
  //     }
  //   });
  // };
  useEffect(() => {
    dispatch(GetIncomeTypes());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(params.id){
    let updateData = {
    countryArticlesId:formData1?.id,
    countryId: params.id,
    number: formData1?.number,
    description: formData1?.description,
    treatyRates: formData1?.treatyRates,
    maxNoOfParagraph: formData1?.maxNoOfParagraph,
    includeSubParagraph: formData1?.includeSubParagraph || false,
    showInDropDown: formData1?.showInDropDown || false,
     selectedIncomeCodeIds: selectedIncomeCodes.map(id => ({ id })),
    };
    dispatch(CountriesUpsertArticle(updateData));
    }
    else{
      let createData = {
       
        countryId: articleId,
        number: formData1?.number,
        countryArticlesId: 0,
        description: formData1?.description,
        treatyRates: formData1?.treatyRates,
        maxNoOfParagraph: formData1?.maxNoOfParagraph,
        includeSubParagraph: formData1?.includeSubParagraph,
        showInDropDown: formData1?.showInDropDown,
        selectedIncomeCodeIds: selectedIncomeCodes.map(id => ({ id })),
          }
      dispatch(CountriesUpsertArticle(createData));
    }
    history.push(`/countries_edit/${name}`);
  }

  useEffect(() => {
    setData(countryData);
  }, [countryData]);


  const handleToogle = (e) => {
    const { name, checked } = e.target;
    setFormData1((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };
  
  const handleChange = (e) => {
    console.log('handleChange called');
    const {name,value } = e.target;
    // console.log( 'Value:', e.target);
    setFormData1({ ...formData1, [name]: value });
  };
console.log(formData1,"formData1");
  return (
    <Card>
      <Fragment>
        <ThemeOptions />
        <div className="app-main">
          <AppSidebar />
          <div className="app-main__outer" >
          <div className="app-main__inner">
          <div role="presentation" className="bread_crumbs">
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                   underline="hover"
                   color="#0c62a8"
                 onClick={()=>{
                  history.push(`/countries/${params?.id}`)
                 }}
                  
                >
            Countries
                </Link>
                <p
                   underline="hover"
                   color="#000000"
                   
                 
                  
                >
            Countries Add Article
                </p>
              </Breadcrumbs>
            </div>
          <div className="row m-1 border p-3 box_style">
          <form >
            <div  >
            { <div  className="row headingLabel complyColor">
                        {params.id ? " Edit Country Article" : "Add Country Article"}</div>}
              <div className="row">
                <div className="col-2" >
                  <div
                   
                    className="table_content"
                  >
                    
                    Country:
                  </div>
                </div>
                <div className="col-10">
                  <div
                   
                    className="table_content"
                  >
                  {data?.name}
                  </div>

                  
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
                Number:


                  </div>
                </div>
                <div className="col-10">
                <TextField
                  className="table_content"
                    size="small"
                    name="number"
                    value={ formData1?.number}
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
                  Description:


                  </div>
                </div>
                <div className="col-10">
                <TextField
                  className="table_content"
                    size="small"
                    name="description"
                    value={formData1?.description}
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
                  Treaty Rates Available:


                  </div>
                </div>
                <div className="col-10">
                <TextField
                  className="table_content"
                    size="small"
                    name="treatyRates"
                    value={formData1?.treatyRates}
                   
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
                 Max number of paragraphs available:

                  </div>
                </div>
                <div className="col-10">

                   
                    <Select align="center" value={formData1?.maxNoOfParagraph} className='selectBox text table_content' name="maxNoOfParagraph" onChange={handleChange} >
                    <MenuItem > ---Select----</MenuItem>
                    {formData?.map((i,ind)=>{
                     
                       return(<MenuItem key={ind} value={i}>{i}</MenuItem>)
                      
                      })}
                    </Select>
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
               Include Subparagraph Information:

                  </div>
                </div>
                <div className="col-10">
                <Checkbox onClick={(e) => handleToogle(e)}
                          className="p-0 checkBox"
                          name="includeSubParagraph"
                          id="includeSubParagraph"
                          checked={formData1?.includeSubParagraph||false}
                         />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
                  Show in drop-downs:


                  </div>
                </div>
                <div className="col-10">
                <Checkbox onClick={(e) => handleToogle(e)}
                        name="showInDropDown"
                        id="showInDropDown"
                        checked={formData1?.showInDropDown}
                        className="p-0 checkBox"
                          />
                </div>
              </div>
              <div className="row">
                <div className="col-2">
                  <div
                   
                    
                    className="table_content"
                  >
                 Associated Income Codes:


                  </div>
                </div>
               
              </div>
              <div className="row">
              {namedata?.incTypeData?.map((incomeCode, index) => (
               

          
              <div key={index} className="col-12">
    <span>
  
  <Checkbox
  
    name={`incomeCode_${incomeCode.id}`}
    checked={
    selectedIncomeCodes.includes(incomeCode.id) ||
    (formData1?.articlesIncomeCodes && formData1.articlesIncomeCodes.split(',').includes(String(incomeCode.id)))
      ? true
      : false
  }
    onChange={() => handleChangeToggle(incomeCode.id)}
  />


               <span className="table_content mt-1 p-0">{incomeCode.name}</span>
    </span>
  </div>
))}
              </div>
             
              </div>
             
         

            <div className="actionBtn">
             {params?.id ?( <Button
                type="reset"
                size="small"
               
                variant="outlined"
                sx={{ mr: 1}}
                onClick={()=>{
                  
                  history.push(`/countries_edit/${params?.id}`);
                 }}
              >
                cancel
              </Button>
):
<Button
type="reset"
size="small"

variant="outlined"
sx={{ mr: 1}}
onClick={()=>{
  
history.push(`/countries_edit/${name}`);
 }}
>
cancel
</Button>

}
              <Button
                size="small"
                type="submit"
                onClick={handleSubmit}
                sx={{ mr: 2 }}
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
export default Countries_details;