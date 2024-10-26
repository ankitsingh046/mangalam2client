import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const register = async () => {
    const user = {
      name,
      email,
      password,
      cpassword,
    };
    if (password === cpassword) {
      try {
        const result = (await axios.post("/api/users/register", user)).data;
        console.log(result, "res");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("password and confirm password do not match");
    }
  };

  return (
    <div className='loginScreen'>
      <div className='row loginRow text-center justify-content-center mx-0'>
        <div className='col-5 bs2 mt-5 py-3 '>
          <h2 className='text-dark mb-3'>Register</h2>
          <input
            type='text'
            name='name'
            placeholder='Name'
            className='form-control my-2'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type='text'
            name='email'
            placeholder='Email'
            className='form-control my-2'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <input
            type='text'
            name='password'
            placeholder='Password'
            className='form-control my-2'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input
            type='text'
            name='Cpassword'
            placeholder='Confirm Password'
            className='form-control my-2'
            value={cpassword}
            onChange={(e) => {
              setCpassword(e.target.value);
            }}
          />

          <div className='text-start'>
            <button className='btn btn-secondary mt-2' onClick={register}>
              Register
            </button>
            <p className='text-light mt-3'>
              Already registered? <Link to='/login'>Click here</Link> to{" "}
              <b>Login</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationScreen;
