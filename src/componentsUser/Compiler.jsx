import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./Compiler.scss";
import Select from 'react-select';
import Editor from "@monaco-editor/react";
import Axios from "axios";

function Problem(props) {
	

    const location = useLocation();
    let navigate = useNavigate();
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


  return (
    <div className='problemportal'>
		<div class="sidecom">
			<br/>
			<br/>
			<h1 style={{fontWeight:"900",textShadow:"1px 1px 20px #2196f3",alignItems:"center",margin:"20px"}}>Practice Compiler</h1>
			<br/>
			<br/>
			<img style={{margin:"20px",boxShadow:"1px 1px 20px #2196f3"}} src="https://c.tenor.com/NOYF3f82b_gAAAAC/programmer.gif"/>

		</div>
        <div className='compiler'>
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
			
        </div>
  )
}

export default Problem;