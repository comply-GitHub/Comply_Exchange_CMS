import { Route, Redirect } from "react-router-dom";
import React, { Suspense, lazy, Fragment } from "react";
import Loader from "react-loaders";
// import PrivateRoute from "./privateRoute";
import { ToastContainer } from "react-toastify";
import { Help } from "@mui/icons-material";

const login = lazy(()=>import("../../DemoPages/UserPages/Login"))
const Forget = lazy(() => import("../../DemoPages/UserPages/ForgotPassword"))
const Register = lazy(() => import("../../DemoPages/UserPages/Register"))

//Pages
const Pages = lazy(() => import("../../Administrator/Pages/Pages"));
const Subpage_details = lazy(() => import("../../Administrator/Pages/Subpage"));
const Pages_details = lazy(() =>
  import("../../Administrator/Pages/Page_details")
);
const page_language = lazy(()=> import("../../Administrator/Pages/Page_language"))

//Content Block
const Content = lazy(() => import("../../Administrator/Content/Content"));
const Content_details = lazy(() =>
  import("../../Administrator/Content/Content_details")
);
const Content_language = lazy(()=> import("../../Administrator/Content/Content_language"))
//Agent
const Agents = lazy(() => import("../../Administrator/Agents/Agents"));
const Agents_details = lazy(() =>
  import("../../Administrator/Agents/Agent_details")
);
const Edit_list = lazy(() => import("../../Administrator/Agents/Edit_list"));
const Agent_Form_type = lazy(() =>
  import("../../Administrator/Agents/Form_type")
);
const Agent_Content_edit = lazy(()=> import("../../Administrator/Agents/Content_edit"))
const Content_agent_edit_Form = lazy(()=> import("../../Administrator/Agents/ContentBlockForm"))
const OptOutForm = lazy(()=> import("../../Administrator/Agents/OptOutForm"))
const Agent_language = lazy(()=> import("../../Administrator/Agents/Agents_language"))
const US_income = lazy(() => import("../../Administrator/Agents/Us_income"));

// Easy Help
const Easy = lazy(() => import("../../Administrator/Easy/Easy_help"));
const Easy_details = lazy(() =>
  import("../../Administrator/Easy/Easy_details")
);
const Easy_language = lazy(()=> import ("../../Administrator/Easy/Easy_language"))
// Form Type
const Form_type = lazy(() => import("../../Administrator/Form_type/Forms"));
const FormType_details = lazy(() =>
  import("../../Administrator/Form_type/Form_details")
);
const Self_form = lazy(()=> import("../../Administrator/Form_type/Self_forms"))
const Form_language = lazy(()=> import("../../Administrator/Form_type/Form_language"))
const Self_language = lazy (()=> import("../../Administrator/Form_type/Self_language"))

// Phrases
const Phrases = lazy(() => import("../../Administrator/Phrases/Phrases"));
const Phrases_details = lazy(() =>
  import("../../Administrator/Phrases/Phrases_details")
);
// Lob
const Lob = lazy(() => import("../../Administrator/Lob/Lob"));
const Documentation = lazy(() =>
  import("../../Administrator/Documentation/Documentation")
);

const Documentation_details = lazy(() =>
  import("../../Administrator/Documentation/Documentation_details")
);
const Lob_add = lazy(() => import("../../Administrator/Lob/lob_details"));
const Lob_details = lazy(() => import("../../Administrator/Lob/lob_details"));
const Languages = lazy(() => import("../../Administrator/Language/Languages"));
const Language_details = lazy(() =>
  import("../../Administrator/Language/Language_details")
);
const UserManagement = lazy(() =>
  import("../../Pages/UserManagement/UserManagement")
);
const CompletedForms = lazy(()=> import("../../Administrator/CompletedForms/completed_forms"))
const CapacitiesForms = lazy(() => import("../../Administrator/Capacities/Capacities_form"))
const Capacities_details = lazy(()=> import ("../../Administrator/Capacities/Capacities_details"))
const Forms_Instructions = lazy(()=> import("../../Administrator/Form Instructions/form_instructions"))
const Forms_Instructions_details = lazy(()=> import ("../../Administrator/Form Instructions/forms_instruction_details"))
const Add_forms = lazy(()=> import("../../Administrator/Form Instructions/Add_forms"))
// const Add_capacities = lazy(()=> import("../../Administrator/Capacities/Add_capacities"))
const Rules = lazy(()=> import("../../Administrator/Rules/Rules_forms"))
const Rules_details = lazy(()=> import("../../Administrator/Rules/Rules_details"))
const Rules_language = lazy(()=> import("../../Administrator/Rules/Rules_language"))
const Settings = lazy(() => import("../../Administrator/Settings"));
// const Glosaries = lazy(()=> import("../../Administrator/Glossaries/glossaries"))
const CDFs = lazy(()=> import("../../Administrator/CDFs/CDFs_forms"))
const Tokens = lazy(()=> import("../../Administrator/TokenSent/Token_form"))
// const Token_edit = lazy(()=> import("../../Administrator/TokenSent/Token_edit"))
// const Glossaries_form = lazy(()=> import ("../../Administrator/Glossaries/glossaries_form"))
const Countries_form = lazy(()=> import ("../../Administrator/Countries/index"))
const Countries_edit = lazy(()=> import ("../../Administrator/Countries/Countries_details/index"))
const Edit_Article = lazy(()=> import("../../Administrator/Countries/AddArticle"))
const Add_Article = lazy(()=> import("../../Administrator/Countries/AddArticle"))
// const Glossaries_edit = lazy(()=> import("../../Administrator/Glossaries/Glossaries_edit"))
const Administrator = lazy(()=>import("../../Administrator/Administrators/index"))
const Administrator_edit = lazy(()=>import("../../Administrator/Administrators/Administrators_edit"))
const Administrator_pass = lazy(()=>import("../../Administrator/Administrators/Change_Pass"))
const Service_Audit = lazy(()=>import("../../Administrator/Service Audit/Service_audit_report"))
const Security = lazy(()=> import("../../Administrator/Security"))
const Help_form = lazy(()=> import("../../Administrator/Help"))
const Logout = lazy(()=> import("../../Administrator/LogOut")) 
const EForms_Users = lazy(()=> import("../../Administrator/EForms_Users/Users")) 
const EForms_Users_Edit = lazy(()=> import("../../Administrator/EForms_Users/Edit_Users")) 
const EForms_Users_Add = lazy(()=> import("../../Administrator/EForms_Users/Edit_Users")) 
const Audit_Report = lazy(()=>import("../../Administrator/Audit_Report/index"))

const AppMain = () => {
  function isAuth(){
    if(localStorage.getItem("accessToken") && localStorage.getItem("accessToken")!==""){
       return true;
    }
    else return false;
}
  return (
    
    <Fragment>
           <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/register" component={Register}/>
      </Suspense>
      
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/forget" component={Forget}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
            </div>
          </div>
        }
      >
        <Route path="/login" component={isAuth() ?login: login}/>
      </Suspense>
      
<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/article_edit/:id" component={isAuth() ?Add_Article: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/article" component={isAuth() ?Add_Article: login}/>
      </Suspense>

<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/logout" component={isAuth() ?Logout: login}/>
      </Suspense>
       <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/help" component={isAuth() ?Help_form: login}/>
      </Suspense>
      
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/security_keys" component={isAuth() ?Security: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/OptOutForm" component={isAuth() ?OptOutForm: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/agent_Form_edit_content" component={isAuth() ?Content_agent_edit_Form: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/agent_content_edit" component={isAuth() ?Agent_Content_edit: login}/>
      </Suspense>
<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Audit Report
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/audit_report" component={isAuth() ?Service_Audit: login}/>
      </Suspense>
<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Administrators
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/change_pass" component={isAuth() ?Administrator_pass: login}/>
      </Suspense>
<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Audit Reports
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/reports" component={isAuth() ?Audit_Report: login}/>
      </Suspense>



      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Administrators
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/administrators_add" component={isAuth() ?Administrator_edit: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Administrators
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/administrators_edit/:id" component={isAuth() ?Administrator_edit: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Administrators
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/administrators" component={isAuth() ?Administrator: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Users
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/eForms_Users" component={isAuth() ?EForms_Users: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Users
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/eForms_Users_edit/:id" component={isAuth() ?EForms_Users_Edit: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Users
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/eForms_Users_add" component={isAuth() ?EForms_Users_Add: login}/>
      </Suspense>
{/* //EForms_Users_Add */}
<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Countries
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/countries_edit/:id" component={isAuth() ?Countries_edit: login}/>
      </Suspense>
  
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Countries
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/countries_add" component={isAuth() ?Countries_edit: login}/>
      </Suspense>
<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Countries
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/countries" component={isAuth() ?Countries_form: login}/>
      </Suspense>
<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Languages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/self_language/:id/:langId" component={isAuth() ?Self_language: login}/>
      </Suspense>


      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Languages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/form_language/:id/:langId" component={isAuth() ?Form_language: login}/>
      </Suspense>





<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/agent_language/:id/:langId" component={isAuth() ?Agent_language: login}/>
      </Suspense>

{/* <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Glossaries
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              {/* </h6>
            </div>
          </div>
        }
      >
        <Route path="/glossaries_edit" component={isAuth() ?Glossaries_edit: login}/>
      </Suspense> */} 

<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Rules
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/rules_language/:id/:langId" component={isAuth() ?Rules_language: login}/>
      </Suspense>

<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Languages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/easy_language/:id/:langId" component={isAuth() ?Easy_language: login}/>
      </Suspense>


<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Languages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/content_language/:id/:langId" component={isAuth() ?Content_language: login}/>
      </Suspense>

<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Languages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/page_language/:id/:langId" component={isAuth() ?page_language: login}/>
      </Suspense>
{/* <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Glosaries
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              {/* </h6>
            </div>
          </div>
        }
      >
        <Route path="/glossaries_form" component={isAuth() ?Glossaries_form: login}/>
      </Suspense> */} 


<Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Tokens
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/tokens" component={isAuth() ?Tokens: login}/>
      </Suspense>

      {/* <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Tokens
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              {/* </h6> */}
            {/* </div> */}
          {/* </div> */}
        {/* } */}
      {/* > */}
        {/* <Route path="/Token_edit" component={isAuth() ?Token_edit: login}/> */}
      {/* </Suspense> */} 
          <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all CDF's
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/cdfs" component={isAuth() ?CDFs: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Pages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/pages" component={isAuth() ? Pages : login}/>
      </Suspense>
      {/* <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Glosaries
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              {/* </h6>
            </div>
          </div>
        }
      >
        <Route path="/glossaries" component={isAuth() ?Glosaries: login}/>
      </Suspense> */} 

      
      {/* <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Users
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/add_capacities" component={isAuth() ?Add_capacities: login}/>
      </Suspense> */}

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Rules
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/rules" component={isAuth() ?Rules: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Forms
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/add_forms" component={isAuth() ?Add_forms: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Rules
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/rules_details/:id" component={isAuth() ?Rules_details: login}/>
      </Suspense>
    

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Pages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/page_details" component={isAuth() ?Pages_details: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Pages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/subpage_details/:id/:isSubPage" component={isAuth() ?Subpage_details: login}/>
      </Suspense>
      
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Pages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/page_details_id/:id" component={isAuth() ?Pages_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Content
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/content" component={isAuth() ?Content: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Forms
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/form_instruction" component={isAuth() ?Forms_Instructions: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Forms
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/forms_instruction_info" component={isAuth() ?Forms_Instructions_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Forms
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/forms_instruction_edit/:id" component={isAuth() ?Forms_Instructions_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Content
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/content_details" component={isAuth() ?Content_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Content
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/content_edits/:id" component={isAuth() ?Content_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/agent" component={isAuth() ?Agents: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/agent_details/:id" component={isAuth() ?Agents_details: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/agent_add" component={isAuth() ?Agents_details: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Easy Help
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/easy" component={isAuth() ?Easy: login}/>
      </Suspense>

      
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Forms
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/completed_Forms" component={isAuth() ?CompletedForms: login}/>
      </Suspense>


      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Capacities
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/capacities" component={isAuth() ?CapacitiesForms: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/agent_edit_list/:id" component={isAuth() ?Edit_list: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Capacities
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/capacities_info" component={isAuth() ?Capacities_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Capacities
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/capacities_edit/:id" component={isAuth() ?Capacities_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Agents
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/agent_form_type/:id" component={isAuth() ?Agent_Form_type: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Forms
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/agent_income/:id" component={isAuth() ?US_income: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Easy Help
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/easy_details/:id" component={isAuth() ?Easy_details: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Easy Help
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/easy_add" component={isAuth() ?Easy_details: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Phrases
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/phrases" component={isAuth() ?Phrases: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Phrases
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/phrases_details" component={isAuth() ?Phrases_details: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Languages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/languages" component={isAuth() ?Languages: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Languages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/languages_details" component={isAuth() ?Language_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Languages
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/languages_details_Id/:id" component={isAuth() ?Language_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Forms
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/form_type" component={isAuth() ?Form_type: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Users
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/form_type_details/:id" component={isAuth() ?FormType_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Forms
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/self_forms" component={isAuth() ?Self_form: login}/>
        <Route path='/self_forms_id/:id' component={isAuth() ?Self_form: login}/>

      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all LOB
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/lob_details/:id" component={isAuth() ?Lob_details: login}/>
      </Suspense>


      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all LOB
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/lob_add" component={isAuth() ?Lob_add: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all LOB
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/lob" component={isAuth() ?Lob: login}/>
      </Suspense>
      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Documentation
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/documentation" component={isAuth() ?Documentation: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Documentation
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/documentation_details" component={isAuth() ?Documentation_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Documentation
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/documentation_edit/:id" component={isAuth() ?Documentation_details: login}/>
      </Suspense>

      <Suspense
        fallback={
          <div className="loader-container">
            <div className="loader-container-inner">
              <div className="text-center">
                <Loader type="line-scale" />
              </div>
              <h6 className="mt-3">
                Please wait while we load all Settings
                {/* <small>Because this is a demonstration we load at once all the Elements examples. This wouldn't happen in a real live app!</small> */}
              </h6>
            </div>
          </div>
        }
      >
        <Route path="/settings" component={isAuth() ?Settings: login}/>
      </Suspense>
      

      <Route exact path="/" render={() => <Redirect to="/login" />} />
      <ToastContainer />
    </Fragment>
  );
};

export default AppMain;
