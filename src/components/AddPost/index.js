import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../firebase";
const AddPost = ({ getAll, posts }) => {
  // /post
  const [discription, setDiscription] = useState("");
  const [avatar, setAvatar] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState(null);
  const [url, setUrl] = useState(
    "https://aqaarplus.com/assets/uploads/default.png"
  );
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

  const AddPostFunc = async () => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/post`,
        {
          discription,
          avatar: url,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );
      setPost(result.data);

      getAll();
      navigate("/posts");
    } catch (error) {
      console.log(error);
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
    <div className="container">

    <div className="form">
      <h1 className="heading">ADD POST </h1>
      <input
      className="input"
        placeholder="Title.."
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />
      <textarea
      required
      rows="4"
        className="input"
        placeholder="Discription..."
        onChange={(e) => setDiscription(e.target.value)}
        type="text"
      />

      <div className="uplaod">
        <label className="custom-file-upload"> Choose Photo
        <input type="file" onChange={handleChange} /></label>
    
          <button className="custom-file-upload" onClick={handleUpload}>Upload</button>
          <progress value={progress} max="100" />
       
      </div>

      <button className="submit" onClick={AddPostFunc}> Done </button>
      {/* <Link
        to={{
          pathname: "/",
          state: { posts },
        }}
      >
        explore
      </Link> */}
    </div></div>
  );
};

export default AddPost;
