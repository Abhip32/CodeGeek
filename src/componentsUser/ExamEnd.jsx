import React from 'react'
import { useEffect,useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import "./ExamEnd.scss";
import BongoCat from "../Assets/BongoCat.gif"

function ExamEnd() {
  const location = useLocation();
  let navigate = useNavigate();

  const goHome=()=>{
    navigate("/Home",{state:{username: location.state.username}})
    window.location.reload(true)
  }
  
  return (
    <div className='ExamEndScreen'>
      <div className="successTestMessage">
        <h1>Thank You for taking this exam.<br/> 
        Your test has completed successfully<br/>
        soon you will know about your results<br/><br/>
        Happy Coding !!
        </h1>
        
        <br/>
        <button className="successTestButton"  onClick={() =>goHome()}>Go Back To Home</button>
      </div>
      <div className="CodingCat">
        <img src={BongoCat}/>
      </div>
    </div>

  )
}

export default ExamEnd