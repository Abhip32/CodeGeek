import React,{useState,useEffect} from 'react'
import {useLocation} from 'react-router-dom';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import NavbarFunction from './Navbar'
import './Main.scss';
import background from '../Assets/background.gif';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import c from '../Assets/c.png'
import cpp from '../Assets/c++.png'
import java from '../Assets/java.ico'
import python from '../Assets/python.png'
import Axios from 'axios';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {FaCrown} from 'react-icons/fa'


function Main(props) {

  const [profileImage, setprofileImage] = useState("");
  const [usersC,setUsersC]=useState([]);
  const [usersCpp,setUsersCpp]=useState([]);
  const [usersjava,setUsersjava]=useState([]);
  const [usersPython,setUsersPython]=useState([]);
  const location = useLocation();
  const [key, setKey] = useState('C');
  let navigate = useNavigate();


  if(usersC.length==0)
  {
    Axios.post(`http://localhost:8000/getPointsInfo`,{
    }).then((res)=>
    {
       setUsersC(res.data) 
       console.log(usersC)
       usersC.sort(function(a, b){
  
            var firstNameA=a.c_points;
            var firstNameB=b.c_points;
  
            if (firstNameA > firstNameB) 
                return -1 
            if (firstNameA < firstNameB)
                return 1
            return 0 //default return value (no sorting)
        })
        
      setUsersCpp(res.data) 
       usersCpp.sort(function(a, b){
  
            var firstNameA=a.cpp_points;
            var firstNameB=b.cpp_points;
  
            if (firstNameA > firstNameB) 
                return -1 
            if (firstNameA < firstNameB)
                return 1
            return 0 //default return value (no sorting)
        })

        setUsersjava(res.data) 
       usersjava.sort(function(a, b){
  
            var firstNameA=a.java_points;
            var firstNameB=b.java_points;
  
            if (firstNameA > firstNameB) 
                return -1 
            if (firstNameA < firstNameB)
                return 1
            return 0 //default return value (no sorting)
        })

        setUsersPython(res.data) 
       usersjava.sort(function(a, b){
  
            var firstNameA=a.python_points;
            var firstNameB=b.python_points;
  
            if (firstNameA > firstNameB) 
                return -1 
            if (firstNameA < firstNameB)
                return 1
            return 0 //default return value (no sorting)
        })
    })

  }



   

 




  return (
    <div className="mainpageback">
      
      <div className="userInfo" style={{backgroundImage: `url("https://livewirecbe.com/assets/images/breadcrumbs/2.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <h1>Hello {location.state.username}</h1>
      <br/>
      <h4>Which language you are going to practice today ?</h4>
      </div>

      <div className="Languages">

      <Row xs={1} md={2} className="g-4">
        <Col>
          <a onClick={() =>  navigate("/CProgrammingProblems", {state:{username: location.state.username}})}>
          <Card className="CardLang" style={{backgroundColor: "#000000"}}>
            <Card.Img variant="top" src={c} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>C Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>

        <Col>
        <a onClick={() =>  navigate("/CppProgrammingProblems", {state:{username: location.state.username}})}>
          <Card className="CardLang" style={{backgroundColor: "#000000"}}>
            <Card.Img variant="top" src={cpp} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>C++ Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>
      
        <Col>
        <a onClick={() =>  navigate("/JavaProgrammingProblems", {state:{username: location.state.username}})}>
          <Card className="CardLang" style={{backgroundColor: "#000000"}}>
            <Card.Img variant="top" src={java} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>Java Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>

        <Col>
       <a onClick={() =>  navigate("/PythonProgrammingProblems", {state:{username: location.state.username}})}>
          <Card className="CardLang" style={{backgroundColor: "#000000"}}>
            <Card.Img variant="top" src={python} style={{width: '150px', height: '160px'}}/>
            <Card.Body>
              <Card.Title>Python Programming</Card.Title>
            </Card.Body>
          </Card>
          </a>
        </Col>
    </Row>
    
      </div>

      <br/>
      <center>
      <div className="userInfo" style={{backgroundImage: `url("https://t4.ftcdn.net/jpg/02/82/97/39/360_F_282973957_08aXxmOWiTTb7rJIWev74zdAGJOvZcgP.jpg")`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
        <br/>       
        <h1>Leaderboard</h1>
        <br/>
      </div>
      <br/>
      <br/>
     
    </center> 
    <div style={{width:'80vw',marginLeft:'auto',marginRight:'auto'}}>
    <Tabs fill
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 gap-10"
      style={{backgroundColor:'black',margin:'0px',padding:'0px'}}
    >
      <Tab eventKey="C" title="C Programming" selected style={{background: "",padding:"0px"}}>
        <div class="ta">
        <div class="card one">
        <div style={{display:"flex",margin:"20px",alignItems:"center",gap:"30px",marginLeft:"auto",marginRight:"auto"}}>
          <img src={c} style={{width:"100px",height:"100px"}}/>
          <h1>C Programming</h1>
        </div>
  <div class="header">
    <i class="arrow fas fa-chevron-left"></i>

    <div>

    </div>
  </div>

  <div class="profile" >
    {usersC.map((item,index) => 
      <div class="person second" style={index+1==2?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"silver"}}/></div>
      <i class="fas fa-caret-up"></i>
      <img src={item.pic} style={{  border: "5px solid silver",boxShadow: "0 0 20px silver"}} alt="" class="photo"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.c_points}</p>
      </div>
    )}

    <div style={{display:"flex"}}>
    
    {usersC.map((item,index) => 
    <div class="person first" style={index+1==1?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"gold"}}/></div>
      <i class="fas fa-crown"></i>
      <img src={item.pic} style={{  border: "5px solid gold",boxShadow: "0 0 20px gold"}} alt="" class="photo main"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.c_points}</p>
    </div>
    )}

    {usersC.map((item,index) => 
    <div class="person third" style={index+1==3?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"#cd7f32"}}/></div>
      <i class="fas fa-caret-up"></i>
      <img src={item.pic} style={{  border: "5px solid #cd7f32",boxShadow: "0 0 20px #cd7f32"}} alt="" class="photo"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.c_points}</p>
    </div>
    )}
  </div>
 
  <div class="rest" style={{marginLeft:"20px",display:"block"}}>
  {usersC.map((item,index) => 
    <div class="others flex" style={index+1>3?{padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
        <div class="rank">
          <i class="fas fa-caret-up"></i>
          <p class="num">{index+1}</p>
        </div>
        <div class="info flex">
          <img src={item.pic} style={{width:"60px",height:"60px"}} alt="" class="p_img"/>
          <p class="link">{item.name}</p>
          <p class="points">{item.c_points}</p>
        </div>
      </div>
    
       )}
  </div>
  </div>
</div>
          
        </div>
    
      </Tab>
      <Tab eventKey="C++" title="C++ Programming">
      <div class="ta">
        <div class="card one">
        <div style={{display:"flex",margin:"20px",alignItems:"center",gap:"30px",marginLeft:"auto",marginRight:"auto"}}>
          <img src={cpp} style={{width:"100px",height:"100px"}}/>
          <h1>C++ Programming</h1>
        </div>
  <div class="header">
    <i class="arrow fas fa-chevron-left"></i>

    <div>

    </div>
  </div>

  <div class="profile" >
    {usersC.map((item,index) => 
      <div class="person second" style={index+1==2?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"silver"}}/></div>
      <i class="fas fa-caret-up"></i>
      <img src={item.pic} style={{  border: "5px solid silver",boxShadow: "0 0 20px silver"}} alt="" class="photo"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.cpp_points}</p>
      </div>
    )}

    <div style={{display:"flex"}}>
    
    {usersC.map((item,index) => 
    <div class="person first" style={index+1==1?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"gold"}}/></div>
      <i class="fas fa-crown"></i>
      <img src={item.pic} style={{  border: "5px solid gold",boxShadow: "0 0 20px gold"}} alt="" class="photo main"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.cpp_points}</p>
    </div>
    )}

    {usersC.map((item,index) => 
    <div class="person third" style={index+1==3?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"#cd7f32"}}/></div>
      <i class="fas fa-caret-up"></i>
      <img src={item.pic} style={{  border: "5px solid #cd7f32",boxShadow: "0 0 20px #cd7f32"}} alt="" class="photo"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.cpp_points}</p>
    </div>
    )}
  </div>
 
  <div class="rest" style={{marginLeft:"20px",display:"block"}}>
  {usersC.map((item,index) => 
    <div class="others flex" style={index+1>3?{padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
        <div class="rank">
          <i class="fas fa-caret-up"></i>
          <p class="num">{index+1}</p>
        </div>
        <div class="info flex">
          <img src={item.pic} style={{width:"60px",height:"60px"}} alt="" class="p_img"/>
          <p class="link">{item.name}</p>
          <p class="points">{item.cpp_points}</p>
        </div>
      </div>
    
       )}
  </div>
  </div>
</div>
          
        </div>
   
      </Tab>
      <Tab eventKey="Java" title="Java Programming">
      <div class="ta">
        <div class="card one">
        <div style={{display:"flex",margin:"20px",alignItems:"center",gap:"30px",marginLeft:"auto",marginRight:"auto"}}>
          <img src={java} style={{width:"100px",height:"100px"}}/>
          <h1>Java Programming</h1>
        </div>
  <div class="header">
    <i class="arrow fas fa-chevron-left"></i>

    <div>

    </div>
  </div>

  <div class="profile" >
    {usersC.map((item,index) => 
      <div class="person second" style={index+1==2?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"silver"}}/></div>
      <i class="fas fa-caret-up"></i>
      <img src={item.pic} style={{  border: "5px solid silver",boxShadow: "0 0 20px silver"}} alt="" class="photo"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.java_points}</p>
      </div>
    )}

    <div style={{display:"flex"}}>
    
    {usersC.map((item,index) => 
    <div class="person first" style={index+1==1?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"gold"}}/></div>
      <i class="fas fa-crown"></i>
      <img src={item.pic} style={{  border: "5px solid gold",boxShadow: "0 0 20px gold"}} alt="" class="photo main"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.java_points}</p>
    </div>
    )}

    {usersC.map((item,index) => 
    <div class="person third" style={index+1==3?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"#cd7f32"}}/></div>
      <i class="fas fa-caret-up"></i>
      <img src={item.pic} style={{  border: "5px solid #cd7f32",boxShadow: "0 0 20px #cd7f32"}} alt="" class="photo"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.java_points}</p>
    </div>
    )}
  </div>
 
  <div class="rest" style={{marginLeft:"20px",display:"block"}}>
  {usersC.map((item,index) => 
    <div class="others flex" style={index+1>3?{padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
        <div class="rank">
          <i class="fas fa-caret-up"></i>
          <p class="num">{index+1}</p>
        </div>
        <div class="info flex">
          <img src={item.pic} style={{width:"60px",height:"60px"}} alt="" class="p_img"/>
          <p class="link">{item.name}</p>
          <p class="points">{item.java_points}</p>
        </div>
      </div>
    
       )}
  </div>
  </div>
</div>
          
        </div>
   
      </Tab>

      <Tab eventKey="Python" title="Python Programming">
      <div class="ta">
        <div class="card one">
        <div style={{display:"flex",margin:"20px",alignItems:"center",gap:"30px",marginLeft:"auto",marginRight:"auto"}}>
          <img src={python} style={{width:"100px",height:"100px"}}/>
          <h1>Python Programming</h1>
        </div>
  <div class="header">
    <i class="arrow fas fa-chevron-left"></i>

    <div>

    </div>
  </div>

  <div class="profile" >
    {usersC.map((item,index) => 
      <div class="person second" style={index+1==2?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"silver"}}/></div>
      <i class="fas fa-caret-up"></i>
      <img src={item.pic} style={{  border: "5px solid silver",boxShadow: "0 0 20px silver"}} alt="" class="photo"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.python_points}</p>
      </div>
    )}

    <div style={{display:"flex"}}>
    
    {usersC.map((item,index) => 
    <div class="person first" style={index+1==1?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"gold"}}/></div>
      <i class="fas fa-crown"></i>
      <img src={item.pic} style={{  border: "5px solid gold",boxShadow: "0 0 20px gold"}} alt="" class="photo main"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.python_points}</p>
    </div>
    )}

    {usersC.map((item,index) => 
    <div class="person third" style={index+1==3?{display:'flex',alignItem:'center',gap:"20px",padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
      <div class="num"><FaCrown size={40} style={{color:"#cd7f32"}}/></div>
      <i class="fas fa-caret-up"></i>
      <img src={item.pic} style={{  border: "5px solid #cd7f32",boxShadow: "0 0 20px #cd7f32"}} alt="" class="photo"/>
      <p class="link">{item.name}</p>
      <p class="points">{item.python_points}</p>
    </div>
    )}
  </div>
 
  <div class="rest" style={{marginLeft:"20px",display:"block"}}>
  {usersC.map((item,index) => 
    <div class="others flex" style={index+1>3?{padding:"10px",borderRadius:"100px",padding:"20px",margin:"10px"}:{display:'none'}}>
        <div class="rank">
          <i class="fas fa-caret-up"></i>
          <p class="num">{index+1}</p>
        </div>
        <div class="info flex">
          <img src={item.pic} style={{width:"60px",height:"60px"}} alt="" class="p_img"/>
          <p class="link">{item.name}</p>
          <p class="points">{item.python_points}</p>
        </div>
      </div>
    
       )}
  </div>
  </div>
</div>
          
        </div>
        
      </Tab>
    </Tabs>
    <br/>
    <br/>
    <br/>
    </div>

   

    
      </div>
  )
}

export default Main