import React,{useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import "./style.css"
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
        setMessage("We Send email with link to reset your password, Check your Spam or Bulk Mail folders.");
        // dispatch(
        //   login1({ user: result.data.result, token: result.data.token })
        // )
      }
    } catch (error) {
      console.log(error.response);
      if(error.response.status== 403) {
        setMessage("There is no email sign up please!");
        
      }else {
        // setMessage("There is no email, sign up please!");
        setMessage("We Send email with link to reset your password, Check your Spam or Bulk Mail folders.");
      }
      // setMessage("faild");
    }
  };
    return (
        <div className="container">
            <div className="form">
            <h1 className="heading">Enter your current email ! </h1>
            <input className="input" placeholder="Enter email..." type="text" onChange={(e)=>setEmail(e.target.value)}/>
           <div className="txxt"><p className="dark">{message? message: ""}</p></div> 
            <button  className="submit" onClick={ forgotpasswordNav}>Send To my Email</button>
         
            
            </div>
        </div>
    )
}

export default ForgetPassword
