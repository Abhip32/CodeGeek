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
import Table from 'react-bootstrap/Table';
import { CChart } from '@coreui/react-chartjs'
import {ImUsers} from 'react-icons/im'
import {FaPercent} from 'react-icons/fa'


function TestDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  let pass=[];
  let fail=[];
  let percentagearr=[];
  let userrr=[];
  const [profileImage, setprofileImage] = useState(location.state.pic);
  const [languagesstats, setlanguagestats] = useState(location.state.lang);
  const [teststats, setteststats] = useState(location.state.test);
  const [user,setUser]=useState(location.state.name)
  const [userstat,setUserstat]=useState(location.state.userstat)
  const [moneystats,setMoneyState]=useState(location.state.moneystats)
  const [substats, setsubstats] = useState(location.state.substats);
  const [result, setResults] = useState([]);
  const [totalmarks,settotalMarks]= useState(0);

  useEffect(() => {
    Axios.post(`http://localhost:8000/testdetails`,{
        event:location.state.event
  }).then((res) => {
    console.log(res.data);
    setResults(res.data);
    console.log(result);
  })

  Axios.post(`http://localhost:8000/getTest`,{
        name:location.state.event,
    }).then((res) => {
      console.log(res.data[0].Questions);
      let marks=0;
      for(const item of res.data[0].Questions)
      {
        marks=marks+parseInt(item[0].marks,10);
        settotalMarks(marks);
      }
    })

  }, []);


  const avgper=()=>
  {
    let total=0;
    for (let item of percentagearr)
    {
        total=total+parseInt(item,10)
    }

    let out=(total/percentagearr.length).toFixed(2);
    return out
  }
  

  const calculatemarks=(ans,user)=>{
    let marks=0;
    let percentage=0;

    if(ans.length >0)
    {
        for (let i=0; i<=ans.length; i++)
      {
        marks=parseInt(marks,10)+parseInt(ans[i].Marks,10);
      }

      percentage=(marks/totalmarks)*100;
    }
    else
    {
      percentage=(0/totalmarks)*100;
    }
    
    if(percentage>=50&&marks!=0)
    {  
      if(!pass.includes(user+"pass"))
      {
        pass.push(user+"pass")
        percentagearr.push(percentage)
        userrr.push(user)
      }
      return {marks:marks,percentage:percentage,status:"Pass"};
    }

    if(percentage<50)
    {
      if(!fail.includes(user+"fail"))
      {
        fail.push(user+"fail");
        percentagearr.push(percentage)
        userrr.push(user)
      }
      return {marks:marks,percentage:percentage,status:"Fail"};
    }

    
  }
  
  return (
    <div class="addQuePage" style={{height:"100%",background: "#E2E8F0"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
      <div style={{marginTop:"30px",margin:"40px"}}>
      <h2 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",borderRadius:"20px"}}> Test Details</h2>
      <div style={{display:"flex",gap:"5vw"}}>
        <div style={{height:"100%"}}>
        <h4 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",borderRadius:"20px"}}> Result Table </h4>
        <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                        <th>User</th>
                        <th>Obtained Marks</th>
                        <th>Total Marks</th>
                        <th>Percentage</th>
                        <th>Status</th>
                        </tr>
                    </thead>     
            {result.map(item => (  
                    <tbody>
                    <tr>
                    <td>{item.email}</td>
                    <td>{calculatemarks(item.answers,item[0].email).marks}</td>
                    <td>{totalmarks}</td>
                    <td>{calculatemarks(item.answers,item[0].email).percentage}</td>
                    <td>{calculatemarks(item.answers,item[0].email).status}</td>
                    </tr>
                    </tbody>
              ))
              }
               </Table>

               <br/>
               <h4 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",borderRadius:"20px"}}> Number of Candidates </h4>
               <div style={{padding:"0.5vw",backgroundColor:"white",borderRadius:"2vw"}}>
                  <center style={{display:"flex",alignItems:"center",paddingLeft:"2vw"}}><ImUsers size={30}/><h4 style={{padding:"20px"}}>{userrr.length}</h4></center>
               </div>
               <br/>
               <h4 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",borderRadius:"20px"}}> Average Percentage </h4>
               <div style={{padding:"0.5vw",backgroundColor:"white",borderRadius:"2vw"}}>
                  <center style={{display:"flex",alignItems:"center",paddingLeft:"2vw"}}><FaPercent size={30}/><h4 style={{padding:"20px"}}>{avgper()}</h4></center>
               </div>
        
        </div>

               <div className='tier11'>
               <h4 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",borderRadius:"20px"}}> Pass/Fail Trend</h4>
                  <CChart id="barchart"
                type="doughnut"
                style={{padding:"0.5vw",backgroundColor:"white",borderRadius:"2vw"}}
                data={{
                  labels: ['Pass', 'Fail',],
                  datasets: [
                    {
                      backgroundColor: ['greenyellow', 'red'],
                      data: [pass.length,fail.length]
                    },
                  ],
                }}
              />
              <br/>
              <h4 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",borderRadius:"20px"}}> Trends in Results</h4>
              <CChart
                type="line" 
                style={{padding:"0.5vw",backgroundColor:"white",borderRadius:"2vw"}}
                data={{
                  labels: userrr,
                  datasets: [
                    {
                      label: "Percentage",
                      backgroundColor: "rgba(220, 220, 220, 0.2)",
                      borderColor: "black",
                      pointBackgroundColor: "rgba(220, 220, 220, 1)",
                      pointBorderColor: "red",
                      data: percentagearr
                    }
                  ],
                }}
              />
                </div>
      </div>
    </div>
    </div>
  )}

export default TestDetails