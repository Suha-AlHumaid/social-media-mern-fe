import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../Reducers/login";
import axios from "axios";
import Comment from "../Comment";

const Comments = ({post}) => {
    const [comments, setComments] = useState([]);
    const state = useSelector((state) => {
      return {
        reducerLog: state.reducerLog,
      };
    });
  console.log(state.reducerLog.token);
    useEffect(() => {
      getAll();
    }, []);
  
    const getAll = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/comments/${post._id}`,
          {
            headers: {
              Authorization: `Bearer ${state.reducerLog.token}`,
            },
          }
        );
        // setTasks(result.data);
  console.log(result.data);
  setComments(result.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    return (<div>

  {comments.length?comments.map(elem=>
<Comment elem={elem}/>
  ) :""
  }
    </div>
    )
  };

export default Comments
