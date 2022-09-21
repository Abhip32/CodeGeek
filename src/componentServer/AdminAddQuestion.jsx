import React from 'react'
import "./AdminHome.scss"
import {useLocation,useNavigate} from 'react-router-dom'
import { useState } from 'react';
import SidebarAdmin from './SidebarAdmin'
import Axios from 'axios';

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
    <div style={{display:'flex',height:"100vh",width:"98vw"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat}}/>
      <div style={{padding:"20px"}}>
          <h2>Add Question Here</h2>
          <form>
              <h5>Enter Question : <input type="text" placeholder='Enter the Question' onChange={(e)=>{setProblem(e.target.value)}}/></h5>
              <h5>Language : <select onChange={e=>setLanguage(e.target.value)}>
              <option value="">Select Language</option>
                  <option value="c">c Language</option>
                  <option value="cpp">cpp Language</option>
                  <option value="java">Java Language</option>
                  <option value="python3">Python Language</option>
                  </select></h5>

                  <h5>Enter Description :</h5>
                  <textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder='Enter the Description'/>

                  <h5>Expected Output :</h5>
                  <textarea onChange={(e)=>{setouput(e.target.value)}} placeholder='Enter the Output'/>

                  <h5>Identifier</h5>
                  {
                      getIdentifier(Language)&&<h2 style={identifer=="1"? {display:'none'}:{display:'block'}}>{identifer}</h2>
                  }

            <h5>Level : <select onChange={e=>setLevel(e.target.value)}>
              <option value="">Select Language</option>
                  <option value="Basic Level">Basic Level</option>
                  <option value="Medium Level">Medium Level</option>
                  <option value="Hard Level">Hard Level</option>
                  </select></h5>
                  
            <button onClick={(e)=>{addQuestion(e)}}>Add Question</button>
                  
          </form>
      </div>
    </div>
  )
}

export default AdminAddQuestion