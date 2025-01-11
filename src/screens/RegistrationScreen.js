import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [Succes, setSucces] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const register = async () => {
    const user = {
      name,
      email,
      password,
      cpassword,
    };
    if (password === cpassword) {
      try {
        setLoading(true);
        const result = (await axios.post(`${process.env.REACT_APP_API_KEY}/api/users/register`, user)).data;
        setLoading(false);
        if (result) {
          setSucces(true);
          setName("");
          setEmail("");
          setPassword("");
          setCpassword("");
          setErrMsg("");
          setSuccessMsg("Registration successfull");
          setError(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
        setSucces(false);
        setErrMsg(error?.response?.data?.message);
        setSuccessMsg("");
      }
    } else {
      alert("password and confirm password do not match");
    }
  };

  return (
    <div className='loginScreen'>
      {loading && <Loader />}

      <div className='row  text-center justify-content-center mx-0'>
        <div className='col-lg-5 mt-5 '>
          {error && <Error message={errMsg} />}
          {Succes && <Success message={successMsg} />}
          <div className='bs2 p-3 loginRow'>
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
          </div>
          <div className='text-start'>
            <button
              className='btn btn-secondary mt-2'
              onClick={register}
              disabled={!name && !email && !password && !cpassword}
            >
              Register
            </button>
            <p className='text-secondary mt-3'>
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
