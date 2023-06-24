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
import { Card,Row,Col } from 'react-bootstrap';
import {HiUsers} from 'react-icons/hi'
import {BsCurrencyDollar,BsCalendar2Event,BsFillFileCodeFill} from 'react-icons/bs'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AdminHome() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profileImage, setprofileImage] = useState(JSON.parse(localStorage.getItem('loginCookie')).pic);
    const [sidebarVisible, setsidebarVisible] = useState(true);
    const [languagesstats, setlanguagestats] = useState([]);
    const [teststats, setteststats] = useState([]);
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('loginCookie')).username)
    const [userstat,setUserstat]=useState()
    const [message,setMessage]=useState("");
    const [icon,setIcon]=useState("");

   useEffect(()=>{
    greet();
   })

  

  




 

  const greet=() =>{
    var today = new Date(),
    time = today.getHours();
 
    
    

    if(time <=12&&time>=0)
    {
     setMessage( "Good Morning");
     setIcon("https://cdn-icons-png.flaticon.com/512/3892/3892928.png")
    }
    else if(time>=12&&time <=18)
    {
     setMessage( "Good Afternoon");
     setIcon("https://cdn-icons-png.flaticon.com/512/6631/6631558.png")
    }
    else if(time >=18&&time <=19)
    {
     setMessage( "Good Evening");
     setIcon("https://cdn-icons-png.flaticon.com/512/1146/1146886.png")
    }
    else{
     setMessage( "Good Night");
     setIcon("https://cdn-icons-png.flaticon.com/512/1809/1809597.png")
    }
 
  }
  
  
  return (
    <div style={{backgroundColor:"#ffffff"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat}}/>
      <div className='AdminHome'>
      <div className='greet' style={{margin:"20px",display:'flex',alignItems:'center'}}>
        <img style={{width:"70px",height:"70px"}} src={icon}/> 
        <h3 style={{fontWeight:"bolder"}}>{message}</h3>
      </div>
      <Row className='m-5'>
  <Col xs={12} md={4} className="mb-3">
    <div className='noofuser'>
      <div>
        <HiUsers size={50}/>
      </div>
      <div>
        <p>Total Number of Users</p>
        <h5>{userstat}</h5>
      </div>
    </div>  
  </Col>
  <Col xs={12} md={4} className="mb-3">
    <div className='noofuser'>
      <div>
        <BsCalendar2Event size={50}/>
      </div>
      <div>
        <p>Total Number of Events</p>
        <h5>4</h5>
      </div>
    </div>  
  </Col>

  <Col xs={12} md={4} className="mb-3">
    <div className='noofuser'>
      <div>
        <BsFillFileCodeFill size={50}/>
      </div>
      <div>
        <p>No of Languages Available</p>
        <h5>4</h5>
      </div>
    </div>  
  </Col>
</Row>

<Row className='m-5'>
  <Col xs={12} md={4} className="mb-3">
    <div className="noofuser fix">
      <h5>Results of Candidate </h5>
      <CChart
        type="bar"
        data={{
          labels: ['Fail', 'Pass', 'Unfair'],
          datasets: [
            {
              label: 'No. of Users',
              backgroundColor: 'orange',
              data: [2, 3, 1]
            },
          ],
        }}
        labels="months"
      />  
    </div>
  </Col>

  <Col xs={12} md={4} className="mb-3">
    <div className="noofuser fix">            
      <h5>No of Questions </h5>
      <CChart
        id="barchart"
        type="doughnut"
        data={{
          labels: ['C', 'C++', 'Java', 'Python'],
          datasets: [
            {
              backgroundColor: ['#FF5765', '#E151AF', '#8A6FDF', '#A8E10C'],
              data: [3, 2, 1, 1]
            },
          ],
        }}
      />
    </div>
  </Col>

  {/* Add additional components here */}
  <Col xs={12} md={4} className="mb-3">
    <div className="noofuser fix">            
      <h5>Sales </h5>
      <CChart
        type="line"
        data={{
          labels: ['January', 'February', 'March'],
          datasets: [
            {
              label: 'Data Set 1',
              backgroundColor: 'blue',
              data: [10, 15, 8]
            },
            {
              label: 'Data Set 2',
              backgroundColor: 'green',
              data: [5, 12, 9]
            },
          ],
        }}
      />
    </div>
  </Col>

  {/* Add more components as needed */}
</Row>

<Row className='m-5'>
  {/* Add additional rows of components here */}
</Row>

      

    </div>  
  </div>
  )
}

export default AdminHome