//import useState hook to create menu collapse state
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {AiOutlineMenuUnfold,AiOutlineMenuFold,AiFillHome,AiFillFileAdd} from "react-icons/ai"
import {TbCertificate} from "react-icons/tb"
import "./SidebarAdmin.scss";
import {GrTransaction} from 'react-icons/gr'
import {GrPlan} from "react-icons/gr"
import {VscOutput} from "react-icons/vsc"

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import {BsCalendar2Event} from "react-icons/bs";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import AdminHome from "./AdminHome";
import AdminAddQuestion from "./AdminAddQuestion";


const Header = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [home,sethome]=useState(true);
  const [addq,setaddq]=useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  const goToAdminApprove = () => {
    navigate("/AdminApproveCertificate", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat,moneystats:props.name.moneystats,substats:props.name.substats}})
    window.location.reload(false);
  }

  const goToHome = () => {
    navigate("/AdminHome", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat,moneystats:props.name.moneystats,substats:props.name.substats}})
  }




  return (
    <div style={{display:"flex"}}>
      <div id="header" style={{backgroundColor:"white"}}>
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? <center>
                                    <div style={{marginTop:"20px"}}><br/>
                                    <img src={props.name.pic} style={{width:"50px",height:"50px",borderRadius:"100px",boxShadow:"1px 1px 15px black",marginLeft:"auto",marginRight:"auto"}}/>
                                      <br/>
                                      <br/>
                                      <div className="closemenu" onClick={menuIconClick}>
                                            {/* changing menu collapse icon on click */}
                                            {menuCollapse ? <AiOutlineMenuUnfold size={20} /> : <AiOutlineMenuFold size={35}/> }
                                      </div>
                                    </div>
                                </center> : 
                                <center>
                                  <div style={{marginTop:"20px"}}>
                                    <h2>{props.name.user}</h2>
                                      <br/>
                                    <img src={props.name.pic} style={{width:"70px",height:"70px",borderRadius:"100px",boxShadow:"1px 1px 15px black"}}/>
                                      <br/>
                                      <br/>
                                    <div className="closemenu" onClick={menuIconClick}>
                                            {/* changing menu collapse icon on click */}
                                            {menuCollapse ? <AiOutlineMenuUnfold size={20} /> : <AiOutlineMenuFold size={35}/> }
                                      </div>
                                  </div>
                                </center>}</p>
            </div>
           
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem onClick={()=>goToHome()} icon={<AiFillHome  size={20}/>}>
                Home
              </MenuItem>
              <MenuItem onClick={()=>navigate("/AdminAddQuestion", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat,moneystats:props.name.moneystats,substats:props.name.substats}})}  icon={<AiFillFileAdd size={20} />}>Add Question</MenuItem>
              <MenuItem onClick={()=>goToAdminApprove()}  icon={<TbCertificate size={20} />}>Approve Certificates</MenuItem>
              <MenuItem onClick={()=>navigate("/AdminHostEvent", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat,moneystats:props.name.moneystats,substats:props.name.substats}})}  icon={<BsCalendar2Event size={20} />}>Host Event</MenuItem>
              <MenuItem onClick={()=>navigate("/AdminGetEventResults", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat,moneystats:props.name.moneystats,substats:props.name.substats}})}  icon={<VscOutput size={20} />}>Get Event Details</MenuItem>
              <MenuItem onClick={()=>navigate("/AdminTransaction", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat,moneystats:props.name.moneystats,substats:props.name.substats}})}  icon={<GrTransaction size={20} />}>Transaction Details</MenuItem>
              <MenuItem onClick={()=>navigate("/AdminPlans", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat,moneystats:props.name.moneystats,substats:props.name.substats}})}  icon={<GrPlan size={20} />}>Edit Subscription Plans</MenuItem>
            </Menu>
          </SidebarContent>
         
        </ProSidebar>
      </div>
    </div>
  );
};

export default Header;
