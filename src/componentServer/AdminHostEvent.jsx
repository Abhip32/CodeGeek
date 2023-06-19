import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { useState } from 'react';
import SidebarAdmin from './SidebarAdmin'
import Axios from 'axios';
import "./AdminAddQuestion.scss";
import {BsQuestionSquareFill} from 'react-icons/bs'
import {FaCode} from 'react-icons/fa'
import {MdDescription} from 'react-icons/md'
import {VscOutput} from 'react-icons/vsc';
import {HiIdentification} from 'react-icons/hi';
import {SiOpslevel} from 'react-icons/si';
import {GrAdd} from 'react-icons/gr';
import Card from 'react-bootstrap/Card';
import FileBase64 from 'react-file-base64';

function AdminHostEvent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setprofileImage] = useState(location.state.pic);
  const [sidebarVisible, setsidebarVisible] = useState(true);
  const [languagesstats, setlanguagestats] = useState(location.state.lang);
  const [teststats, setteststats] = useState(location.state.test);
  const [user,setUser]=useState(location.state.name)
  const [Language,setLanguage]=useState("");
  const [userstat,setUserstat]=useState(location.state.userstat)
  const [moneystats,setMoneyState]=useState(location.state.moneystats)
  const [substats, setsubstats] = useState(location.state.substats);

  const [Question, setQuestion] = useState([]);
  const [que,setque]=useState([]);
  const [name,setName]=useState("");
  const [Problem, setProblem] = useState("");
  const [Choice, setChoice] = useState("");
  const [optionA,setOptionA] = useState("");
  const [optionB,setOptionB] = useState("");
  const [optionC,setOptionC] = useState("");
  const [optionD,setOptionD] = useState("");
  const [answer,setAnswer] = useState("");
  const [marks,setMarks] = useState("");
  const [error,setError] = useState(false);
  const [zero,setzero]=useState(false);
  const [event,setEvent] = useState("");
  const [date,setDate] = useState("");
  const [company,setCompany] = useState("");
  const [companylogo,setCompanyLogo] = useState("");
  var [i,setI]= useState(1);
  const [companyemail,setCompanyEmail] = useState("");

  const CreateTest=(e)=>{
    if(Question.length > 0)
    {
      navigate("/CreateTestPreview",{state:{Paper:Question,eventname:event,date:date,Language:Language,company:company,companyemail:companyemail,companylogo:companylogo,name:user,pic:profileImage,lang:languagesstats,userstat:userstat}});
      setzero(false);
    }
    else
    {
      setzero(true);
    }
    
  }


  const AddMCQQuestion=(e)=>
  {
    e.preventDefault()
    if(Problem.length > 0&&Choice.length > 0&&optionA.length > 0&&optionB.length > 0&&optionC.length > 0&&optionD.length > 0&&answer.length > 0&&marks.length > 0)
    {
      que.push({"Problem":Problem,"Choice":Choice,"optionA":optionA,"optionB":optionB,"optionC":optionC,"optionD":optionD,"answer":answer,"name":name,"marks":marks});
      Question.push(que);
      setError(false);
      setI(i++);
      console.log(Question)
      setque([])
      document.getElementById("testname").ariaDisabled=true;
    }
    else{
        setError(true);
        document.getElementById("testname").ariaDisabled=false;
    }
  }


  const AddShortQuestion=(e)=>
  {
    e.preventDefault()
    if(Problem.length > 0&&answer.length > 0&&marks.length>0)
    {
      que.push({"Problem":Problem,"Choice":Choice,"answer":answer,"name":name,"marks":marks});
      Question.push(que);
      setError(false);
      setI(i++);
      console.log(Question)
      setque([])
      document.getElementById("testname").disabled=true;
    }
    else{
      setError(true);
      document.getElementById("testname").disabled=false;
  }
  }
  
  return (
    <div class="addQuePage" style={{height:"100%",background: "#E2E8F0"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
      <div style={{marginTop:"30px",margin:"4vh",padding:"2vh"}}>
      <h2 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",borderRadius:"20px"}}><GrAdd/> Add Event Details Here</h2>
          <form style={{background: "white",padding:"40px",borderRadius:"2vw",textAlign:"left",width:"100%"}}>
              <h5><BsQuestionSquareFill  style={{margin:"20px"}}/>Enter Name of Event : <input style={{margin:"20px"}} type="text" placeholder='Enter the Question' onChange={(e)=>{setEvent(e.target.value)}}/></h5>
              <h5><FaCode style={{margin:"20px"}}/>Language : <select  style={{margin:"20px"}} onChange={e=>setLanguage(e.target.value)}>
              <option value="">Select Language</option>
                  <option value="c">c Language</option>
                  <option value="cpp">cpp Language</option>
                  <option value="java">Java Language</option>
                  <option value="python3">Python Language</option>
                  </select></h5>

                  <h5><MdDescription style={{margin:"20px"}}/> Enter Date  :</h5>
                  <input type="date" id="Date" onChange={(e)=>{setDate(e.target.value)}}/> 
                  <br/>

                  <h5><MdDescription style={{margin:"20px"}}/> Enter Name of the company  :</h5>
                  <input type="texr" id="comapny" onChange={(e)=>{setCompany(e.target.value)}}/> 
                  <br/>

                  <h5><MdDescription style={{margin:"20px"}}/> Add logo :</h5>
                  <FileBase64 class="input-text"
                            multiple={false}
                            style={
                                {
                                    backgroundColor: "red",
                                    padding: "10px"
                                }
                            }
                            onDone={
                                ({base64}) => setCompanyLogo(base64)
                            }
                            accept="image/*"/>
                  <br/>

                  <h5><MdDescription style={{margin:"2vh"}}/> Enter email of the company  :</h5>
                  <input type="email" id="Email" onChange={(e)=>{setCompanyEmail(e.target.value)}}/> 
                  <br/>

                  <h5><MdDescription style={{margin:"2vh"}}/> Add Questions  :</h5>

                  <Card style={{ width: '90%',margin: '5px',marginLeft:"4.5vw",padding:"1.5vw",border: '3px solid black',boxShadow:'2px 2px 10px black',backgroundColor:"white",color:"black",fontWeight:"bolder"}}> 
    <h5 style={{float:"left"}}>Q.{Question.length+1} : 
      <input type="text" style={{margin:"1vw"}} placeholder='Question' onChange={e=>setProblem(e.target.value)}  required/>
    </h5>

    <h5 style={{float:"left"}}>Type :
    <select  style={{margin:"1vw"}} onChange={e=>setChoice(e.target.value)} required>
      <option selected>Select type of question</option>
      <option value="MCQ">MCQ</option>
      <option value="Programming Question">Programming Question</option>
    </select>
    </h5>


    

    {Choice=="MCQ"&&<div>
      <h5>Enter Options :</h5>
         <h6>Option A : <input type="text" onChange={e=>setOptionA(e.target.value)} placeholder='OptionA'/></h6> 
         <h6>Option B : <input type="text" onChange={e=>setOptionB(e.target.value)}placeholder='OptionB'/></h6> 
         <h6>Option C : <input type="text" onChange={e=>setOptionC(e.target.value)}placeholder='OptionC'/></h6> 
         <h6>Option D : <input type="text" onChange={e=>setOptionD(e.target.value)}placeholder='OptionD'/></h6> 

      <h5>Select Correct Answer : <select onChange={e=>setAnswer(e.target.value)} required>
          <option selected>Select Correct Answer</option>
            <option value={optionA}>{optionA}</option>
            <option value={optionB}>{optionB}</option>
            <option value={optionC}>{optionC}</option>
            <option value={optionD}>{optionD}</option>
        </select></h5>
      
      <h5>Enter Marks :  <input type="text" onChange={e=>setMarks(e.target.value)}placeholder='Enter Marks'/></h5>
    
          <button style={{margin:"20px",color:"black",fontWeight:"bold",fontSize:"10px",padding:"1vw",borderRadius:"2vw",width:"10vw",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"black",backgroundColor:"white"}} type='submit' onClick={(e)=>{AddMCQQuestion(e)}}>Add Question </button>
      </div>}

      {Choice=="Programming Question"&&<div>
        <h5>Expected Output : </h5>
        <textarea type="text" onChange={e=>setAnswer(e.target.value)} rows="4" cols="50"/>
        <br/>
        <h4>Marks : <input type="text" onChange={e=>setMarks(e.target.value)}placeholder='Marks' cols="50"/></h4>
        
        <button className="AdminFormButton" type='submit' onClick={(e)=>{AddShortQuestion(e)}}>Add Question </button>
        
      </div>}
      <center>
          <h4 style={error == true ? {display: 'block',color:"red"}:{display: 'none'}}>
            Please Check All fields
        </h4>

        <h4 style={zero== true ? {display: 'block',color:"red"}:{display: 'none'}}>
            Error No Questions Added
        </h4>
      </center>
      
  

    </Card>

            
            <button style={{margin: "50px", width: "90%",backgroundColor: "black",borderRadius: "30px", color: "white",padding: "15px 0",fontSize: "2vh", fontWeight: "600", cursor: "pointer", boxShadow: "1px 1px 20px violet"}} onClick={(e)=>{CreateTest(e)}}>Host Event</button>
                  
          </form>
      </div>
    </div>
  )
}

export default AdminHostEvent