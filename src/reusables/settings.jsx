import { forwardRef, Fragment } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import DialogContentText from "@mui/material/DialogContentText";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  TextField,
  CardHeader,
  CardContent,
  CardActions,
  Card,
  Divider,
  div,
  Select,
  MenuItem,
  Checkbox,
  Button,
} from "@mui/material";
import "./reusables.scss";

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  createFormInstruction,
  updateQuestion,
  getQuestionLanguageById,
  getAllSettings,
  getAllSettingsQuestion,
  getFormInstructionById,
  updateFormInstruction,
} from "../redux/Actions";

const DialogEdit = (props) => {
  const { open, setOpen, idData, response, getList, EditId } = props;
  
  const handleClose = () => {
    setOpen(false);
    setQuestion("");
    setQuestionHint("")
    
  }
  
  
  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();
  
  const formData = useSelector((state) => state.ParentDropDownReducer);
  const tableData = useSelector((state) => state.getSettingsQuestionsReducer);

  const [question, setQuestion] = useState();
  const [questionHint, setQuestionHint] = useState();
  // console.log("123", question,questionHint);

  const [data, setData] = useState({
    id: 0,
    question: "",
    questionHint: "",
    questionHintId: 0,
  });
  useEffect(() => {
    if(EditId){
      setQuestion(EditId.question);
      setQuestionHint(EditId.questionHint);
    }
    
  }, [EditId]);
  useEffect(() => {
    dispatch(getAllSettingsQuestion());
    dispatch(getAllSettings());
  }, []);

  useEffect(() => {
    if (idData) {
      dispatch(
        getFormInstructionById(idData, (data) => {
          setData(data);
        })
      );
    }
  }, [idData]);

  const handleChange = (e) => {
    console.log(e, "value");

    setQuestion(e.target.value);
  };

  const handleChangeHint = (e) => {
    setQuestionHint(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
        let updateData = {
        id: EditId?.id,
        question: question,
        questionHint: questionHint,
        questionHintId: EditId?.questionHintId,
      };
      dispatch(updateQuestion(updateData));
      console.log(updateData,"frrrr")

    history.push("/settings");

    handleClose();
  };
  return (
    <Fragment>
      <Dialog
        open={open}
        keepMounted
        // onClose={handleClose}
      >
        <DialogContent>
          <DialogContentText>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              {
                <div className="row headingtext ">
                  {idData ? " Edit Setting" : "Edit Security Question"}
                </div>
              }
              <div className="row">
                <div className="col-5 table_text">
                  <div className="table_text">Security Question</div>
                </div>
                <div className="col-7 table_text">
                  <TextField
                    className="table_text"
                    size="small"
                    name="question"
                    value={question}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-5 table_text">
                  <div className="table_text">Security Question Hint:</div>
                </div>
                <div className="col-7 table_text">
                  <TextField
                    className="table_text"
                    size="small"
                    name="questionHint"
                    value={questionHint}
                    onChange={handleChangeHint}
                    isRequired="true"
                    required
                  />
                </div>
              </div>

              <div style={{ margin: "0px" }} className="actionButton mt-3">
                <Button
                  style={{ fontSize: "12px" }}
                  type="reset"
                  size="small"
                  // onClick={()=>{history.push("/form_instruction")}}
                  variant="outlined"
                  onClick={handleClose}
                  sx={{ mr: 1 }}
                >
                  cancel
                </Button>

                <Button
                  style={{ fontSize: "12px" }}
                  size="small"
                  type="submit"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                  variant="contained"
                >
                  Save
                </Button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default DialogEdit;
