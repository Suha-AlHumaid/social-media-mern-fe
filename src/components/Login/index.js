import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login1 } from "../../Reducers/login";
import { useNavigate } from "react-router";
import GoogleLogin from "react-google-login";
import "./style.css";

const Login = () => {
  const popupTools = require("popup-tools");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        navigator("/explore");
      }
    } catch (error) {
      console.log(error.response);

      if (error.response.status == 403) {
        setMessage("Please, Varified your email");
      } else {
        setMessage("Please, Enter invalid email or password");
      }
    }
  };

  // forgotpassword

  const forgotasswordNav = async () => {
    navigator("/forgetPassword");
  };

  //google AuthO
  // const oAuth = () => {
  //   popupTools.popup(
  //     `${process.env.REACT_APP_BASE_URL}/auth/google`,
  //     "Logging in with Google",
  //     { width: 500, height: 500 },
  //     (err, user) => {
  //       if (err) {
  //         console.log("caughton error:", err.message);
  //       } else {
  //         console.log(user);
  //         dispatch(login1({ token: user.token, user: user.result }));
  //         navigator("/explore");
  //       }
  //     }
  //   );
  // };

  const responseSuccessGoogle = (response) => {
    console.log("google", response);
    console.log("google", response.tokenId);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/googleLoggin`, {
        tokenId: response.tokenId,
      })
      .then((result) => {
        console.log("responseSuccessGoogle", result);
        console.log("user", result.data.result);

        console.log("token", result.data.token);
        dispatch(
          login1({ user: result.data.result, token: result.data.token })
        );
        navigator("/explore");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const responseErrorGoogle = (response) => {
    console.log(response);
  };

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
      <br />
      <p className="red">{message ? message : ""}</p>
      <button className="submit" onClick={login}>
        Submit
      </button>

      <br />

      <GoogleLogin
        clientId="426069343336-4qrce5u8on7li4kht6rtprfj9sfcikkk.apps.googleusercontent.com"
        buttonText="Login With Gamil"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />

      <br />
      <p
        onClick={(e) => {
          e.preventDefault();
          forgotasswordNav();
        }}
        className="darkLink"
      >
        Forget your password?
      </p>
    </div>
  );
};

export default Login;
