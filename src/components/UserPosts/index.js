import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import Post from "../Post";

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
  
        setPosts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (<div>
  <h1>User Posts</h1>
  {posts.map(elem=>
  <Post elem={elem}/>
  )
  }
    </div>
    )
}

export default UserPosts
