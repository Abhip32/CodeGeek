import Webcam from "react-webcam";
import { useFaceDetection } from "react-use-face-detection";
import FaceDetection from "@mediapipe/face_detection";
import { Camera } from "@mediapipe/camera_utils";
import React, { useEffect, useRef, useState } from "react";
import * as R from "ramda";
import * as tf from "@tensorflow/tfjs";
import "../stylesheet/WebcamModified.scss";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import {useLocation} from 'react-router-dom';
import warning from './warning';
import ReactAudioPlayer from "react-audio-player";



var count=-35;
var active = false;



const videoConstraints = {
  facingMode: "user",
};

var elem = document.documentElement;



const  audio=new Audio("https://github.com/Abhip32/CricGeek/blob/905e00d3b80609f9c643aa9f595848cfa5b2a64b/Warning%2000.mp3?raw=true");
const  audio1=new Audio("https://github.com/Abhip32/CricGeek/blob/905e00d3b80609f9c643aa9f595848cfa5b2a64b/Warning%2001.mp3?raw=true");
const audio2=new Audio("https://github.com/Abhip32/CricGeek/blob/905e00d3b80609f9c643aa9f595848cfa5b2a64b/Warning%2002.mp3?raw=true");
const audio3=new Audio("https://github.com/Abhip32/CricGeek/blob/main/Warning%2004.mp3?raw=true");





const link =
  "https://raw.githubusercontent.com/clementreiffers/emotion-recognition-website/main/resnet50js_ferplus/model.json";

  const drawOnCanvas = (context, video, boundingBox, emotionRecognizer) => {
  
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  context.drawImage(video, 0, 0, context.canvas.width, context.canvas.height);

  // recuperation of all values into boudingBox (coordinate of face)
  const xCenterBoundingBox = R.pluck("xCenter", boundingBox);
  const yCenterBoundingBox = R.pluck("yCenter", boundingBox);
  const widthBoundingBox = R.pluck("width", boundingBox);
  const heightBoundingBox = R.pluck("height", boundingBox);

  // rectangle draw all around the face
  context.beginPath();
  context.lineWidth = "5.0";
  context.strokeStyle = "red";
  context.rect(
    xCenterBoundingBox * context.canvas.width,
    yCenterBoundingBox * context.canvas.height,
    widthBoundingBox * context.canvas.width,
    heightBoundingBox * context.canvas.height
  ); 

 let facesdata=[];
 facesdata.push(xCenterBoundingBox,yCenterBoundingBox);


 


  if((xCenterBoundingBox<0.20946518272161484||xCenterBoundingBox>0.5195659756660461)&&xCenterBoundingBox.length!=0)
  {
     count=count+1;
     audio.play();     
  }

  if((yCenterBoundingBox>0.5532440972328186||yCenterBoundingBox<0.0429329723119735)&&yCenterBoundingBox.length!=0)        
  {
      count=count+1;
      audio.play();
  }

  if(xCenterBoundingBox.length!=0||yCenterBoundingBox.length!=0)       
  {
     active=true;
  }  

  if(xCenterBoundingBox.length==0&&yCenterBoundingBox.length==0&&active&&window.location.href=="http://localhost:3000/Examination")        
  {
        count=count+1;
        audio.play();
  } 

  if(facesdata[0].length>=2&&facesdata[1].length>=2)
  {
        count=count+1;
        audio1.play();
  }
  
  context.stroke();

  // recuperation of face only if boundingBox has valuable coordinates
  if (
    xCenterBoundingBox > 0 &&
    yCenterBoundingBox > 0 &&
    widthBoundingBox > 0 &&
    heightBoundingBox > 0
  ) {
    let face = context.getImageData(
      xCenterBoundingBox * context.canvas.width,
      yCenterBoundingBox * context.canvas.height,
      widthBoundingBox * context.canvas.width,
      heightBoundingBox * context.canvas.height
    );
    if (typeof emotionRecognizer != "undefined") {
      tf.engine().startScope();
      tf.tidy(() => {
        // Conversion to tensor4D and resize
        let tfImage = tf.browser.fromPixels(face, 3).expandDims(0);
        let tfResizedImage = tf.image.resizeBilinear(tfImage, [80, 80]);
        tfResizedImage = tfResizedImage.reshape([1, 80, 80, 3]);
        let prediction = Array.from(
          emotionRecognizer.predict(tfResizedImage).dataSync()
        );
        const currentEmotion = prediction;
        context.fillStyle = "#FFFFFF";
        const size = 0;
        context.fillRect(
          xCenterBoundingBox * context.canvas.width,
          yCenterBoundingBox * context.canvas.height - size,
          widthBoundingBox * context.canvas.width,
          size
        );
        context.font = size + "px serif";
        context.fillStyle = "#000000";
        context.stroke();
        context.fillText(
          currentEmotion,
          xCenterBoundingBox * context.canvas.width,
          yCenterBoundingBox * context.canvas.height,
          widthBoundingBox * context.canvas.width
        );

        tfImage.dispose();
      });
      // Check tensor memory leak stop
      tf.engine().endScope();
    }
  }
};


const WebcamModified = (props) => {
  let navigate = useNavigate();
  const location = useLocation();

  function isFullScreen() {
    console.log("full");
  }
  
  function notFullScreen() {
    console.log("nfull");
    if(count>-10&&window.location.href==="http://localhost:3000/Examination")
    {
      audio3.play();
      count=100;
    }

  }
  
  if (document.fullscreenEnabled&&window.location.href==="http://localhost:3000/Examination") {
    elem.requestFullscreen();
  }
  
  document.addEventListener("fullscreenchange", function () {
    (document.fullscreenEnabled) ? notFullScreen() : isFullScreen();
  }, false);

  const { webcamRef, boundingBox } = useFaceDetection({
    faceDetectionOptions: {
      model: "short",
    },
    faceDetection: new FaceDetection.FaceDetection({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
    }),
    camera: ({ mediaSrc, onFrame, width, height }) =>
      new Camera(mediaSrc, {
        onFrame,
        width,
        height,
      }),
  });

  
  let canvasRef = useRef(null);

  const [model, setModel] = useState();
  const loadModel = async (link) => {
    try {
      if (typeof model === "undefined") {
        const fetchModel = await tf.loadLayersModel(link);
        setModel(fetchModel);
        console.log("load model success");
      }
    } catch (err) {
      console.log(err);
    }
  };
  tf.ready().then(() => loadModel(link));

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let animationFrameId;
    const render = () => {
      drawOnCanvas(context, webcamRef.current.video, boundingBox, model);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => window.cancelAnimationFrame(animationFrameId);
  });
  const [facingMode, setFacingMode] = React.useState("environment");

  const handleClick = React.useCallback(() => {
    setFacingMode((prevState) =>
      prevState === "user" ? "environment" : "user"
    );
  }, []);





  const dis=()=>{
    navigate("/ExamEnd",{state:{username: props.username, id: props.id, lang: props.lang}})
    Axios.post(`http://localhost:8000/setcaseresult`,{
      id: location.state.id,
      result: "fail(unfair)",
      lang: location.state.lang
  })
    window.location.reload(false);
    Camera.mediaSrc.stop();
    
  }

  return (
    <div>
      {props.type!="demo"&&count==0}
      <div>
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          style={{ objectFit: "cover" }}
          className="canvas"
        />
  
        <h3 className={count<=0&&props.type=='test'? "_0stWarning" : "NoWarning"}>No Warning </h3>
        <h3 className={count<=20&&count>1&&props.type=='test'? "_1stWarning" : "NoWarning"}>1st Warning </h3>
        <h3 className={count<=40&&count>=21&&props.type=='test'? "_2ndWarning" : "NoWarning"}>2nd Warning </h3>
        <h3 className={count<=60&&count>=41&&props.type=='test'? "_3rdWarning" : "NoWarning"}>3rd Warning </h3>
        <h3 className={count<=80&&count>=61&&props.type=='test'? "_4thWarning" : "NoWarning"}>4th Warning </h3>
        <h3 className={count<=99&&count>=81&&props.type=='test'? "_5thWarning" : "NoWarning"}>5th Warning </h3>
        <h3 className={count>=100 &&props.type=='test'?  dis(): "NoWarning"}>You are disqualified</h3> 

      
        
        
        
        <Webcam
          audio={true}
          width={300}
          height={300}
          mirrored={true}
          ref={webcamRef}
          videoConstraints={{ ...videoConstraints, facingMode }}
          style={{ display: "none" }}
        />
      
      </div>
    </div>
  );
};

document.addEventListener("visibilitychange", event => {
  if (document.visibilityState === "visible"&&(window.location.href==="http://localhost:3000/ExamStart"||window.location.href==="http://localhost:3000/Examination")) {
     
  } 
  else if(document.visibilityState !== "visible"&&(window.location.href==="http://localhost:3000/ExamStart"||window.location.href==="http://localhost:3000/Examination")) {
      audio2.play();
      count+=30;
  }
})





export default WebcamModified;
