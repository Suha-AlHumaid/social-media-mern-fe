
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Reducers/login";
import axios from "axios";
import Post from "../Post";
const Explore = () => {
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
        `${process.env.REACT_APP_BASE_URL}/allPosts`,
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

  return (<div>
<h1>Explore Posts:</h1>
{posts.length?posts.map(elem=>
<Post  key ={elem._id} elem={elem}/>
) :"cc"
}
  </div>
  )
};

export default Explore;
