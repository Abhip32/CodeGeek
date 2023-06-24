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
import Loader from "../componentsUser/Loader";

function Login() {
    const [status, setstatus] = useState("");
    const location = useLocation();
    const [Loading,setLoading]=useState(false)
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
        setLoading(true);
        await Axios.post(`http://localhost:8000/adminlogin`, {
            user: document.getElementById("username").value,
            pass: document.getElementById("password").value
        }).then((res) => {
            console.log(res.data);
            if (res.data !="error") {
              setLoginCookieAdmin(res.data.name,"admin",res.data.pic);
              setLoading(false);
                navigate("/AdminHome", {
                    state: {
                        name: res.data.name,
                        pic: res.data.pic,
                    }
                })
            } 
          
            else
            {
                setstatus("Invalid username or password");
                setLoading(false);
            }
        })

    };


    return (
             <Container className="Login-Main">
              {Loading && <Loader/>}
{!Loading && <div >
  <div className="signup-container">
    <div>
    <h1 className="heading-primary">
        Hello <span className="span-blue">Admin</span>
      </h1>
      <p className="text-mute">Enter your credentials to access your account.</p>
      <h4 style={{color:"red"}}>{status}</h4>
    </div>

    <form className="signup-form">
 
      <label className="signIn-inp">
        <span className="input-icon"><AiOutlineMail /></span>
        <input id="username" className="input-text" placeholder="Username" required/>
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
</div>}
</Container>
    )
}

export default Login
