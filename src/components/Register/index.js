import React, { useState } from "react";
import axios from "axios";
import ReactPasswordStrength from "react-password-strength";
import { storage } from "../firebase";
import "./style.css";
const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strongPassword, setStrongPassword] = useState("");
  const [role, setRole] = useState("61a744e5313b1e7127be4634");
  const [message, setMessage] = useState("");
  const [avatar, setAvatar] = useState("");
  const [url, setUrl] = useState(
    "https://aqaarplus.com/assets/uploads/default.png"
  );

  const [progress, setProgress] = useState(0);
  const register = async () => {
    setMessage("");
    try {
    // console.log(strongPassword);

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
        setMessage(result.data.message + "check your email please");
      }
    } catch (error) {
      setMessage("faild");
      console.log(error.response);
    }
  };
  const foo = (score, password, isValid) => {

    console.log(score, password, isValid);
  setPassword(password)
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
        {/* <h1 className="heading">Register</h1> */}
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
        <ReactPasswordStrength
          required
          className="input"
          style={{ width:`75%` }}
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
{/* 
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
        </div> */}

        <lable for="avatar">Upload Your Avatar:</lable>

        <div className="uplaod">
          <label className="custom-file-upload">
            {" "}
            Choose Photo
            <input type="file" onChange={handleChange} />
          </label>

          <button className="custom-file-upload" onClick={handleUpload}>
            Upload
          </button>
          <progress value={progress} max="100" />
        </div>

        {message ? message : ""}
        <button className="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
