import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import Post from "../Post";
import "./style.css";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
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
        `${process.env.REACT_APP_BASE_URL}/posts`,
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );
      // setTasks(result.data);
      console.log(result.data);
      setPosts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      
      <div className="reverseCol full">
        {posts.length ? posts.map((elem) => <Post elem={elem} />) : ""}
      </div>
    </div>
  );
};

export default UserPosts;
