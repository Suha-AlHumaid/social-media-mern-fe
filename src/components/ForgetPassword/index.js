import React,{useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";

const ForgetPassword = () => {
const [email, setEmail] = useState("initialState")
const [message, setMessage] = useState("");
const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

const forgotpasswordNav = async () => {


    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/forgotpassword`,
        {
            email
        },
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );
console.log(result.status);
      if (result.status === 200) {
        setMessage("We Send email with link to reset your password");
        // dispatch(
        //   login1({ user: result.data.result, token: result.data.token })
        // )
      }
    } catch (error) {
      console.log(error.response);
      if(error.response.status== 403) {
        setMessage("There is no email sgin up please!");
      }else {
        setMessage("There is no email sgin up please!");
      }
      // setMessage("faild");
    }
  };
    return (
        <div className="container">
            <div className="form">
            <input className="input" type="text" onChange={(e)=>setEmail(e.target.value)}/>
            <button  className="submit" onClick={ forgotpasswordNav}>Send To my Email</button>
            <h1 className="user">{message? message: ""}</h1>
            
            </div>
        </div>
    )
}

export default ForgetPassword
