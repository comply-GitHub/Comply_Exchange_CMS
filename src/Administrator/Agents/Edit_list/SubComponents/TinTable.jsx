import { Checkbox, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAgentTinTypeById } from '../../../../redux/Actions';
import Utils from '../../../../Utils';

function TinTable({setOpen2,setId1}) {

    // const [open2, setOpen2] = useState(false);
    // const [id1, setId1] = useState({});
    const params = useParams();
    const dispatch = useDispatch();

    const getAgentTinData = useSelector(
        (state) => state.getAgentTinTypeIdReducer
    );

    useEffect(() => {
        if(params?.id)
        dispatch(getAgentTinTypeById(params?.id));
    }, [params])


    const handleChange=async (e,item)=>{
        console.log("event target ",e.target.name,e.target.value ,"Item-->", item , getAgentTinData)
        let tempAgentTinData=JSON.parse(JSON.stringify(getAgentTinData?.AgentTinTypeId));
        let selectedRow= tempAgentTinData?.filter(x=>x.taxpayerIdTypeID===item.taxpayerIdTypeID)[0];
        selectedRow[e.target.name]=!(e.target.value=="true");
        console.log("selectedRow",selectedRow)
        dispatch({
            type:Utils.ActionName.UPDATE_AGENT_TIN_TYPE_BY_ID,
            payload:{ AgentTinTypeId : tempAgentTinData} 
        })
    }



    return (
        <div className="col-12 d-flex overflow-x-auto p-0 mt-3">
            <table className="table table-hover table-striped">
                <TableHead>
                    <TableRow>
                        <TableCell className="table_head" scope="col">
                            <label>Taxpayer id type</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>State</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Non U.S. Individual</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>U.S. Individual</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>U.S. Entity</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Non U.S. Entity</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Intermediary</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Non U.S. Government</label>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getAgentTinData?.AgentTinTypeId?.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <div>
                                    <label className="table_content">{item.taxpayerIdTypeName}</label>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <EditIcon
                                        onClick={() => {
                                            setOpen2(true);
                                            setId1(item)
                                        }}
                                        style={{
                                            color: "green",
                                            fontSize: "20px",
                                            cursor: "pointer",
                                        }}
                                    />
                                    <label className="table_content">{item.stateName}</label>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <Checkbox name='nonUSIndividual' checked={item.nonUSIndividual} value={item.nonUSIndividual} onChange={(e)=>{handleChange(e,item)}}  />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox name='usIndividual' checked={item.usIndividual}  value={item.usIndividual} onChange={(e)=>{handleChange(e,item)}}/>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox name='usEntity' checked={item.usEntity}  value={item.usEntity} onChange={(e)=>{handleChange(e,item)}}/>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox name='nonUSEntity' checked={item.nonUSEntity}  value={item.nonUSEntity} onChange={(e)=>{handleChange(e,item)}}/>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox name='intermediary' checked={item.intermediary}  value={item.intermediary} onChange={(e)=>{handleChange(e,item)}}/>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox name='nonUSGovernment' checked={item.nonUSGovernment} value={item.nonUSGovernment} onChange={(e)=>{handleChange(e,item)}} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </table>
        </div>
    )
}

export default TinTable