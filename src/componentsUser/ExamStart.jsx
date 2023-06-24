import React, { useState, useRef, useEffect } from 'react'
import {useLocation, useParams} from 'react-router-dom';
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
    const language = useParams() 
    const location = useLocation();
    const [status,setStatus]= useState("");
    const [allow,setAllow] = useState(false);
    const [problemLoading,setProblemLoading]=useState(true);
    const handleDataFromChild = (data) => {
      setAllow(data);
    }
    let problem=[];
    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

   
   


    window.scrollTo(0, 0);

    const getQuestion=async ()=>{
      const response = await Axios.post(`http://localhost:8000/getQuestion`,{
        lang: language.language} )

      const data=response.data;
      console.log(data);
      problem.push(data)
      if(problem.length >0)
      {
        setProblemLoading(false);
      }
      console.log(problem[0])
      

    }
    const  CreateID=()=>{
      getQuestion();
      navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
                       navigator.webkitGetUserMedia ||
                       navigator.mozGetUserMedia ||
                       navigator.msGetUserMedia);

          navigator.getMedia({video: true}, function() {
            navigate(`/Examination/${problem[0]._id}`, {state:{username:  JSON.parse(localStorage.getItem('loginCookie')).username, id: JSON.parse(localStorage.getItem('loginCookie')).email, lang: problem[0].language,title:problem[0].title,describe:problem[0].description,expectedOutput:problem[0].expectedoutput}})
            Axios.post(`http://localhost:8000/CreateExamID`,{
            username:  JSON.parse(localStorage.getItem('loginCookie')).username,
            id:  JSON.parse(localStorage.getItem('loginCookie')).email,
            date : new Date(),
            lang: problem[0].language
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
          <h3>{language.language} Programming Test</h3>
          <h3>{JSON.parse(localStorage.getItem('loginCookie')).username}</h3>

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
          {!allow&& <h3 className='text-danger'>Not able to detect face</h3>}
          {problemLoading&& <h5>Fetching your problem</h5>}
          {allow && !problemLoading &&  <button className="startExamButton" onClick={()=>CreateID()} >Start Exam</button> }
         
        </div>
        <div className="ExamInstructions">
          <h1>Instructions</h1>
          <ol>
            <li>This is a sample test to help you get familiar with the CodeGeek test environment.</li>
            <li>You will not be able to continue exam after 5 warnings</li>
            <li>Adjust Your Vision : <br/>

                    <WebcamModified type="test" sendDataToParent={handleDataFromChild}/>
            </li>
          </ol>

           
         
        </div>

        
    </div>
  )
}

export default ExamStart