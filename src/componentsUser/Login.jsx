import {React, useState} from 'react'
import "./Login.scss";
import {useNavigate} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai"
import {FaEye, FaEyeSlash} from 'react-icons/fa'


function Login() {
    const [status, setstatus] = useState("");
    const [icon, setIcon] = useState("hide");
    const [link, setLink] = useState("");
    let navigate = useNavigate();

    function show() {
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
            }

            if(res.status===305)
            {
                setstatus("Subscription Expired");
                setLink("Click Here to renew your subscription");
            }
        });
    }


    return (
        <div className="Login">
            <div class="container">
                <main class="signup-container">
                    <h1 class="heading-primary">Log in<span class="span-blue">.</span>
                    </h1>
                    <p class="text-mute">Enter your credentials to access your account.</p>
                    <div class="login-wrapper">
                        <a href="#" class="btn btn-google">
                            <img src="https://img.icons8.com/fluency/48/000000/google-logo.png"/>
                            Log In with Google
                        </a>
                        <div class="line-breaker">
                            <span class="line"></span>
                            <span>or</span>
                            <span class="line"></span>
                        </div>
                    </div>

                    <form class="signup-form">
                        <label class="inp">
                            <input type="email" id="email" class="input-text" placeholder="&nbsp;"/>
                            <span class="label">Email</span>
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
                                            show()
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
                <button class="btn btn-login"
                    onClick={onSubmit}>Login</button>
                    <h6 style={{color:"red",fontWeight:"bolder"}}>{status}</h6>
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
