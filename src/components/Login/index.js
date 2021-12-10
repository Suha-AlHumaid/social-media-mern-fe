import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login1 } from "../../Reducers/login";
import "./style.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [val, setVal] = useState("");
  const [userName, setUserName] = useState("");
  const dispatch = useDispatch();

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
          email: val,
          password,
        }
      );

      if (result.status == 200) {
        setMessage("Success");
        dispatch(
          login1({ user: result.data.result, token: result.data.token })
        );
      }
    } catch (error) {
      console.log(error);
      setMessage("faild");
    }
  };

  return (
    <div className="logForm">
      <h1>Login</h1>
      <lable for="email">Email or username:</lable>
      <input type="text" id="email" onChange={(e) => setVal(e.target.value)} />
      <lable for="password1">Password:</lable>
      <input
        type="password"
        id="password1"
        onChange={(e) => setPassword(e.target.value)}
      />
      <p>{message ? message : ""}</p>
      <p>forget password?</p>
      <button onClick={login}>Submit</button>
    </div>
  );
};

export default Login;
