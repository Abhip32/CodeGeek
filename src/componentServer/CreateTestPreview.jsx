import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useLocation } from 'react-router-dom'
import { useState } from 'react';
import Axios from 'axios';
import Card from 'react-bootstrap/Card';
import SidebarAdmin from './SidebarAdmin';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';



function CreateTestPreview() {
    const navigate = useNavigate();
    const location = useLocation();
    const [profileImage, setprofileImage] = useState(location.state.pic);
const [sidebarVisible, setsidebarVisible] = useState(true);
const [languagesstats, setlanguagestats] = useState(location.state.lang);
const [teststats, setteststats] = useState(location.state.test);
const [user,setUser]=useState(location.state.name)
const [Language,setLanguage]=useState("");
const [userstat,setUserstat]=useState(location.state.userstat)
const [moneystats,setMoneyState]=useState(location.state.moneystats)
const [substats, setsubstats] = useState(location.state.substats);
    const [error,setError]=useState(false);

    const [Problems, setProblems] = useState(location.state.Paper)
    const [params,setParams] = useState("");
    const [show, setShow] = useState(false);

    console.log(location.state.user);

    const Delete = (name,choice,e) =>{
        e.preventDefault()
        for(let i=0; i<Problems.length; i++) {
            if(Problems[i][0].Problem==name&&Problems[i][0].Choice==choice)
            {
               let arr1=Problems.slice(0,i)
               let arr2=Problems.slice(i+1,)
               const arr3=arr1.concat(arr2)
              
               setProblems(arr3)
        
            }
            else
            {
                continue;
            }
        }
        console.log(Problems);
    }

    
    const handleClose = () => 
    {
        setShow(false);
        navigate("/AdminHome", {state:{name:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}})
        window.location.reload(false);
    }
    const handleShow = () => {
        setShow(true);
        navigate("/AdminHome", {state:{name:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}})
        window.location.reload(false);
    }

    const Sort=(params,e)=>{
        console.log(params)
        e.preventDefault();
        Problems.sort(function(a, b){
            if(params=="Problem")
            {
                var firstNameA=a[0].Problem;
                var firstNameB=b[0].Problem;
            }
            if(params=="Marks")
            {
                var firstNameA=a[0].marks;
                var firstNameB=b[0].marks;

            }

                if (firstNameA < firstNameB) 
                    return -1 
                if (firstNameA > firstNameB)
                    return 1
                return 0 //default return value (no sorting)
            })
            setProblems(Problems)
            navigate("/CreateTestPreview",{state:{Paper:Problems,eventname:location.state.eventname,event:location.state.event,language:location.state.language,company:location.state.company,companylogo:location.state.companylogo,companyemail:location.state.companyemail,user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}});
            console.log(Problems)
            
    }

    const Submit =(e) =>{
            if(Problems.length > 0)
            {
                Axios.post(`http://localhost:8000/CreateTest`,{
                Paper:Problems,
                Event:location.state.eventname,
                Date:location.state.date,
                Language:location.state.Language,
                company:location.state.company,
                companylogo:location.state.companylogo,
                companyemail:location.state.companyemail,
                createdby:user,
                admin:profileImage
            })
            setShow(true);
            }
            else
            {
                setError(true)
            }
    }
  return (
    <div style={{display:"flex"}}>
        <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
        <div>
        <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><h4>Alert</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body> <h6 style={{color:"red",fontWeight:"bolder"}}>Test Submitted Successfully</h6></Modal.Body>
                <Button variant="secondary" onClick={handleShow}>
                    Ok
                </Button>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        <h2 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",margin:"40px",borderRadius:"20px",width:"60vw",boxShadow:"1px 1px 20px black"}}> Test Preview</h2>
        <h5 style={{ width: '70vw',margin:"20px",marginLeft:"5.5vw",padding:"0.5vw"}}>Sort by : 
        <select style={{padding: '6px',marginLeft:"10px"}} onChange={e=>Sort(e.target.value,e)}  required>
                <option selected>Selecting sorting method</option>
                <option value="Problem">Sort Alphabetically by Problem</option>
                <option value="Marks">Sort Acending by Marks</option>
            </select></h5>
        <Card style={{ width: '70vw',margin: '15px',marginLeft:"4.5vw",padding:"1.5vw",border: '3px solid black',boxShadow:'2px 2px 10px black',backgroundImage: "linear-gradient(to right, #3f2b96, #4286f4)",color:"white",fontWeight:"bolder"}}>
        <div style={{display:"flex",gap:"5vw"}}>
        
            <div>
                <img width="100px" height="100px" style={{borderRadius:"100px",padding:"10px",backgroundColor:"white",boxShadow:"1px 1px 20px black"}} src={location.state.companylogo}/>
            </div>

            <div>
                <h3> Name of the Event: {location.state.eventname}</h3>
                <h3> Name of the Company: {location.state.company}</h3>
            
                <h3> Date of Event: {location.state.date}</h3>
                <h3> Preffred Language : {location.state.Language}</h3>
                <h3> Email : {location.state.companyemail}</h3>
            </div>
        </div>
 
       </Card>
      
          {Problems.map(item => (  
            <Card style={{ width: '70vw',margin: '15px',marginLeft:"4.5vw",padding:"1.5vw",border: '3px solid black',boxShadow:'2px 2px 10px black',backgroundImage: "linear-gradient(to right, #3f2b96, #4286f4)",color:"white",fontWeight:"bolder"}}>
                 <h2>Problem :  {item[0].Problem}</h2>
                 <h4>Type :  {item[0].Choice}</h4>
                 <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}> Option A : {item[0].optionA}</h4>
                 <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}> Option B : {item[0].optionB}</h4>
                 <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}> Option C : {item[0].optionC}</h4>
                 <h4 style={item[0].Choice=="MCQ" ? {display: 'block'}:{display:'none'}}> Option D : {item[0].optionD}</h4>
                 <h4>Answer :  {item[0].answer}</h4>
                 <h4>Marks :  {item[0].marks}</h4>
                 <button style={{margin:"20px",color:"black",fontWeight:"bold",fontSize:"15px",padding:"0.6vw",borderRadius:"2vw",width:"150px",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",color:"black",backgroundColor:"white"}} onClick={(e)=>Delete(item[0].Problem,item[0].Choice,e)&&e.preventDefault()}>Delete</button>
                 <br/>

            </Card>
          ))}

            

            <center>
                <button style={{margin:"20px",color:"white",fontWeight:"bold",fontSize:"15px",padding:"0.6vw",borderRadius:"2vw",width:"150px",boxShadow:"2px 2px 10px blue",fontWeight:"bolder",border: "none",backgroundColor:"black"}} onClick={(e)=>Submit(e)}>Submit</button>
                <br/>
                <h3 style={error ? {display: 'block',color:"red",marginLeft:"auto",marginRight:"auto"} : {display:'none'}}>You deleted All Questions Unable to submit test</h3>
            </center>  

        </div>     
    </div>
  )
}

export default CreateTestPreview