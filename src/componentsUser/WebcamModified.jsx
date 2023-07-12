import * as faceapi from 'face-api.js';
import { props } from 'ramda';
import React from 'react';
import Warning00 from "../Assets/Warning 00.mp3"
import Warning01 from "../Assets/Warning 01.mp3"
import Warning02 from "../Assets/Warning 02.mp3"
import Warning04 from "../Assets/Warning 04.mp3"
import "./WebcamModified.scss"
import { useLocation, useParams } from 'react-router-dom';
import Axios from "axios";
import { useNavigate } from "react-router-dom";

function WebcamModified(props) {

  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);
  var active=false;
  const fullscreenRef = React.useRef(null);
  var [detectionScore, setDetectionScore] = React.useState(0);
  var [count, setCount] = React.useState(0);
  const [faceDetected, setFaceDetected] = React.useState(false);
  const elem = document.documentElement;
  var countzero = 0;
  const location=useLocation()
  const navigate = useNavigate()
  const id=useParams();
  console.log(id)

  const videoRef = React.useRef();
  const audioRef = React.useRef(null);
  const audioRef1 = React.useRef(null);
  const audioRef2 = React.useRef(null);
  const audioRef3 = React.useRef(null);
  const videoHeight = 240;
  const videoWidth = 240;
  const canvasRef = React.useRef();
  const sendData = (data) => {
    props.sendDataToParent(data);
  }

  React.useEffect(() => {  
    window.addEventListener('beforeunload', handlePageReload);
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + '/models';

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    }
    loadModels();

    startVideo();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error("error:", err);
      });
  }

 
const  handlePageReload = (event) => {
  // Prevent the page from reloading
  event.preventDefault();
  videoRef.mediaSrc.stop();
  // Optionally, show a custom confirmation message
  return alert('You pressed reload. Disqualified')
  
}
  
  const dis=()=>{
    navigate("/ExamEnd",{state:{username: props.username, id: props.id, lang: props.lang}})
     Axios.post(`http://localhost:8000/setcaseresult`,{
       id: location.state.id,
       result: "fail(unfair)",
       lang: location.state.lang
   })
 
     window.location.reload(false);
     videoRef.mediaSrc.stop();
   }

   const dis1 =(e) =>{
    Axios.post(`http://localhost:8000/submit`,{
    answers:[],
    user:JSON.parse(localStorage.getItem('loginCookie')).email,
    event:props.event,
}) 
navigate("/ExamEnd",{state:{username:location.state.username}})
}

   
   if (document.fullscreenEnabled&&(location.pathname==`/Examination/${id.TestID}`||location.pathname==`/TestPage/${id.TestID}`)) {
    elem.requestFullscreen();
  }
  

    document.addEventListener("fullscreenchange", function () {
      (document.fullscreenEnabled) ? notFullScreen() : isFullScreen();
    }, false);
  

  const isFullScreen=()=> {
    console.log("full");
  }
  
  const notFullScreen=()=> {
    console.log("nfull");
    if((location.pathname==`/Examination/${id.TestID}`||location.pathname==`/TestPage/${id.TestID}`)&&active)
    {
      audioRef3.current.play();
      count=count+100
      setCount(count);
      navigate("/ExamEnd",{state:{username:location.state.username}})
    }

  }

  document.addEventListener("visibilitychange", event => {
    if (document.visibilityState === "visible"&&(location.pathname==`/Examination/${id.TestID}`||location.pathname==`/TestPage/${id.TestID}`)&&active) {
       
    } 
    else if(document.visibilityState !== "visible"&&(location.pathname==`/Examination/${id.TestID}`||location.pathname==`/TestPage/${id.TestID}`)&&active) {
        audioRef2.current.play();
        count=count+10
        setCount(count);
        
    }
  })
  

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);
        const displaySize = {
          width: videoWidth,
          height: videoHeight
        }

        faceapi.matchDimensions(canvasRef.current, displaySize);
        const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);

        canvasRef && canvasRef.current && canvasRef.current.getContext('2d').clearRect(0, 0, videoWidth, videoHeight);
        canvasRef && canvasRef.current && faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        canvasRef && canvasRef.current && faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);       
        
        if(detections[0] == undefined && countzero!==50)
        {
          countzero++;
          setTimeout(()=>{},1000)
        }

        if(detections[1] !=undefined && active)
        {
          audioRef1.current.play();
          setCount(count+10);
        }

    
        else if(detections[0] !=undefined)
        {
          detectionScore=detections[0].detection._score;
          countzero=0;
          if(props.type=="test")
          {
            sendData(true);
          }
          if(props.type=="exam" && !active)
          {
            active=true;
          }
        } 
        else if(detections[0]==undefined && countzero ==50)
        {
          if(props.type =="exam"&&active)
          {
              audioRef.current.play();
              count=count+10
              setCount(count);
              countzero=0
          }

          if(props.type=="test")
          {
            sendData(false);
          }
        }

      }
    }, 100)
  }

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  }

  return (
    <div>
      {
        captureVideo ?
          modelsLoaded ?
            <div style={{justifyContent: 'center'}}>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <video ref={videoRef} height={videoHeight} width={videoWidth} onPlay={handleVideoOnPlay} style={{ borderRadius: '10px' }} />
                <canvas ref={canvasRef} style={{ position: 'absolute' }} />
                <audio ref={audioRef} src={Warning00} />
                <audio ref={audioRef1} src={Warning01} />
                <audio ref={audioRef2} src={Warning02} />
                <audio ref={audioRef3} src={Warning04} />
              </div>
            <div style={{display: 'flex', justifyContent: 'center', padding: '10px',marginTop:"15vh"}}>
            <h3 className={count<=0&&props.type!="test"? "_0stWarning" : "NoWarning"}>No Warning </h3>
            <h3 className={count<=20&&count>1&&props.type!="test"? "_1stWarning" : "NoWarning"}>1st Warning </h3>
            <h3 className={count>=20&&count<=40&&props.type!="test"? "_2ndWarning" : "NoWarning"}>2nd Warning </h3>
            <h3 className={count>=40&&count<=60&&props.type!="test" ? "_3rdWarning" : "NoWarning"}>3rd Warning </h3>
            <h3 className={count>=60&&count<=80&&props.type!="test" ? "_4thWarning" : "NoWarning"}>4th Warning </h3>
            <h3 className={count>=80&&count<=100&&props.type!="test" ? "_5thWarning" : "NoWarning"}>5th Warning </h3>
            <h3 className={count>100&&props.type!="test"&&props.special=="no" ?dis(): "NoWarning"}>You are disqualified</h3>
            <h3 className={count>100&&props.type!="test"&&props.special=="yes" ?dis1(): "NoWarning"}>You are disqualified</h3> 
              </div>
            </div>
            :
            <div>loading...</div>
          :
          <>
          </>
      }
    </div>
  );
}

export default WebcamModified;