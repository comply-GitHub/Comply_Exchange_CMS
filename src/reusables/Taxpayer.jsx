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
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { updateAgentsTinType } from "../redux/Actions";
import { RadioButtonChecked } from "@mui/icons-material";
import Utils from "../Utils";

const SPTEdit = (props) => {
  const { open, setOpen, idData, response, getList, setId1 } = props;

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  let params = useParams();
  const history = useHistory();

  const getAgentTinData = useSelector(
    (state) => state.getAgentTinTypeIdReducer
  );

  const formData = useSelector((state) => state.ParentDropDownReducer);
  const [data, setData] = useState({
    id: 0,
    stateId: 0,
  });

  useEffect(() => {
    if (idData) {
      setData({
        id: idData.id || 0,
        stateId: idData.stateId || 0,
      });
    }
  }, [idData]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: parseInt(e.target.value, 10) });
  };

  const handleStateName = (stateId) => {
    switch (stateId) {
      case 1:
        return "Normal";
        break;
      case 2:
        return "More";
        break;
      case 3:
        return "Hidden";
        break;
      default:
        return "Normal";
        break;
    }
  };

  const handleChangeState = async (e) => {
    let tempAgentTinData = JSON.parse(
      JSON.stringify(getAgentTinData?.AgentTinTypeId)
    );
    let selectedRow = tempAgentTinData?.filter(
      (x) => x.taxpayerIdTypeID === idData.taxpayerIdTypeID
    )[0];
    selectedRow.stateId = data.stateId;
    selectedRow.stateName = handleStateName(data.stateId);

    dispatch({
      type: Utils.ActionName.UPDATE_AGENT_TIN_TYPE_BY_ID,
      payload: { AgentTinTypeId: [...tempAgentTinData] },
    });

    handleClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = {
      id: data.id || 0,
      stateId: data.stateId || 0,
    };

    dispatch(updateAgentsTinType(formData, params.id));
    handleClose();
  };
  return (
    <Fragment>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogContent>
          <DialogContentText>
            <form
            // onSubmit={(e) => {
            //   handleSubmit(e);
            // }}
            >
              {/* { <div className="row headingLabel complyColor">{idData ?" Edit Form Instruction" : "Add Form Instruction"}</div>} */}
              <div className="row">
                <div className="col-5 table_text">
                  <div className="table_text">Taxpayer id type:</div>
                </div>
                <label className="table_text1 col-7">
                  {idData.taxpayerIdTypeName}
                </label>
              </div>
              <div className="row mt-2">
                <div className="col-2 table_text">
                  <div className="table_text TextContent">State:</div>
                </div>
                <div className="col-10">
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="stateId"
                    value={data.stateId || 0}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      className="table_text checkBox"
                      value={1}
                      control={<Radio />}
                      label="Normal"
                    />
                    <FormControlLabel
                      className="table_text checkBox"
                      value={2}
                      control={<Radio />}
                      label="More"
                    />
                    <FormControlLabel
                      className="table_text checkBox"
                      value={3}
                      control={<Radio />}
                      label="Hidden"
                    />
                  </RadioGroup>
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
                  // type="submit"
                  variant="contained"
                  onClick={(e) => handleChangeState(e)}
                >
                  Ok
                </Button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default SPTEdit;
