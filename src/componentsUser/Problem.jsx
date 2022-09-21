import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./Problem.scss";
import Select from 'react-select';
import Editor from "@monaco-editor/react";
import Axios from "axios";

function Problem(props) {
	

    const location = useLocation();
    let navigate = useNavigate();
	const [inputValue, setInputValue] = useState(false);
    const [userCode, setUserCode] = useState(``);
	var solve=location.state.status;
    const [userLang, setUserLang] = useState(location.state.language);
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState(location.state.inputval);
    const [userOutput, setUserOutput] = useState("");
	const [link, setLink] = useState("");
	const [result,setResult] = useState("none");
	const [comments, setComments] = useState([])


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

useEffect(()=>{
    Axios.post(`http://localhost:8000/getcomments`,
		{
			id: location.state.userid,
			identi: location.state.identi,
			lang: location.state.language,
			comment: document.getElementById("comment").value
		}).then((res) => {
			setComments(res.data);
			console.log(comments);

		})
}, []) 

		

function addcomment()
{
	Axios.post(`http://localhost:8000/addcomment`,
		{
			id: location.state.userid,
			identi: location.state.identi,
			lang: location.state.language,
			comment: document.getElementById("comment").value
		}).then((res) => {
			console.log(res.data);
			Axios.post(`http://localhost:8000/getcomments`,
		{
			id: location.state.userid,
			identi: location.state.identi,
			lang: location.state.language,
			comment: document.getElementById("comment").value
		}).then((res) => {
			setComments(res.data);
			console.log(comments);
		})

		})
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

		Axios.post(`http://localhost:8000/addsolved`,
		{
			id: location.state.userid,
			identi: location.state.identi,
			lang: location.state.language
		}).then((res) => {
			console.log(solve);
			if(solve=="Unsolved")
			{
				Axios.post(`http://localhost:8000/addpoints/`+location.state.language,
				{
				id: location.state.userid,
				identi: location.state.identi,
				lang: location.state.language
				}).then((res) => {	
				})
			}
			solve="Solved"
			console.log(solve);
		})		
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


  return (
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
		<div className='Comments'>
			<h5>Comments : </h5>
			<div className='CommentSection'>
			{ comments.map((item,index) => 
			(
				<div className="commentdiv">
					<div className="commentsubdiv">
						<img src={item.pic}/>
						<h6>{item.name}</h6>
					</div>
					<div className="commenttext">
						<p>{item.comment}</p>
					</div>
					
				</div>
			)
       			
			)}


			</div>
			<div className='Commentpost'>
			<input type='text' id="comment" placeholder="Add Comment Here"></input>
			<button onClick={()=> addcomment()}> Add Comment </button>

			</div>
			
		</div>
		<button className='BackP' onClick={() =>  navigate(location.state.origin, {state:{username: location.state.username}})}>
			Go Back
		</button>
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

			<div className={inputValue ? "NoDisplayInput" : "DisplayInput1"}>
				<br/>
			</div>

			<div className={result =="none" ? "NoOutputCase" : "OutputCase"}>
				<div className={result =="Success" ? "Success" : "Failure"}>
					<h1>{result}</h1>
					<p className="resInfoS">Try solving more problems</p>
					<div className='resInfoS'>
					<div className="SuccessMessage">
						<h5>Output : </h5>
						<p>
							{userOutput}
						</p>
					</div>
					</div>

					<button className='BackO' onClick={() =>  navigate(location.state.origin, {state:{username: location.state.username}})}>{link}</button>
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
  )
}

export default Problem