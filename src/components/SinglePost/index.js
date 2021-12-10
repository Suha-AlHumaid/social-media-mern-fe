import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
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
    <div>
      {post && post.discription}
      <p onClick={(e) => deletePost(_id)}>...</p>
    </div>
  );
};

export default SinglePost;
