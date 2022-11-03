import React, { useState, useRef, useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import Axios from 'axios';
import "./Examstart.scss"
import WebcamModified from "./WebcamModified";
import { FullScreen } from '@chiragrupani/fullscreen-react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';

var elem = document.documentElement;
function ExamStart() {
    const location = useLocation();
    const [status,setStatus]= useState("");
    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
   


    window.scrollTo(0, 0)
    const  CreateID=()=>{
      navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

          navigator.getMedia({video: true}, function() {
            navigate("/Examination", {state:{username: location.state.username, id: location.state.id, lang: location.state.language,title:location.state.title,describe:location.state.description,expectedOutput:location.state.expectedOutput}})
            Axios.post(`http://localhost:8000/CreateExamID`,{
            username: location.state.username,
            id: location.state.id,
            date : new Date(),
            lang: location.state.language
        }
        )
          }, function() {
            setStatus("No Camera Found")
            setShow(true)
          });
        
    }
  return (
    <div className='ExamStartBlock' id="fullscreen">
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
        <div className="ExamStartSidebar"> 
          <h3>Welcome to</h3>
          <h3>{location.state.language.toUpperCase()} Programming Test</h3>
          <h3>{location.state.username}</h3>

          <div className="TestInfo">
            <div className="TestDuration">
              <h6>Test Duration</h6>
              <p>15 min</p>
            </div>
            <div className="TestNoQuestions">
              <h6>No of Questions</h6>
              <p>1</p>
            </div>

          </div>
          <button className="startExamButton" onClick={CreateID} >Start Exam</button>
         
        </div>
        <div className="ExamInstructions">
          <h1>Instructions</h1>
          <ol>
            <li>This is a sample test to help you get familiar with the CodeGeek test environment.</li>
            <li>You will not be able to continue exam after 5 warnings</li>
            <li>Adjust Your Vision : <br/>

                    <WebcamModified  type="demo"/>
            </li>
          </ol>

           
         
        </div>

        
    </div>
  )
}

export default ExamStart