import React, { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoMdHeart } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";
import Likes from "../Likes";

const Post = ({ elem, getAll }) => {
  const navigate = useNavigate();
  const [isLike, setlike] = useState(false);
  const [isPuplisher, setIsPuplisher] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });

  const deleCommentAdmin = async (_id) => {
    console.log(_id);
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/anyCommentOrpost`,
        { post_id: _id },
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );

      getAll();
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

    console.log(userStorage);
    if (elem.puplisher._id == userStorage._id) {
      setIsPuplisher(true);
    }

    if (userStorage.role !== "61a744e5313b1e7127be4634") {
      setIsAdmin(true);
      console.log("admin");
    }
  };

  const toggle = async () => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/like/${elem._id}`,
        {
          isLike,
        },
        {
          headers: {
            Authorization: `Bearer ${state.reducerLog.token}`,
          },
        }
      );
      console.log(result.data);
      console.log(result.status);
      if (result.status === 200) {
        setlike(!isLike);
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status == 403) {
        setMessage("varified your email");
      } else {
        setMessage("wrong email or password");
      }
      // setMessage("faild");
    }
  };
  return (
    <div className="full">
      <img
        src={elem.avatar}
        alt={elem._id}
        onClick={() => navigate(`/singlePost/${elem._id}`)}
      />
      <div className="txt">
        <h1 className="user">
          {elem.puplisher.userName}
          <IoMdHeart onClick={toggle} className={isLike ? "like" : "unlike"} /> <Likes id={elem._id}/>
          {isPuplisher ? (
            <MdEdit
              onClick={() => navigate(`/editPost/${elem._id}`)}
              className="unlike"
            />
          ) : (
            ""
          )}
          {isAdmin ? (
            <TiDeleteOutline
              onClick={() => deleCommentAdmin(elem._id)}
              className="like"
            />
          ) : (
            ""
          )}
        </h1>
        <h3>{elem.discription}</h3>
        <p className="date">{elem.Date}</p>
      </div>
    </div>
  );
};

export default Post;
