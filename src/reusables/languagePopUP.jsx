import { TableCell } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { getpageLanguageById,
} from "../../../redux/Actions";

export default function langPopUp{ 
  const history = useHistory();
    
    return(  <TableCell
        align="center"
        className="table_content"
        // onClick={() => getLangById(row.id)}
      >
    {(dispatch(getpageLanguageById(row?.id, (item) => {return(item)})))?.map((i,ind)=>{
                                return(<MenuItem key={ind} className="pageId" value={i.languageId}>{i.name}sx</MenuItem>)
                              })?.map((i,ind)=>{
                                  return(<button onClick={()=>{
                                    history.push(`/page_language/${row.id}/${i.id}`)
                                  }} key={i.id} style={{border:"none",backgroundColor:"inherit"}} className="addSubpage">
                                    {i.name}{" "}
                                  </button>)
                                })} 
                                </TableCell>
                                )
                                }