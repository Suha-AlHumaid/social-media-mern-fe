import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { Link, useNavigate ,useParams} from "react-router-dom";

const EditPost = ({ getAll, posts ,deletePost}) => {
const {_id}= useParams()
  const [discription, setDiscription] = useState("");
  const [title, setTitle] = useState("");
  const [post, setPost] = useState(null);

  const navigate = useNavigate();

  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

  const editPostFunc = async () => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/post/${_id}`,
        {
          discription,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );
      setPost(result.data);
      navigate(`/singlePost/${_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">

    <div className="form">
      <h1 className="heading">Edit POST </h1>
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

      <button className="submit" onClick={editPostFunc}> Done </button>
      <br/>
      <button className="submit" onClick={()=>{
          deletePost(_id)}}> Delete </button>
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

export default EditPost;
