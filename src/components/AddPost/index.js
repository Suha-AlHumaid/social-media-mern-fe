import React, { useEffect, useState } from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";

import "./style.css"
const AddPost = ({getAll}) => {
    // /post
    const [discription, setDiscription] = useState("cc");
    const [avatar, setAvatar] = useState("ddd");
    const [ title, setTitle] = useState(" taass");
    const [post,setPost]=useState(null)

    const state = useSelector((state) => {
      return {
        reducerLog: state.reducerLog,
      };
    });

    const AddPostFunc = async () => {
        try {
          const result = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/post`,
            {
                discription,
                avatar,
                title,

            },
            {
              headers: {
                Authorization: `Bearer ${state.reducerLog.token}`,
              },
            }
          );
          setPost(result.data)
          getAll()
        }catch (error){
            console.log(error);
        }
    }

    return (
        <div>
           <span onClick={AddPostFunc}> add +</span>
          
        </div>
    )
}

export default AddPost
