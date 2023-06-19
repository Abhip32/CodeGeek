import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';
import SidebarAdmin from './SidebarAdmin'
import Axios from 'axios';
import CardItem from '../componentsUser/CardItem';
import {Row,Col} from 'react-bootstrap'
 

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
    <div style={{height:"100%",color:"white",background: "#E2E8F0"}}>
      <SidebarAdmin name={{user:user,pic:profileImage,lang:languagesstats,test:teststats,userstat:userstat,moneystats:moneystats,substats:substats}}/>
      <div>
      <h2 style={{fontWeight: "900",color:"black",backgroundColor:"white",marginBottom:"10px",padding:"2vh",margin:"4vh",borderRadius:"20px",width:"90%"}}>Update Plans</h2>
      <Row className="m-1">
      { plans.map((item,index) => 
            (
              <Col xs={12} md={4} className="mb-3">
                <CardItem objProp={{
                    level: item.level,
                    applyGradient: item.applyGradient,
                    duration: item.duration,
                    price: item.price,
                    para1: item.para1,
                    para2: item.para2,
                    btnDark: item.btnDark,
                    tick: item.tick,
                    type: "Admin"
                  }}/>
                  </Col>
            ))}
      </Row>
      </div>
      
    </div>
  )
}

export default AdminPlan