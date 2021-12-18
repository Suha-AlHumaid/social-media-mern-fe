import React, { useState } from "react";
import axios from "axios";
import PasswordChecklist from "react-password-checklist"
import { storage } from "../firebase";
import "./style.css";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strongPassword, setStrongPassword] = useState("");
  const [role, setRole] = useState("61a744e5313b1e7127be4634");
      // role:"61a744fd313b1e7127be4636",
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [url, setUrl] = useState(
    "https://aqaarplus.com/assets/uploads/default.png"
  );

  const [progress, setProgress] = useState(0);
  const [code,setCode] = useState("");
  const register = async () => {
    setMessage("");
    try {


      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/register`,
        {
          email,
          userName,
          avatar: url,
          password,
          role,
        }
      );
      console.log(result.status);
      if (result.status === 201) {
        setMessage(result.data.message + ", Check your email please!");
      }
    } catch (error) {
      setMessage("Registeration Faild");
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${avatar.name}`).put(avatar);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(avatar.name)
          .getDownloadURL()
          .then((url) => {
            setUrl(url);
      
          });
      }
    );
  };




  return (
    <div>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          register();
        }}
      >

        <h1 className="logoHome">𝐼𝓃𝓈𝓉𝒶𝑔𝓇𝒶𝓂𝒾</h1>
        <input
          className="input"
          required
          type="text"
          placeholder="User Name .."
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          className="input"
          required
          type="email"
          placeholder="Email .."
          onChange={(e) => setEmail(e.target.value)}
        />
   
              <input
       className="input" placeholder="Password..." 
        type="password"
      
        onChange={(e) => setPassword(e.target.value)}
      />
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

        {/* <div>
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
        </div> */}

        <lable for="avatar" className="dark">Upload Your Avatar:</lable>

        <div className="uplaod">
          <label className="custom-file-upload">
            Choose Photo
            <input type="file" onChange={handleChange} />
          </label>

          <button className="custom-file-upload" onClick={handleUpload}>
            Upload
          </button>
          <progress value={progress} max="100" />
        </div>

        <p className="red"> {message ? message : ""}</p>
   <button className="submit" id="signupSubmitButton">Register</button>
     
      </form>

    </div>
  );
};

export default Register;


// {message.includes(", Check your email please!")? <div>
//         <p className="dark">Enter the access code</p>
//         <input    className="input"
//           required type="text" onChange={(e) => setCode(e.target.value) }/>
//         <button className="submit" >Enter Code</button>
//       </div>: <button className="submit" id="signupSubmitButton">Register</button>}
//       <p className="dark"> {message ? message : ""}</p>