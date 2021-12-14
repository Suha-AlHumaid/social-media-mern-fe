import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login1 } from "../../Reducers/login";
import { useNavigate } from "react-router";
import GoogleLogin from 'react-google-login';

import "./style.css";
const Login = () => {
  const popupTools = require("popup-tools");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const navigator = useNavigate();
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

  const login = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        {
          email,
          password,
        }
      );
      console.log(result.data);
      if (result.status == 200) {
        setMessage("Success");
        dispatch(
          login1({ user: result.data.result, token: result.data.token })
        );
        navigator("/explore")
      }
    } catch (error) {
      console.log(error.response);

      // if (error.response.status == 403) {
      //   setMessage("varified your email");
      // } else {
      //   setMessage("wrong email or password");
      // }
    }
  };

  // forgotpassword

  const forgotasswordNav = async () => {
    navigator("/forgetPassword");
  };
  //google AuthO
  const oAuth = () => {
    popupTools.popup(
      `${process.env.REACT_APP_BASE_URL}/auth/google`,
      "Logging in with Google",
      { width: 500, height: 500 },
      (err, user) => {
        if (err) {
          console.log("caughton error:", err.message);
        } else {
          console.log(user);
          dispatch(login1({ token: user.token, user: user.result }));
          navigator("/explore");
        }
      }
    );
  };

  const responseSuccessGoogle=(response)=>{
console.log("google",response);
console.log("google",response.tokenId);
axios.post(`${process.env.REACT_APP_BASE_URL}/googleLoggin`,{tokenId: response.tokenId}).then(result=>{
console.log("responseSuccessGoogle",result);
console.log("user",result.data.result);

console.log("token",result.data.token);
dispatch(
  login1({ user: result.data.result, token: result.data.token })
);
navigator("/explore")
}).catch(error=>{
  console.log(error);
})
  }
  const responseErrorGoogle=(response)=>{
    console.log(response); 
  }

  return (
    <div className="form">
      <h1 className="logoHome">𝐼𝓃𝓈𝓉𝒶𝑔𝓇𝒶𝓂𝒾</h1>
      <input
        className="input"
        placeholder="Email..."
        type="text"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="input"
        placeholder="Password..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{message ? message : ""}</p>
      <button className="submit" onClick={login}>
        Submit
      </button>
      <p className="dark" >{message? message:""}</p>
      {/* <p
        className="darkLink"
        onClick={(e) => {
          e.preventDefault();
          oAuth();
        }}
      >
        Log in with Gmail
      </p> */}





      <GoogleLogin
    clientId="426069343336-3odhdvec6q2o8qnlck1pakcrncrpas01.apps.googleusercontent.com"
    buttonText="Login With Google"
    onSuccess={responseSuccessGoogle}
    onFailure={responseErrorGoogle}
    cookiePolicy={'single_host_origin'}
  />





      <p

        onClick={(e) => {
          e.preventDefault();
          forgotasswordNav();
        }}
        className="darkLink"
      >
        Forget password?
      </p>
    </div>
  );
};

export default Login;
