import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./Problem.scss";
import Select from 'react-select';
import Editor from "@monaco-editor/react";
import Axios from "axios";
import NoComments from "../Assets/NoComments.png"
import {useParams} from 'react-router-dom';

function Problem(props) {
	

    const location = useLocation();
    let navigate = useNavigate();
	const problemId = useParams();
	const [inputValue, setInputValue] = useState(false);
    const [userCode, setUserCode] = useState(``);
	var solve=location.state.status;
	const [problemData,setProblemData] = useState([]);
    const [userLang, setUserLang] = useState();
    const [userTheme, setUserTheme] = useState("vs-dark");
    const [fontSize, setFontSize] = useState(20);
    const [userInput, setUserInput] = useState(location.state.inputval);
    const [userOutput, setUserOutput] = useState("");
	const [link, setLink] = useState("");
	const [result,setResult] = useState("none");
	const [comments, setComments] = useState([{pic:NoComments,name:"No Comments"}])


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

	        const getProblem = async () => {

            try {

                const response = await Axios.get('http://localhost:8000/getProblemDetails', {
                    params: {
                        id:problemId.problemName
                    }
                });
                const data = await response.data
				setProblemData(data[0])
				setComments(data[0].comments);
				setUserLang(data[0].language)
				solve=[data[0].solved.find(JSON.parse(localStorage.getItem('loginCookie')).email)]
                console.log(data);
            } catch (error) {
                console.error(error);
                // Handle any errors that occurred during the request
            }
        };

		getProblem();
}, []) 

		

const addcomment = async()=>
{

	try {

		const response = await Axios.post('http://localhost:8000/addComment', {
			params: {
				email:  JSON.parse(localStorage.getItem('loginCookie')).email,
				name:  JSON.parse(localStorage.getItem('loginCookie')).username,
				identi: problemId.problemName,
				comment: document.getElementById("comment").value
			}
		});
		const data = await response.data
		getComments();
		console.log(data);
	} catch (error) {
		console.error(error);
		// Handle any errors that occurred during the request
	}
}


const getComments = async()=>{
	try {

		const response = await Axios.get('http://localhost:8000/getComments', {
			params: {
				identi: problemId.problemName,
			}
		});
		const data = await response.data
		console.log(data);
		setComments(data[0].comments)
	} catch (error) {
		console.error(error);
		// Handle any errors that occurred during the request
	}

}

const AddSolved =()=>{
	Axios.post(`http://localhost:8000/addsolved`,
	{
		id: JSON.parse(localStorage.getItem('loginCookie')).email,
		identi: problemData.identifier,
		lang: problemData.language,
	}).then((res) => {

			AddPoints();
	})	
	
}

const AddPoints =async()=>{
	Axios.post(`http://localhost:8000/addpoints/`,
				{
					id: JSON.parse(localStorage.getItem('loginCookie')).email,
					identi: problemData.identifier,
					lang: problemData.language,
				}).then((res) => {	
					solve="Solved"
					console.log(solve);
				})
}





async function compile() {
	setLoading(true);
  
	if (userCode === '') {
	  return;
	}
  
	try {
	  const response = await Axios.post('http://localhost:8000/compile', {
		code: userCode,
		language: userLang,
		input: userInput
	  });
  
	  setUserOutput(await response.data);
  
	  if (problemData.expectedoutput === response.data) {
		AddSolved();
		setLink('Go Back');
		setResult('Success');
	  } else if (
		userInput !== undefined &&
		problemData.expectedoutput.replace('{input}', userInput).trim() === response.data.trim()
	  ) {
		AddSolved();
		setLink('Go Back');
		setResult('Success');
	  } else {
		setResult('Failure');
	  }
	} catch (error) {
	  console.error('Error compiling:', error);
	  // Handle error if necessary
	} finally {
	  setLoading(false);
	}
  }
  

function change()
{
	setInputValue(!inputValue);
}


  return (
    <div className='problemportal' style={{height:"max-content"}}>

        <div className="sidebarcontent">
        <h5>Problem : </h5>
        <p>
            {problemData.title}
        </p>
        <h5>Description : </h5>
        <p>
            {problemData.description}
        </p>
		<h5 >Expected Output : </h5>
		<div className='ExpectedOutput'>
        	<p>
            	{problemData.expectedoutput}
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
						<h6>{item.name} | {item.userEmail}</h6>
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
		<button className='BackP' onClick={() =>  navigate(location.state.origin, {state:{username:JSON.parse(localStorage.getItem('loginCookie')).usernmae}})}>
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
				{(e) => setUserInput(e.target.value)} placeholder='Add input for your code here'>
				</textarea>
			</div>

			<div className={inputValue ? "NoDisplayInput" : "DisplayInput1"}>
				<br/>
			</div>

			<div className={loading ? "d-block align-center":"d-none"}>
				<h5>Loading</h5>
			</div>
			
			<div className={result =="none" || loading ? "NoOutputCase" : "OutputCase"}>
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

					<button className='BackO' onClick={() =>  navigate(location.state.origin, {state:{username: JSON.parse(localStorage.getItem('loginCookie')).username}})}>{link}</button>
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