import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Post from "../Post";
import "./style.css";
const Explore = ({ posts, getAll }) => {
  useEffect(() => {
    getAll()
  }, [])
  return (
    <div className="container">
    <div className="reverseCol full">
      {posts && posts.length
        ? posts.map((elem) => <Post getAll={getAll} key={elem._id} elem={elem} />)
        : "cc"}
    </div>
    </div>
  );
};

export default Explore;
