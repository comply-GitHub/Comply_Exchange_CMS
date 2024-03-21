import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  TextField,
  Checkbox,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { getSpecialSptHidden, postAgentSptHidden } from "../redux/Actions";
import "./reusables.scss";

const SPTEdit = (props) => {
  const { open, setOpen, idData } = props;
  console.log(idData,"00000")

  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();
  const params = useParams();

  const formData = useSelector(
    (state) => state.getAgentSptHiddenReducer.specualSptHiddenData
  );

  console.log(formData, "tt");

  const [data, setData] = useState({
    sptQuestionId: idData.sptQuestionId,
    hidden: idData.hidden || false,
    alias: idData.alias,
  });

  useEffect(() => {
  
    
    if (idData && idData.sptQuestionId) {
     
      const idParam = params.id.toString(); 
      
      dispatch(getSpecialSptHidden(idParam, (data) => setData(...data.filter(a => a.sptQuestionId == idData.sptQuestionId))));
    } else {
      setData({});
    }
  }, [idData]);


  // useEffect(() => {
    
  //   setData((prevData) => ({
  //     ...prevData,
  //     hidden: idData.hidden,
  //   }));
  // }, [idData.hidden],300);

  
  
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleToggle = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    let updateData = [{
      id: idData.sptQuestionId,
      agentId:idData.agentId,
      sptQuestionId: idData.sptQuestionId,
      hidden: data.hidden || false,
      alias: data.alias ||idData.alias,
    }];

    if (idData) {
     
      dispatch(postAgentSptHidden(updateData,params.id));
    } else {
   
    }
    handleClose();
   
  };

  return (
    <Dialog open={open} keepMounted onClose={handleClose}>
      <DialogTitle>Edit SPT Question</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-3 table_text">
              <div className="table_text">SPT Question:</div>
            </div>
            <div className="col-9">
             <>{console.log(idData,"pp")}</>
                <label className="table_text1">
                  {idData.name}
                </label>
            
            </div>
          </div>
          <div className="row">
            <div className="col-3 table_text">
              <div className="table_text">Alias:</div>
            </div>
            <div className="col-9">
              {console.log(data,"22")}
              <TextField
                className="table_text"
                size="small"
                name="alias"
                value={data.alias}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-3 table_text">
              <div className="table_text">Hidden From Process:</div>
            </div>
            <div className="col-9">
            <>{console.log("idData.hidden:", data.hidden)}</>
          <Checkbox
          
  name="hidden"
  // defaultChecked={data.hidden||false}
  checked={data.hidden||false}
  onClick={(e) => handleToggle(e)}
/>
            </div>
          </div>

          <div style={{ margin: "0px" }} className="actionButton mt-3">
            <Button
              style={{ fontSize: "12px" }}
              type="reset"
              size="small"
              variant="outlined"
              onClick={handleClose}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>

            <Button
              style={{ fontSize: "12px" }}
              size="small"
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default SPTEdit;
