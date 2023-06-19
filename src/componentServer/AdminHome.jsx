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
import {BsCurrencyDollar,BsCalendar2Event} from 'react-icons/bs'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AdminHome() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profileImage, setprofileImage] = useState(JSON.parse(localStorage.getItem('loginCookie')).pic);
    const [sidebarVisible, setsidebarVisible] = useState(true);
    const [languagesstats, setlanguagestats] = useState(JSON.parse(localStorage.getItem('loginCookie')).langstats);
    const [teststats, setteststats] = useState(JSON.parse(localStorage.getItem('loginCookie')).teststats);
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('loginCookie')).username)
    const [userstat,setUserstat]=useState(JSON.parse(localStorage.getItem('loginCookie')).user)

  




 

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
    <div style={{backgroundColor:"#ffffff"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat}}/>
      <div className='AdminHome'>
      {greet()}
      <Row className='m-5'>
        <Col xs={12} md={6} className="mb-3">
          <div className='noofuser'>
                  <div>
                      <HiUsers size={50}/>
                  </div>
                  <div>
                  <p>Total Number of Users</p>
                    <h5>{userstat[0]}</h5>
                  </div>
            </div>  
        </Col>
        <Col xs={12} md={6} className="mb-3">
          <div className='noofuser'>
                  <div>
                      <BsCalendar2Event size={50}/>
                  </div>
                  <div>
                  <p>Total Number of Events</p>
                    <h5>{teststats[3]}</h5>
                  </div>
            </div>  
        </Col>
      
      </Row>

      <Row className='m-5'>
      <Col xs={12} md={6} className="mb-3">
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
                data: [teststats[0], teststats[1], teststats[2]]
              },
            ],
          }}
          labels="months"
          />  
          </div>
          </Col>

      <Col xs={12} md={6} className="mb-3">
            <div className="noofuser fix">            
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
          </Col>
      </Row>
      

    </div>  
  </div>
  )
}

export default AdminHome