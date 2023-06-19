import {useLocation, useNavigate} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai"
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import Axios from "axios";


function ForgotPassword() {
    const [status, setstatus] = useState("");
    const [icon, setIcon] = useState("hide");
    const [link, setLink] = useState("");
    const [otp,setOtp] = useState("");
    const [user,setUser]= useState("");
    const [authtic,setAuthentc]=useState(false)
    const [show, setShow] = useState(false);
    const location = useLocation();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let navigate = useNavigate();

    const getotp = (e)=>{
        e.preventDefault();
        Axios.post(`http://localhost:8000/Otp`, {
            email:document.getElementById("email").value
        }).then((res) => {
            if(res.data!="Error")
            {
                setOtp(res.data.val);
                setUser(res.data.user);
            }
            if(res.data=="Error")
            {
                setstatus("Email Not Registered with any account"); 
                setShow(true);
            }
        })

    }

    const submitotp=(e)=>{
        e.preventDefault();
        console.log(document.getElementById("otp").value+" "+otp)
        if(otp==document.getElementById("otp").value)
        {
            setAuthentc(true);
        }
        else
        {
            setstatus("Invalid OTP")
            setShow(true)
        }
    }

    const changePass=(e)=>{
        e.preventDefault();
        if(document.getElementById("password1").value==document.getElementById("password2").value)
        {
            Axios.post(`http://localhost:8000/chgp`, {
                user:user,
                pass:document.getElementById("password2").value
            }).then((res) => {
                if(res.data=="Success")
                {
                    setstatus("Password Change Successfully"+"\n"+" You can login now.");
                    setShow(true);
                }
                if(res.data!="Success")
                {
                    setstatus("Check if a password between 7 to 15 characters which contain at least one numeric digit and a special character")
                    setShow(true);
                }
    
            })
        }

        else if(document.getElementById("password1").value!=document.getElementById("password2"))
        {
            setstatus("Password doesn't match");
            setShow(true);
        }
       
       

    }





    return (
        <div className="Login">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><h4>Alert</h4></Modal.Title>
                </Modal.Header>
                <Modal.Body> <h6 style={{color:"red",fontWeight:"bolder"}}>{status}</h6></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <div class="container">
                <main class="signup-container">
                    <h1 class="heading-primary">Forgot Password<span class="span-blue">.</span>
                    </h1>
                    <p class="text-mute">Enter your email to regenerate the password.</p>
                 

                    <form class="signup-form">
                       <h3 style={{color:"greenyellow"}}></h3>
                        <label class="inp" style={otp==""?{display:"block"}:{display:"none"}}>
                            <input type="email" id="email" class="input-text" placeholder="&nbsp;"/>
                            <span class="label">Email</span>
                            <span class="input-icon"><AiOutlineMail/></span>
                        </label>
                <button class="btn btn-login" style={otp==""?{display:"block"}:{display:"none"}} onClick={(e)=>{getotp(e)}}
                    >Get OTP</button>
                    <br/>
                    <h3>Username : {user}</h3>
                    <label class="inp" style={otp!=""&&!authtic?{display:"block"}:{display:"none"}}>
                            <input type="text" id="otp" class="input-text" placeholder="&nbsp;"/>
                            <span class="label">OTP</span>
                            <span class="input-icon"></span>
                        </label>
                    <button class="btn btn-login" style={otp!=""&&!authtic?{display:"block"}:{display:"none"}} onClick={(e)=>{submitotp(e)}}
                    >Submit OTP</button>


                    <label class="inp" style={authtic==true?{display:"block"}:{display:"none"}}>
                            <input type="text" id="password1" class="input-text" placeholder="&nbsp;"/>
                            <span class="label">New Password</span>
                            <span class="input-icon"></span>
                        </label>

                    <label class="inp" style={authtic==true?{display:"block"}:{display:"none"}}>
                            <input type="text" id="password2" class="input-text" placeholder="&nbsp;"/>
                            <span class="label">Confirm New Password</span>
                            <span class="input-icon"></span>
                        </label>
                    <button class="btn btn-login" style={authtic==true?{display:"block"}:{display:"none"}} 
                    onClick={(e)=>{changePass(e)}}
                    >Reset Password</button>
            </form>
        </main>

        <div class="welcome-container">
            <h1 class="heading-secondary">
                Welcome to
                <br/><em style={
                    {color: '#2196f3'}
                }>CODE</em>
                <em style={
                    {color: 'black'}
                }>GEEK</em>
            </h1>
            <br/>
            <br/>
            <img src="https://codersera.com/blog/wp-content/uploads/2019/07/BLOG-23-L-3.jpg" alt=""/>
        </div>
    </div>


</div>
    )
}

export default ForgotPassword
