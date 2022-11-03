import {React, useState, useEffect} from 'react'
import "./AdminLogin.scss";
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import Axios from 'axios';
import {AiOutlineMail} from "react-icons/ai"
import {FaEye, FaEyeSlash} from 'react-icons/fa'


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

    


    async function handleSubmit(event,callback) {
        event.preventDefault();
        setstatus("wait")

         await Axios.post(`http://localhost:8000/usersData`).then((res) => {
              user.push(res.data.users);
              console.log(user);
          })
      
          await  Axios.post(`http://localhost:8000/getbardata`).then((res) => {
              teststats.push(res.data)
              console.log(teststats);
          })
      
          await Axios.post(`http://localhost:8000/getpiedata`).then((res) => {
              languagesstats.push(res.data);
              console.log(languagesstats);
          })

          await Axios.post(`http://localhost:8000/getTotalTransactions`).then((res) => {
                console.log(res.data);
                moneystats.push(res.data.price);
          })

          await Axios.post(`http://localhost:8000/getTotalTransactionsbyCatagory`).then((res) => {
                console.log(res.data);
                substats.push(res.data);
          })


        await Axios.post(`http://localhost:8000/adminlogin`, {
            user: document.getElementById("username").value,
            pass: document.getElementById("password").value
        }).then((res) => {
            console.log(res.data._id);
            if (res.data._id!=undefined&&languagesstats.length > 0) {
                navigate("/AdminHome", {
                    state: {
                        name: res.data.name,
                        pic: res.data.pic,
                        lang: languagesstats[0],
                        test: teststats[0],
                        userstat: user,
                        moneystats: moneystats,
                        substats: substats
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
        <div className="Login">
        <div class="container">
            <main class="signup-container">
                <h1 class="heading-primary">Log in<span class="span-blue">.</span>
                </h1>
                <p class="text-mute">Enter your credentials to access your account.</p>
              

                <form class="signup-form">
                    <label class="inp">
                        <input type="email" id="username" class="input-text" placeholder="&nbsp;"/>
                        <span class="label">username</span>
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
            <h6 style={{color:"red",fontWeight:"bolder"}}>{status}</h6>
            <button class="btn btn-login"
                onClick={handleSubmit}>Login</button>
        </form>
    </main>

    <div class="welcome-container">
        <h1 class="heading-secondary">
            Hello Admin
            <br/><em style={
                {color: '#2196f3'}
            }>CODE</em>
            <em style={
                {color: 'black'}
            }>GEEK</em>
        </h1>
        <br/>
        <br/>
        <img src="https://cdn.dribbble.com/users/76502/screenshots/5251755/jet_animation.gif" alt=""/>
    </div>
</div>


</div>
    )
}

export default Login
