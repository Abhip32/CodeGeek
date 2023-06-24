import {React, useState} from 'react'
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import {useNavigate} from "react-router-dom";
import Axios from 'axios';
import {AiFillWarning} from "react-icons/ai"
import {
    AiOutlineMail,
    AiOutlineUpload,
    AiFillPhone,
    AiFillInfoCircle,
    AiOutlineUser
} from "react-icons/ai"
import "./SignUp.scss"
import {FaEye, FaEyeSlash} from 'react-icons/fa'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Carousel from 'react-bootstrap/Carousel';
import {useEffect} from 'react';
import {Container} from 'react-bootstrap';
import {setLoginCookieUser} from "../utils/loginCookie";
import Loader from './Loader';
import defaultImg from "../Assets/coder.gif"


function SignUp() {
    const [img, setImg] = useState([]);
    const [index, setIndex] = useState(0);
    const [data, setData] = useState([]);
    const [errors,setErrors]=useState("");
    const[Loading,setLoading] = useState(false);

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


    const chgImg =(event)=>{

    // Get the selected file
    const file = event.target.files[0];
    
    // Create a new FileReader object
    const reader = new FileReader();
    
    // Define the onload event handler
    reader.onload = function(e) {
      // Get the image buffer
      const imageBuffer = e.target.result;
      const uint8Array = new Uint8Array(imageBuffer);

      // Convert the Uint8Array to a regular array
      const dataArray = Array.from(uint8Array);
      setImg(dataArray)
    };
     reader.readAsArrayBuffer(file);
    
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)

        Axios.post(`http://localhost:8000/SignUp`, {user:document.getElementById('username').value,pass:document.getElementById('password').value,profileImg:img,email:document.getElementById('email').value,phone:document.getElementById('phoneno').value,bio:document.getElementById('bio').value }).then((res) => {
            if (res.status===200) {
                console.log(res.data);
                setLoginCookieUser(res.data.name, res.data.email, res.data.pic.data);
                setSuccess(res.data);
                setLoading(false)
                navigate("/home", {
                })

            } else {
                setErrors(res.data.message);
                setLoading(false)
                window.scrollTo(0, 0);
            }
        })

    };


    return (
        <Container>
                    {Loading && <Loader/>}
        {!Loading && <>  
            <div className="SignIn-Main">
                <main class="signin-container">
                    <h1 class="heading-primary">Sign Up<span class="span-blue">.</span>
                    </h1>
                    <p class="text-mute">Become a member of largest coding community.</p>


                    <form class="signup-form">
                        <br/>
                        <div style={
                            errors.length == 0 ? {
                                display: "none"
                            } : {
                                backgroundColor: "rgb(232, 240, 254)",
                                borderRadius: "20px",
                                padding: "30px"
                            }
                        }>
                            <h1 style={
                                {
                                    color: "#2196f3",
                                    fontWeight: "900"
                                }
                            }><AiFillWarning style={
                                    {color: "red"}
                                }/>
                                Oops !!</h1>
                            <br/>
                            <ul> {
                               
                                    <li>
                                        <h5 style={
                                            {
                                                color: "red",
                                                fontWeight: "700"
                                            }
                                        }>
                                            {errors}</h5>
                                    </li>
                            } </ul>

                        </div>
                        <br/>
                        <label class="signUp-inp">
                            <span class="input-icon"><AiOutlineUser/></span>
                            <input type="text" id="username" class="input-text" placeholder="Username" required/>

                        </label>
                        <label class="signUp-inp">

                            <span class="input-icon"><AiOutlineMail/></span>
                            <input type="email" id="email" class="input-text" placeholder="Email" required/>

                        </label>
                        <label class="signUp-inp">

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

                    <input type="password" class="input-text" placeholder="password" id="password" required/>
                </label>
                <label class="signUp-inp">
                    <br/>
                    <span class="input-icon"><AiOutlineUpload/></span>
                    <input type="file" id="pic"
                        onChange={
                            (e) => chgImg(e)
                        }
                        accept="image/*" required/>

                </label>
                <label class="signUp-inp">
                    <span class="input-icon"><AiFillPhone/></span>
                    <input type="text" id="phoneno" class="input-text" placeholder="Phone Number" required/>
                </label>

                <label class="signUp-inp">
                    <span class="input-icon"><AiFillInfoCircle/></span>
                    <textarea id="bio" class="input-text" placeholder="Your Bio Here" required/>
                </label>


                <button class="SignUp-btn btn-login" type="submit" 
                    style={
                        {marginBottom: "5vh"}
                    }
                    onClick={handleSubmit}>Sign Up</button>

            </form>

        </main>
    </div>
    </>}


</Container>
    )
}

export default SignUp
