import React from "react";
import "./style.css"
import { useNavigate } from "react-router-dom";
import{IoMdHeart} from "react-icons/io"
const Post = ({ elem }) => {
  const navigate = useNavigate();
  return (
    <div className="full">
      <img
        src={elem.avatar}
        alt={elem._id}
        onClick={() => navigate(`/singlePost/${elem._id}`)}
      />
      <div className="txt">
      <h1 className="user">{elem.puplisher.userName} <IoMdHeart className="unlike"/></h1>
         <h3 >{elem.discription}</h3>
         <p className="date">{elem.Date}</p>
         </div>
    </div>
  );
};

export default Post;
