import {useLocation, useNavigate} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai"
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import React, {useState, useEffect} from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {gapi} from 'gapi-script';
import Axios from "axios";
import {
    Container,
    Row,
    Col,
    Button,
    Modal
} from 'react-bootstrap';
import "./Login.scss"
import Footer from "./Footer";
import {setLoginCookieUser} from "../utils/loginCookie";
import Loader from "./Loader";


function Login() {
    const [status, setstatus] = useState("");
    let [icon, setIcon] = useState("hide");

    let navigate = useNavigate();
    const [Loading,setLoading]= useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [profile, setProfile] = useState([]);
    const clientId = '316466299912-nr5umh7iho0hsag07864a414fd2kl6hd.apps.googleusercontent.com';

    useEffect(() => {
        const initClient = () => {
            gapi.client.init({clientId: clientId, scope: ''});
        };
        gapi.load('client:auth2', initClient);
    });

    const onSuccess = async (res) => {
        await Axios.post(`https://code-geek-server-abhip32.vercel.app/glogin`, {email: res.profileObj.email}).then((res) => {
            console.log(res.data);
            if (res.status === 200) {
              setLoginCookieUser(res.data[0].name, res.data[0].email, res.data[0].pic.data.data);
                navigate("/home", {
                    state: {
                        username: res.data[0].name,
                        email: res.data[0].email,
                        pic: res.data[0].pic
                    }
                })
            } else if (res.status === 350) {
                setstatus("Email not Registered Sign Up first");
                setShow(true)
            }


        })
    }

    const onFailure = (err) => {
        console.log('failed', err);
    };

    const showpass = () => {
        const x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
            setIcon("show");
        } else {
            x.type = "password";
            setIcon("hide");
        }
    };


    const onSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        let data = {
            user: document.getElementById("email").value,
            pass: document.getElementById("password").value
        };
        try {
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (response.status === 200) {
                console.log("response is ok");
                const data = await response.json();
                setLoginCookieUser(data[0].name, data[0].email, data[0].pic.data.data);
                navigate("/home", {
                    state: {
                        username: data[0].name,
                        email: data[0].email,
                        pic: data[0].pic
                    }
                })
                setLoading(false);
            }

            else if (response.status === 350) {
              setstatus("Email not Registered Sign Up first");
              setShow(true)
              setLoading(false);
          } 
          else if (response.status === 315)
          {
            setstatus("Wrong Credentials");
            setShow(true)
            setLoading(false);

          }

        } catch (error) {
            console.log(error);
        }
    };


    return (<Container className="Login-Main">
        {Loading && <Loader/>}
        {!Loading && <>  <div>
            <Modal show={show}
                onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4>Alert</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6 style={
                        {
                            color: "red",
                            fontWeight: "bolder"
                        }
                    }> {status}</h6>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                        onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="signup-container">
                <div>
                    <h1 className="heading-primary">
                        Log in<span className="span-blue">.</span>
                    </h1>
                    <p className="text-mute">Enter your credentials to access your account.</p>
                </div>

                <form className="signup-form">
         
                    <label className="signIn-inp">
                        <span className="input-icon"><AiOutlineMail/></span>
                        <input type="email" id="email" className="input-text" placeholder="email" required/>
                    </label>
                    <label className="signIn-inp">
                        <span className="input-icon input-icon-password" data-password>
                            <div style={
                                icon === "hide" ? {
                                    display: "block"
                                } : {
                                    display: "none"
                                }
                            }>
                                <FaEyeSlash onClick={
                                    () => showpass()
                                }/>
                            </div>
                            <div style={
                                icon === "show" ? {
                                    display: "block"
                                } : {
                                    display: "none"
                                }
                            }>
                                <FaEye onClick={
                                    () => showpass()
                                }/>
                            </div>
                        </span>
                        <input type="password" className="input-text" placeholder="Password" id="password" required/>
                    </label>
                    <a className="LoginLink" href="/ForgotPassword">Forgot Password?</a>
                    <button className="Login-btn btn-login"
                        onClick={onSubmit}>Login</button>

                    <div className="line-breaker items-center">
                        <span className="line"></span>
                        <span>OR</span>
                        <span className="line"></span>
                    </div>

                    <GoogleLogin className="btn-google"
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}/>

              
                </form>

                <div style={
                    {marginBottom: "5vh"}
                }>
                    <p className="Login-text-mute display-8">Not a member?
                        <a className="LoginLink" href="/SignUp">
                            Sign up</a>
                    </p>
                </div>
            </div>
        </div></>}
      
    </Container>)
}

export default Login
