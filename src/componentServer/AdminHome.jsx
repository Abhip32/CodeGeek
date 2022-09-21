import React from 'react'
import { useState,useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import "./AdminHome.scss"
import {GiHamburgerMenu} from 'react-icons/gi';
import {AiFillHome,AiOutlineUserAdd,AiFillMessage,AiFillFileAdd} from 'react-icons/ai'
import { CChart } from '@coreui/react-chartjs'
import SidebarAdmin from './SidebarAdmin'
import { Card } from 'react-bootstrap';

function AdminHome() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profileImage, setprofileImage] = useState(location.state.pic);
    const [sidebarVisible, setsidebarVisible] = useState(true);
    const [languagesstats, setlanguagestats] = useState(location.state.lang);
    const [teststats, setteststats] = useState(location.state.test);
    const [user,setUser]=useState(location.state.name)
    const [userstat,setUserstat]=useState(location.state.userstat)

  
  console.log(location.state);

  var something = () =>  {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            Axios.post(`http://localhost:8000/usersData`).then((res) => {
              setUserstat(res.data.users);
              console.log(res.data);
          })
        
          Axios.post(`http://localhost:8000/getbardata`).then((res) => {
              setteststats(res.data);
              console.log(res.data);
          })
        
          Axios.post(`http://localhost:8000/getpiedata`).then((res) => {
              setlanguagestats(res.data);
              console.log(res.data);
          })
        }
    };
};

if(languagesstats==[])
{
  something();
}
 

  const greet=() =>{
    var today = new Date(),
    time = today.getHours();
    var message ="";
    var icon="";
    console.log("getData");
    
    

    if(time <=12&&time>=0)
    {
      message = "Good Morning";
      icon="https://cdn-icons-png.flaticon.com/512/3892/3892928.png"
    }
    else if(time>=12&&time <=18)
    {
      message = "Good Afternoon";
      icon="https://cdn-icons-png.flaticon.com/512/6631/6631558.png"
    }
    else if(time >=18&&time <=19)
    {
      message = "Good Evening";
      icon="https://cdn-icons-png.flaticon.com/512/1146/1146886.png"
    }
    else{
      message = "Good Night";
      icon="https://cdn-icons-png.flaticon.com/512/1809/1809597.png"
    }
    return(
      <div style={{margin:"20px",display:'flex',alignItems:'center'}}>
        <img style={{width:"70px",height:"70px"}} src={icon}/> 
        <h3 style={{fontWeight:"bolder",color:"white"}}>{message}</h3>
      </div>
    )
  }
  
  
  return (
    <div style={{display:"flex"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat}}/>
      <div className='AdminHome'>
      {greet()}
      <div style={{width:'350px',padding:'20px',backgroundColor:'white',borderRadius:'20px',margin:'20px'}}>
                  <h5>Total Number of Users</h5>
                  {location.state.userstat}
      </div>  

        <div className="AdminHomeBody">
            <div className="Tier11">            
              <h5>No of Questions </h5>
            <CChart id="barchart"
            type="doughnut"
            data={{
              labels: ['C', 'C++', 'Java', 'Python'],
              datasets: [
                {
                  backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
                  data: [languagesstats[0], languagesstats[1], languagesstats[2], languagesstats[3]]
                },
              ],
            }}
          />
          </div>
          <div className="Tier12">
          <h5>Results of Candidate </h5>
          <CChart
          type="bar"
          data={{
            labels: ['Pass', 'Fail', 'Unfair'],
            datasets: [
              {
                label: 'No. of Users',
                backgroundColor: '#f87979',
                data: [teststats[0], teststats[1], teststats[2]]
              },
            ],
          }}
          labels="months"
          />  
          </div>

          <div className="Tier13">
          <CChart
          type="line" 
          data={{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
              {
                label: "My First dataset",
                backgroundColor: "rgba(220, 220, 220, 0.2)",
                borderColor: "rgba(220, 220, 220, 1)",
                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                pointBorderColor: "#fff",
                data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
              },
              {
                label: "My Second dataset",
                backgroundColor: "rgba(151, 187, 205, 0.2)",
                borderColor: "rgba(151, 187, 205, 1)",
                pointBackgroundColor: "rgba(151, 187, 205, 1)",
                pointBorderColor: "#fff",
                data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
              },
            ],
          }}
        />
          </div>
      </div>


    </div>  
  </div>
  )
}

export default AdminHome