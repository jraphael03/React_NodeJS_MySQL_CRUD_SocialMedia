import React, { useState } from "react";
import "./Login.css";
import axios from 'axios';
import { useHistory } from 'react-router-dom'

function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    let history = useHistory();     // Can be used to redirect
    
    const login = () => {
        axios.post("http://localhost:5000/user/login", {
            username: username,
            password: password,
        }).then((response) => {
            //console.log(response);

            // Set localstorage so we can stay logged in
      if (response.data.loggedIn) {
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", response.data.username);
                history.push('/')       // Redirects to home page after login
            }else{
                setErrorMessage(response.data.message);     // send message from the backend, can be seen in console if response is logged
            }
        })
    }

  return (
    <div className="login">
      <h1>Login</h1>
      <div className="loginForm">
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
        <h1 style={{color: 'red'}}>{errorMessage}</h1> {/* errorMessage from login function above */}
      </div>
    </div>
  );
}

export default Login;
