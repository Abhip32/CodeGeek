import React from 'react'
import "./AdminHome.scss"
import {useLocation,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin'
import Axios from 'axios';
import Table from 'react-bootstrap/Table';

function AdminHostEvent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setprofileImage] = useState(location.state.pic);
  const [sidebarVisible, setsidebarVisible] = useState(true);
  const [languagesstats, setlanguagestats] = useState(location.state.lang);
  const [teststats, setteststats] = useState(location.state.test);
  const [user,setUser]=useState(location.state.name)
  const [userstat,setUserstat]=useState(location.state.userstat)
  const [moneystats,setMoneyState]=useState(location.state.moneystats)
  const [substats, setsubstats] = useState(location.state.substats);
  const [Transactions,setTransaction]=useState([]);


 useEffect(() => {
    Axios.post(`http://localhost:8000/getTransactions`,{

    }).then((res)=>{
      console.log(res.data)
      setTransaction(res.data);
    })
 }, []);
  


  


  
  return (
    <div style={{display:'flex',height:"100vh",width:"98vw",background: "#E2E8F0"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
      <div>
      <h2 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"20px",padding:"20px",margin:"40px",borderRadius:"20px",width:"60vw"}}> Transaction Details</h2>
      <Table striped bordered hover variant="dark" style={{margin:"40px"}}>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Transaction ID</th>
                        <th>Card No</th>
                        <th>Card Holder</th>
                        <th>User ID</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                        </tr>
                    </thead>     
      { Transactions.map((item,index) => 
            (

                   
                    <tbody>
                        <tr>
                        <td>{index}</td>
                        <td>{item._id}</td>
                        <td>{item.cardno}</td>
                        <td>{item.cardhld}</td>
                        <td>{item.userid}</td>
                        <td>{item.date}</td>
                        <td>{item.type}</td>
                        <td>{item.amount}</td>
                        </tr>
                        </tbody>
            )
                    
        )}
        </Table>
      
      </div>
    </div>
  )
}

export default AdminHostEvent