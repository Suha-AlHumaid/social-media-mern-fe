import React from "react";

import Comments from "../Comments";
import { Link, useNavigate } from "react-router-dom";
const Post = ({ elem }) => {
  // `/singlePost/${elem._id}`
  const navigate = useNavigate();
  return (
    <div>
      <h3>{elem.discription}</h3>

      <img
        src={elem.avatar}
        alt={elem._id}
        onClick={() => navigate(`/singlePost/${elem._id}`)}
      />

      {/* comments: <Comments post={elem}/> */}
    </div>
  );
};

export default Post;
