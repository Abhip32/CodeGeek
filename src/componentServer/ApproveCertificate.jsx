import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin'
import Axios from 'axios';
import { jsPDF } from "jspdf";
import base64 from 'react-native-base64'

function ApproveCertificate() {
    const location = useLocation();
    const navigate = useNavigate();
    const [profileImage, setprofileImage] = useState(location.state.pic);
    const [languagesstats, setlanguagestats] = useState(location.state.lang);
    const [teststats, setteststats] = useState(location.state.test);
    const [user,setUser]=useState(location.state.name)
    const [userstat,setUserstat]=useState(location.state.userstat)
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
        console.log(c.length)
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
        }).then()
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
    <div style={{display:"flex"}}>
        <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat}}/>
        <div className='dataTest'>
          <div>
            <h1>C Programming</h1>
            <div>
                {c.length == 0 &&<h2>No Data</h2>}
            </div>
              <br/>
              { c.map((item,index) => (
                  <div>
                    <h4>{item.name}</h4>
                    <img src={item.pic}/>
                  </div>
                  
                  &&Testdata.map((item1,index) => (
                    <div>
                     
                      {
                        item1.id==item._id&&item1.language=="c"&&<h1>
                          <h4>Name : {item1.name}</h4>
                          <h4>ID : {item1._id}</h4>
                          <h4>Date : {item1.date}</h4>
                          <h4>Case : {item1.case}</h4>
                          <h4>Language : {item1.language}</h4>
                          <button onClick={()=>{approve(item._id,item1.language,item1.name,item1.date)}}>Approve</button>
                          <button onClick={()=>{reject(item._id,item1.language,item1.name,item1.date)}}>Reject</button>
                        </h1>
                        
                      }
                      
                    </div>
                  ))
                  
              ))
              }
              
            </div>
            
            <div>
            <h1>Cpp Programming</h1>
            <div>
                {cpp.length == 0 && <h2>No Data</h2>}
            </div>
              <br/>
              { cpp.map((item,index) => (
                  <div>
                    <h4>{item.name}</h4>
                    <img src={item.pic}/>
                  </div>
                  
                  &&Testdata.map((item1,index) => (
                    <div>
                      {
                        item1.id==item._id&&item1.language=="cpp"&&<h1>
                          <h4>Name : {item1.name}</h4>
                          <h4>ID : {item1._id}</h4>
                          <h4>Date : {item1.date}</h4>
                          <h4>Case : {item1.case}</h4>
                          <h4>Language : {item1.language}</h4>
                          <button onClick={()=>{approve(item._id,item1.language,item1.name,item1.date)}}>Approve</button>
                          <button onClick={()=>{reject(item._id,item1.language,item1.name,item1.date)}}>Reject</button>
                        </h1>
                      }
                        
                    </div>
                  ))
              ))
              }
       
            </div>


            <div>
            <h1>Python Programming</h1>
            <div>
                {python.length == 0 && <h2>No Data</h2>}
            </div>
              <br/>
              { python.map((item,index) => (
                  <div>
                    <h4>{item.name}</h4>
                    <img src={item.pic}/>
                  </div>
                  
                  &&Testdata.map((item1,index) => (
                    <div>
                      {
                        item1.id==item._id&&item1.language=="python3"&&<h1>
                          <h4>Name : {item1.name}</h4>
                          <h4>ID : {item1._id}</h4>
                          <h4>Date : {item1.date}</h4>
                          <h4>Case : {item1.case}</h4>
                          <h4>Language : {item1.language}</h4>
                          <button onClick={()=>{approve(item._id,item1.language,item1.name,item1.date)}}>Approve</button>
                          <button onClick={()=>{reject(item._id,item1.language,item1.name,item1.date)}}>Reject</button>
                        </h1>
                      }
                    </div>
                  ))
              ))
              }
        
            </div>


            <div>
            <h1>Java Programming</h1>
              <br/>
              <div>
                {java.length == 0 && <h2>No Data</h2>}
            </div>
              { java.map((item,index) => (
                  <div>
                    <h4>{item.name}</h4>
                    <img src={item.pic}/>
                  </div>

                  
                  &&Testdata.map((item1,index) => (
                    <div>
                      {
                        item1.id==item._id&&item1.language=="java"&&<h1>
                          <h4>Name : {item1.name}</h4>
                          <h4>ID : {item1._id}</h4>
                          <h4>Date : {item1.date}</h4>
                          <h4>Case : {item1.case}</h4>
                          <h4>Language : {item1.language}</h4>
                          <button onClick={()=>{approve(item._id,item1.language,item1.name,item1.date)}}>Approve</button>
                          <button onClick={()=>{reject(item._id,item1.language,item1.name,item1.date)}}>Reject</button>
                        </h1>
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