import React, { useState } from "react";
import { Link } from 'react-router-dom'
import axios from "axios";

function LoginScreen() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async() => {
    const user = {
      email,
      password,
    };
    console.log(user, 'user')
    try {
      const result = (await axios.post("/api/users/login", user)).data;
      console.log(result, "res");
    } catch (error) {
      console.log(error);
    }
   
  };
  return (
    <div className='loginScreen'>
       <div className='row loginRow text-center justify-content-center mx-0'>
        <div className='col-5 bs2 mt-5 py-3 '>
          <h2 className='text-dark mb-3'>Login</h2>
         
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='form-control my-2'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            className='form-control my-2'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          
          <div className="text-start">
          <button className='btn btn-secondary mt-2' onClick={login}>
            Login
          </button>
            <p className="text-dark mt-3">Not registered? <Link to = '/register'>Click here</Link> to <b>Register</b></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen