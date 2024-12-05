import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";

function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [Succes, setSucces] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const login = async () => {
    const user = {
      email,
      password,
    };
    console.log(user, "user");
    try {
      setLoading(true);
      const result = (await axios.post("https://mangalam-be.onrender.com/api/users/login", user)).data;
      console.log(result, "res");
      setLoading(false);

      if (result) {
        setSucces(true);
        setEmail("");
        setPassword("");
        setErrMsg("");
        setSuccessMsg("Login successfull");
        setError(false);
        localStorage.setItem("currentUser", JSON.stringify(result));
        window.location.href = "/home";
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(true);
      setSucces(false);
      setErrMsg(error?.response?.data?.message);
      setSuccessMsg("");
    }
  };
  return (
    <div className='loginScreen'>
      {loading && <Loader />}

      <div className='row loginRow text-center justify-content-center mx-0'>
        <div className='col-lg-5 mt-5  '>
          {error && <Error message={errMsg} />}
          {Succes && <Success message={successMsg} />}
          <div className='bs2 p-3 loginRow'>
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
          </div>

          <div className='text-start'>
            <button
              className='btn btn-secondary mt-2'
              onClick={login}
              disabled={!email && !password}
            >
              Login
            </button>
            <p className='text-secondary mt-3'>
              Not registered? <Link to='/register'>Click here</Link> to{" "}
              <b>Register</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
