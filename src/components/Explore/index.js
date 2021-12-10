import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Post from "../Post";
import "./style.css";
const Explore = ({ posts, getAll }) => {
  return (
    <div className="reverseCol">
      {posts && posts.length
        ? posts.map((elem) => <Post key={elem._id} elem={elem} />)
        : "cc"}
    </div>
  );
};

export default Explore;
