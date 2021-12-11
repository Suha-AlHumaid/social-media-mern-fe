import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Comment from "../Comment";
import "./style.css"
const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comments">
      {comments.length ? comments.map((elem) => <Comment elem={elem} />) : ""}
    </div>
  );
};

export default Comments;
