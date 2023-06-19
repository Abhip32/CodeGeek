import {useLocation, useNavigate} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai"
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import Axios from "axios";
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import "./AdminLogin.scss"
import { setLoginCookieAdmin } from "../utils/loginCookie";

function Login() {
    const [status, setstatus] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [profileImage, setprofileImage] = useState("");
    const [sidebarVisible, setsidebarVisible] = useState(true);
    const [languagesstats, setlanguagestats] = useState([]);
    const [teststats, setteststats] = useState([]);
    const [moneystats, setmoneystats] = useState([]);
    const [substats, setsubstats] = useState([]);
    const [user, setUser] = useState([])
    const [icon, setIcon] = useState("hide");

    function showpass() {
        console.log("show pass");
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            setIcon("hide")
        } else {
            x.type = "password";
            setIcon("show")
        }
    }

    


    async function handleSubmit(event,callback) {
        event.preventDefault();
        setstatus("wait")

         await Axios.post(`http://localhost:8000/usersData`).then((res) => {
              user.push(res.data.users);
              console.log(user);
          })
      
      
          await Axios.post(`http://localhost:8000/getpiedata`).then((res) => {
              languagesstats.push(res.data);
              console.log(languagesstats);
          })

          await Axios.post(`http://localhost:8000/testdata`).then((res) => {
            teststats.push(res.data);
            console.log(languagesstats);
        })





        await Axios.post(`http://localhost:8000/adminlogin`, {
            user: document.getElementById("username").value,
            pass: document.getElementById("password").value
        }).then((res) => {
            console.log(res.data._id);
            if (res.data._id!=undefined&&languagesstats.length > 0) {
              setLoginCookieAdmin(res.data.name,"admin",res.data.pic,languagesstats[0],teststats[0],user);
                navigate("/AdminHome", {
                    state: {
                        name: res.data.name,
                        pic: res.data.pic,
                        lang: languagesstats[0],
                        test: teststats[0],
                        userstat: user,
                    }
                })
                window.location.reload(false);
            } 
            else if(res.data._id!=undefined&&languagesstats.length==0) 
            {
                setstatus("Wait");
                if(languagesstats[0]!=0) {
                    handleSubmit(event);
                }
                else
                {
                  setLoginCookieAdmin(res.data.name,"admin");
                    navigate("/AdminHome", {
                        state: {
                            name: res.data.name,
                            pic: res.data.pic,
                            lang: languagesstats,
                            test: teststats,
                            userstat: user,
                            moneystats: moneystats
                        }
                    })
                    window.location.reload(false);
                }
                
            }
            else
            {
                setstatus("Invalid username or password");
            }
        })


        /*let data = { user: document.getElementById("username").value, pass: document.getElementById("password").value };
    fetch("http://localhost:8000/adminlogin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => 
      {
        if(res.status === 200)
        {
          navigate("/AdminHome", {state:{name: data.user,pic:data.pic,lang:languagesstats,test:teststats}})
        }
        if(res.status === 404 )
        {
          setstatus("Invalid username or password");
        }

      })
      .then((result) => {
       
      });*/
    };


    return (
             <Container className="Login-Main">
<div >
  <div className="signup-container">
    <div>
    <h1 className="heading-primary">
        Hello <span className="span-blue">Admin</span>
      </h1>
      <p className="text-mute">Enter your credentials to access your account.</p>
    </div>

    <form className="signup-form">
 
      <label className="signIn-inp">
        <span className="input-icon"><AiOutlineMail /></span>
        <input type="email" id="username" className="input-text" placeholder="Username" required/>
      </label>
      <label className="signIn-inp">
        <span className="input-icon input-icon-password" data-password>
          <div style={icon === "hide" ? { display: "block" } : { display: "none" }}>
            <FaEyeSlash onClick={() => showpass()} />
          </div>
          <div style={icon === "show" ? { display: "block" } : { display: "none" }}>
            <FaEye onClick={() => showpass()} />
          </div>
        </span>
        <input type="password" className="input-text" placeholder="Password" id="password" required/>
      </label>
      <a className="LoginLink" href="/ForgotPassword">Forgot Password?</a>
      <button className="Login-btn btn-login" onClick={handleSubmit}>Login</button>

    </form>
  </div>
</div>
</Container>
    )
}

export default Login
