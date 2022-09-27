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

  Axios.post(`http://localhost:8000/AdminPendingCcerti`,{
    }).then((res)=>
    {
        setc(res.data)
        console.log(c);
    }) 

    Axios.post(`http://localhost:8000/AdminPendingCppcerti`,{
    }).then((res)=>
    {
        setcpp(res.data)
    }) 

    Axios.post(`http://localhost:8000/AdminPendingJavacerti`,{
    }).then((res)=>
    {
        setjava(res.data)
    }) 

    Axios.post(`http://localhost:8000/AdminPendingPythoncerti`,{
    }).then((res)=>
    {
        setpython(res.data)
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
          }) 
        )
      }

      const reject =(id,lang,name,date) =>{
        Axios.post(`http://localhost:8000/AdminApprove`,{
          id:id,
          lang:lang,
          result: "Rejected"
        }).then((res)=>
        {

        }).then(window.location.reload(false))
      }


  return (
    <div style={{display:"flex",background: "#E2E8F0"}} className='ApproveCertificate'>
        <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
        <div className='dataTest'>
        <h2 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",margin:"40px",borderRadius:"20px",width:"60vw"}}><GrCertificate/> Approve Certificates</h2>
          <div className='languageSection'>
            <h3 class="LangCerti"> <img src={ci} style={{width:"50px",height:"50px"}}/> C Programming</h3>
            <div className='NoData' style={c.length==0?{display:"block"}:{display:"none"}}>
                {c.length == 0 &&<h3>No Data</h3>}
            </div>
              <br/>
              { c.map((item,index) => (
                  <div>
                    <h4>{item.name}</h4>
                    <img src={item.pic}/>
                  </div>
                  
                  &&Testdata.map((item1,index) => (
                    <div className='ApproveCard' style={item1.id==item._id ? {display:"block"}:{display:"none"}}>
                      {
                        item1.id==item._id&&item1.language=="c"&&item._id!=undefined&&<div style={{display:"flex",alignItems:"center",gap:"100px"}}>
                          <div >
                          <img src={item.pic} style={{width:"100px",height:"100px",borderRadius:"100px"}}/>
                          <h4>Name : {item1.name}</h4>
                          <h4>ID : {item1._id}</h4>
                          <h4>Date : {item1.date}</h4>
                          <h4>Case : {item1.case}</h4>
                          <h4>Language : {item1.language}</h4>
                          </div>
                            <div>
                            <button className='Approve' onClick={()=>{approve(item._id,item1.language,item1.name,item1.date)}}>Approve</button>
                          <button className='Reject' onClick={()=>{reject(item._id,item1.language,item1.name,item1.date)}}>Reject</button>

                            </div>
                         
                         
                        </div>
                        
                      }
                      
                    </div>
                  ))
                  
              ))
              }
              
            </div>
            
            <div className='languageSection'>
            <h3 class="LangCerti"><img src={cppi} style={{width:"50px",height:"50px"}}/> Cpp Programming</h3>
            <div className='NoData' style={cpp.length==0?{display:"block"}:{display:"none"}}>
                {cpp.length == 0 && <h3>No Data </h3>}
            </div>
              <br/>
              { cpp.map((item,index) => (
                  <div>
                    <h4>{item.name}</h4>
                    <img src={item.pic}/>
                  </div>
                  
                  &&Testdata.map((item1,index) => (
                    <div className='ApproveCard'>
                      {
                        item1.id==item._id&&item1.language=="cpp"&&
                        <div style={{display:"flex",alignItems:"center",gap:"100px"}}>
                          <div>
                          <img src={item.pic} style={{width:"100px",height:"100px",borderRadius:"100px"}}/>
                          <h4>Name : {item1.name}</h4>
                          <h4>Name : {item1.name}</h4>
                          <h4>ID : {item1._id}</h4>
                          <h4>Date : {item1.date}</h4>
                          <h4>Case : {item1.case}</h4>
                          <h4>Language : {item1.language}</h4>
                          </div>
                          <div>
                          <button className='Approve' onClick={()=>{approve(item._id,item1.language,item1.name,item1.date)}}>Approve</button>
                          <button className='Reject' onClick={()=>{reject(item._id,item1.language,item1.name,item1.date)}}>Reject</button>
                          </div>
                          
                         
                        </div>
                      }
                        
                    </div>
                  ))
              ))
              }
       
            </div>


            <div className='languageSection'>
            <h3 class="LangCerti"><img src={pythoni} style={{width:"50px",height:"50px"}}/> Python Programming</h3>
            <div className='NoData' style={python.length==0?{display:"block"}:{display:"none"}}>
                {python.length == 0 && <h3>No Data </h3>}
            </div>
              <br/>
              { python.map((item,index) => (
                  <div>
                    <h4>{item.name}</h4>
                    <img src={item.pic}/>
                  </div>
                  
                  &&Testdata.map((item1,index) => (
                    <div className='ApproveCard'>
                      {
                        item1.id==item._id&&item1.language=="python3"&&<div style={{display:"flex",alignItems:"center",gap:"100px"}}>
                          <div>
                          <img src={item.pic} style={{width:"100px",height:"100px",borderRadius:"100px"}}/>
                          <h4>Name : {item1.name}</h4>
                          <h4>Name : {item1.name}</h4>
                          <h4>ID : {item1._id}</h4>
                          <h4>Date : {item1.date}</h4>
                          <h4>Case : {item1.case}</h4>
                          <h4>Language : {item1.language}</h4>
                          </div>
                          <div>
                          <button className='Approve' onClick={()=>{approve(item._id,item1.language,item1.name,item1.date)}}>Approve</button>
                          <button className='Reject' onClick={()=>{reject(item._id,item1.language,item1.name,item1.date)}}>Reject</button>
                          </div>
                        
                        </div>
                      }
                    </div>
                  ))
              ))
              }
        
            </div>


            <div className='languageSection'>
            <h3 class="LangCerti"><img src={javai} style={{width:"50px",height:"50px"}}/> Java Programming</h3>
              <br/>
              <div className='NoData' style={java.length==0?{display:"block"}:{display:"none"}}>
                {java.length == 0 && <h3>No Data </h3>}
            </div>
              { java.map((item,index) => (
                  <div>
                    <h4>{item.name}</h4>
                    <img src={item.pic}/>
                  </div>

                  
                  &&Testdata.map((item1,index) => (
                    <div className='ApproveCard'>
                      {
                        item1.id==item._id&&item1.language=="java"&&
                        <div style={{display:"flex",alignItems:"center",gap:"100px"}}>
                          <div>
                          <img src={item.pic} style={{width:"100px",height:"100px",borderRadius:"100px"}}/>
                          <h4>Name : {item1.name}</h4>
                          <h4>Name : {item1.name}</h4>
                          <h4>ID : {item1._id}</h4>
                          <h4>Date : {item1.date}</h4>
                          <h4>Case : {item1.case}</h4>
                          <h4>Language : {item1.language}</h4>
                          </div>
                          <div>
                          <button className='Approve' onClick={()=>{approve(item._id,item1.language,item1.name,item1.date)}}>Approve</button>
                          <button className='Reject' onClick={()=>{reject(item._id,item1.language,item1.name,item1.date)}}>Reject</button>
                          </div>
                          
                          
                        </div>
                      }
                    </div>
                    
                  ))
              ))
              }
            </div>

       
        
        </div>
        
    </div>
  )
}

export default ApproveCertificate