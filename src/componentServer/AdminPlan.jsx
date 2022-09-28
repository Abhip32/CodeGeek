import React from 'react'
import "./AdminHome.scss"
import {useLocation,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin'
import Axios from 'axios';
import CardItem from '../componentsUser/CardItem';


function AdminPlan() {
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
  const [plans,setPlans]=useState([]);

  useEffect(() => {
    Axios.post(`http://localhost:8000/getPlans`,{

    }).then((res)=>{
      console.log(res.data)
      setPlans(res.data);
    })
 }, []);
  
  
  


  
  return (
    <div style={{display:'flex',height:"100vh",width:"98vw"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
      <div style={{padding:"20px", display:"flex"}}>
      { plans.map((item,index) => 
            (
                <CardItem objProp={{
                    level: item.level,
                    applyGradient: item.applyGradient,
                    price: item.price,
                    para1: item.para1,
                    para2: item.para2,
                    btnDark: item.btnDark,
                    tick: item.tick,
                  }}/>
            ))}
      </div>
    </div>
  )
}

export default AdminPlan