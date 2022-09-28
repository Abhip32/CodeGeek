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
import {HiUsers} from 'react-icons/hi'
import {BsCurrencyDollar} from 'react-icons/bs'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AdminHome() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profileImage, setprofileImage] = useState(location.state.pic);
    const [sidebarVisible, setsidebarVisible] = useState(true);
    const [languagesstats, setlanguagestats] = useState(location.state.lang);
    const [teststats, setteststats] = useState(location.state.test);
    const [user,setUser]=useState(location.state.name)
    const [userstat,setUserstat]=useState(location.state.userstat)
    const [moneystats,setMoneyState]=useState(location.state.moneystats)
    const [substats, setsubstats] = useState(location.state.substats);
    const [value, onChange] = useState(new Date());

  
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

          Axios.post(`http://localhost:8000/getTotalTransaction`).then((res) => {
            setMoneyState(res.data);  
            console.log("asd"+res.data);
          })

          Axios.post(`http://localhost:8000/getTotalTransactionsbyCatagory`).then((res) => {
                console.log(res.data);
                substats.push(res.data);
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
      <div className='greet' style={{margin:"20px",display:'flex',alignItems:'center'}}>
        <img style={{width:"70px",height:"70px"}} src={icon}/> 
        <h3 style={{fontWeight:"bolder"}}>{message}</h3>
      </div>
    )
  }
  
  
  return (
    <div style={{display:"flex"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
      <div className='AdminHome'>
      {greet()}
      <div className='upperAdmin' style={{display:"flex"}}>
      <div className='noofuser' style={{width:'350px',padding:'20px',backgroundColor:'white',borderRadius:'20px',margin:'20px',display:"flex",gap:"40px",alignItems:"center"}}>
                 <div>
                    <HiUsers size={50} style={{borderRadius:"100px",color:"white",boxShadow:"1px 1px 15px rgb(132, 88, 179)",backgroundColor:"black",padding:"10px"}}/>
                 </div>
                 <div>
                 <p>Total Number of Users</p>
                  <h5>{location.state.userstat[0]}</h5>
                 </div>
                  
      </div>  
      <div className='noofuser' style={{width:'350px',padding:'20px',backgroundColor:'white',borderRadius:'20px',margin:'20px',display:"flex",gap:"40px",alignItems:"center"}}>
                 <div>
                    <BsCurrencyDollar size={50} style={{borderRadius:"100px",color:"white",boxShadow:"1px 1px 15px rgb(132, 88, 179)",backgroundColor:"black",padding:"10px"}}/>
                 </div>
                 <div>
                 <p>Total Revenue</p>
                  <h5>{location.state.moneystats[0]}</h5>
                 </div>
                  
      </div> 
      <div className='noofuser' style={{width:'400px',padding:'20px',backgroundColor:'white',borderRadius:'20px',margin:'20px',display:"flex",gap:"40px",alignItems:"center"}}>
                 <div>
                    <HiUsers size={50} style={{borderRadius:"100px",color:"white",boxShadow:"1px 1px 15px rgb(132, 88, 179)",backgroundColor:"black",padding:"10px"}}/>
                 </div>
                 <div>
                 <p>Subscription Statastics</p>
                 <h5><span style={{color:"rgb(110, 201, 250)"}}>Basic : {substats[0].Basic}</span> &nbsp;&nbsp;&nbsp; <span style={{color:"rgb(159, 148, 254)"}}>Lite : {substats[0].Lite}</span>&nbsp;&nbsp;&nbsp;<span style={{color:"rgb(247, 145, 81)"}}> Pro : {substats[0].Pro}</span></h5>
                 </div>
                  
      </div> 
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
                  backgroundColor: ['#FF5765', '#E151AF', '#8A6FDF', '#A8E10C'],
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
                backgroundColor: 'orange',
                data: [teststats[0], teststats[1], teststats[2]]
              },
            ],
          }}
          labels="months"
          />  
          </div>

          <div className="Tier13">
            <h5>Subscription Statastics</h5>
            <CChart
                    style={{width: '80%', height: '80%'}}
                    type="polarArea"
                    data={{
                      labels: ['Basic Subscription', 'Lite Subscription', 'Pro Subscription'],
                      datasets: [
                        {
                          data: [substats[0].Basic,substats[0].Lite,substats[0].Pro],
                          backgroundColor: ['#FFCE56', '#E7E9ED', '#36A2EB'],
                        },
                      ],
                    }}
                  />
          </div>
      </div>

      <div className='AdminBody2'>

      <div className='Tier21'>
        <h5>Calender</h5>
        <Calendar/>
      </div>

      <div className='Tier22'>
      <h5>Earning by month</h5>
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