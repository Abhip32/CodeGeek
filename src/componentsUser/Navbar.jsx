import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.css';
import "./Navbar.scss";
import {useLocation} from 'react-router-dom';
import Axios from 'axios';
import Button from 'react-bootstrap/Button';


function NavbarFunction(props) {
  const [profileImage, setprofileImage] = useState("");
  const location = useLocation();
  let navigate = useNavigate();
  

  if(props.type=="Login")
  {
    return (
      <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/"><h3 className='WebsiteHeading'><em style={{color: '#2196f3'}}>CODE</em><em style={{color: 'white'}}>GEEK</em></h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <a className="nlink" onClick={() =>navigate("/Login" ,{state: {result:""}})}>Login</a>
              <a className="nlink" onClick={() =>navigate("/AdminLogin")}>Employee Login</a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }


  if(props.type=="LoggedIn")
  {
    Axios.post(`http://localhost:8000/getProfilePic`,{
    user: location.state.username
  }).then((res)=>
  {
    setprofileImage(res.data);
  })
    return (
      <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/"><h3 className='WebsiteHeading'><em style={{color: '#2196f3'}}>CODE</em><em style={{color: 'white'}}>GEEK</em></h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              <a className="nlink" onClick={() =>navigate("/Home", {state:{username: location.state.username}})}>Practice</a>
              <a className="nlink" onClick={() =>navigate("/Dashboard", {state:{username: location.state.username}})}><img className="profilepic" src={profileImage}/></a>
              <a className="nlink" onClick={() =>navigate("/Certification", {state:{username: location.state.username}})}>Certification</a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }


  if(props.type=="LoggedInAdmin")
  {
    return (
      <div></div>
    );
  }
  
}





export default NavbarFunction;