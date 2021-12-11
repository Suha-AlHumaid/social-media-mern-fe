import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {IoMdHeart} from "react-icons/io"
import Comments from "../Comments";
import "./style.css"

const SinglePost = ({ deletePost }) => {
  const { _id } = useParams();
  console.log(_id); //post id
  const [post, setPost] = useState(null);

  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/post/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );
      console.log(result.data);
      setPost(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
<div className="container">
<div className="full">

<img
  src={post && post.avatar}
  alt={post && post._id}
/>
<div className="txt">
<h1 className="user">{post && post.puplisher.userName} <IoMdHeart className="unlike"/></h1>
   <h3 >{post && post.discription}</h3>
   <Comments post={post&& post}/>

   <p className="date">{post && post.Date}</p>
   </div>



</div></div>
  );
};

export default SinglePost;
