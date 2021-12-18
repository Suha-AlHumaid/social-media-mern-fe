import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Comment from "../Comment";
import { MdAdd } from "react-icons/md";
import "./style.css";
const Comments = ({ getAllComments, post, comments }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  const [discription, setDiscription] = useState("");
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

  useEffect(() => {
    getAllComments();
  }, [post]);

  const addComment = async () => {
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

      setComment(result.data);
      getAllComments();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="comments">
      {comments && comments.length !== 0
        ? comments.map((elem) => (
            <div key={elem._id}>
              {/* {elem && elem.discription} */}
              <Comment getAllComments={getAllComments} elem={elem} />
            </div>
          ))
        : ""}
      <input
        className="addComment"
        type="text"
        placeholder="Add comments.."
        onChange={(e) => setDiscription(e.target.value)}
      />
      <MdAdd
        onClick={(e) => {
          e.preventDefault();

          addComment(e);
        }}
      />
    </div>
    // <div className="comments">

    //   {comments.length!==0 ? comments.map((elem) =>
    //   <div>
    //   <Comment  getAllComments={getAllComments} elem={elem} />
    //   </div>
    //   ) : ""}
    //   <p onClick={addComment}> add comments</p>
    // </div>
  );
};

export default Comments;
