import React,{useState, useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import NavbarFunction from './Navbar'
import './Main.scss';
import background from '../Assets/background.gif';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import c from '../Assets/c.png'
import cpp from '../Assets/c++.png'
import java from '../Assets/java.ico'
import python from '../Assets/python.png'
import Axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


function Certification() {
    const location = useLocation();
    let navigate = useNavigate();
    const [ExamC,setExamC]=useState("");
    const [ExamCpp,setExamCpp]=useState("");
    const [ExamJava,setExamJava]=useState("");
    const [ExamPython,setExamPython]=useState("");
    const [status,setstatus]=useState("");
    const [id,setid]=useState("");
    
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(()=>{

      Axios.post(`http://localhost:8000/getUserInfoAll`,{
          user: location.state.username
        }).then((res)=>
        {
          setid(res.data.id);
          setExamC(res.data.C_certificate);
          setExamCpp(res.data.Cpp_certificate);        
          setExamJava(res.data.Java_certificate);    
          setExamPython(res.data.Python_certificate);    
        })
      
    }, []) 
  
  
  return (
    <div>
         <div className="mainpageback">
         <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><h4>Alert</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body> <h6 style={{color:"red",fontWeight:"bolder"}}>{status}</h6></Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
      <div className="userInfo" style={{backgroundImage: `url("https://cemhri.org/wp-content/uploads/2018/04/Home-Four-Banner-Background-Image.png")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <h1>Hello {location.state.username}</h1>
      <br/>
      <h4>Verify your skills and stand out from the crowd </h4>
      </div>

      <div className="Languages">

      <Row xs={1} md={2} className="g-4">
        <Col>
          <a onClick={() =>  {ExamC =="pending" ? setShow(true)||setstatus("Pending C Certificate Result !!") : navigate("/ExamStart", {state:{username: location.state.username, id:id, title: "Print Hello World in C", description: "Print Hello World on console", language: "c", expectedOutput: "Hello World"}})}}>
          <Card className="CardLang" style={{backgroundColor: "#000000"}}>
            <Card.Img variant="top" src={c} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>C Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>

        <Col>
          <a onClick={() =>  {ExamCpp =="pending" ? setShow(true)||setstatus("Pending C++ Certificate Result !!") : navigate("/ExamStart", {state:{username: location.state.username, id:id, title: "Print Hello World in C++", description: "Print Hello World on console", language: "cpp", expectedOutput: "Hello World"}})}}>
          <Card className="CardLang" style={{backgroundColor: "#000000"}}>
            <Card.Img variant="top" src={cpp} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>C++ Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>


        <Col>
          <a onClick={() =>  {ExamJava =="pending" ? setShow(true)||setstatus("Pending Java Certificate Result !!") : navigate("/ExamStart", {state:{username: location.state.username, id:id, title: "Print Hello World in Java", description: "Print Hello World on console", language: "java", expectedOutput: "Hello World"}})}}>
          <Card className="CardLang" style={{backgroundColor: "#000000"}}>
            <Card.Img variant="top" src={java} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>Java Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>


        <Col>
          <a onClick={() =>  {ExamPython =="pending" ? setShow(true)||setstatus("Pending Python Certificate Result !!") : navigate("/ExamStart", {state:{username: location.state.username, id:id, title: "Print Hello World in Python", description: "Print Hello World on console", language: "python3", expectedOutput: "Hello World"}})}}>
          <Card className="CardLang" style={{backgroundColor: "#000000"}}>
            <Card.Img variant="top" src={python} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>Python Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>

       
    </Row>
    
      </div>
    </div>
    </div>
  )
}

export default Certification