//import useState hook to create menu collapse state
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {AiOutlineMenuUnfold,AiOutlineMenuFold,AiFillHome,AiFillFileAdd} from "react-icons/ai"
import {BiLogOut, BiMoney} from "react-icons/bi"
import {TbCertificate,TbBusinessplan} from "react-icons/tb"
import "./SidebarAdmin.scss";
import {GrTransaction} from 'react-icons/gr'
import {GrPlan} from "react-icons/gr"
import {VscOutput} from "react-icons/vsc"
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';



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
import AdminHome from "./AdminHome";
import AdminAddQuestion from "./AdminAddQuestion";


const Header = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);
  const [home,sethome]=useState(true);
  const [addq,setaddq]=useState(false);

  const handleLogout = () => {
    localStorage.removeItem('loginCookie')
    navigate("/")
  }

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
    <Navbar key='false' bg="dark" expand='false' className="bg-body-tertiary mb-3">
    <Container fluid>
    <Navbar.Brand href="/AdminHome"><h3 className='WebsiteHeading m-2'><em style={{color: '#2196f3'}}>CODE</em><em style={{color: 'white'}}>GEEK</em></h3></Navbar.Brand>
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} placement="start" />
      <Navbar.Offcanvas
        id={`offcanvasNavbar-expand-false`}
        aria-labelledby={`offcanvasNavbarLabel-expand-false`}
        placement="start"
      >
        <Offcanvas.Header closeButton className="bg-dark ">
          <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
          <Navbar.Brand href="/AdminHome"><h3 className='WebsiteHeading m-2'><em style={{color: '#2196f3'}}>CODE</em><em style={{color: 'white'}}>GEEK</em></h3></Navbar.Brand>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg-dark text-light">
          <center>
          <div style={{margin:"10px",color:"white"}}>
                                    <img src={props.name.pic} style={{width:"70px",height:"70px",borderRadius:"100px",boxShadow:"1px 1px 15px white"}}/>
                                      <br/>
                                      <h2>{props.name.user}</h2>
                                  </div>
          </center>
          <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link onClick={()=>goToHome()}>
          <AiFillHome  size={20}/>
                Home
              </Nav.Link>
              <Nav.Link onClick={()=>navigate("/AdminAddQuestion", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat}})}><AiFillFileAdd size={20}/> Add Question </Nav.Link>
              <Nav.Link onClick={()=>goToAdminApprove()}> <TbCertificate size={20} /> Approve Certificates</Nav.Link>
              <Nav.Link onClick={()=>navigate("/AdminHostEvent", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat}})} ><BsCalendar2Event size={20} /> Host Event</Nav.Link>
              <Nav.Link onClick={()=>navigate("/AdminGetEventResults", {state:{name: props.name.user,pic:props.name.pic,lang:props.name.lang,test:props.name.test,userstat:props.name.userstat}})}> <VscOutput size={20} /> Get Event Details</Nav.Link>
              <Nav.Link onClick={()=>handleLogout()} style={{color:"red"}}><BiLogOut size={20} color={"red"}/> Logout</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
  );
};

export default Header;
