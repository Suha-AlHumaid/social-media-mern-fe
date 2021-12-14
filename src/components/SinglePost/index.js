import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { IoMdHeart } from "react-icons/io";
import Comment from "../Comment";
import { MdEdit,MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./style.css";

const SinglePost = () => {
  const { _id } = useParams(); //post id
  console.log("_id",_id);
  const [post, setPost] = useState(null);
  const [isPuplisher, setIsPuplisher] = useState(false);
  const [discription, setDiscription] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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

    
      if(result.data){
        setPost(result.data);
        const storageUser = localStorage.getItem("user")
        const userStorage= JSON.parse(storageUser)
    
        console.log(userStorage);
        if (result.data.puplisher._id == userStorage._id) {
          setIsPuplisher(true);
        }
    
        if (userStorage.role !== "61a744e5313b1e7127be4634") {
          setIsAdmin(true);
          console.log("admin");
        }
      }
 
    } catch (error) {
      console.log(error);
    }
  };

//comment 
  useEffect(() => {
    getAllComments();
  }, [post]);


  const getAllComments = async () => {
    try {
      console.log("Got it");
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/comments/${post._id}`,
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );
      console.log(result.status);
      if (result.status == 201) {
        setComments(result.data);
        console.log("Got it");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (e) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/comment/${post._id}`,
        { discription },
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
  
      );
      console.log(result.data);
      setComment(result.data);
      getAllComments();

    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="container">
      <div className="full">
        <img src={post && post.avatar} alt={post && post._id} />
        <div className="txt">
          <h1 className="user">
            {post && post.puplisher.userName} 
            {/* <IoMdHeart className="unlike" /> */}
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
          <div className="comments">
            {comments &&comments.map((elem) => <div key={elem._id}>
                {/* {elem && elem.discription} */}
                <Comment getAllComments={getAllComments} getPost={getPost} elem={elem} isPostPuplisher={isPuplisher}/>
                
                </div>)
             }
            <input
            className="addComment"
              type="text"
              placeholder="Add comments.."
              onChange={(e) => setDiscription(e.target.value)}
            
            />
            <MdAdd
                     className="unlike"
              onClick={(e) => {
                e.preventDefault();
   
                addComment(e);
            
              }}
            />
          </div>

          <p className="date">{post && post.Date}</p>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
