import {
    TableCell,
    TableHead,
    TableRow,
    TableBody,
    Checkbox,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAgentStatementById } from "../../../../redux/Actions";
import Utils from "../../../../Utils";
import { useHistory } from "react-router-dom";

const DocumentartEvidence = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const params = useParams();
    const getAgentStatementData = useSelector(
        (state) => state.getAgentStatementTypeIdReducer
    );

    useEffect(() => {
        if (params?.id) dispatch(getAgentStatementById(params.id));
    }, [params]);

    const handleChange = async (e, item) => {
        console.log(
            "event target ",
            e.target.name,
            e.target.value,
            "Item-->",
            item,
            getAgentStatementData
        );
        let tempAgentData = JSON.parse(
            JSON.stringify(getAgentStatementData?.AgentStatementTypeId)
        );
        let selectedRow = tempAgentData?.filter((x) => x.contentmanagementid === item.contentmanagementid)[0];
        selectedRow[e.target.name] = !(e.target.value == "true");
        console.log("selectedRow", selectedRow);
        dispatch({
            type: Utils.ActionName.UPDATE_AGENT_STATEMENT,
            payload: { AgentStatementTypeId: tempAgentData },
        });
    };

    return (
        <div className="col-12 d-flex overflow-x-auto p-0">
            <table class="table table-hover table-striped">
                <TableHead>
                    <TableRow>
                        <TableCell className="table_head" scope="col">
                            <label>Documentary Evidence – replacement Q&A</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Not FTIN Provided</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Tax Jurisdiction Mismatch</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Tax Residency Mismatch</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Telephone Country Mismatch</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Address Country Mismatch</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>U.S. Citizenship Additional Info</label>
                        </TableCell>
                        <TableCell className="table_head" scope="col">
                            <label>Bank Branch Country Mismatch</label>
                        </TableCell>
                        <TableCell scope="col"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {getAgentStatementData?.AgentStatementTypeId?.map((statement) => (
                        <TableRow key={statement.id}>
                            <TableCell>
                                <div>
                                    <label className="table_content">{statement.name}</label>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <Checkbox
                                        className="p-0"
                                        value={statement.noFTINProvided}
                                        checked={statement.noFTINProvided}
                                        onChange={(e)=>{handleChange(e,statement)}}
                                        name="noFTINProvided"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox
                                        className="p-0"
                                        value={statement.taxJurisdictionMismatch}
                                        checked={statement.taxJurisdictionMismatch}
                                        onChange={(e)=>{handleChange(e,statement)}}
                                        name="taxJurisdictionMismatch"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox
                                        className="p-0"
                                        value={statement.taxResidencyMismatch}
                                        checked={statement.taxResidencyMismatch}
                                        onChange={(e)=>{handleChange(e,statement)}}
                                        name="taxResidencyMismatch"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox
                                        className="p-0"
                                        value={statement.telephoneCountryMismatch}
                                        checked={statement.telephoneCountryMismatch}
                                        onChange={(e)=>{handleChange(e,statement)}}
                                        name="telephoneCountryMismatch"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox
                                        className="p-0"
                                        value={statement.addressCountryMismatch}
                                        checked={statement.addressCountryMismatch}
                                        onChange={(e)=>{handleChange(e,statement)}}
                                        name="addressCountryMismatch"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox
                                        className="p-0"
                                        value={statement.usCitizenshipAdditionalInfo}
                                        checked={statement.usCitizenshipAdditionalInfo}
                                        onChange={(e)=>{handleChange(e,statement)}}
                                        name="usCitizenshipAdditionalInfo"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <Checkbox
                                        className="p-0"
                                        value={statement.accountCountryMismatch}
                                        checked={statement.accountCountryMismatch}
                                        onChange={(e)=>{handleChange(e,statement)}}
                                        name="accountCountryMismatch"
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="d-flex">
                                    <EditIcon
                                        onClick={() => {
                                            // history.push(
                                            //   `/agent_content_edit/${statement?.id}`
                                            // );

                                            history.push({
                                                pathname: `/agent_content_edit/${statement?.id}`,
                                                state: { name: statement?.name, id: statement?.id }, // Replace with your actual prop data
                                            });
                                        }}
                                        style={{
                                            color: "green",
                                            fontSize: "20px",
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </table>
        </div>
    );
};

export default DocumentartEvidence;
