import React from 'react'
import { useState,useEffect } from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';
import { getRoles } from '@testing-library/react';
import Spinner from 'react-bootstrap/Spinner';
import WebcamModified from './WebcamModified';
import "./Compiler.scss";
import Select from 'react-select';
import Editor from "@monaco-editor/react";


function TestPage() {
  const location = useLocation();
  const navigate= useNavigate();
  const [QuestionsData, setQuestionsData] = useState([]);
  const [answer,setAnswer]=useState([]);
  var [iterator,setIterator] = useState(0);
  var [question,setQuestion] = useState("");

useEffect(() => {
  Axios.post(`http://localhost:8000/getTest`,{
        name:location.state.name,
    }).then((res) => {
        setQuestionsData(res.data[0].Questions)   

    })
}, []);

const [inputValue, setInputValue] = useState(false);
    const [userCode, setUserCode] = useState(``);
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [userOutput, setUserOutput] = useState("No Output");
	const [link, setLink] = useState("");
	const [result,setResult] = useState("none");
	const [comments, setComments] = useState([])
	const [userLang, setUserLang] = useState("c");
	const [userInput, setUserInput] = useState("")


    const [loading, setLoading] = useState(false);

    const languages = [
		{ value: "c", label: "C" },
		{ value: "cpp", label: "C++" },
		{ value: "python3", label: "python" },
		{ value: "java", label: "Java" },
		{ value: "nodejs", label: "NodeJs" },
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
		setUserOutput(res.data)

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


const addAns= (sol) =>
{
  setQuestion(`${iterator}`)
  if(!answer.includes(sol))
  {
    if(sol[1]==sol[2])
    {
      answer.push({Question:sol[0],Answer:sol[1],Correct:sol[2],Marks:sol[3]})
    }

    if(sol[1]!=sol[2])
    {
      answer.push({Question:sol[0],Answer:sol[1],Correct:sol[2],Marks:"0"})
    }
    for(let i=0;i<answer.length;i++)
    {
      if(answer[i].Question==answer[i+1].Question&&answer[i+1]!=undefined)
      {
        answer.splice(i+1, 1);
      }
    }
    
  }
 
  console.log(answer);
}

const SubmitTest =(e) =>{
      console.log(answer);
  
      Axios.post(`http://localhost:8000/submit`,{
      answers:answer,
      user:location.state.username,
      event:location.state.name
  }) 
  navigate("/ExamEnd",{state:{username:location.state.username}})
}






  return (
    <div style={{display:"flex"}}>
      <br/>
      <div style={{backgroundColor:"green",padding:"5vw",backgroundImage: `url("https://t4.ftcdn.net/jpg/04/67/96/13/360_F_467961350_LlpfNFYVGUwkofWQzB4uptbSxl12rWps.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <br/>
        <h3 style={{color: "white",fontWeight:"bolder"}}>Quiz Name : {location.state.name}</h3>
        <br/>

        <WebcamModified type="test" event={location.state.name} answers={answer} username={location.state.username}/>
      </div>

      <div>
        
      {QuestionsData.length===0&&
          <center>
            <Spinner animation="border" role="status">
                 <span className="visually-hidden">Loading...</span>
            </Spinner>

          </center>
        }
          

      {QuestionsData.map(item => (  
             <Card style={{ width: '60vw',margin: '15px',marginLeft:"4.5vw",padding:"1.5vw",border: '3px solid black',boxShadow:'2px 2px 10px black',backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",color:"white",fontWeight:"bolder"}}>
              <div>
                <h5 style={{float:"right"}}>Marks : {item[0].marks}</h5>
                <h2 style={item[0].Choice=="MCQ"||item[0].Choice=="Programming Question"  ? {display: 'block'}:{display:'block'}}>Question : {item[0].Problem} </h2> 
              </div>
             
              <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}><input type="radio" name={`$i`} value={item[0].optionA} onChange={e=>addAns([item[0].Problem,item[0].optionA,item[0].answer,item[0].marks])}/> Option A : {item[0].optionA}</h4>
              <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}><input type="radio" name={`$i`} value={item[0].optionB} onChange={e=>addAns([item[0].Problem,item[0].optionB,item[0].answer,item[0].marks])}/> Option B : {item[0].optionB}</h4>
              <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}><input type="radio" name={`$i`} value={item[0].optionC} onChange={e=>addAns([item[0].Problem,item[0].optionC,item[0].answer,item[0].marks])}/> Option C : {item[0].optionC}</h4>
              <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}><input type="radio" name={`$i`} value={item[0].optionD} onChange={e=>addAns([item[0].Problem,item[0].optionD,item[0].answer,item[0].marks])}/> Option D : {item[0].optionD}</h4>

              <h4 style={item[0].Choice=="Programming Question" ? {display: 'block'}:{display:'none'}}>Expected Output : {item[0].answer}
              </h4> 
              <div className='compiler' style={item[0].Choice=="Programming Question" ? {display: 'block',width:"100%"}:{display:'none'}}>
              <div className="navbarcompiler">
            <h5 className="languageHeader">Language : </h5>
            <Select className='language' value={userLang}
                options={languages}
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
		</div>


            <Editor
			    options={options}
			    height="calc(50vh)"
			    width="100%"
				style={{backgroundColor:"red"}}
			    theme={userTheme}
			    language={userLang}
			    defaultLanguage={languages[0]}
			    defaultValue="# Enter your code here"
			    onChange={(value) => { setUserCode(value) }}
		    />
			<div className='InteractionMenu'>
				<input type="checkbox" className="inp" id="inp" onClick={change}/>
				<p>Test against custom input</p>
           	 	<button className="run-btn" onClick={() => compile()&&setUserOutput("Calculating")}>Run</button>
			</div>
			<div className={inputValue ? "DisplayInput" : "NoDisplayInput"}>
				<br/>
				<h5>Input</h5>
				<textarea id="code-inp" onChange=
				{(e) => setUserInput(e.target.value)}>
				</textarea>
			</div>
			<br/>
			<br/>
			<br/>
				<div className="Success">
						<h5 style={{backgroundColor:"#011333",padding:"15px"}}>Output : </h5>
						<p style={{padding:"15px",backgroundColor:"black"}}>
							{userOutput}
						</p>
				</div>
			</div>
      <button onClick={(e)=>{addAns([item[0].Problem,userOutput,item[0].answer,item[0].marks])}}>Add Answer</button>
             </Card> 
        ))}  

        <center>
          {QuestionsData.length !=0 &&
              <button style={{margin:"40px",color:"black",fontWeight:"bold",fontSize:"20px",padding:"1vw",borderRadius:"2vw",width:"150px",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"white",backgroundColor:"black"}} onClick={()=>{SubmitTest()}}>Submit</button>
          }
        </center>
        
        

    </div>
    </div>
  )
}

export default TestPage