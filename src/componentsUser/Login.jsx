import "./Login.scss";
import {useLocation, useNavigate} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai"
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import React, { useState, useEffect } from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { gapi } from 'gapi-script';
import Axios from "axios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


function Login() {
    const [status, setstatus] = useState("");
    const [icon, setIcon] = useState("hide");
    const [link, setLink] = useState("");
    
    
    let navigate = useNavigate();
    let location = useLocation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ profile, setProfile ] = useState([]);
    const clientId = '316466299912-nr5umh7iho0hsag07864a414fd2kl6hd.apps.googleusercontent.com';

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({
                clientId: clientId,
                scope: ''
            });
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = (res) => {
        Axios.post(`http://localhost:8000/glogin`, {
            email:res.profileObj.email
        }).then((res) => {
            console.log(res.data);
            if(res.data!="failed"&&res.data!="Subscription")
            {
                navigate("/home", {
                    state: {
                        username: res.data
                    }
                })
                window.location.reload(false);
            }
            else if(res.data=="failed"){
                setstatus("Email not Registered Sign Up first");
                setShow(true)
            }
            else if(res.data=="Subscription")
            {
                setstatus("Subscription Expired");
                setLink("Click Here to renew your subscription");
                setShow(true)
            }
            
            
        })
    }

    const onFailure = (err) => {
        console.log('failed', err);
    };

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



    async function onSubmit(e) {
        

        e.preventDefault();
        let data = {
            user: document.getElementById("email").value,
            pass: document.getElementById("password").value
        };
        await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if (res.status === 200) {
                navigate("/home", {
                    state: {
                        username: data.user
                    }
                })
                window.location.reload(false);
            }
            if (res.status === 404) {
                setstatus("Invalid username or password");
                setShow(true)
            }

            if(res.status===305)
            {
                setstatus("Subscription Expired");
                setLink("Click Here to renew your subscription");
                setShow(true)
            }
        });
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
                    <h1 class="heading-primary">Log in<span class="span-blue">.</span>
                    </h1>
                    <p class="text-mute">Enter your credentials to access your account.</p>
                    <div class="login-wrapper">
                        <GoogleLogin 
                            className="btn-google"
                            clientId={clientId}
                            buttonText="Sign in with Google"
                            onSuccess={onSuccess}
                            onFailure={onFailure}
                            cookiePolicy={'single_host_origin'}
                            isSignedIn={true}
                        />
                        <div class="line-breaker">
                            <span class="line"></span>
                            <span>or</span>
                            <span class="line"></span>
                        </div>
                    </div>

                    <form class="signup-form">
                       <h3 style={{color:"greenyellow"}}>{location.state.result!=undefined&&location.state.result}</h3>
                        <label class="inp">
                            <input type="email" id="email" class="input-text" placeholder="&nbsp;"/>
                            <span class="label">Username</span>
                            <span class="input-icon"><AiOutlineMail/></span>
                        </label>
                        <label class="inp">
                            <input type="password" class="input-text" placeholder="&nbsp;" id="password"/>
                            <span class="label">Password</span>
                            <span class="input-icon input-icon-password" data-password>
                                <div style={
                                    icon == "hide" ? {
                                        display: "block"
                                    } : {
                                        display: "none"
                                    }
                                }><FaEyeSlash onClick={
                                        () => {
                                            showpass()
                                        }
                                    }/></div>
                            <div style={
                                icon == "show" ? {
                                    display: "block"
                                } : {
                                    display: "none"
                                }
                            }><FaEye onClick={
                                    () => {
                                        show()
                                    }
                                }/>
                            </div>
                    </span>
                </label>
                <a class="text-mute" href="http://localhost:3000/ForgotPassword">Forgot Password ? </a>
                <button class="btn btn-login"
                    onClick={onSubmit}>Login</button>
                    <h6 onClick={()=>navigate("/Buysubscription", {state: {username: document.getElementById("email").value}})} style={{color:"#2196f3",fontWeight:"bolder"}}>{link}</h6>
            </form>
            <p class="text-mute">Not a member?
                <a href="http://localhost:3000/SignUp">Sign up</a>
            </p>
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

export default Login
