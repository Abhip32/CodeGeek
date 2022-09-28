import {React, useState} from 'react'
import "./SignUp.scss";
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import "./SignUp.scss";
import {
    AiOutlineMail,
    AiOutlineUpload,
    AiFillPhone,
    AiFillInfoCircle,
    AiOutlineUser
} from "react-icons/ai"
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import CardContainer from './CardContainer';
import { useEffect } from 'react';

function Login() {
    const [img, setImg] = useState("");
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);
    const [errors, setErrors] = useState([]);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const [success, setSuccess] = useState("");
    const [subscription, setSubscription] = useState("");
    const [icon, setIcon] = useState("hide");
    let navigate = useNavigate();
    function show() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    let lo = "oho"

    
  


    const handleSubmit = (event) => {
        event.preventDefault();
      
            Axios.post(`http://localhost:8000/SignUp`, {
            user: document.getElementById("username").value,
            pass: document.getElementById("password").value,
            pic: img,
            email: document.getElementById("email").value,
            phoneno: document.getElementById("phoneno").value,
            bio: document.getElementById("bio").value
        }).then((res) => {
            if(res.data.length==0)
            {
                console.log(res.data);
                setSuccess(res.data);
                navigate("/Buysubscription", {state: {username: document.getElementById("username").value}})

            }
            else
            {
                window.scrollTo(0, 0);
                setErrors(res.data);
            }
        })
        
    };


    return (
        <div>
            <div className="Login">
                <div class="container">
                    <main class="signup-container">
                        <h1 class="heading-primary">Sign Up<span class="span-blue">.</span>
                        </h1>
                        <p class="text-mute">Become a member of largest coding community.</p>


                        <form class="signup-form">
                            <h3 style={{color:"red",fontWeight:"900"}}>{errors[0]}</h3>
                            <h3 style={{color:"red",fontWeight:"900"}}>{errors[1]}</h3>
                            <h3 style={{color:"red",fontWeight:"900"}}>{errors[2]}</h3>
                            <h3 style={{color:"red",fontWeight:"900"}}>{errors[3]}</h3>
                            <h3 style={{color:"red",fontWeight:"900"}}>{errors[4]}</h3>
                            <h3 style={{color:"red",fontWeight:"900"}}>{errors[5]}</h3>
                            <label class="inp">
                                <input type="email" id="username" class="input-text" placeholder="&nbsp;"/>
                                <span class="label">Username</span>
                                <span class="input-icon"><AiOutlineUser/></span>
                            </label>
                            <label class="inp">
                                <input type="email" id="email" class="input-text" placeholder="&nbsp;"
                                    style={
                                        {backgroundColor: "rgb(232, 240, 254)"}
                                    }/>
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
                    <label class="inp"
                        style={
                            {
                                backgroundColor: "rgb(232, 240, 254)",
                                padding: "20px",
                                borderRadius: "26px"
                            }
                    }>
                        <span style={
                            {color: "#2196f3"}
                        }>Upload Profile Picture
                        </span>
                        <br/>
                        <FileBase64 class="input-text"
                            multiple={false}
                            style={
                                {
                                    backgroundColor: "red",
                                    padding: "10px"
                                }
                            }
                            onDone={
                                ({base64}) => setImg(base64)
                            }
                            accept="image/*"/>
                        <span class="input-icon"><AiOutlineUpload/></span>
                    </label>
                    <label class="inp">
                        <input type="text" id="phoneno" class="input-text" placeholder="&nbsp;"
                            style={
                                {backgroundColor: "rgb(232, 240, 254)"}
                            }/>
                        <span class="label">Phone No</span>
                        <span class="input-icon"><AiFillPhone/></span>
                    </label>

                    <label class="inp">
                        <textarea id="bio" class="input-text" placeholder="&nbsp;"
                            style={
                                {backgroundColor: "rgb(232, 240, 254)"}
                            }/>
                        <span class="label">Bio
                        </span>
                        <span class="input-icon"><AiFillInfoCircle/></span>
                    </label>
                    
                    
                    

                    <button class="btn btn-login"
                        onClick={handleSubmit}>Sign Up</button>

                </form>

            </main>

        </div>
    </div>


</div>
    )
}

export default Login
