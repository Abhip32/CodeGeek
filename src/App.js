import { useEffect,useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./componentsUser/Home";
import Login from "./componentsUser/Login";
import Navbar from "./componentsUser/Navbar";
import Main from "./componentsUser/Main";
import SignUp from "./componentsUser/SignUp";
import Problem from "./componentsUser/Problem";
import CProgramming from "./componentsUser/CProgramming";
import CppProgramming from "./componentsUser/CppProgramming";
import JavaProgramming from "./componentsUser/JavaProgramming";
import PythonProgramming from "./componentsUser/PythonProgramming";
import Dashboard from "./componentsUser/Dashboard";
import Certification from "./componentsUser/Certification";
import Examination from "./componentsUser/Examination";
import ExamStart from "./componentsUser/ExamStart";
import ExamEnd from "./componentsUser/ExamEnd";
import AdminLogin from "./componentServer/AdminLogin";
import SidebarAdmin from "./componentServer/SidebarAdmin";
import AdminAddQuestion from "./componentServer/AdminAddQuestion";
import AdminHome from "./componentServer/AdminHome";
import ApproveCertificate from "./componentServer/ApproveCertificate";
import AdminHostEvent from "./componentServer/AdminHostEvent";

function App() {
  const [type, setType]= useState("Login")
  console.log(window.location.href)
  useEffect(()=>{
    if(window.location.href !== "http://localhost:3000/Login"&&window.location.href !== "http://localhost:3000/"&&window.location.href !== "http://localhost:3000/SignUp"&&window.location.href !=="http://localhost:3000/AdminLogin")
      {
        setType("LoggedIn");
      }

      if(window.location.href.includes("Admin")&&window.location.href!=="http://localhost:3000/AdminLogin")
      {
        if(type=="Login"||type=="LoggedIn")
        {
          setType("LoggedInAdmin");
        } 
        
        
      }
    
}, []) 
  return (
    <div className="App">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet"></link>
    <Router>
      <Navbar type={type}/>
      <Routes>
      <Route path="/" element={<Navbar type="Login"/>&&<Home/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Home" element={<Main id= "123"/>}/>
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/CProgrammingProblems" element={<CProgramming/>} />
      <Route path="/CppProgrammingProblems" element={<CppProgramming/>} />
      <Route path="/JavaProgrammingProblems" element={<JavaProgramming/>} />
      <Route path="/PythonProgrammingProblems" element={<PythonProgramming/>} />
      <Route path="/Certification" element={<Certification/>} />
      <Route path="/Problem" element={<Problem title="Problem Title" description="Problem description" language="programming language" expectedOutput="Output"/>} />
      <Route path="/Examination" element={<Examination/>} />
      <Route path="/ExamStart" element={<ExamStart/>} />
      <Route path="/ExamEnd" element={<ExamEnd/>} />
      <Route path="/AdminLogin" element={<AdminLogin/>} />
      <Route path="/AdminHome" element={<AdminHome/>} />
      <Route path="/AdminAddQuestion" element={<AdminAddQuestion/>} />
      <Route path="/AdminApproveCertificate" element={<ApproveCertificate/>} />
      <Route path="/AdminHostEvent" element={<AdminHostEvent/>} />
      </Routes>
    </Router>
  </div>
  );
}

export default App;
