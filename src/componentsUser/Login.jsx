import {React, useState} from 'react'
import "./Login.scss";
import {useNavigate} from "react-router-dom";


function Login() {
    const [status, setstatus] = useState("");
    let navigate = useNavigate();

    function show() {
        var x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    async function onSubmit(e) {
        e.preventDefault();
        let data = {
            user: document.getElementById("username").value,
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
                navigate("/home", {state: {username: data.user}
                })
                window.location.reload(false);
            }
            if (res.status === 404) {
                setstatus("Invalid username or password");
            }
        });
    }


    return (
        <div className="Login">
            <form className="LoginForm">
                <h3>Login</h3>
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
                    {color: 'red'}
                }>
                    {status}</p>

                <button style={
                        {borderRadius: '40px'}
                    }
                    onClick={onSubmit}>Log In</button>
                <br/>
                <br/>
                <button style={
                    {borderRadius: '40px'}
                }><img src="https://img.icons8.com/fluency/48/000000/google-logo.png"
                        width={30}
                        height={30}
                        alt="google"/>
                    Continue with Google</button>
                <br/>
                <br/>
                <center>
                    <a href="http://localhost:3000/SignUp">Sign Up</a>
                </center>
            </form>

        </div>
    )
}

export default Login
