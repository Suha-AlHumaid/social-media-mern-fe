import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Explore from "../Explore";
import Login from "../Login";
import Register from "../Register";
import Header from "../Header";
import Profile from "../Profile";
import UserPosts from "../UserPosts";
import Menu from "../Menu";
import AddPost from "../AddPost";
import SinglePost from "../SinglePost";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [log, setLog] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        `${process.env.REACT_APP_BASE_URL}/allPosts`,
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );

      setPosts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async (_id) => {
    console.log("del", _id);
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/DelePost/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );

      if (result.status === 201) {
        getAll();
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(state.reducerLog.token);
  return (
    <div>
      {!state.reducerLog.token ? (
        <div className="home">
          {log ? (
            <>
              <Register />
              <p>
                you have an account?{" "}
                <span className="icon" onClick={(e) => setLog(false)}>
                  Loggin here
                </span>{" "}
              </p>
            </>
          ) : (
            <>
              <Login />
              <p>
                you don't have an account?{" "}
                <span className="icon" onClick={(e) => setLog(true)}>
                  Register here
                </span>{" "}
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <Header />
          <Routes>
            <Route
              exact
              path="/"
              element={<Explore posts={posts} getAll={getAll} />}
            />
            <Route exact path="/home" element={<UserPosts />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route
              exact
              path="/singlePost/:_id"
              element={<SinglePost deletePost={deletePost} />}
            />
            <Route
              exact
              path="/add"
              element={<AddPost getAll={getAll} posts={posts} />}
            />
          </Routes>
          <Menu />
        </>
      )}
    </div>
  );
};

export default Home;
