import {React, useState} from 'react'
import "./SignUp.scss";
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import { useNavigate } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import Axios from 'axios';

function Login() {
 const [img, setImg] = useState("");
 const [success, setSuccess] = useState("");
 let navigate = useNavigate();
  function show()
  {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
  let lo="oho"

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(`http://localhost:8000/SignUp`,{
      user: document.getElementById("username").value, pass: document.getElementById("password").value, pic:img, email:document.getElementById("email").value, phoneno: document.getElementById("phoneno").value, bio: document.getElementById("bio").value
  }).then((res)=>
  {
      setSuccess(res.data);
      window. scrollTo(0, 0);
  })
  };
  

  return (
    <div>
      <div className="SignUp">
        <div  className={success =="" ? "NoSuccessCase" : "SuccessCase"}>
            <h3 onClick={() =>  navigate("/Login")}>Successful Sign Up</h3>
          </div>

          <div  className={success =="fail" ? "USuccessCase" : "NoSuccessCase"}>
            <h3>Successful Sign Up</h3>
          </div>

        <form enctype="multipart/form-data">
        <h3>Sign Up</h3>
        <br/>
        <div className='mainblock'>
          <div className='div1'>
            <label for="username">Username</label>
            <input type="text" placeholder="Username" id="username"/>

            <label for="password">Password</label>
            <div className="pass">
            <input type="password" placeholder="Password" id="password" style={{marginBottom: '20px'}}/>
            <input type="checkbox" className="smallerCheckbox" onClick={show} style={{marginTop: '2vh'}}/>
            </div>
            <p>Profile Pic :</p>
            <FileBase64
              multiple={false }
              onDone={({base64}) => setImg(base64)}
              accept="image/*"/>
          </div>

            <label for="email">Email</label>
            <input type="text" placeholder="Email" id="email"/>

            <label for="phoneno">Phone No</label>
    
            <input type="text" placeholder="Phone No" id="phoneno" style={{marginBottom: '20px'}}/>

            <label for="bio">Bio</label>
            <input type="textarea" placeholder="Enter your Bio" id="bio" style={{marginBottom: '20px', height: '30px'}}/>
            
       
        </div>
       
        <br/>
        <button style={{borderRadius: '40px'}} onClick={handleSubmit}>Sign Up</button>
        <br/>
        <br/>
        </form>

        
        
      </div>
    </div>
  )
}

export default Login