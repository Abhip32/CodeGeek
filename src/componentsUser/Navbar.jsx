import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import {useLocation} from 'react-router-dom';
import "./Navbar.scss"
import { MdArrowDropDown,MdDashboard } from 'react-icons/md';
import { MdLogout } from 'react-icons/md';
import { Buffer } from 'buffer';


function NavbarFunction(props) {
  const location = useLocation();
  let navigate = useNavigate();
  
    const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('loginCookie')
    navigate("/")
  }

  if(location.pathname.includes("/Examination")||location.pathname.includes("/TestPage"))
  {
    return(null)
  }

  else if(localStorage.getItem('loginCookie')==null)
  {
    return (
      <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/"><h3 className='WebsiteHeading m-2'><em style={{color: '#2196f3'}}>CODE</em><em style={{color: 'white'}}>GEEK</em></h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <a className="nlink m-2" onClick={() =>navigate("/Login" ,{state: {result:""}})}>Login</a>
              <a className="nlink m-2" onClick={() =>navigate("/Compiler")}>Compiler</a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }

  else if(localStorage.getItem('loginCookie')!=null && JSON.parse(localStorage.getItem('loginCookie')).role=="user")
  {
   
    return (
      <Navbar bg="dark" expand="lg" >
      <Container>
        <Navbar.Brand href="/"><h3 className='WebsiteHeading'><em style={{color: '#2196f3'}}>CODE</em><em style={{color: 'white'}}>GEEK</em></h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <a className="nlink m-2" onClick={() =>navigate("/Home", {state:{username: JSON.parse(localStorage.getItem('loginCookie')).username}})}>Practice</a>
              <a className="nlink m-2" onClick={() =>navigate("/Certification", {state:{username: JSON.parse(localStorage.getItem('loginCookie')).username}})}>Certification</a>
              <a className="nlink m-2" onClick={() =>navigate("/Events", {state:{username: JSON.parse(localStorage.getItem('loginCookie')).username}})}>Events</a>
          </Nav>
          <div className="Profiledropdown">
                <div className="profileDefault" onClick={handleToggle}>
                  <img className="profile-pic" src={`data:image/jpeg;base64,${Buffer.from(JSON.parse(localStorage.getItem('loginCookie')).pic).toString('base64')}`} width={40} height={40} alt="Profile" />
                  <span className="profile-name d-flex align-center">{JSON.parse(localStorage.getItem('loginCookie')).username} <MdArrowDropDown size={20}/></span>
                </div>
                {isOpen && 
                  <div className="dropdown-content" style={{backgroundColor:"white"}}>
                    <button style={{width:"95%",margin:"0.5rem",backgroundColor:"white",border:"none",color:"black",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"18px",padding:"10px"}} onClick={() =>navigate(`/Dashboard/${JSON.parse(localStorage.getItem('loginCookie')).email}})}`, {state:{username: JSON.parse(localStorage.getItem('loginCookie')).username}})}> <MdDashboard/>Dashboard</button>
                    <button style={{width:"95%",margin:"0.5rem",backgroundColor:"white",border:"none",color:"red",display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:"18px",padding:"10px"}} onClick={()=>handleLogout()}><MdLogout/>Logout</button>
                  </div>
                }
              </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }


  else if(localStorage.getItem('loginCookie')!=null && JSON.parse(localStorage.getItem('loginCookie')).role=="admin")
  {
    return (
      <div>
        
      </div>
    );
  }
  
}





export default NavbarFunction;