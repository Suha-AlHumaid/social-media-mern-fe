import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
const Likes = ({ id }) => {
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    likesCount();
  }, []);
  const likesCount = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/likes/${id}`
      );
      console.log(result.data);
      setLikes(result.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  return <h1 className="unlike">{likes.length}</h1>;
};

export default Likes;
