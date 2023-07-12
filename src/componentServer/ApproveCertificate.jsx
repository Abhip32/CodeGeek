import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin'
import Axios from 'axios';
import { jsPDF } from "jspdf";
import base64 from 'react-native-base64'
import "./ApproveCertificate.scss"
import ci from '../Assets/c.png'
import cppi from '../Assets/c++.png'
import javai from '../Assets/java.ico'
import pythoni from '../Assets/python.png'
import {GrCertificate} from 'react-icons/gr'
import {Row,Col} from 'react-bootstrap'

function ApproveCertificate() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profileImage, setprofileImage] = useState(location.state.pic);
    const [languagesstats, setlanguagestats] = useState(location.state.lang);
    const [teststats, setteststats] = useState(location.state.test);
    const [user,setUser]=useState(location.state.name)
    const [userstat,setUserstat]=useState(location.state.userstat)
    const [moneystats,setMoneyState]=useState(location.state.moneystats)
    const [substats, setsubstats] = useState(location.state.substats);
    var i=0;

    const [c,setc]=useState([]);
    const [cpp,setcpp]=useState([]);
    const [java,setjava]=useState([]);
    const [python,setpython]=useState([]);
    const [Testdata,setTestdata]=useState([]);
    const [reloadCount,setreloadCount]=useState(0);




   useEffect(()=>{
    Axios.post(`http://localhost:8000/getTestData`,{
    }).then((res)=>
    {
        setTestdata(res.data);
    }) 

   },[])

   const getBase64 = file => {
    return new Promise(resolve => {
      let fileInfo;
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        console.log("Called", reader);
        baseURL = reader.result;
        console.log(baseURL);
        resolve(baseURL);
      };
      console.log(fileInfo);
    });
  };

      var approve =(id,lang,name,date) =>{
        console.log(id,lang)
                    
    
        Axios.post(`http://localhost:8000/AdminApprove`,{
          id:id,
          lang:lang,
          date:date,
          name:name,
          result: "Approved"
        }).then(
          Axios.post(`http://localhost:8000/getTestData`,{
          }).then((res)=>
          {
            setTestdata(res.data);
          }).then(window.location.reload(false))
        )

        alert(`Certificate Approved id : ${id}`)
      }

      const reject =(id,lang,name,date) =>{
        Axios.post(`http://localhost:8000/AdminApprove`,{
          id:id,
          lang:lang,
          name:name,
          result: "Rejected"
        }).then((res)=>
        {

        }).then(window.location.reload(false))
        
        alert(`Certificate Rejected id : ${id}`)
      }


  return (
    <div style={{background: "#E2E8F0",minHeight:"100vh"}} className='ApproveCertificate'>
        <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
        <div className='dataTest' style={{padding:"20px"}}>
        <h2 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",margin:"2vh",borderRadius:"20px",width:"95%"}}><GrCertificate/> Approve Certificates</h2>
          <div className='languageSection'>
            <div className='NoData' style={Testdata.length==0?{display:"block"}:{display:"none"}}>
                {Testdata.length == 0 &&<h3>No Data</h3>}
            </div>
              <br/>
              { Testdata.map((item,index) => (
                <div>
                      {
                        <Row className='ApproveCard' style={{marginLeft:"0.9vh"}} >
                        <Col md={10}>
                          <h4>Name : {item.name}</h4>
                          <h4>ID : {item._id}</h4>
                          <h4>Date : {item.date}</h4>
                          <h4>Case : {item.case}</h4>
                          <h4>Language : {item.language}</h4>
                          </Col>
                            <Col md={2}>
                            <button className='Approve' onClick={()=>{approve(item.email,item.language,item.name,item.date)}}>Approve</button>
                          <button className='Reject' onClick={()=>{reject(item.email,item.language,item.name,item.date)}}>Reject</button>

                            </Col>    
                            </Row>                    
                      }
                      
                    </div>
                  ))
                  
              }
              
            </div>
            

       
        
        </div>
        
    </div>
  )
}

export default ApproveCertificate