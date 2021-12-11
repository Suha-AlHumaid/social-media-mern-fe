import React, { useState } from "react";
import axios from "axios";
import ReactPasswordStrength from "react-password-strength";
import "./style.css";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strongPassword, setStrongPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");

  const register = async () => {
    setMessage("");
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        {
          email,
          userName,
          avatar,
          password:strongPassword,
          role,
        }
      );
      console.log(result.status);
      if (result.status === 201) {
        setMessage(result.data.message + "check your email please");
      }
    } catch (error) {
      setMessage("faild");
      console.log(error.response);
    }
  };
  const foo = (score, password, isValid) => {
    console.log(score, password, isValid);
    if (isValid === true) {
      setStrongPassword(password);
    }
  };

  return (
    <div className="logForm">
      <form onSubmit={(e)=>{
      e.preventDefault()
        register()}}>
      <h1>Register</h1>
      <lable for="userName">User Name</lable>
      <input
        required
        type="text"
        id="userName"
        onChange={(e) => setUserName(e.target.value)}
      />
      <lable for="email">Email</lable>
      <input
        required
        type="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <lable for="avatar">Avatar:</lable>
      <input
        required
        type="text"
        id="avatar"
        onChange={(e) => setAvatar(e.target.value)}
      />
      <lable for="password">Password:</lable>

      <ReactPasswordStrength
        required
        className="customClass"
        // style={{ display: 'none' }}
        minLength={5}
        minScore={2}
        scoreWords={["weak", "okay", "good", "strong", "stronger"]}
        changeCallback={foo}
        inputProps={{
          name: "password_input",
          autoComplete: "off",
          className: "form-control",
        }}
      />
      {/* <input
        type="text"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
      /> */}
      <div>
        <p>Please select your Role:</p>{" "}
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
        <label for="Admin">Admin</label>{" "}
        <input
          required
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
      {message ? message : ""}
      <button>Register</button>
   
      </form>
    </div>
  );
};

export default Register;
