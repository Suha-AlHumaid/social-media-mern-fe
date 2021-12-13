import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Explore from "./components/Explore";
import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Profile from "./components/Profile";
import UserPosts from "./components/UserPosts";
import Menu from "./components/Menu";
import AddPost from "./components/AddPost";
import SinglePost from "./components/SinglePost";
import EditPost from "./components/EditPost";
import Dashboard from "./components/Dashboard";
import ForgetPassword from "./components/ForgetPassword";
import { useNavigate } from "react-router-dom";
import PasswordReset from "./components/PasswordReset"
import "./style.css"
import Verfy from "./components/Verfy";
const App = () => {
  const [log, setLog] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isPuplisher, setIsPuplisher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });
console.log(state.reducerLog);
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
        navigate("/posts");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    
    check();
  }, []);
  const check = () => {
    const storageUser = localStorage.getItem("user");
    const userStorage = JSON.parse(storageUser);
    if (userStorage) {
      if (userStorage.role !== "61a744e5313b1e7127be4634") {
        setIsAdmin(true);
        console.log("admin");
      }
    }
  };
  return (
    <div>
   <Header check={check} />
      {!state.reducerLog.token ? (
        
        <Routes>
          <Route
            exact
            path="/register"
            element={
              <div className="container">
                <Register />
                <div className="flexRow stk">
                  <div className="fixedbottom">
                    <p>
                      Have an account?
                      <span className="link" onClick={(e) => navigate("/")}>
                        Loggin Now!
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            }
          />
          <Route
            exact
            path="/"
            element={
              <div className="container">
                <Login />
                <div className="flexRow stk">
                  <div className="fixedbottom">
                    <p>
                      Don't have an account?
                      <span
                        className="link"
                        onClick={(e) => navigate("/register")}
                      >
                        Join Us Now!
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            }
          />

          <Route exact path="/forgetpassword" element={<ForgetPassword />} />
          <Route
            exact
            path="/passwordreset/:id/:tokenmail"
            element={<PasswordReset />}
          />
          <Route
            exact
            path="/verfy/:token2"
            element={<Verfy />}
          />
        </Routes>
      ) : (
        <>
          {/* <Header check={check} /> */}
          <>
            <Routes>
              <Route
                exact
                path="/explore"
                element={<Explore posts={posts} getAll={getAll} />}
              />
              <Route exact path="/posts" element={<UserPosts />} />
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
                  <Route exact path="/dashboard" element={<Dashboard />} />
                </>
              ) : (
                " "
              )}
            </Routes>
          </>
          <Menu isAdmin={isAdmin} check={check} />
        </>
      )}

    </div>
  );
};

export default App;
