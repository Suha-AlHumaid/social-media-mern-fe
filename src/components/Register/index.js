
   
import React, { useState } from "react";
import axios from "axios"
import "./style.css";
const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [message, setMessage] = useState("");
    const [avatar, setAvatar] = useState("");
  
    const register = async (e) => {

      setMessage("");
      try {
        const result = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/register`,
          {
            email,
            userName,
            avatar,
            password,
            role,
          }
        );
        if (result.status === 201) {
          setMessage("Success");
        }
      } catch (error) {
        setMessage("faild");
        console.log(error);
      }
  
    };

    
  return (

        <div className="logForm">
            <h1>Register</h1>
            <lable for="email">User Name</lable>
      <input type="text" id="email"  onChange={(e) => setUserName(e.target.value)}/>
      <lable for="email">Email</lable>
      <input type="text" id="email"  onChange={(e) => setEmail(e.target.value)}/>
      <lable for="avatar">Avatar:</lable>
      <input type="text" id="avatar"  onChange={(e) =>  setAvatar(e.target.value)} />
      <lable for="password">Password:</lable>
      <input type="text" id="password" onChange={(e) => setPassword(e.target.value)} />
      <div>
        <p>Please select your Role:</p>
         {" "}
        <input
          type="radio"
          id="Admin"
          name="role"
          value="61a744fd313b1e7127be4636"
          onChange={(e) => {
            e.preventDefault();
            setRole("61a744fd313b1e7127be4636");
          }}
        />
          <label for="Admin">Admin</label>
         {" "}
        <input
          type="radio"
          id="User"
          name="role"
          value="61a744e5313b1e7127be4634"
          onChange={(e) => {
            e.preventDefault();
            setRole("61a744e5313b1e7127be4634");
          }}
        />
          <label for="User">User</label>
      </div>
      <button onClick={register}>Register</button>
      {message ? message : ""}
    </div>
  );
};

export default Register;
