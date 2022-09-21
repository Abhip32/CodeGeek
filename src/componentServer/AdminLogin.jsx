import {React, useState, useEffect} from 'react'
import "./AdminLogin.scss";
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom";
import Axios from 'axios';


function Login() {
    const [status, setstatus] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [profileImage, setprofileImage] = useState("");
    const [sidebarVisible, setsidebarVisible] = useState(true);
    const [languagesstats, setlanguagestats] = useState([]);
    const [teststats, setteststats] = useState([]);
    const [user, setUser] = useState("")

    function show() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }


    async function handleSubmit(event) {
        event.preventDefault();

        console.log("getData");
            Axios.post(`http://localhost:8000/usersData`).then((res) => {
              setUser(res.data.users);
              console.log(res.data);
          })
      
          Axios.post(`http://localhost:8000/getbardata`).then((res) => {
              setteststats(res.data);
              console.log(res.data);
          })
      
          Axios.post(`http://localhost:8000/getpiedata`).then((res) => {
              setlanguagestats(res.data);
              console.log(res.data);
          })


        Axios.post(`http://localhost:8000/adminlogin`, {
            user: document.getElementById("username").value,
            pass: document.getElementById("password").value
        }).then((res) => {
            console.log(res.data)
            if (teststats.length!=0) {
                navigate("/AdminHome", {
                    state: {
                        name: res.data.username.name,
                        pic: res.data.username.pic,
                        lang: languagesstats,
                        test: teststats,
                        userstat: user
                    }
                })
                window.location.reload(false);
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
            <img className="LoginImg" src="https://img.freepik.com/free-vector/admin-concept-illustration_114360-3427.jpg?w=2000"/>
            <form className="LoginForm">
                <h3>Admin Login</h3>
                <label for="username">Username</label>
                <input type="text" placeholder="Email or Phone" id="username"/>

                <label for="password">Password</label>
                <div className="pass">
                    <input type="password" placeholder="Password" id="password"
                        style={
                            {marginBottom: '20px'}
                        }/>
                    <input type="checkbox" className="smallerCheckbox"
                        onClick={show}
                        style={
                            {marginTop: '2vh'}
                        }/>
                </div>
                <p style={
                    status.length > 10 ? {
                        color: 'red'
                    } : {
                        color: 'black'
                    }
                }>
                    {status}</p>
                <br/>

                <button style={
                        {borderRadius: '40px'}
                    }
                    onClick={
                        (e) => handleSubmit(e)
                }>Log In</button>
                <br/>
                <br/>
            </form>

        </div>
    )
}

export default Login
