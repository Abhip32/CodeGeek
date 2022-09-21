import React,{useState,useEffect} from 'react'
import './CProgramming.scss'
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';

function CppProgramming() {
  const [id,setid]=useState("");
  const [problemsc,setProblemsc]=useState([]);

	useEffect(()=>{

		Axios.post(`http://localhost:8000/getUserInfoAll`,{
        user: location.state.username
      }).then((res)=>
      {
        setid(res.data.id);    
        Axios.post(`http://localhost:8000/getCProblems`,{
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
      <img src="https://www.geeksforgeeks.org/wp-content/uploads/Clanguage-768x256.png" alt="cover"/>
       <div className="contentC">
       <h3>C Programming Language</h3>
        <p>
        C is a powerful general-purpose programming language. It can be used to develop software like operating systems, databases, compilers, and so on. C programming is an excellent language to learn to program for beginners.
        </p>
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
            <Button variant="primary" onClick={ () => navigate("/problem", {state:{title: item.title, description: item.description, language: item.language, expectedOutput: item.expectedoutput, username:location.state.username, userid:id, identi: item.identifier,status:document.getElementById("status").innerHTML,origin:"/CProgrammingProblems"}})}>Solve</Button>
            </Card.Body>
          </Card>
       ))}
          
      </div>
    </div>
  )
}

export default CppProgramming