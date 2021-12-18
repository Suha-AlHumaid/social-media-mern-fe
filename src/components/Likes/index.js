import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IoMdHeart } from "react-icons/io";
import axios from "axios";

const Likes = ({ id, setMessage, getAll }) => {
  const state = useSelector((state) => {
    return {
      reducerLog: state.reducerLog,
    };
  });
  const [isLike, setlike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    likesCount();
    const user1 = localStorage.getItem("user");
    const user = JSON.parse(user1);
  }, [count]);

  const likesCount = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/likes/${id}`
      );
      console.log("likes", result.data);
      if (result.data) {
        setLikes(result.data);
        setCount(result.data.length);

        getAll();
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  const toggle = async (id) => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/like/${id}`,
        {
          isLike: !isLike,
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
        setlike(result.data.isLike);
        likesCount();
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.status == 403) {
        setMessage("varified your email");
      } else {
        setMessage("wrong email or password");
      }
    }
  };

  return (
    <>
      <p className="unlike">
        <IoMdHeart
          onClick={() => toggle(id)}
          className={isLike ? "like" : "unlike"}
        />
        {count}
      </p>
    </>
  );
};

export default Likes;
