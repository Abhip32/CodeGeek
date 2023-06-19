import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Main.scss';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import c from '../Assets/c.png'
import cpp from '../Assets/c++.png'
import java from '../Assets/java.ico'
import python from '../Assets/python.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {FaCrown} from 'react-icons/fa'
import HomeBread from "../Assets/HomeBread.jpg"


function Main(props) {

  let navigate = useNavigate();
  return (
    <div className="mainpageback">
      
      <div className="userInfo" style={{backgroundImage: `url(${HomeBread})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <h1>Hello {JSON.parse(localStorage.getItem('loginCookie')).username}</h1>
      <br/>
      <h4>Which language you are going to practice today ?</h4>
      </div>

      <div className="Languages">

      <Row xs={1} md={2} className="g-4">
        <Col>
          <a onClick={() =>  navigate("/CProgrammingProblems", {state:{username: JSON.parse(localStorage.getItem('loginCookie')).username}})}>
          <Card className="CardLang" >
            <Card.Img variant="top" src={c} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>C Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>

        <Col>
        <a onClick={() =>  navigate("/CppProgrammingProblems", {state:{username: JSON.parse(localStorage.getItem('loginCookie')).username}})}>
          <Card className="CardLang" >
            <Card.Img variant="top" src={cpp} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>C++ Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>
      
        <Col>
        <a onClick={() =>  navigate("/JavaProgrammingProblems", {state:JSON.parse(localStorage.getItem('loginCookie')).username})}>
          <Card className="CardLang" >
            <Card.Img variant="top" src={java} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>Java Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>

        <Col>
       <a onClick={() =>  navigate("/PythonProgrammingProblems", {state:{username: JSON.parse(localStorage.getItem('loginCookie')).username}})}>
          <Card className="CardLang" style={{backgroundImage: "linear-gradient(170deg, #01E4F8 0%, #1D3EDE 100%);"}}>
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
  )
}

export default Main