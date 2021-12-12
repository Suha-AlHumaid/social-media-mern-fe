import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IoMdHeart } from "react-icons/io";
import Comments from "../Comments";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SinglePost = ({ deletePost }) => {
  const [comments, setComments] = useState([]);
  const { _id } = useParams(); //post id
  const [post, setPost] = useState(null);
  const [isPuplisher, setIsPuplisher] = useState(false);
  const navigate = useNavigate();

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

      setPost(result.data);
      if (result.data.puplisher._id == state.reducerLog.user._id) {
        setIsPuplisher(true);
      }
      getAll();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );

      setComments(result.data);
      console.log(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="full">
        <img src={post && post.avatar} alt={post && post._id} />
        <div className="txt">
          <h1 className="user">
            {post && post.puplisher.userName} <IoMdHeart className="unlike" />
            {isPuplisher ? (
              <MdEdit
                onClick={() => navigate(`/editPost/${post._id}`)}
                className="unlike"
              />
            ) : (
              ""
            )}
          </h1>
          <h3>{post && post.discription}</h3>
          <Comments
            getPost={getPost}
            comments={comments}
            setComments={setComments}
            getAll={getAll}
            post={post && post}
          />

          <p className="date">{post && post.Date}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
