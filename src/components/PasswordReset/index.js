import React,{useState} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import PasswordChecklist from "react-password-checklist"
const PasswordReset = () => {
const [password, setPassword] = useState("initialState")
const [message, setMessage] = useState("");
const {id} = useParams();
const {tokenmail}= useParams();
const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

const resetPassword = async () => {


    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/resetpassword/${id}/${tokenmail}`,
{password},
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );
console.log(result.status);
console.log(result.data);
      // if (result.status === 200) {
      //   setMessage("password change successfully");
      //   // dispatch(
      //   //   login1({ user: result.data.result, token: result.data.token })
      //   // )
      // }
    } catch (error) {
      console.log(error.response);
      if(error.response.status== 403) {
        setMessage("something wrong");
      }
      // setMessage("faild");
    }
  };
    return (
        <div className="container">
            <div className="form">
              <h1 className="heading">Enter new your password</h1>
            <input className="input" type="password" onChange={(e)=>setPassword(e.target.value)}/>
            <PasswordChecklist
            rules={[
              `minLength`,
              `specialChar`,
              `number`,
              `capital`,
              `lowercase`,
            ]}
            className="dark"
            minLength={8}
            value={password}
            onChange={(isValid) => {
              if (isValid) {
                const button = document.querySelector(`#signupSubmitButton`);
                button.disabled = false;
              } else {
                const button = document.querySelector(`#signupSubmitButton`);
                button.disabled = true;
              }
            }}
            />
            <button id="signupSubmitButton"  className="submit" onClick={ resetPassword}>Rset Password</button>
            <h1 className="user">{message? message: ""}</h1>
            </div>
        </div>
    )
}

export default PasswordReset
