import React from 'react'
import "./AdminHome.scss"
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

function AdminAddQuestion() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setprofileImage] = useState(location.state.pic);
  const [sidebarVisible, setsidebarVisible] = useState(true);
  const [languagesstats, setlanguagestats] = useState(location.state.lang);
  const [teststats, setteststats] = useState(location.state.test);
  const [user,setUser]=useState(location.state.name)
  const [Language,setLanguage]=useState("");
  const [problem,setProblem]=useState("");
  const [description,setDescription]=useState("");
  const [identifer,setIdentifier]=useState("");
  const [ouput,setouput]=useState("");
  const [level,setLevel]=useState("");
  const [userstat,setUserstat]=useState(location.state.userstat)
  const [moneystats,setMoneyState]=useState(location.state.moneystats)
  const [substats, setsubstats] = useState(location.state.substats);

  const addQuestion=(e)=>{
    e.preventDefault();
    if(Language.length >0&&problem.length>0&&description.length>0&&identifer.length>0&&ouput.length>0&&level.length>0)
    {
          Axios.post(`http://localhost:8000/addProblem`,{
          problem:problem,
          language:Language,
          description:description,
          identifer:identifer,
          ouput:ouput,
          level:level
        }).then((res)=>
        {
          setIdentifier(Language+res.data.count)
          console.log(res.data.count);
        })
    } 
    alert("Question added successfully")
  }

  const getIdentifier = (lang) =>{
    console.log(lang);
    Axios.post(`http://localhost:8000/getIdentifier`,{
      lang:lang,
    }).then((res)=>
    {
      setIdentifier(Language+res.data.count)
      console.log(res.data.count);
    }) 
    return true;

  }
  
  return (
    <div class="addQuePage">
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
      <div style={{marginTop:"30px",margin:"40px"}}>
      <h2 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",borderRadius:"20px"}}><GrAdd/> Add Question Here</h2>
          <form style={{background: "white",padding:"40px",borderRadius:"2vw",textAlign:"left",width:"100%"}}>
              <h5><BsQuestionSquareFill  style={{margin:"20px"}}/>Enter Question : <input style={{margin:"20px"}} type="text" placeholder='Enter the Question' onChange={(e)=>{setProblem(e.target.value)}}/></h5>
              <h5><FaCode style={{margin:"20px"}}/>Language : <select  style={{margin:"20px"}} onChange={e=>setLanguage(e.target.value)}>
              <option value="">Select Language</option>
                  <option value="c">c Language</option>
                  <option value="cpp">cpp Language</option>
                  <option value="java">Java Language</option>
                  <option value="python3">Python Language</option>
                  </select></h5>

                  <h5><MdDescription style={{margin:"20px"}}/> Enter Description :</h5>
                  <textarea style={{margin:"20px"}} onChange={(e)=>{setDescription(e.target.value)}} placeholder='Enter the Description'/>

                  <h5><VscOutput style={{margin:"20px"}}/> Expected Output :</h5>
                  <textarea style={{margin:"20px"}} onChange={(e)=>{setouput(e.target.value)}} placeholder='Enter the Output'/>

                  <br/>
                  <h5> <HiIdentification style={{margin:"20px"}} /> Identifier : </h5>
                  {
                      getIdentifier(Language)&&<h5 style={identifer=="1"? {display:'none'}:{display:'block',margin:"20px"}}>{identifer}</h5>
                  }
                  <br/>

            <h5> <SiOpslevel style={{margin:"20px"}}/>Level : <select style={{margin:"20px"}} onChange={e=>setLevel(e.target.value)}>
              <option value="">Select Language</option>
                  <option value="Basic Level">Basic Level</option>
                  <option value="Medium Level">Medium Level</option>
                  <option value="Hard Level">Hard Level</option>
                  </select></h5>
                  
            <button className="AdminFormButton" onClick={(e)=>{addQuestion(e)}}>Add Question</button>
                  
          </form>
      </div>
    </div>
  )
}

export default AdminAddQuestion