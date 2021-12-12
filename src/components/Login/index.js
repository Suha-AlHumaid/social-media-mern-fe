import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login1 } from "../../Reducers/login";
import "./style.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

  const login = async () => {
    // setMessage("");
    // if (val.includes("@")){
    //     setEmail(val)
    // }else {
    //     setUserName(val)
    // }
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
        )
      } 
    } catch (error) {
      console.log(error.response);
      if(error.response.status== 403) {
        setMessage("varified your email");
      }else {
        setMessage("wrong email or password");
      }
      // setMessage("faild");
    }
  };

  return (
    <div className="form">
      {/* <h1 className="heading">Login To Your Account</h1> */}
      <h1 className="logoHome">𝐼𝓃𝓈𝓉𝒶𝑔𝓇𝒶𝓂𝒾</h1>
      <input className="input" placeholder="Email..." type="text" onChange={(e) => setEmail(e.target.value)} />
      
      <input
       className="input" placeholder="Password..." 
        type="password"
      
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{message ? message : ""}</p>
      <button className="submit" onClick={login}>Submit</button>
      <p className="darkLink">Log in with Gmail</p>
      <p className="darkLink">Forget password?</p>
    </div>
  );
};

export default Login;
