import React, { useState } from 'react'
import './Register.css'
import axios from 'axios'

function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Post function for route User.js
  const register = () => {
    //console.log(username)
    axios.post('http://localhost:5000/user/register', {
      username: username, password: password
    }).then((response) => {
      console.log(response);
    })
  };

    return (
      <div className="register">
        <h1>Registration</h1>
        <div className="registerForm">
          <input type="text" placeholder="Username..." onChange={(e) => {
            setUsername(e.target.value)
          }} />
          <input type="password" placeholder="Password..." onChange={(e) => {
            setPassword(e.target.value)
          }} />
          <button onClick={register} >Register</button>
        </div>
      </div>
    );
}

export default Register
