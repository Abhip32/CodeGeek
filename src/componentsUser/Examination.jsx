import React, { useState, useRef, useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "./Examination.scss";
import "./Problem.scss";
import Select from 'react-select';
import Editor from "@monaco-editor/react";
import Axios from "axios";
import WebcamModified from './WebcamModified';
import { Camera } from '@mediapipe/camera_utils';


function Examination() {
    const location = useLocation();
    let navigate = useNavigate();
	const [inputValue, setInputValue] = useState(false);
    const [userCode, setUserCode] = useState(``);
	var solve=location.state.status;
    const [userLang, setUserLang] = useState(location.state.lang);
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState(location.state.inputval);
    const [userOutput, setUserOutput] = useState("");
	const [link, setLink] = useState("");
	const [result,setResult] = useState("none");
    const [endexam,setendexam]= useState(false);


    const [loading, setLoading] = useState(false);

    const languages = [
		{ value: "c", label: "C" },
		{ value: "cpp", label: "C++" },
		{ value: "python3", label: "python" },
		{ value: "java", label: "Java" },
	];
	const themes = [
		{ value: "vs-dark", label: "Dark" },
		{ value: "light", label: "Light" },
	]

const options = {
	fontSize: fontSize
}


// Function to call the compile endpoint
function compile() {
	setLoading(true);
	if (userCode === ``) {
	return
	}

	// Post request to compile endpoint
	Axios.post(`http://localhost:8000/compile`, {
	code: userCode,
	language: userLang,
	input: userInput }).then((res) => {
	console.log(location.state.inputval)
	setUserOutput(res.data);
	console.log(location.state.inputval);
	if(location.state.expectedOutput===res.data)
	{
		console.log(typeof (res.data));
		console.log(typeof (location.state.expectedOutput));
		setLink("Go Back")
		setResult("Success")
	}
	else
	{
		setResult("Failure")
	}

	}).then(() => {
	setLoading(false);
	})
}

// Function to clear the output screen
function clearOutput() {
	setUserOutput("");
}

function change()
{
	setInputValue(!inputValue);
}



  

    const checkTime=() =>{
        if(timer==='00:00:00'||endexam)
        {
            navigate("/ExamEnd",{state:{username: location.state.username, id: location.state.id, lang: location.state.lang}})
            Axios.post(`http://localhost:8000/setcaseresult`,{
                id: location.state.id,
                result: result,
                lang: location.state.lang,
            })
        }
        
    }
      const Ref = useRef(null);
  
      // The state for our timer
      const [timer, setTimer] = useState('00:00:00');
    
    
      const getTimeRemaining = (e) => {
          const total = Date.parse(e) - Date.parse(new Date());
          const seconds = Math.floor((total / 1000) % 60);
          const minutes = Math.floor((total / 1000 / 60) % 60);
          const hours = Math.floor((total / 1000 / 60 / 60) % 24);
          return {
              total, hours, minutes, seconds
          };
      }
    
    
      const startTimer = (e) => {
          let { total, hours, minutes, seconds } 
                      = getTimeRemaining(e);
          if (total >= 0) {
    
              // update the timer
              // check if less than 10 then we need to 
              // add '0' at the beginning of the variable
              setTimer(
                  (hours > 9 ? hours : '0' + hours) + ':' +
                  (minutes > 9 ? minutes : '0' + minutes) + ':'
                  + (seconds > 9 ? seconds : '0' + seconds)
              )
          }
      }
    
    
      const clearTimer = (e) => {
    
          // If you adjust it you should also need to
          // adjust the Endtime formula we are about
          // to code next    
          setTimer('00:15:00');
    
          // If you try to remove this line the 
          // updating of timer Variable will be
          // after 1000ms or 1sec
          if (Ref.current) clearInterval(Ref.current);
          const id = setInterval(() => {
              startTimer(e);
          }, 1000)
          Ref.current = id;
      }
    
      const getDeadTime = () => {
          let deadline = new Date();
    
          // This is where you need to adjust if 
          // you entend to add more time
          deadline.setSeconds(deadline.getSeconds() + 200);
          return deadline;
      }
    
      // We can use useEffect so that when the component
      // mount the timer will start as soon as possible
    
      // We put empty array to act as componentDid
      // mount only
      useEffect(() => {
          clearTimer(getDeadTime());
      }, []);
    
      // Another way to call the clearTimer() to start
      // the countdown is via action event from the
      // button first we create function to be called
      // by the button
      const onClickReset = () => {
          clearTimer(getDeadTime());
      }

  return (       
    <div className="ExaminationScreen">
          <div className='problemportal'>

        <div className="sidebarcontent">
        <h5>Problem : </h5>
        <p>
            {location.state.title}
        </p>
        <h5>Description : </h5>
        <p>
            {location.state.description}
        </p>
        <h5 >Expected Output : </h5>
        <div className='ExpectedOutput'>
            <p>
                {location.state.expectedOutput}
            </p>
        </div>

        <br/>
        <br/>
        <h5>Exam ID:</h5>
            <h5 className='ExamIDdiv'>{location.state.id}</h5>
                
            <div className='Webcamdiv'>
                <WebcamModified username={location.state.username} id= {location.state.id} lang= {location.state.lang} type="test"/>
            </div>
        <br/>

        </div>

        <div className='compiler'>

        <div className="navbarcompiler">
            <h5 className="languageHeader">Language : </h5>
            <Select className='language' value={userLang}
                    onChange={(e) => setUserLang(e.value)}
                    placeholder={userLang} 
            />

            <h5 className="languageTheme">Theme : </h5>
            <Select className='themes' options={themes} value={userTheme}
                    onChange={(e) => setUserTheme(e.value)}
                    placeholder={userTheme} 
            />
            <h5 className="languageFont">Font Size : </h5>
            <input className="fontslider" type="range" min="18" max="30"
                value={fontSize} step="2"
                onChange={(e) => { setFontSize(e.target.value)}}/>

            <h6 className="TimerDiv" onChange={checkTime()}>Timer : {timer}</h6>
        </div>


            <Editor
                options={options}
                height="calc(50vh)"
                width="100%"
                theme={userTheme}
                language={userLang}
                defaultLanguage={location.state.language}
                defaultValue="# Enter your code here"
                onChange={(value) => { setUserCode(value) }}
                onPaste={(e)=>{
                    e.preventDefault()
                    return false;
                }} 
                onCopy={(e)=>{
                    e.preventDefault()
                    return false;}}
            />
            <div className='InteractionMenu'>
                <input type="checkbox" className="inp" id="inp" onClick={change}/>
                <p>Test against custom input</p>
                    <button className="run-btn" onClick={() => compile()}>Run</button>
            </div>
            <div className={inputValue ? "DisplayInput" : "NoDisplayInput"}>
                <br/>
                <h5>Input</h5>
                <textarea id="code-inp" onChange=
                {(e) => setUserInput(e.target.value)}>
                </textarea>
            </div>
            <button className='end-btn' onClick={() => setendexam(true)}>End test</button>

            <div className={result =="none" ? "NoOutputCase" : "OutputCase"}>
                <div className={result =="Success" ? "Success" : "Failure"}>
                    <h1>{result}</h1>
                    <div className='resInfoS'>
                    <div className="SuccessMessage">
                        <h5>Output : </h5>
                        <p>
                            {userOutput}
                        </p>
                    </div>
                    </div>

                    <p className="resInfoF">Try Again</p>
                    <div className='resInfoF'>
                    <div className="ErrorMessage">
                        <h5>Compiler Message : </h5>
                        <p>
                            {userOutput}
                        </p>
                    </div>
                    </div>
                    
                    
                </div>
            </div>
            
        </div>
        </div>
            
            
                
            </div>
  )
}

export default Examination