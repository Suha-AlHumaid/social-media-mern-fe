import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Comment from "../Comment";
import "./style.css"
const Comments = ({getPost,comments,post,getAll }) => {
  const [comment, setComment] = useState([]);
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

  useEffect(() => {
    getAll();
    getPost();
  }, []);

const addComment=async()=>{
  try {
    const result = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/comment/${post._id}`,
      {discription:"Ddd"},
      {
        headers: {
          Authorization: `Bearer ${state.reducerLog.token}`,
        },
      }
    );

    setComment(result.data);
    getAll()
  } catch (error) {
    console.log(error);
  }
}
  return (
    <div className="comments">
  
      {comments.length? comments.map((elem) => <Comment  getAll={ getAll} elem={elem} />) : ""}
      <p onClick={addComment}> add comments</p>
    </div>
  );
};

export default Comments;
