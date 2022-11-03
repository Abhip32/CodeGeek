import React from 'react'
import { useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal'

function AvailableTests() {
    const [QuestionsData, setQuestionsData] = useState([]);
    const [userImg,setuserImg]=useState("");
    const [Question,setQuestion]= useState(false);
    const location = useLocation();
    const [status,setStatus]= useState("");
    let navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

    const EnterTest=(Name,ID,NoQue)=>{
      navigator.getMedia = ( navigator.getUserMedia || // use the proper vendor prefix
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia);

        navigator.getMedia({video: true}, function() {
          navigate("/TestPage",{state:{name: Name,username:location.state.username,email: location.state.email}})
        }, function() {
          setStatus("No Camera Found")
          setShow(true)
        });
      
    }

  return (
    
    
    <div>
       <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><h4>Alert</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body> <h6 style={{color:"red",fontWeight:"bolder"}}>{status}</h6></Modal.Body>

                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
         <div className="userInfo" style={{backgroundImage: `url("https://t4.ftcdn.net/jpg/04/67/93/01/360_F_467930159_UcfrOkjhFG436zoT9fSetYccBgpNkokp.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <h1>Hello {location.state.username}</h1>
      <br/>
      <h4>Appear for Events to build your Resume </h4>
      </div>

    

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
             <Card style={{ width: '90vw',margin: '4vw',padding:'1vw',boxShadow: '2px 2px 15px black',borderRadius:'3vw',border: "none",backgroundColor:"black",color:"white"}}>
              
                <Card.Body style={{display:"flex",gap:"6vw",alignItems:"center"}}>
                  <div style={{padding:"10px",boxShadow:"1px 1px 20px white",borderRadius:"100px",backgroundColor:"white"}}>
                    <img width="100px" height="100px" style={{borderRadius:"100px"}} src={item.companylogo}/>
                  </div>
                  <div>
                  <h3 style={{color: "white", fontWeight:"bolder"}}>Event Name : {item.Event}</h3>
                    <Card.Text>
                      <h4 style={{color: "white", fontWeight:"bolder"}}>Event ID : {item._id}</h4>
                      <h4 style={{color: "white", fontWeight:"bolder"}}>Preffred Language : {item.Language}</h4>
                      <h4 style={{color: "white", fontWeight:"bolder"}}>Hosting Company : {item.company}</h4>
                    
                    </Card.Text>
                    <Button variant="primary" style={{backgroundColor:"#008F9C",borderRadius:"20px",width:"200px",boxShadow:"2px 2px 10px white",fontWeight:"bolder",border: "none"}} onClick={()=>{EnterTest(item.Event)}}>Appear for the Event</Button>
                  </div>
                </Card.Body>
             </Card> 
        ))}  
    </div>
  )
  
}

export default AvailableTests;