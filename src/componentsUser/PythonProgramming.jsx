import React from 'react'
import './CProgramming.scss'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Axios from 'axios';
import {useState, useEffect} from 'react';

function PythonProgramming() {
  const [id,setid]=useState("");
  const [problemsc,setProblemsc]=useState([]);

	useEffect(()=>{

		Axios.post(`http://localhost:8000/getUserInfoall`,{
        user: location.state.username
      }).then((res)=>
      {
        setid(res.data.id);    
        Axios.post(`http://localhost:8000/getPythonProblems`,{
          id: id
          }).then((res)=>
          {
             setProblemsc(res.data);
          })
      })
		
	}, []) 


  const location = useLocation();
  let navigate = useNavigate();;
  return (
    <div className="languagePage">
      <button className="backC" onClick={() =>  navigate("/home", {state:{username: location.state.username}})}>Go Back</button>
      <div className="headingC">
      <img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200711122552/Python-Programming-Language.png" width="768px" height="256px"  alt="cover"/>
       <div className="contentC">
       <h3>Python Programming Language</h3>
       <p>Python is a popular general-purpose programming language. It is used in machine learning, web development, desktop applications, and many other fields. Fortunately for beginners, Python has a simple, easy-to-use syntax. This makes Python a great language to learn for beginners.</p>
       </div>
      </div>

      <div className="problemsC">
      { problemsc.map((item,index) => 
       (
        <Card ngfor="data in problemsC">
            <Card.Header className={item.level.replace(" ","")}>{item.level}</Card.Header>
            <Card.Body>
            <Card.Title>{item.title}</Card.Title>
              <Card.Text>
                {item.description}
              </Card.Text>
              {item.solved.includes(id) &&
                <h6 id="status" style={{color: "green"}}>
                  Solved
                </h6>
              } 
               {!item.solved.includes(id) &&
                <h6 id="status" style={{color: "red"}}>
                  Unsolved
                </h6>
              } 
            <Button variant="primary" onClick={ () => navigate("/problem", {state:{title: item.title, description: item.description, language: item.language, expectedOutput: item.expectedoutput, username:location.state.username, userid:id, identi: item.identifier,status:document.getElementById("status").innerHTML ,origin:"/PythonProgrammingProblems"}})}>Solve</Button>
            </Card.Body>
          </Card>
       ))}
          
      </div>
    </div>
  )
}

export default PythonProgramming