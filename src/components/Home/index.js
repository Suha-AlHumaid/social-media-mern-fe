import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import EditPost from "../EditPost";
import Dashboard from "../Dashboard";
import User from "../User";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Home = () => {
  const [log, setLog] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isPuplisher, setIsPuplisher]=useState(false)
  const [isAdmin, setIsAdmin]=useState(false)
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
  useEffect(() => {
    check();
  }, []);
  const check = () => {
    const storageUser = localStorage.getItem("user")
    const userStorage= JSON.parse(storageUser)

    if (userStorage.role !== "61a744e5313b1e7127be4634") {
      setIsAdmin(true);
      console.log("admin");
    }
  };
  return (
    <div>
      {!state.reducerLog.token ? (
        <>
          <div className="container">
            {log ? (
              <div>
                <Register />
                <div className="flexRow stk">
                  <div className="fixedbottom">
                    <p>
                      Have an account?
                      <span className="link" onClick={(e) => setLog(false)}>
                        Loggin Now!
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Login />
                <div className="flexRow stk">
                  <div className="fixedbottom">
                    <p>
                      Don't have an account?
                      <span className="link" onClick={(e) => setLog(true)}>
                        Join Us Now!
                      </span>
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <Header />
          <>
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
              <Route
                exact
                path="/editPost/:_id"
                element={<EditPost deletePost={deletePost} />}
              />
              {isAdmin ? (
                <>
                <Route
                  exact
                  path="/dashboard"
                  element={<Dashboard  />}
                />
                   <Route
                  exact
                  path="/user/:id"
                  element={<User />}
                />
                </>
              ) : (
                ""
              )}
            </Routes>
          </>
          <Menu isAdmin={isAdmin} />
        </>
      )}
    </div>
  );
};

export default Home;
