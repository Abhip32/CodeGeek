import { useEffect,useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./componentsUser/Footer";
import NotFoundPage from "./componentsUser/NotFoundPage";
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
import Compiler from "./componentsUser/Compiler";
import CreateTestPreview from "./componentServer/CreateTestPreview";
import Event from "./componentsUser/Event";
import TestPage from "./componentsUser/TestPage";
import GetEventResults from "./componentServer/GetEventResult";
import TestDetails from "./componentServer/TestDetails";
import ForgotPassword from "./componentsUser/ForgotPassword";
import {useNavigate} from "react-router-dom";
import { isLoginCookieValid } from "./utils/loginCookie";


function App() {
  
  const navigate = useNavigate();
  const location = useLocation();
  console.log(window.location.href)

useEffect(() => {
  if(localStorage.getItem('loginCookie')!= null)
  {
      if((location.pathname=="/"||location.pathname=="/Login")&&JSON.parse(localStorage.getItem('loginCookie')).role !="admin")
      {
        navigate("/Home")
      }
      else if((location.pathname=="/"||location.pathname=="/Login")&&JSON.parse(localStorage.getItem('loginCookie')).role =="admin")
      {
        navigate("/AdminHome")
      }
      else
      {
        
      }
  }
  if(localStorage.getItem('loginCookie') == null)
  {
    navigate("/Login")
  }

    
}, []) 




  return (
    <div className="App">
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet"></link>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Home" element={<Main id= "123"/>}/>
      <Route path="/SignUp" element={<SignUp/>} />
      <Route path="/Dashboard/:uid" element={<Dashboard/>} />
      <Route path="/CProgrammingProblems" element={<CProgramming/>} />
      <Route path="/CppProgrammingProblems" element={<CppProgramming/>} />
      <Route path="/JavaProgrammingProblems" element={<JavaProgramming/>} />
      <Route path="/PythonProgrammingProblems" element={<PythonProgramming/>} />
      <Route path="/Compiler" element={<Compiler/>} />
      <Route path="/Certification" element={<Certification/>} />
      <Route path="/Problem/:problemName" element={<Problem title="Problem Title" description="Problem description" language="programming language" expectedOutput="Output"/>} />
      <Route path="/Examination/:TestID" element={<Examination/>} />
      <Route path="/ExamStart/:language" element={<ExamStart/>} />
      <Route path="/ExamEnd" element={<ExamEnd/>} />
      <Route path="/AdminLogin" element={<AdminLogin/>} />
      <Route path="/AdminHome" element={<AdminHome/>} />
      <Route path="/AdminAddQuestion" element={<AdminAddQuestion/>} />
      <Route path="/AdminApproveCertificate" element={<ApproveCertificate/>} />
      <Route path="/AdminHostEvent" element={<AdminHostEvent/>} />
      <Route path="/CreateTestPreview" element={<CreateTestPreview/>} />
      <Route path="/Events" element={<Event/>} />
      <Route path="/TestPage/:TestID" element={<TestPage/>} />
      <Route path="/AdminGetEventResults" element={<GetEventResults/>} />
      <Route path="/AdminTestDetails" element={<TestDetails/>} />
      <Route path="/ForgotPassword" element={<ForgotPassword/>} />
      <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      <Footer/>
  </div>
  );
}

export default App;
