import React, { Fragment } from "react";
import { useEffect, useState } from "react";

import { IoIosCalendar } from "react-icons/io";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  DropdownToggle,
  DropdownMenu,
  Nav,
  Col,
  Row,
  Button,
  NavItem,
  NavLink,
  UncontrolledTooltip,
  UncontrolledButtonDropdown,
} from "reactstrap";

import { toast, Bounce } from "react-toastify";

import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import 'react-toastify/dist/ReactToastify.css';
import Logout from "../../../reusables/Logout"
import city3 from "../../../assets/utils/images/dropdown-header/city3.jpg";
import avatar1 from "../../../assets/utils/images/avatars/1.jpg";

const UserBox = () => {
 
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    return (
      <Fragment>
        <div className="header-btn-lg pe-0">
          <div className="widget-content p-0">
            <div className="widget-content-wrapper">
              <div className="widget-content-left">
               <div onClick={()=>{
                setOpen(true);
               }}>
               <LogoutOutlinedIcon
                   
                   style={{cursor:"pointer",}}
                     className="opacity-8 p-0"
                     color="grey"
                     
               
                   />
                   <div style={{cursor:"pointer" ,fontSize:'10px'}}>LogOut</div>
               </div>
                    
               
              </div>
            
             
            </div>
          </div>
        </div>

        <Logout
          open={open}
          setOpen={setOpen}
           handleClickOpen={handleClickOpen}
           handleClose={handleClose}
        />
      </Fragment>
    );
  
}

export default UserBox;
