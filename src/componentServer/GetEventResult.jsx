import React from 'react'
import "./AdminHome.scss"
import {useLocation,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin'
import Axios from 'axios';
import "./AdminAddQuestion.scss";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';


function GetEventResults() {
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

  const [QuestionsData, setQuestionsData] = useState([]);
  const [userImg,setuserImg]=useState("");
  const [Question,setQuestion]= useState(false);

  useEffect(() => {
    Axios.post(`http://localhost:8000/getQuestions`,{
  }).then((res) => {
      setQuestionsData(res.data);

      if(QuestionsData.length()==0)
      {
         setQuestion(true)
      }
     
  })
  }, []);

  const SeeDetails=(Name,ID,NoQue)=>{
    navigate("/AdminTestDetails",{state:{event: Name,name:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}})
  }

  const rem=(Name,ID,NoQue)=>{
    Axios.post(`http://localhost:8000/delev`,{
      event:Name
    }).then((res) => {       
    })

    window.location.reload(false);
  }


  
  return (
    <div class="addQuePage" style={{display:'flex',height:"100%",background: "#E2E8F0"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
      <div style={{marginTop:"30px",margin:"40px"}}>
      <h2 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",borderRadius:"20px"}}> Details of Events</h2>
      <Card style={Question ? {display:"block"}:{display:'none'}}>
        <h3 style={{marginLeft:"4vw"}}>No Quiz Available today  ?</h3>
        <h3 style={{marginLeft:"4vw"}}>Sorry</h3>
        </Card>

        {QuestionsData.length === 0&&
          <center>
            <Spinner animation="border" role="status">
                 <span className="visually-hidden">Loading...</span>
            </Spinner>

          </center>
        }
        
        {QuestionsData.map(item => (  
             <Card style={{ width: '70vw',margin: '4vw',padding:'1vw',boxShadow: '2px 2px 15px black',borderRadius:'3vw',border: "none",backgroundImage: "linear-gradient(to right, #3f2b96, #4286f4)",color:"white"}}>
              
                <Card.Body>
                    <h3 style={{color: "white", fontWeight:"bolder"}}>Event Name : {item.Event}</h3>
                    <Card.Text>
                      <h4 style={{color: "white", fontWeight:"bolder"}}>Event ID : {item._id}</h4>
                      <h4 style={{color: "white", fontWeight:"bolder"}}>Preffred Language : {item.Language}</h4>
                      <h4 style={{color: "white", fontWeight:"bolder"}}>Preffred Language : {item.company}</h4>
                      <img width="100px" height="100px" src={item.companylogo} style={{borderRadius:"100px",padding:"10px",backgroundColor:"white"}}/>
                    </Card.Text>
                    <Button variant="primary" style={{backgroundColor:"black",borderRadius:"20px",width:"150px",boxShadow:"2px 2px 10px white",fontWeight:"bolder",border: "none"}} onClick={()=>{SeeDetails(item.Event)}}>See Details</Button>
                    <Button variant="primary" style={{backgroundColor:"black",borderRadius:"20px",width:"150px",boxShadow:"2px 2px 10px white",fontWeight:"bolder",border: "none"}} onClick={()=>{rem(item.Event)}}>Delete</Button>
                </Card.Body>
             </Card> ))}
    </div>
    </div>
  )}

export default GetEventResults